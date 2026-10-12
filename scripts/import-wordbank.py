"""
Convert the "Common Korean Words & Adjectives" reference sheet (exported to
text with `textutil -convert txt`) into src/content/wordbank.json.

    python3 scripts/import-wordbank.py path/to/sheet.txt

The sheet repeats: a part heading ("PART 1. ..."), a category heading, a
"Korean / Romanization / English meaning" header row, then word triples.
"""
import json, re, sys

HANGUL = re.compile(r"[가-힣]")
lines = [l.strip().replace("’", "'") for l in open(sys.argv[1], encoding="utf-8")]
lines = [l for l in lines if l]

# Known typos in the source sheet, fixed on import.
FIXES = {"링-keu": "ring-keu"}
# Corrections by Korean form: (korean, romanization). 빠르어요 isn't a valid
# form of the 르-irregular 빠르다; the others romanize the actual pronunciation.
KO_FIXES = {
    "빠르어요 / 빨라요": ("빨라요", "ppal-la-yo"),
    "편리해요": ("편리해요", "pyeol-li-hae-yo"),
    "정리하다": ("정리하다", "jeong-ni-ha-da"),
    "끝나다": ("끝나다", "kkeun-na-da"),
    "끝내다": ("끝내다", "kkeun-nae-da"),
}

words, part, category, i = [], None, None, 0
while i < len(lines):
    line = lines[i]
    if line.startswith("PART "):
        part = re.sub(r"^PART \d+\.\s*", "", line)
        category = part
        i += 1
        continue
    if line == "Korean" and lines[i + 1 : i + 3] == ["Romanization", "English meaning"]:
        i += 3
        # A row is Korean, then romanization, then meaning; stop at the next heading.
        while i + 2 < len(lines) and HANGUL.search(lines[i]) and not HANGUL.search(lines[i + 2]):
            ko, rom = KO_FIXES.get(lines[i], (lines[i], FIXES.get(lines[i + 1], lines[i + 1])))
            words.append({"ko": ko, "rom": rom, "en": lines[i + 2], "category": category, "part": part})
            i += 3
        continue
    if not HANGUL.search(line) and not line.startswith("Use these patterns"):
        category = line
    i += 1

out = "src/content/wordbank.json"
json.dump(words, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(words)} words in {len({w['category'] for w in words})} categories -> {out}")
