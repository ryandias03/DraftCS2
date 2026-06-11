import json

with open("player-map-stats.js", "r", encoding="utf-8") as f:
    content = f.read()

start = content.index("{")
depth = 0
end = 0
for i, c in enumerate(content[start:], start):
    if c == "{":
        depth += 1
    elif c == "}":
        depth -= 1
        if depth == 0:
            end = i + 1
            break

data = json.loads(content[start:end])

reals = [n for n, s in data.items() if not s.get("_synthetic")]
synthetics = [n for n, s in data.items() if s.get("_synthetic")]

print(f"REAIS ({len(reals)}):")
for n in sorted(reals):
    print(f"  {n}")

print(f"\nSINTÉTICOS ({len(synthetics)}):")
for n in sorted(synthetics):
    print(f"  {n}")