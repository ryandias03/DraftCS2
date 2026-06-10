import gzip
import html
import json
import re
import time
import urllib.parse
import urllib.request

ROLE_MAP = {
    "in-game leader": "IGL",
    "awper": "AWPer",
    "entry fragger": "Entry",
    "lurker": "Lurker",
    "rifler": "Rifler",
    "support": "Support",
}

FALLBACK_ROLES = {
    "ZywOo": ["AWPer"],
    "flameZ": ["Entry"],
    "mezii": ["Support"],
    "ropz": ["Lurker"],
    "b1t": ["Entry"],
    "Aleksib": ["IGL"],
    "iM": ["Rifler"],
    "w0nderful": ["AWPer"],
    "makazze": ["Support"],
    "NiKo": ["Rifler"],
    "m0NESY": ["AWPer"],
    "TeSeS": ["Entry"],
    "kyousuke": ["Support"],
    "bLitz": ["IGL"],
    "Techno4K": ["Rifler"],
    "mzinho": ["Support"],
    "cobrazera": ["Lurker"],
    "BELCHONOKK": ["Entry"],
    "Jame": ["IGL"],
    "nota": ["Rifler"],
    "xiELO": ["Lurker"],
    "zweih": ["Support"],
    "XANTARES": ["Entry"],
    "MAJ3R": ["IGL"],
    "Wicadia": ["Rifler"],
    "woxic": ["AWPer"],
    "soulfly": ["Support"],
    "yuurih": ["Rifler"],
    "molodoy": ["AWPer"],
    "MATYS": ["Rifler"],
    "Rainwaker": ["Rifler"],
    "max": ["IGL"],
    "meyern": ["Rifler"],
    "n1ssim": ["Rifler"],
    "saffee": ["AWPer"],
    "v$m": ["Rifler"],
    "SHOCK": ["Rifler"],
    "stressarN": ["Entry"],
    "Sonic": ["Rifler"],
    "rdnzao": ["Rifler"],
    "Luken": ["Rifler"],
    "Vexite": ["Entry"],
    "TjP": ["Entry"],
    "z4KR": ["AWPer"],
}


def fetch_url(url):
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "CS2Draft/1.0 (educational project)",
            "Accept-Encoding": "gzip",
        },
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read()
        if resp.headers.get("Content-Encoding") == "gzip":
            raw = gzip.decompress(raw)
        return raw.decode("utf-8", errors="replace")


def infobox_value(text, label):
    pattern = (
        re.escape(label)
        + r"</div><div[^>]*>(.*?)</div>"
    )
    m = re.search(pattern, text, re.DOTALL)
    if not m:
        return ""
    block = m.group(1)
    links = re.findall(r">([^<]+)</a>", block)
    if links:
        return links
    return [re.sub(r"<[^>]+>", "", block).strip()]


def normalize_roles(raw_roles):
    out = []
    for raw in raw_roles:
        low = raw.lower().strip()
        for key, val in ROLE_MAP.items():
            if key in low and val not in out:
                out.append(val)
                break
    return out[:2]


def has_non_latin(text):
    return bool(re.search(r"[^\x00-\x7F\u00C0-\u024F\u1E00-\u1EFF]", text))


def fetch_player(page):
    url = f"https://liquipedia.net/counterstrike/{urllib.parse.quote(page, safe='()_-')}"
    text = html.unescape(fetch_url(url))

    romanized = infobox_value(text, "Romanized Name:")
    name_vals = infobox_value(text, "Name:")
    name = ""
    if romanized and romanized[0]:
        name = romanized[0]
    elif name_vals and name_vals[0]:
        name = name_vals[0]
        if has_non_latin(name):
            name = name_vals[0]

    roles_raw = infobox_value(text, "Roles:")
    if not roles_raw or roles_raw == [""]:
        roles_raw = infobox_value(text, "Role:")
    roles = normalize_roles([r for r in roles_raw if r])

    photo = ""
    for pat in [
        r'class="infobox-image[^"]*"[^>]*>.*?src="(/commons/images/thumb/[^"]+)"',
        r'src="(/commons/images/thumb/[^"]+/600px-[^"]+)"',
        r'src="(/commons/images/thumb/[^"]+)"',
    ]:
        m = re.search(pat, text, re.DOTALL)
        if m:
            photo = m.group(1)
            break
    if photo.startswith("/"):
        photo = "https://liquipedia.net" + photo
    if photo and "/thumb/" in photo:
        photo = re.sub(r"/\d+px-", "/600px-", photo, count=1)

    return {
        "name": name,
        "roles": roles,
        "photo": photo,
        "liquipedia": page.split("(")[0].rstrip("_"),
    }


def load_teams_from_data_js():
    text = open("data.js", encoding="utf-8").read()
    teams = []
    team_blocks = re.findall(
        r'id: "([^"]+)",\s*name: "([^"]+)",\s*stage: "([^"]+)",\s*region: "([^"]+)",\s*logo: "([^"]+)",\s*players: \[(.*?)\]\s*\}',
        text,
        re.DOTALL,
    )
    for tid, tname, stage, region, logo, players_blob in team_blocks:
        players = []
        for m in re.finditer(
            r'nick: "([^"]+)", name: "([^"]*)", role(?:s)?: (?:"([^"]+)"|\[([^\]]+)\]), firepower: (\d+), liquipedia: "([^"]+)"',
            players_blob,
        ):
            nick, _name, single_role, roles_arr, fp, lp = m.groups()
            if roles_arr:
                roles = [r.strip().strip('"') for r in roles_arr.split(",") if r.strip()]
            else:
                roles = [single_role] if single_role else []
            players.append(
                {
                    "nick": nick,
                    "firepower": int(fp),
                    "liquipedia": lp,
                    "page": lp,
                }
            )
        teams.append(
            {
                "id": tid,
                "name": tname,
                "stage": stage,
                "region": region,
                "logo": logo,
                "players": players,
            }
        )
    return teams


def main():
    teams = load_teams_from_data_js()
    cache = {}
    out = []

    for team in teams:
        players_out = []
        for p in team["players"]:
            page = p["page"]
            if page not in cache:
                try:
                    cache[page] = fetch_player(page)
                    print(f"OK {page}")
                    time.sleep(0.3)
                except Exception as exc:
                    print(f"ERR {page}: {exc}")
                    cache[page] = {"name": p["nick"], "roles": [], "photo": "", "liquipedia": page}
            info = cache[page]
            roles = info["roles"] or FALLBACK_ROLES.get(p["nick"], ["Rifler"])
            roles = roles[:2]
            players_out.append(
                {
                    "nick": p["nick"],
                    "name": info["name"] or p["nick"],
                    "roles": roles,
                    "firepower": p["firepower"],
                    "liquipedia": info["liquipedia"],
                    "photo": info["photo"],
                }
            )
        out.append({**team, "players": players_out})

    with open("players_data.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    dual = sum(1 for t in out for p in t["players"] if len(p["roles"]) > 1)
    romanized = sum(
        1
        for t in out
        for p in t["players"]
        if p["name"] and not has_non_latin(p["name"])
    )
    print(f"teams={len(out)} dual_roles={dual} latin_names={romanized}")


if __name__ == "__main__":
    main()
