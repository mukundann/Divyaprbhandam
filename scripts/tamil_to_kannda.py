import re
import sys
from pathlib import Path

# Tamil Unicode ranges:
# Vowels: U+0B85..U+0B94
# Consonants: U+0B95..U+0BB9
# Dependent vowel signs (matras): U+0BBE..U+0BCC
# Pulli / Virama: U+0BCD
# Aytham: U+0B83

TAMIL_VOWELS = {
    "\u0B85": "ಅ",  # அ
    "\u0B86": "ಆ",  # ஆ
    "\u0B87": "ಇ",  # இ
    "\u0B88": "ಈ",  # ஈ
    "\u0B89": "ಉ",  # உ
    "\u0B8A": "ಊ",  # ஊ
    "\u0B8E": "ಎ",  # எ
    "\u0B8F": "ಏ",  # ஏ
    "\u0B90": "ಐ",  # ஐ
    "\u0B92": "ಒ",  # ஒ
    "\u0B93": "ಓ",  # ஓ
    "\u0B94": "ಔ",  # ஔ
}

TAMIL_CONSONANTS = {
    "\u0B95": "ಕ",  # க
    "\u0B99": "ಙ",  # ங
    "\u0B9A": "ಚ",  # ச
    "\u0B9C": "ಜ",  # ஜ
    "\u0B9E": "ಞ",  # ஞ
    "\u0B9F": "ಟ",  # ட
    "\u0BA3": "ಣ",  # ண
    "\u0BA4": "ತ",  # த
    "\u0BA8": "ನ",  # ந
    "\u0BA9": "ನ",  # ன (change to "ಱ" if preferred)
    "\u0BAA": "ಪ",  # ப
    "\u0BAE": "ಮ",  # ம
    "\u0BAF": "ಯ",  # ய
    "\u0BB0": "ರ",  # ர
    "\u0BB1": "ರ",  # ற (change to "ಱ" if preferred)
    "\u0BB2": "ಲ",  # ல
    "\u0BB3": "ಳ",  # ள
    "\u0BB4": "ಳ",  # ழ (change to "ೞ" if preferred)
    "\u0BB5": "ವ",  # வ
    "\u0BB6": "ಶ",  # ஶ
    "\u0BB7": "ಷ",  # ஷ
    "\u0BB8": "ಸ",  # ஸ
    "\u0BB9": "ಹ",  # ஹ
}

TAMIL_MATRAS = {
    "\u0BBE": "\u0CBE",  # ா -> ಾ
    "\u0BBF": "\u0CBF",  # ி -> ಿ
    "\u0BC0": "\u0CC0",  # ீ -> ೀ
    "\u0BC1": "\u0CC1",  # ு -> ು
    "\u0BC2": "\u0CC2",  # ூ -> ೂ
    "\u0BC6": "\u0CC6",  # ெ -> ೆ
    "\u0BC7": "\u0CC7",  # ே -> ೇ
    "\u0BC8": "\u0CC8",  # ை -> ೈ
    "\u0BCA": "\u0CCA",  # ொ -> ೊ
    "\u0BCB": "\u0CCB",  # ோ -> ோ
    "\u0BCC": "\u0CCC",  # ௌ -> ೌ
}

TAMIL_PULLI = "\u0BCD"     # ்
KANNADA_VIRAMA = "\u0CCD"  # ್

# Matches sequences containing Tamil script characters (including modifiers/pulli)
TAMIL_RUN_RE = re.compile(r"[\u0B82\u0B83\u0B85-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BCD]+")


def transliterate_tamil_segment(segment: str) -> str:
    """Transliterate a Tamil script run into Kannada script."""
    segment = segment.replace("\u200C", "").replace("\u200D", "")
    out = []
    i = 0
    n = len(segment)

    while i < n:
        ch = segment[i]

        if ch == "\u0B83":  # ஃ -> ಃ
            out.append("\u0C83")
            i += 1
        elif ch == "\u0B82":  # Anusvara -> ಂ
            out.append("\u0C82")
            i += 1
        elif ch in TAMIL_VOWELS:
            out.append(TAMIL_VOWELS[ch])
            i += 1
        elif ch in TAMIL_CONSONANTS:
            out.append(TAMIL_CONSONANTS[ch])
            i += 1
            if i < n and segment[i] == TAMIL_PULLI:
                out.append(KANNADA_VIRAMA)
                i += 1
            elif i < n and segment[i] in TAMIL_MATRAS:
                out.append(TAMIL_MATRAS[segment[i]])
                i += 1
        elif ch in TAMIL_MATRAS:
            out.append(TAMIL_MATRAS[ch])
            i += 1
        elif ch == TAMIL_PULLI:
            out.append(KANNADA_VIRAMA)
            i += 1
        else:
            out.append(ch)
            i += 1

    result = "".join(out)
    result = result.replace("\u0CCA\u0CC6", "\u0CCB")
    result = result.replace("\u0CC6\u0CC6", "\u0CC7")
    return result


def convert_tamil_in_text(text: str) -> str:
    """Replace only Tamil character runs while leaving English, punctuation, spaces, and symbols untouched."""
    return TAMIL_RUN_RE.sub(lambda m: transliterate_tamil_segment(m.group(0)), text)


def transliterate_js_file(js_content: str) -> str:
    """
    Walk JS content so variable names, English strings, numbers, syntax,
    and comments remain untouched, while Tamil characters inside strings/values
    are transliterated to Kannada.
    """
    result = []
    i = 0
    n = len(js_content)

    in_single_quote = False
    in_double_quote = False
    in_template_literal = False
    in_line_comment = False
    in_block_comment = False

    while i < n:
        ch = js_content[i]
        nxt = js_content[i + 1] if i + 1 < n else ""

        # Handle end of line comment
        if in_line_comment:
            result.append(ch)
            if ch == "\n":
                in_line_comment = False
            i += 1
            continue

        # Handle end of block comment
        if in_block_comment:
            result.append(ch)
            if ch == "*" and nxt == "/":
                result.append(nxt)
                in_block_comment = False
                i += 2
                continue
            i += 1
            continue

        # Outside strings: check for comments
        if not (in_single_quote or in_double_quote or in_template_literal):
            if ch == "/" and nxt == "/":
                result.append("//")
                in_line_comment = True
                i += 2
                continue
            if ch == "/" and nxt == "*":
                result.append("/*")
                in_block_comment = True
                i += 2
                continue

        # Handle string delimiters
        if ch == "'" and not in_double_quote and not in_template_literal:
            # Check escape
            backslashes = 0
            k = i - 1
            while k >= 0 and js_content[k] == "\\":
                backslashes += 1
                k -= 1
            if backslashes % 2 == 0:
                in_single_quote = not in_single_quote
            result.append(ch)
            i += 1
            continue

        if ch == '"' and not in_single_quote and not in_template_literal:
            backslashes = 0
            k = i - 1
            while k >= 0 and js_content[k] == "\\":
                backslashes += 1
                k -= 1
            if backslashes % 2 == 0:
                in_double_quote = not in_double_quote
            result.append(ch)
            i += 1
            continue

        if ch == "`" and not in_single_quote and not in_double_quote:
            backslashes = 0
            k = i - 1
            while k >= 0 and js_content[k] == "\\":
                backslashes += 1
                k -= 1
            if backslashes % 2 == 0:
                in_template_literal = not in_template_literal
            result.append(ch)
            i += 1
            continue

        # Inside string literals: transliterate Tamil runs, keep English/escapes/ASCII intact
        if in_single_quote or in_double_quote or in_template_literal:
            if ch == "\\" and nxt:
                # Keep escape sequences like \n, \t, \" intact; transliterate if \uXXXX isn't ASCII
                result.append(ch + nxt)
                i += 2
                continue

            match = TAMIL_RUN_RE.match(js_content, i)
            if match:
                result.append(transliterate_tamil_segment(match.group(0)))
                i = match.end()
                continue

            result.append(ch)
            i += 1
            continue

        # Outside strings and comments: keep JS syntax/English identifiers intact
        result.append(ch)
        i += 1

    return "".join(result)


def main():
    if len(sys.argv) < 3:
        print("Usage: python js_tamil_to_kannada.py <input.js> <output.js>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    if not input_path.exists():
        print(f"File not found: {input_path}")
        sys.exit(1)

    js_text = input_path.read_text(encoding="utf-8")
    converted_text = transliterate_js_file(js_text)
    output_path.write_text(converted_text, encoding="utf-8")
    print(f"Done. Wrote Kannada-transliterated JS file to: {output_path}")


if __name__ == "__main__":
    main()