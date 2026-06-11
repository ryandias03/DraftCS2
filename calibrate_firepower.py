"""
Calibrate firepower normalization functions so that
calculatePlayerFirepower() in tournament-simulator.js
produces values matching data.js firepower.

Approach: For each player that has BOTH mapStats and a data.js firepower,
we analyze the relationship and find the best linear coefficients.
"""

import json
import math
import re

# ============================================================
# 1. Extract firepower from data.js
# ============================================================
with open("data.js", "r", encoding="utf-8") as f:
    data_js = f.read()

# Parse players from data.js
# Pattern: nick: "xxx", ... firepower: NN
data_firepowers = {}
pattern = re.compile(r"nick:\s*\"([^\"]+)\".*?firepower:\s*(\d+)", re.DOTALL)
for match in pattern.finditer(data_js):
    nick = match.group(1)
    fp = int(match.group(2))
    data_firepowers[nick] = fp

print(f"Found {len(data_firepowers)} players in data.js")
for nick, fp in sorted(data_firepowers.items(), key=lambda x: -x[1]):
    print(f"  {nick}: {fp}")

# ============================================================
# 2. Extract mapStats from player-map-stats.js
# ============================================================
with open("player-map-stats.js", "r", encoding="utf-8") as f:
    mapstats_js = f.read()

# Extract the PLAYER_MAP_STATS JSON object
start = mapstats_js.index("{")
# Find matching closing brace by counting
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
try:
    player_map_stats = json.loads(json_str)
except json.JSONDecodeError:
    # Try with a more lenient approach - extract each player block
    player_map_stats = {}
    # Find each player block
    blocks = re.findall(r'"([^"]+)":\s*\{[^}]+\}', mapstats_js[start:end])
    print("Could not parse full JSON, using regex extraction")

print(f"\nPlayers with mapStats: {len(player_map_stats)}")
for nick in sorted(player_map_stats.keys()):
    if nick in data_firepowers:
        print(f"  {nick}: data.js={data_firepowers[nick]}")

# ============================================================
# 3. Original normalization functions (from tournament-simulator.js)
# ============================================================
def normalize_rating_original(rating):
    """Original: (rating - 0.5) * 66.67"""
    return min(100, max(0, (rating - 0.5) * 66.67))

def normalize_impact_original(impact):
    """Original: (impact - 0.5) * 66.67"""
    return min(100, max(0, (impact - 0.5) * 66.67))

def normalize_adr_original(adr):
    """Original: ((adr - 40) / 60) * 100"""
    return min(100, max(0, ((adr - 40) / 60) * 100))

def normalize_kpr_original(kpr):
    """Original: ((kpr - 0.40) / 0.50) * 100"""
    return min(100, max(0, ((kpr - 0.40) / 0.50) * 100))

def normalize_exp_original(maps_played):
    """Original: (mapsPlayed / 25) * 100"""
    return min(100, (maps_played / 25) * 100)

def calculate_fp_original(map_stats_dict):
    """Original calculatePlayerFirepower from tournament-simulator.js"""
    # Filtra metadados como _synthetic
    map_keys = [k for k in map_stats_dict.keys() if not k.startswith("_")]
    if not map_keys:
        return None
    
    avg_rating = sum(map_stats_dict[k]["rating"] for k in map_keys) / len(map_keys)
    avg_impact = sum(map_stats_dict[k]["impact"] for k in map_keys) / len(map_keys)
    avg_adr = sum(map_stats_dict[k]["adr"] for k in map_keys) / len(map_keys)
    avg_kpr = sum(map_stats_dict[k]["kpr"] for k in map_keys) / len(map_keys)
    avg_maps = sum(map_stats_dict[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
    
    r = normalize_rating_original(avg_rating)
    i = normalize_impact_original(avg_impact)
    a = normalize_adr_original(avg_adr)
    k = normalize_kpr_original(avg_kpr)
    e = normalize_exp_original(avg_maps)
    
    fp = r * 0.35 + i * 0.25 + a * 0.15 + k * 0.15 + e * 0.10
    return fp, (avg_rating, avg_impact, avg_adr, avg_kpr, avg_maps, r, i, a, k, e)

# ============================================================
# 4. Find players that appear in both, and analyze
# ============================================================
print("\n" + "=" * 80)
print("ANALYSIS: data.js FP vs simulator FP (original calibration)")
print("=" * 80)
print(f"{'Player':<15} {'data.js':>8} {'sim(orig)':>10} {'Diff':>7} {'Rating':>8} {'Impact':>8} {'ADR':>6} {'KPR':>6} {'Maps':>6}")
print("-" * 80)

pairs = []
for nick in player_map_stats:
    if nick in data_firepowers:
        map_stats = player_map_stats[nick]
        # Pula jogadores com mapStats sintéticos
        if map_stats.get("_synthetic"):
            continue
        result = calculate_fp_original(map_stats)
        if result:
            fp_sim, (avg_r, avg_i, avg_a, avg_k, avg_m, nr, ni, na, nk, ne) = result
            fp_data = data_firepowers[nick]
            diff = fp_sim - fp_data
            pairs.append((nick, fp_data, fp_sim, avg_r, avg_i, avg_a, avg_k, avg_m))
            print(f"{nick:<15} {fp_data:>8} {fp_sim:>10.0f} {diff:>+7.0f} {avg_r:>8.3f} {avg_i:>8.3f} {avg_a:>6.1f} {avg_k:>6.3f} {avg_m:>6.1f}")

# ============================================================
# 5. Find optimal calibration
# We want: a * normalize(rating) + b * normalize(impact) + c * normalize(ADR) + d * normalize(KPR) + e * normalize(exp) ≈ dataFP
# 
# The issue is the normalization functions map to 0-100, so even ZywOo (rating 1.33)
# gets: (1.33-0.5)*66.67 = 55.3 for rating
#
# To reach FP ~90-100, we need the normalization to produce higher base values.
# 
# Strategy: Scale all normalization outputs by a factor, OR change the reference points.
# 
# The firepower in data.js seems to be roughly:
#   Top tier (ZywOo, donk): 99-100
#   Elite (NiKo, m0NESY): 95-96
#   Very good (ropz, flameZ, sh1ro): 90-93
#   Good (b1t, w0nderful): 87-88
#   Solid (XANTARES, KSCERATO): 89-92
#   Average (mezii, TeSeS): 78-83
#   IGLs (apEX, Aleksib, karrigan): 64-72
#   Young (kyousuke): 73
#
# Let's try scaling the normalization outputs and re-weighting.
# ============================================================

print("\n" + "=" * 80)
print("CALIBRATION: Finding best fit")
print("=" * 80)

# Try different calibration approaches
def try_calibration(name, norm_rating, norm_impact, norm_adr, norm_kpr, norm_exp, 
                    w_rating, w_impact, w_adr, w_kpr, w_exp):
    """Calculate FPs with given calibration and measure error"""
    errors = []
    results = []
    for nick, fp_data, _, avg_r, avg_i, avg_a, avg_k, avg_m in pairs:
        map_stats = player_map_stats[nick]
        map_keys = [k for k in map_stats.keys() if not k.startswith("_")]
        avg_rating = sum(map_stats[k]["rating"] for k in map_keys) / len(map_keys)
        avg_impact = sum(map_stats[k]["impact"] for k in map_keys) / len(map_keys)
        avg_adr = sum(map_stats[k]["adr"] for k in map_keys) / len(map_keys)
        avg_kpr = sum(map_stats[k]["kpr"] for k in map_keys) / len(map_keys)
        avg_maps = sum(map_stats[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
        
        nr = norm_rating(avg_rating)
        ni = norm_impact(avg_impact)
        na = norm_adr(avg_adr)
        nk = norm_kpr(avg_kpr)
        ne = norm_exp(avg_maps)
        
        fp_calc = nr * w_rating + ni * w_impact + na * w_adr + nk * w_kpr + ne * w_exp
        
        results.append((nick, fp_data, fp_calc, fp_calc - fp_data))
        errors.append(abs(fp_calc - fp_data))
    
    avg_error = sum(errors) / len(errors)
    max_error = max(errors)
    return results, avg_error, max_error

# Calibration A: Scale original normalizations by ~1.5x and adjust weights
def calib_A_rating(r): return min(100, (r - 0.5) * 100)  # Wider scale
def calib_A_impact(i): return min(100, (i - 0.5) * 100)
def calib_A_adr(a): return min(100, ((a - 40) / 55) * 100)  # 95 ADR -> 100
def calib_A_kpr(k): return min(100, ((k - 0.40) / 0.45) * 100)  # 0.85 -> 100
def calib_A_exp(e): return min(100, (e / 20) * 100)  # 20+ maps -> 100

results_a, err_a, max_a = try_calibration(
    "A (scaled)", calib_A_rating, calib_A_impact, calib_A_adr, calib_A_kpr, calib_A_exp,
    0.35, 0.25, 0.15, 0.15, 0.10
)
print(f"\nCalibration A - Avg error: {err_a:.1f}, Max error: {max_a:.1f}")
for nick, fp_d, fp_c, diff in results_a:
    print(f"  {nick:<15} data={fp_d:>3} calc={fp_c:>6.1f} diff={diff:>+6.1f}")

# Calibration B: Simpler - use direct multiplier based on rating
# FP ≈ (rating - 0.5) * 100 → this gives:
# ZywOo (1.33): 83, donk (1.35): 85, NiKo (1.29): 79, ropz (1.22): 72
# But data.js has ZywOo=99, donk=100, NiKo=96, ropz=91
# So we need an extra ~15-20 points from impact/ADR/KPR/exp
# And we need to scale up

# Calibration C: Best approach - use rating as primary driver but scale up
# Scale so that donk (avg rating ~1.33, impact ~1.52 etc) gets ~100
# Scale factor: 100 / 55 ≈ 1.82 for rating component alone isn't enough
# Need combined approach

# Let's do linear regression
print("\n" + "=" * 80)
print("LINEAR REGRESSION APPROACH")
print("=" * 80)
print("We'll find coefficients a,b,c,d,e,f where:")
print("FP = a*rating + b*impact + c*ADR + d*KPR + e*maps + f")
print()

# Build feature matrix
X = []
Y = []
for nick, fp_data, _, avg_r, avg_i, avg_a, avg_k, avg_m in pairs:
    X.append([avg_r, avg_i, avg_a, avg_k, avg_m])
    Y.append(fp_data)

# Simple linear regression using numpy-style math
n = len(X)
# Add intercept
X_with_bias = [[1.0] + row for row in X]

# Manual OLS: (X^T * X)^(-1) * X^T * Y
def transpose(M):
    return [[M[j][i] for j in range(len(M))] for i in range(len(M[0]))]

def matmul(A, B):
    result = [[sum(a * b for a, b in zip(A_row, B_col)) for B_col in transpose(B)] for A_row in A]
    return result

def inverse_2x2(M):
    """Only works for 2x2"""
    det = M[0][0] * M[1][1] - M[0][1] * M[1][0]
    return [[M[1][1]/det, -M[0][1]/det], [-M[1][0]/det, M[0][0]/det]]

def inverse_matrix(M):
    """Gaussian elimination for small matrices"""
    n = len(M)
    # Augment with identity
    aug = [row[:] + [1.0 if i == j else 0.0 for j in range(n)] for i, row in enumerate(M)]
    
    for col in range(n):
        # Find pivot
        pivot_row = max(range(col, n), key=lambda r: abs(aug[r][col]))
        if abs(aug[pivot_row][col]) < 1e-10:
            continue
        aug[col], aug[pivot_row] = aug[pivot_row], aug[col]
        
        pivot = aug[col][col]
        for j in range(2 * n):
            aug[col][j] /= pivot
        
        for row in range(n):
            if row != col:
                factor = aug[row][col]
                for j in range(2 * n):
                    aug[row][j] -= factor * aug[col][j]
    
    return [row[n:] for row in aug]

# X^T
Xt = transpose(X_with_bias)
# X^T * X
XtX = matmul(Xt, X_with_bias)
# X^T * Y
Y_col = [[y] for y in Y]
XtY = matmul(Xt, Y_col)
# (X^T X)^(-1) * (X^T Y)
XtX_inv = inverse_matrix(XtX)
coeffs = matmul(XtX_inv, XtY)
coeffs = [c[0] for c in coeffs]
intercept, c_rating, c_impact, c_adr, c_kpr, c_exp = coeffs

print(f"Regression coefficients:")
print(f"  intercept (bias): {intercept:.2f}")
print(f"  rating:  {c_rating:.2f}")
print(f"  impact:  {c_impact:.2f}")
print(f"  ADR:     {c_adr:.2f}")
print(f"  KPR:     {c_kpr:.2f}")
print(f"  maps:    {c_exp:.2f}")

# Calculate residuals
print(f"\n{'Player':<15} {'data.js':>8} {'predicted':>10} {'Diff':>7}")
print("-" * 45)
total_error = 0
for i, (nick, fp_data, _, _, _, _, _, _) in enumerate(pairs):
    pred = intercept + c_rating * X[i][0] + c_impact * X[i][1] + c_adr * X[i][2] + c_kpr * X[i][3] + c_exp * X[i][4]
    pred = max(0, min(100, pred))
    diff = pred - fp_data
    total_error += abs(diff)
    print(f"{nick:<15} {fp_data:>8} {pred:>10.1f} {diff:>+7.1f}")

avg_err_lr = total_error / len(pairs)
print(f"\n  Avg error: {avg_err_lr:.1f}")

# ============================================================
# 6. Alternative: Scale the existing normalization to match
# Since the original formula is already well-structured, let's just
# find the right scaling factors for each normalization function
# to make the outputs bigger (since data.js FPs are much higher)
# ============================================================

print("\n" + "=" * 80)
print("PRACTICAL CALIBRATION: Scale original normalizations with multipliers")
print("=" * 80)

def try_scale(scale_r, scale_i, scale_a, scale_k, scale_e, offset=0):
    """Scale each normalized component and test"""
    def norm_r(r): return scale_r * min(100, max(0, (r - 0.5) * 66.67))
    def norm_i(i): return scale_i * min(100, max(0, (i - 0.5) * 66.67))
    def norm_a(a): return scale_a * min(100, max(0, ((a - 40) / 60) * 100))
    def norm_k(k): return scale_k * min(100, max(0, ((k - 0.40) / 0.50) * 100))
    def norm_e(e): return scale_e * min(100, (e / 25) * 100)
    
    errors = []
    for nick, fp_data, _, _, _, _, _, _ in pairs:
        map_stats = player_map_stats[nick]
        map_keys = [k for k in map_stats.keys() if not k.startswith("_")]
        avg_r = sum(map_stats[k]["rating"] for k in map_keys) / len(map_keys)
        avg_i = sum(map_stats[k]["impact"] for k in map_keys) / len(map_keys)
        avg_a = sum(map_stats[k]["adr"] for k in map_keys) / len(map_keys)
        avg_k = sum(map_stats[k]["kpr"] for k in map_keys) / len(map_keys)
        avg_m = sum(map_stats[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
        
        fp = (norm_r(avg_r) * 0.35 + norm_i(avg_i) * 0.25 + 
              norm_a(avg_a) * 0.15 + norm_k(avg_k) * 0.15 + 
              norm_e(avg_m) * 0.10) + offset
        errors.append(abs(fp - fp_data))
    
    return sum(errors) / len(errors)

# Grid search for best scaling
best_err = float('inf')
best_scales = None
for sr in [x/10 for x in range(15, 25)]:  # 1.5 to 2.4
    for si in [x/10 for x in range(15, 25)]:
        for sa in [x/10 for x in range(10, 20)]:
            for sk in [x/10 for x in range(10, 20)]:
                for se in [x/10 for x in range(5, 15)]:
                    err = try_scale(sr, si, sa, sk, se)
                    if err < best_err:
                        best_err = err
                        best_scales = (sr, si, sa, sk, se)

print(f"Best scales: rating={best_scales[0]}, impact={best_scales[1]}, "
      f"ADR={best_scales[2]}, KPR={best_scales[3]}, exp={best_scales[4]}")
print(f"Best avg error: {best_err:.1f}")

# Show results with best scales
sr, si, sa, sk, se = best_scales
print(f"\nResults with best scaling:")
print(f"{'Player':<15} {'data.js':>8} {'calc':>8} {'Diff':>6}")
print("-" * 42)
for nick, fp_data, _, _, _, _, _, _ in pairs:
    map_stats = player_map_stats[nick]
    map_keys = [k for k in map_stats.keys() if not k.startswith("_")]
    avg_r = sum(map_stats[k]["rating"] for k in map_keys) / len(map_keys)
    avg_i = sum(map_stats[k]["impact"] for k in map_keys) / len(map_keys)
    avg_a = sum(map_stats[k]["adr"] for k in map_keys) / len(map_keys)
    avg_k = sum(map_stats[k]["kpr"] for k in map_keys) / len(map_keys)
    avg_m = sum(map_stats[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
    
    nr = sr * min(100, (avg_r - 0.5) * 66.67)
    ni = si * min(100, (avg_i - 0.5) * 66.67)
    na = sa * min(100, ((avg_a - 40) / 60) * 100)
    nk = sk * min(100, ((avg_k - 0.40) / 0.50) * 100)
    ne = se * min(100, (avg_m / 25) * 100)
    
    fp = nr * 0.35 + ni * 0.25 + na * 0.15 + nk * 0.15 + ne * 0.10
    print(f"{nick:<15} {fp_data:>8} {fp:>8.0f} {fp-fp_data:>+6.0f}")

# Also try with an added offset
best_err2 = float('inf')
best_config2 = None
for sr in [x/10 for x in range(14, 22)]:
    for si in [x/10 for x in range(14, 22)]:
        for sa in [x/10 for x in range(10, 18)]:
            for sk in [x/10 for x in range(10, 18)]:
                for se in [x/10 for x in range(5, 15)]:
                    for off in range(0, 20, 2):
                        def norm_r2(r): return sr * min(100, max(0, (r - 0.5) * 66.67))
                        def norm_i2(i): return si * min(100, max(0, (i - 0.5) * 66.67))
                        def norm_a2(a): return sa * min(100, max(0, ((a - 40) / 60) * 100))
                        def norm_k2(k): return sk * min(100, max(0, ((k - 0.40) / 0.50) * 100))
                        def norm_e2(e): return se * min(100, (e / 25) * 100)
                        
                        error_sum = 0
                        for nick, fp_data, _, _, _, _, _, _ in pairs:
                            map_stats = player_map_stats[nick]
                            map_keys = [k for k in map_stats.keys() if not k.startswith("_")]
                            avg_r = sum(map_stats[k]["rating"] for k in map_keys) / len(map_keys)
                            avg_i = sum(map_stats[k]["impact"] for k in map_keys) / len(map_keys)
                            avg_a = sum(map_stats[k]["adr"] for k in map_keys) / len(map_keys)
                            avg_k = sum(map_stats[k]["kpr"] for k in map_keys) / len(map_keys)
                            avg_m = sum(map_stats[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
                            
                            fp = (norm_r2(avg_r) * 0.35 + norm_i2(avg_i) * 0.25 + 
                                  norm_a2(avg_a) * 0.15 + norm_k2(avg_k) * 0.15 + 
                                  norm_e2(avg_m) * 0.10) + off
                            error_sum += abs(fp - fp_data)
                        
                        err = error_sum / len(pairs)
                        if err < best_err2:
                            best_err2 = err
                            best_config2 = (sr, si, sa, sk, se, off)

sr2, si2, sa2, sk2, se2, off2 = best_config2
print(f"\nBest with offset: scales=({sr2},{si2},{sa2},{sk2},{se2}), offset={off2}")
print(f"Avg error: {best_err2:.1f}")
for nick, fp_data, _, _, _, _, _, _ in pairs:
    map_stats = player_map_stats[nick]
    map_keys = [k for k in map_stats.keys() if not k.startswith("_")]
    avg_r = sum(map_stats[k]["rating"] for k in map_keys) / len(map_keys)
    avg_i = sum(map_stats[k]["impact"] for k in map_keys) / len(map_keys)
    avg_a = sum(map_stats[k]["adr"] for k in map_keys) / len(map_keys)
    avg_k = sum(map_stats[k]["kpr"] for k in map_keys) / len(map_keys)
    avg_m = sum(map_stats[k]["mapsPlayed"] for k in map_keys) / len(map_keys)
    
    nr = sr2 * min(100, (avg_r - 0.5) * 66.67)
    ni = si2 * min(100, (avg_i - 0.5) * 66.67)
    na = sa2 * min(100, ((avg_a - 40) / 60) * 100)
    nk = sk2 * min(100, ((avg_k - 0.40) / 0.50) * 100)
    ne = se2 * min(100, (avg_m / 25) * 100)
    
    fp = nr * 0.35 + ni * 0.25 + na * 0.15 + nk * 0.15 + ne * 0.10 + off2
    print(f"{nick:<15} {fp_data:>8} {fp:>8.0f} {fp-fp_data:>+6.0f}")

print(f"\nDone!")