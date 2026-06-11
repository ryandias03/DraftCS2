"""
Calcula firepower usando a fórmula de regressão linear calibrada,
arredonda para CIMA (ceil), e atualiza o data.js.
"""
import json
import re
import math

# ============================================================
# 1. Carregar player-map-stats.js
# ============================================================
with open("player-map-stats.js", "r", encoding="utf-8") as f:
    mapstats_js = f.read()

# Extrair o objeto JSON principal
start = mapstats_js.index("{")
depth = 0
end = 0
for i, c in enumerate(mapstats_js[start:], start):
    if c == "{":
        depth += 1
    elif c == "}":
        depth -= 1
        if depth == 0:
            end = i + 1
            break

json_str = mapstats_js[start:end]
player_map_stats = json.loads(json_str)

print(f"Jogadores com mapStats: {len(player_map_stats)}")

# ============================================================
# 2. Calcular firepower para cada jogador
# ============================================================
# Fórmula: -33.64 + rating*334.71 + impact*(-128.39) + ADR*(-1.91) + KPR*75.90 + mapsPlayed*(-1.65)
# Arredondar para CIMA (ceil), cap 0-100

calculated_fps = {}

for nick, map_stats in player_map_stats.items():
    # PULA jogadores com mapStats sintéticos - recalibramos só os reais
    if map_stats.get("_synthetic"):
        continue
    
    # Filtra apenas entradas de mapa (ignora metadados como _synthetic)
    map_keys = [k for k in map_stats.keys() if not k.startswith("_")]
    if not map_keys:
        continue
    
    avg_rating = sum(map_stats[k]["rating"] for k in map_keys) / len(map_keys)
    avg_impact = sum(map_stats[k]["impact"] for k in map_keys) / len(map_keys)
    avg_adr = sum(map_stats[k]["adr"] for k in map_keys) / len(map_keys)
    avg_kpr = sum(map_stats[k]["kpr"] for k in map_keys) / len(map_keys)
    avg_maps = sum(map_stats[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
    
    fp_raw = (
        -33.64 +
        avg_rating * 334.71 +
        avg_impact * (-128.39) +
        avg_adr * (-1.91) +
        avg_kpr * 75.90 +
        avg_maps * (-1.65)
    )
    
    fp_ceil = math.ceil(fp_raw)
    fp_final = max(0, min(100, fp_ceil))
    
    calculated_fps[nick] = fp_final
    print(f"  {nick:<15} raw={fp_raw:>8.4f} ceil={fp_ceil:>4} final={fp_final:>4}")

# ============================================================
# 3. Atualizar data.js
# ============================================================
with open("data.js", "r", encoding="utf-8") as f:
    data_js = f.read()

updated_count = 0
skipped_count = 0

def replace_fp(match):
    global updated_count, skipped_count
    nick = match.group(1)
    old_fp = match.group(2)
    
    if nick in calculated_fps:
        new_fp = calculated_fps[nick]
        updated_count += 1
        return f'nick: "{nick}", name: {match.group(3)}, roles: {match.group(4)}, firepower: {new_fp}, liquipedia: {match.group(5)}'
    else:
        skipped_count += 1
        return match.group(0)

# Pattern: nick: "xxx", name: "yyy", roles: [...], firepower: NN, liquipedia: "zzz"
# Precisa casar toda a linha do jogador
pattern = re.compile(
    r'nick:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*roles:\s*(\[[^\]]*\](?:\s*,\s*"[^"]*")?),?\s*firepower:\s*(\d+),\s*liquipedia:\s*"([^"]+)"'
)

# Vamos usar uma abordagem mais simples: regex que casa nick e firepower
def update_firepower_in_line(match):
    global updated_count, skipped_count
    full_match = match.group(0)
    nick = match.group(1)
    rest_before_fp = match.group(2)
    old_fp = match.group(3)
    rest_after_fp = match.group(4)
    
    if nick in calculated_fps:
        new_fp = str(calculated_fps[nick])
        updated_count += 1
        return f'nick: "{nick}",{rest_before_fp}firepower: {new_fp},{rest_after_fp}'
    else:
        skipped_count += 1
        return full_match

# Pattern mais flexível: nick: "xxx", ... firepower: NN, ...
pattern2 = re.compile(
    r'nick:\s*"([^"]+)",(.*?)firepower:\s*(\d+),(.*?liquipedia:\s*"[^"]+")'
)

data_js_updated = pattern2.sub(update_firepower_in_line, data_js)

# Guarda o arquivo atualizado
with open("data.js", "w", encoding="utf-8") as f:
    f.write(data_js_updated)

print(f"\n=== RESULTADO ===")
print(f"Jogadores atualizados: {updated_count}")
print(f"Jogadores mantidos (sem mapStats): {skipped_count}")
print(f"Total de jogadores em data.js: {updated_count + skipped_count}")