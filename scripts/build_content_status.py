import os
import re
import json
import glob

def _parse_object_literal(js_text, start_index):
    """
    Parses a JS object literal starting at `start_index` (which points to '{').
    Tracks opening and closing braces while ignoring braces inside single/double quotes,
    backticks, or comments to prevent 'Unbalanced object literal' errors.
    """
    if start_index >= len(js_text) or js_text[start_index] != '{':
        raise ValueError("Expected '{' at start_index")

    brace_count = 0
    in_string = None  # Tracks current string delimiter: ', ", or `
    in_comment = None # Tracks comment type: '//' or '/*'
    i = start_index

    while i < len(js_text):
        char = js_text[i]
        next_char = js_text[i + 1] if i + 1 < len(js_text) else ""

        # Handle string escape sequences
        if in_string:
            if char == '\\':
                i += 2  # Skip escaped character
                continue
            elif char == in_string:
                in_string = None
            i += 1
            continue

        # Handle comment ending
        if in_comment == '//':
            if char == '\n':
                in_comment = None
            i += 1
            continue
        elif in_comment == '/*':
            if char == '*' and next_char == '/':
                in_comment = None
                i += 2
                continue
            i += 1
            continue

        # Handle string opening
        if char in ('"', "'", '`'):
            in_string = char
            i += 1
            continue

        # Handle comment opening
        if char == '/' and next_char == '/':
            in_comment = '//'
            i += 2
            continue
        elif char == '/' and next_char == '*':
            in_comment = '/*'
            i += 2
            continue

        # Track braces outside of strings/comments
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                # Successfully found the matching closing brace
                return js_text[start_index:i + 1], i + 1

        i += 1

    raise ValueError("Unbalanced object literal")


def _extract_text_content(js_text, key_name):
    """
    Finds occurrences of `key_name` (e.g. 'text_bundle_ta') in `js_text` 
    and extracts the corresponding parsed object literals.
    """
    extracted_data = {}
    # Match patterns like: text_bundle_ta = { ... } or text_bundle_ta: { ... }
    pattern = re.compile(rf"{re.escape(key_name)}\s*[:=]\s*\{{")
    
    for m in pattern.finditer(js_text):
        start_pos = m.end() - 1  # Start at the '{'
        try:
            obj_str, _ = _parse_object_literal(js_text, start_pos)
            # Add extraction logic or store raw text object
            extracted_data[key_name] = obj_str
        except ValueError as e:
            # Print failure context to pinpoint the bad file/line
            context_snippet = js_text[max(0, start_pos - 30):min(len(js_text), start_pos + 100)]
            print(f"\n❌ Error parsing '{key_name}' near position {start_pos}: {e}")
            print(f"Context snippet:\n{repr(context_snippet)}\n")
            raise e

    return extracted_data


def load_book_lyric_texts(book):
    """
    Loads Tamil and English lyric texts for a given book configuration.
    """
    ta_texts = {}
    en_texts = {}
    
    file_path = book.get("file_path") or book.get("path")
    if file_path and os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Extract Tamil text bundle
        try:
            ta_data = _extract_text_content(content, "text_bundle_ta")
            ta_texts.update(ta_data)
        except Exception as e:
            print(f"Failed processing Tamil lyrics for book: {book.get('prefix', 'Unknown')}")
            raise e

        # Extract English text bundle
        try:
            en_data = _extract_text_content(content, "text_bundle_en")
            en_texts.update(en_data)
        except Exception as e:
            print(f"Failed processing English lyrics for book: {book.get('prefix', 'Unknown')}")
            raise e

    return ta_texts, en_texts


def build_book_report(book, is_ui_book):
    print(f"Processing book report for: {book.get('prefix', 'N/A')}")
    ta_texts, en_texts = load_book_lyric_texts(book)
    return {
        "prefix": book.get("prefix"),
        "is_ui_book": is_ui_book,
        "ta_count": len(ta_texts),
        "en_count": len(en_texts)
    }


def main():
    # Example book structure; adjust pathing to your repository layout
    books = [
        {"prefix": "tvm", "path": "aruLicheyal/tvm.js"},
        # Add remaining book definitions here
    ]
    ui_books = ["tvm"]

    report = []
    for book in books:
        book_report = build_book_report(book, book["prefix"] in ui_books)
        report.append(book_report)

    # Save content status output
    with open("content-status.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print("Content status build complete.")


if __name__ == "__main__":
    main()