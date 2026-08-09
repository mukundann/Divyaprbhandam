import os
import re
import json
import glob

def _parse_object_literal(js_text, start_index):
    """
    Parses a JS object literal starting at `start_index` (which points to '{').
    Tracks brace depth while ignoring braces inside string literals ('...', "...", `...`)
    and comments (// ... or /* ... */).
    """
    if start_index >= len(js_text) or js_text[start_index] != '{':
        raise ValueError("Expected '{' at start_index")

    brace_count = 0
    in_string = None   # ' ', " ", or `
    in_comment = None  # '//' or '/*'
    i = start_index

    while i < len(js_text):
        char = js_text[i]
        next_char = js_text[i + 1] if i + 1 < len(js_text) else ""

        # 1. Handle Escaped Characters Inside Strings
        if in_string:
            if char == '\\':
                i += 2  # Skip escaped character
                continue
            elif char == in_string:
                in_string = None
            i += 1
            continue

        # 2. Handle Comments
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

        # 3. Detect String Start
        if char in ('"', "'", '`'):
            in_string = char
            i += 1
            continue

        # 4. Detect Comment Start
        if char == '/' and next_char == '/':
            in_comment = '//'
            i += 2
            continue
        elif char == '/' and next_char == '*':
            in_comment = '/*'
            i += 2
            continue

        # 5. Track Braces (Only outside strings & comments)
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                # Successfully found matching outer closing brace
                return js_text[start_index:i + 1], i + 1

        i += 1

    raise ValueError("Unbalanced object literal")


def _extract_text_content(js_text, key_name):
    """
    Locates occurrences of `key_name` (e.g., 'text_bundle_ta') in JS content
    and extracts the parsed dictionary/object structure.
    """
    extracted_data = {}
    pattern = re.compile(rf"{re.escape(key_name)}\s*[:=]\s*\{{")

    for m in pattern.finditer(js_text):
        start_pos = m.end() - 1  # Index of opening brace '{'
        try:
            obj_str, _ = _parse_object_literal(js_text, start_pos)
            extracted_data[key_name] = obj_str
        except ValueError as e:
            # Print context to debug malformed files easily
            snippet = js_text[max(0, start_pos - 40):min(len(js_text), start_pos + 100)]
            print(f"\n❌ Parse error in '{key_name}' near position {start_pos}: {e}")
            print(f"Context snippet:\n{repr(snippet)}\n")
            raise e

    return extracted_data


def load_book_lyric_texts(book):
    """
    Reads a book file and extracts Tamil and English text content bundles.
    """
    ta_texts = {}
    en_texts = {}

    file_path = book.get("file_path") or book.get("path")
    if file_path and os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        ta_texts = _extract_text_content(content, "text_bundle_ta")
        en_texts = _extract_text_content(content, "text_bundle_en")

    return ta_texts, en_texts


def build_book_report(book, is_ui_book):
    ta_texts, en_texts = load_book_lyric_texts(book)
    return {
        "prefix": book.get("prefix"),
        "name": book.get("name", book.get("prefix")),
        "is_ui_book": is_ui_book,
        "ta_count": len(ta_texts),
        "en_count": len(en_texts)
    }


def main():
    # Adjust book definitions/paths according to your repository structure
    books = [
        {"prefix": "tvm", "name": "Thiruvaimozhi", "path": "aruLicheyal/tvm.js"},
        # Add remaining book configurations as needed...
    ]
    ui_books = {"tvm"}

    books_report = []
    for book in books:
        report = build_book_report(book, book["prefix"] in ui_books)
        books_report.append(report)

    # Output schema formatted with "totals" and "books" keys expected by smoke_test.py
    output = {
        "totals": {
            "total_books": len(books_report),
            "total_ta": sum(b.get("ta_count", 0) for b in books_report),
            "total_en": sum(b.get("en_count", 0) for b in books_report)
        },
        "books": books_report
    }

    output_path = "content-status.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated {output_path}")


if __name__ == "__main__":
    main()