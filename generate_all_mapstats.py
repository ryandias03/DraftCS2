"""
Gera mapStats determinísticos para TODOS os jogadores do data.js.
- Jogadores com dados REAIS (os 19 originais): preservados como estão
- Jogadores SEM dados reais: gerados deterministicamente, marcados como synthetic: true

O tournament-simulator.js usará o firepower do data.js para jogadores com mapStats sintéticos,
e a fórmula de regressão para jogadores com mapStats reais.

Depois de gerar, rode update_firepower.py para recalibrar APENAS os 19 reais.
"""

import json
import re
import hashlib

MAPS = ["Mirage", "Inferno", "Nuke", "Dust2", "Ancient", "Anubis", "Train"]

# Os 19 jogadores que têm dados REAIS da HLTV (preservar do player-map-stats.js original)
REAL_PLAYERS = {
    "ZywOo", "m0NESY", "donk", "NiKo", "sh1ro", "jL",
    "b1t", "Aleksib", "apEX", "flameZ", "ropz", "w0nderful",
    "XANTARES", "KSCERATO", "karrigan", "mezii", "TeSeS",
    "kyousuke", "woxic", "Jame"
}

def deterministic_random(nick, map_name, param, min_val, max_val):
    """Gera número determinístico entre min_val e max_val."""
    seed = nick + "_" + map_name + "_" + param
    h = hashlib.sha256(seed.encode()).hexdigest()
    val = int(h[:8], 16) / 0xFFFFFFFF
    return min_val + val * (max_val - min_val)


def generate_synthetic_mapstats(nick, firepower):
    """Gera mapStats sintéticos e determinísticos baseados no firepower."""
    base_factor = (firepower - 50) / 50
    base_rating = 1.0 + base_factor * 0.3
    
    mapstats = {"_synthetic": True}
    for map_name in MAPS:
        rating_var = deterministic_random(nick, map_name, "rating", -0.10, 0.10)
        impact_var = deterministic_random(nick, map_name, "impact", -0.08, 0.08)
        adr_var = deterministic_random(nick, map_name, "adr", -5, 5)
        kpr_var = deterministic_random(nick, map_name, "kpr", -0.03, 0.03)
        maps_var = deterministic_random(nick, map_name, "maps", -3, 7)
        wr_var = deterministic_random(nick, map_name, "wr", -0.08, 0.08)
        
        rating = round(max(0.6, min(1.8, base_rating + rating_var)), 2)
        impact = round(max(0.6, min(1.8, rating + 0.05 + impact_var)), 2)
        adr = int(max(45, min(100, 65 + base_factor * 15 + adr_var)))
        kpr = round(max(0.4, min(0.9, 0.58 + base_factor * 0.14 + kpr_var)), 2)
        maps_played = max(3, int(10 + maps_var))
        win_rate = round(max(0.3, min(0.9, 0.5 + base_factor * 0.15 + wr_var)), 2)
        
        mapstats[map_name] = {
            "rating": rating,
            "impact": impact,
            "adr": adr,
            "kpr": kpr,
            "mapsPlayed": maps_played,
            "winRate": win_rate
        }
    
    return mapstats


def main():
    # 1. Carregar os 19 jogadores reais do player-map-stats.js original
    with open("player-map-stats.js", "r", encoding="utf-8") as f:
        original_js = f.read()
    
    # Extrair JSON dos dados originais
    start = original_js.index("{")
    depth = 0
    end = 0
    for i, c in enumerate(original_js[start:], start):
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    
    json_str = original_js[start:end]
    real_mapstats = json.loads(json_str)
    print(f"Jogadores com dados reais preservados: {len(real_mapstats)}")
    for nick in sorted(real_mapstats.keys()):
        # Remove _synthetic flag se existir
        if "_synthetic" in real_mapstats[nick]:
            del real_mapstats[nick]["_synthetic"]
        print(f"  REAL: {nick}")
    
    # 2. Extrair todos os jogadores do data.js
    with open("data.js", "r", encoding="utf-8") as f:
        data_js = f.read()
    
    all_players = {}
    pattern = re.compile(r'nick:\s*"([^"]+)".*?firepower:\s*(\d+)', re.DOTALL)
    for match in pattern.finditer(data_js):
        nick = match.group(1)
        fp = int(match.group(2))
        all_players[nick] = fp
    
    print(f"\nTotal de jogadores em data.js: {len(all_players)}")
    
    # 3. Identificar quem está faltando
    missing = {nick: fp for nick, fp in all_players.items() if nick not in real_mapstats}
    print(f"Jogadores sem mapStats (serão gerados): {len(missing)}")
    
    # 4. Gerar mapStats sintéticos para os faltantes
    combined = dict(real_mapstats)
    for nick, fp in missing.items():
        combined[nick] = generate_synthetic_mapstats(nick, fp)
        print(f"  SYNTH: {nick:<15} FP={fp:>3}")
    
    print(f"\nTotal combinado: {len(combined)} jogadores")
    print(f"  Reais: {len(real_mapstats)}")
    print(f"  Sintéticos: {len(missing)}")
    
    # 5. Escrever player-map-stats.js
    from datetime import datetime
    output = (
        "// AUTO-GENERATED - Todos os jogadores com mapStats\n"
        "// Gerado por generate_all_mapstats.py\n"
        "// NÃO requer chamadas de API - dados arquivados localmente\n"
        f"// Jogadores com dados HLTV reais: {len(real_mapstats)}\n"
        f"// Jogadores com dados sintéticos (baseados no firepower): {len(missing)}\n"
        f"// Jogadores sintéticos têm _synthetic: true\n"
        f"// Generated: {datetime.now().isoformat()}\n\n"
    )
    output += "const PLAYER_MAP_STATS = "
    output += json.dumps(combined, indent=2, ensure_ascii=False)
    output += ";\n\n"
    output += (
        "/**\n"
        " * Injeta mapStats nos objetos dos jogadores.\n"
        " * Chame após TEAMS estar carregado.\n"
        " */\n"
        "function injectPlayerMapStats() {\n"
        "  TEAMS.forEach(team => {\n"
        "    team.players.forEach(player => {\n"
        "      if (PLAYER_MAP_STATS[player.nick]) {\n"
        "        player.mapStats = PLAYER_MAP_STATS[player.nick];\n"
        "      }\n"
        "    });\n"
        "  });\n"
        "  const real = Object.values(PLAYER_MAP_STATS).filter(s => !s._synthetic).length;\n"
        "  const synth = Object.values(PLAYER_MAP_STATS).filter(s => s._synthetic).length;\n"
        "  console.log(`✓ Map stats: ${real} real HLTV + ${synth} synthetic (${real + synth} total)`);\n"
        "}\n\n"
        "if (typeof document !== 'undefined') {\n"
        "  document.addEventListener('DOMContentLoaded', () => {\n"
        "    if (typeof TEAMS !== 'undefined') {\n"
        "      injectPlayerMapStats();\n"
        "    }\n"
        "  });\n"
        "}\n"
    )
    
    with open("player-map-stats.js", "w", encoding="utf-8") as f:
        f.write(output)
    
    print("\n✓ player-map-stats.js atualizado!")
    print(f"  {len(real_mapstats)} reais + {len(missing)} sintéticos = {len(combined)} total")
    print("  Agora execute: python update_firepower.py (para recalibrar os 19 reais)")


if __name__ == "__main__":
    main()