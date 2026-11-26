#!/usr/bin/env python3
"""
Bulk wrapper for tamil_en_to_kannada.py

Walks a folder tree, finds every   marker_<code>_ta.js   and its sibling
marker_<code>_en.js, and writes   marker_<code>_ka.js   next to them.

    <root>/aruLicheyal/TPL/text/marker_tpl_ta.js   (input,  Tamil)
    <root>/aruLicheyal/TPL/text/marker_tpl_en.js   (input,  English)
    <root>/aruLicheyal/TPL/text/marker_tpl_ka.js   (output, Kannada)

Put this file in the same folder as tamil_en_to_kannada.py.

Examples
  python bulk_tamil_to_kannada.py --root ./Divyaprbhandam                # convert everything
  python bulk_tamil_to_kannada.py --root ./Divyaprbhandam --dry-run      # only list what would happen
  python bulk_tamil_to_kannada.py --root . --only TPL PTM --backup       # selected sections, keep .bak
  python bulk_tamil_to_kannada.py --root . --skip-existing               # never touch existing _ka.js
  python bulk_tamil_to_kannada.py --root . --overrides extra.json --simple-letters

Exit code: 0 = all good, 1 = some file failed (or --fail-on-mismatch and mismatches found).
"""
import argparse
import json
import re
import shutil
import sys
import traceback
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
try:
    import tamil_en_to_kannada as conv
except ImportError:
    sys.exit("tamil_en_to_kannada.py must be in the same folder as this script.")

TA_RE = re.compile(r"^marker_(?P<code>.+)_ta\.js$", re.IGNORECASE)


def find_jobs(root, only, exclude_dirs):
    jobs = []
    for ta in sorted(root.rglob("marker_*_ta.js")):
        if any(part in exclude_dirs for part in ta.parts):
            continue
        m = TA_RE.match(ta.name)
        if not m:
            continue
        code = m.group("code")
        if only and code.lower() not in only and ta.parent.parent.name.lower() not in only:
            continue
        jobs.append({
            "code": code,
            "ta": ta,
            "en": ta.with_name(f"marker_{code}_en.js"),
            "ka": ta.with_name(f"marker_{code}_ka.js"),
        })
    return jobs


def main():
    ap = argparse.ArgumentParser(description="Bulk Tamil(+English) -> Kannada converter")
    ap.add_argument("--root", default=".", help="folder to search (default: current folder)")
    ap.add_argument("--only", nargs="*", default=[],
                    help="only these codes / section folders, e.g. tpl ptm (case-insensitive)")
    ap.add_argument("--exclude-dir", nargs="*", default=[".git", "node_modules"],
                    help="folder names to skip")
    ap.add_argument("--dry-run", action="store_true", help="show what would be converted, write nothing")
    ap.add_argument("--skip-existing", action="store_true", help="do not overwrite an existing _ka.js")
    ap.add_argument("--backup", action="store_true", help="copy an existing _ka.js to _ka.js.bak first")
    ap.add_argument("--require-english", action="store_true",
                    help="skip files that have no _en.js (default: convert with Tamil rules only)")
    ap.add_argument("--report", default=None,
                    help="combined report file (default: <root>/kannada_conversion_report.txt)")
    ap.add_argument("--fail-on-mismatch", action="store_true",
                    help="exit with code 1 if any Tamil/English MISMATCH is reported")
    # pass-through options of tamil_en_to_kannada.py
    ap.add_argument("--nasal", choices=["conjunct", "anusvara"], default="anusvara")
    ap.add_argument("--final-m", choices=["virama", "anusvara"], default="anusvara")
    ap.add_argument("--simple-letters", action="store_true", help="ಳ/ರ instead of ೞ/ಱ")
    ap.add_argument("--overrides", help="JSON file with extra English-word overrides")
    ap.add_argument("--selftest", action="store_true", help="run the converter's self-test and exit")
    opts = ap.parse_args()

    if opts.selftest:
        return 1 if conv.selftest(opts) else 0

    root = Path(opts.root).resolve()
    if not root.is_dir():
        sys.exit(f"Not a folder: {root}")

    overrides = dict(conv.DEFAULT_OVERRIDES)
    if opts.overrides:
        overrides.update(json.loads(Path(opts.overrides).read_text(encoding="utf-8")))

    only = {o.lower() for o in opts.only}
    jobs = find_jobs(root, only, set(opts.exclude_dir))
    if not jobs:
        print(f"No marker_*_ta.js files found under {root}")
        return 1

    print(f"Found {len(jobs)} Tamil file(s) under {root}\n")
    lines = [f"Kannada conversion report - {datetime.now():%Y-%m-%d %H:%M}",
             f"root: {root}", f"dry run: {opts.dry_run}", ""]
    summary, failed, mismatches = [], 0, 0

    for job in jobs:
        rel = job["ta"].relative_to(root)
        has_en = job["en"].exists()
        label = f"[{job['code']}] {rel}"

        if opts.require_english and not has_en:
            print(f"SKIP  {label}  (no English file)")
            summary.append((job["code"], "skipped", "no English file"))
            continue
        if opts.skip_existing and job["ka"].exists():
            print(f"SKIP  {label}  (output exists)")
            summary.append((job["code"], "skipped", "output exists"))
            continue

        try:
            if opts.dry_run:
                res = conv.convert_file(job["ta"], job["en"], None, opts, overrides)
                action = "would write"
            else:
                if opts.backup and job["ka"].exists():
                    shutil.copy2(job["ka"], job["ka"].with_name(job["ka"].name + ".bak"))
                res = conv.convert_file(job["ta"], job["en"], job["ka"], opts, overrides)
                action = "wrote"
        except Exception as exc:                      # keep going with the other files
            failed += 1
            print(f"FAIL  {label}: {exc}")
            lines += [f"== {rel}: FAILED ==", traceback.format_exc(), ""]
            summary.append((job["code"], "FAILED", str(exc)))
            continue

        n_mis = sum("MISMATCH" in r for r in res["report"])
        n_sandhi = sum("sandhi" in r for r in res["report"])
        n_noen = sum("no English" in r for r in res["report"])
        mismatches += n_mis
        note = "" if has_en else "  (no English file: Tamil rules only)"
        print(f"OK    {label}: {res['verses']} verses, {n_mis} mismatches, {n_sandhi} sandhi{note}")
        summary.append((job["code"], action, f"{res['verses']} verses, {n_mis} mismatches"))

        lines.append(f"== {rel} -> {job['ka'].name}  ({res['verses']} verses) ==")
        lines.append(f"mismatches: {n_mis}   sandhi/elision: {n_sandhi}   verses without English: {n_noen}")
        lines += ["  " + r for r in res["report"]] or ["  none"]
        if res["review"]:
            lines += ["  Sanskrit-looking words to review:"] + ["    " + r for r in res["review"]]
        lines.append("")

    ok = sum(1 for _, st, _ in summary if st in ("wrote", "would write"))
    lines += ["== Summary ==", f"converted: {ok}   skipped: {sum(1 for _, st, _ in summary if st == 'skipped')}"
              f"   failed: {failed}   total mismatches: {mismatches}"]
    report_path = Path(opts.report) if opts.report else root / "kannada_conversion_report.txt"
    if not opts.dry_run:
        report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"\nReport: {report_path}")
    print(f"Done: {ok} converted, {failed} failed, {mismatches} Tamil/English mismatches.")
    if failed or (opts.fail_on_mismatch and mismatches):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
