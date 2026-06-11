/**
 * TOURNAMENT SIMULATOR v3.1 (SIMPLIFIED FIREPOWER-ONLY)
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * MODO TEMPORÁRIO: Simulação baseada APENAS em firepower dos jogadores.
 * 
 * Métrica atual:
 *   Firepower médio do time = (fp1 + fp2 + fp3 + fp4 + fp5) / 5  → 0-100
 *   Cada mapa é decidido comparando as médias de firepower + RNG.
 * 
 * As funções antigas (HLTV/mapStats/synergy/recentForm) estão COMENTADAS
 * para reativação futura quando tivermos dados completos dos 80 jogadores.
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────
// MAP POOL (2026 competitive pool - Train replaces Overpass)
// ─────────────────────────────────────────────────────────────────────────
const MAPS = ["Mirage", "Inferno", "Nuke", "Ancient", "Anubis", "Dust2", "Train"];

// ═══════════════════════════════════════════════════════════════════════════
// FUNÇÕES ATIVAS (VERSÃO SIMPLIFICADA - FIREPOWER ONLY)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calcula PlayerFirepower (0-100) - VERSÃO SIMPLIFICADA.
 * Usa diretamente o firepower do data.js.
 */
function calculatePlayerFirepower(player) {
  return player.firepower || 75;
}

/*
 * ─── VERSÃO ANTIGA (HLTV) COMENTADA ───
 * Aguardando dados completos dos 80 jogadores para reativar.
 *
 * function calculatePlayerFirepower(player) {
 *   if (!player.mapStats) return player.firepower || 75;
 *   if (player.mapStats._synthetic) return player.firepower || 75;
 *   const mapKeys = Object.keys(player.mapStats).filter(k => !k.startsWith("_"));
 *   if (mapKeys.length === 0) return player.firepower || 75;
 *   const avgRating = mapKeys.reduce((s, k) => s + player.mapStats[k].rating, 0) / mapKeys.length;
 *   const avgImpact = mapKeys.reduce((s, k) => s + player.mapStats[k].impact, 0) / mapKeys.length;
 *   const avgADR = mapKeys.reduce((s, k) => s + player.mapStats[k].adr, 0) / mapKeys.length;
 *   const avgKPR = mapKeys.reduce((s, k) => s + player.mapStats[k].kpr, 0) / mapKeys.length;
 *   const avgMapsPlayed = mapKeys.reduce((s, k) => s + player.mapStats[k].mapsPlayed, 0) / mapKeys.length;
 *   const firepower = -33.64 + (avgRating * 334.71) + (avgImpact * -128.39) + (avgADR * -1.91) + (avgKPR * 75.90) + (avgMapsPlayed * -1.65);
 *   return Math.round(Math.max(0, Math.min(100, firepower)));
 * }
 */

/**
 * Calcula a média de firepower do time (0-100).
 * Fórmula: (fp1 + fp2 + fp3 + fp4 + fp5) / 5
 * 
 * Dita se time vai vencer mapa 1, mapa 2 e se necessário mapa 3.
 * Time com maior média de firepower tem vantagem, mas com RNG.
 */
function calculateTeamFirepowerAvg(team) {
  if (!team.players || team.players.length === 0) return 50;
  const sum = team.players.reduce((s, p) => s + calculatePlayerFirepower(p), 0);
  return Math.round(sum / team.players.length);
}

/**
 * Simula resultado de UM mapa usando apenas firepower médio.
 * 
 * Lógica:
 * - Calcula média de firepower dos 2 times
 * - Diferença de firepower entra numa curva logística para gerar probabilidade
 * - Adiciona RNG (±15% de swing máximo)
 * - Retorna "A" ou "B"
 * 
 * @param {number} fpA - Firepower médio do time A (0-100)
 * @param {number} fpB - Firepower médio do time B (0-100)
 * @returns {"A" | "B"}
 */
function simulateMapResultSimple(fpA, fpB) {
  // Diferença normalizada: -100 a +100
  const diff = fpA - fpB;
  
  // Curva logística: converte diferença em probabilidade
  // Fator 15: diff de 15 = ~73% win chance; diff de 30 = ~88%; diff de 50 = ~97%
  const rawProb = 1 / (1 + Math.exp(-diff / 15));
  
  // Limitar entre 5% e 95% (sempre tem chance de upset)
  const probTeamA = Math.min(0.95, Math.max(0.05, rawProb));
  
  // Adicionar RNG (±10% absoluto)
  const rng = (Math.random() - 0.5) * 0.20; // ±10%
  const finalProb = Math.min(0.95, Math.max(0.05, probTeamA + rng));
  
  const roll = Math.random();
  return roll < finalProb ? "A" : "B";
}

/**
 * Simula série MD3 completa usando apenas firepower médio.
 * 
 * Fluxo:
 * 1. Calcula média de firepower de cada time = (fp1+fp2+fp3+fp4+fp5)/5
 * 2. Simula Mapa 1 → vencedor ganha 1 ponto
 * 3. Simula Mapa 2 → se mesmo vencedor, 2-0 (fim). Senão 1-1
 * 4. Se necessário, simula Mapa 3 (decider)
 * 
 * Os mapas são escolhidos aleatoriamente do pool (sem veto nesta versão).
 * 
 * @returns { winner, score, results, maps, firepowerA, firepowerB }
 */
function simulateMD3(teamA, teamB) {
  const fpA = calculateTeamFirepowerAvg(teamA);
  const fpB = calculateTeamFirepowerAvg(teamB);
  
  // Escolher mapas aleatórios do pool (sem veto nesta versão simplificada)
  const shuffled = [...MAPS].sort(() => Math.random() - 0.5);
  const seriesMaps = shuffled.slice(0, 3); // 3 mapas para MD3
  
  const results = [];
  let scoreA = 0, scoreB = 0;
  
  // Mapa 1
  const map1 = seriesMaps[0];
  const winner1 = simulateMapResultSimple(fpA, fpB);
  results.push({ map: map1, winner: winner1, firepowerA: fpA, firepowerB: fpB });
  if (winner1 === "A") scoreA++; else scoreB++;
  
  // Mapa 2
  if (scoreA < 2 && scoreB < 2) {
    const map2 = seriesMaps[1];
    const winner2 = simulateMapResultSimple(fpA, fpB);
    results.push({ map: map2, winner: winner2, firepowerA: fpA, firepowerB: fpB });
    if (winner2 === "A") scoreA++; else scoreB++;
  }
  
  // Mapa 3 (decider, se necessário)
  if (scoreA < 2 && scoreB < 2) {
    const map3 = seriesMaps[2];
    const winner3 = simulateMapResultSimple(fpA, fpB);
    results.push({ map: map3, winner: winner3, firepowerA: fpA, firepowerB: fpB });
    if (winner3 === "A") scoreA++; else scoreB++;
  }
  
  return {
    winner: scoreA > scoreB ? "A" : "B",
    score: [scoreA, scoreB],
    results,
    maps: seriesMaps.slice(0, results.length),
    firepowerA: fpA,
    firepowerB: fpB
  };
}

/**
 * Calcula o Power Score geral da equipe (0-100) para exibição.
 * Versão simplificada: usa apenas a média de firepower.
 */
function calculateTeamPowerScore(team) {
  return calculateTeamFirepowerAvg(team);
}

/*
 * ─── VERSÃO ANTIGA (HLTV) COMENTADA ───
 * function calculateTeamPowerScore(team, mapStrengths) {
 *   if (!mapStrengths) mapStrengths = calculateTeamAllMapStrengths(team);
 *   const values = Object.values(mapStrengths).sort((a, b) => b - a);
 *   const topMaps = values.slice(0, 4);
 *   const avgMapStrength = topMaps.reduce((a, b) => a + b, 0) / topMaps.length;
 *   let avgFirepower;
 *   if (team.players[0] && team.players[0].mapStats) {
 *     avgFirepower = team.players.reduce((s, p) => s + calculatePlayerFirepower(p), 0) / team.players.length;
 *   } else {
 *     avgFirepower = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
 *   }
 *   const synergyMod = calculateSynergyModifier(team);
 *   const baseScore = avgMapStrength * 0.55 + avgFirepower * 0.45;
 *   const finalScore = baseScore * (1 + synergyMod);
 *   return Math.round(Math.max(0, Math.min(100, finalScore)));
 * }
 */

// ═══════════════════════════════════════════════════════════════════════════
// FUNÇÕES COMENTADAS (HLTV/mapStats - aguardando dados completos)
// ═══════════════════════════════════════════════════════════════════════════

/*
 * Fluxo original completo (será reativado quando tivermos dados dos 80 jogadores):
 *
 * 1. PlayerFirepower = Rating×35% + Impact×25% + ADR×15% + KPR×15% + Experience×10%
 * 2. PlayerMapStrength = RatingMapa×40% + ImpactMapa×25% + ADRMapa×15% + KPRMapa×10% + Experience×10%
 * 3. TeamMapStrength = Média dos 5 PlayerMapStrength por mapa
 * 4. Role Synergy = Bônus/Penalidades baseado na composição (AWPer, IGL, Entry, Support, Rifler/Lurker)
 * 5. RecentForm = Winrate dos últimos jogos + força dos oponentes
 * 6. Consistency = Estabilidade baseada em ranking, experiência, tempo de lineup
 * 7. Veto → Mapas definidos → MapScore específico
 * 8. MapScore = TeamMapStrength×50% + Firepower×25% + RecentForm×15% + Synergy×10%
 * 9. FinalMapScore = MapScore + RandomVariance (baseado na Consistency)
 * 10. Win Probability = Função logística
 */

// --- FUNÇÕES DE NORMALIZAÇÃO (COMENTADAS) ---
/*
function normalizeRating(rating) {
  return Math.min(100, Math.max(0, (rating - 0.5) * 66.67));
}
function normalizeImpact(impact) {
  return Math.min(100, Math.max(0, (impact - 0.5) * 66.67));
}
function normalizeADR(adr) {
  return Math.min(100, Math.max(0, ((adr - 40) / 60) * 100));
}
function normalizeKPR(kpr) {
  return Math.min(100, Math.max(0, ((kpr - 0.40) / 0.50) * 100));
}
function normalizeExperience(mapsPlayed) {
  return Math.min(100, (mapsPlayed / 25) * 100);
}
*/

// --- PLAYER MAP STRENGTH (COMENTADO) ---
/*
function calculatePlayerMapStrength(player, mapName) {
  if (!player.mapStats || !player.mapStats[mapName]) return 50;
  const stats = player.mapStats[mapName];
  const ratingScore = normalizeRating(stats.rating);
  const impactScore = normalizeImpact(stats.impact);
  const adrScore = normalizeADR(stats.adr);
  const kprScore = normalizeKPR(stats.kpr);
  const experienceScore = normalizeExperience(stats.mapsPlayed);
  const mapStrength = ratingScore * 0.40 + impactScore * 0.25 + adrScore * 0.15 + kprScore * 0.10 + experienceScore * 0.10;
  return Math.round(Math.max(0, Math.min(100, mapStrength)));
}
*/

/**
 * Calcula "força em todos os mapas" - VERSÃO SIMPLIFICADA.
 * Retorna a média de firepower como placeholder para cada mapa,
 * mantendo compatibilidade com o index.html.
 */
function calculateTeamAllMapStrengths(team) {
  const avgFP = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
  const mapStrengths = {};
  MAPS.forEach(map => {
    mapStrengths[map] = Math.round(avgFP);
  });
  return mapStrengths;
}

// --- TEAM MAP STRENGTH (COMENTADO - versão antiga com HLTV) ---
/*
function calculateTeamMapStrength(team, mapName) {
  if (!team.players || team.players.length === 0) return 50;
  const strengths = team.players.map(p => calculatePlayerMapStrength(p, mapName));
  const avg = strengths.reduce((s, v) => s + v, 0) / strengths.length;
  return Math.round(avg);
}
*/

// --- ROLE SYNERGY (COMENTADO) ---
/*
function calculateSynergyModifier(team) {
  const roles = { awper: 0, igl: 0, entry: 0, support: 0, rifler: 0, lurker: 0 };
  team.players.forEach(player => {
    if (!player.roles) return;
    player.roles.forEach(role => {
      const key = role.toLowerCase();
      if (key in roles) roles[key]++;
    });
  });
  let modifier = 0;
  if (roles.awper > 1) modifier -= 0.15;
  if (roles.igl > 1) modifier -= 0.20;
  if (roles.lurker > 1) modifier -= 0.15;
  if (roles.entry > 2) modifier -= 0.10;
  if (roles.support > 2) modifier -= 0.10;
  if (roles.awper === 1 && roles.igl === 1 && roles.entry === 1 && roles.support === 1 && (roles.rifler + roles.lurker) >= 1) {
    modifier += 0.05;
  }
  return Math.max(-0.25, Math.min(0.10, modifier));
}
function synergyToScore(synergyMod) {
  return 50 + synergyMod * 50;
}
*/

// --- RECENT FORM (COMENTADO) ---
/*
function calculateRecentForm(team) {
  if (!team.players || team.players.length === 0) return 50;
  const avgFP = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
  const fpScore = Math.min(100, avgFP);
  const stageBonus = { Legends: 15, Challengers: 8, Contenders: 0 };
  const sBonus = stageBonus[team.stage] || 0;
  const draftedPenalty = team.id === "drafted-team" ? -10 : 0;
  const formScore = Math.max(20, Math.min(100, fpScore * 0.85 + sBonus + draftedPenalty));
  return Math.round(formScore);
}
*/

// --- CONSISTENCY RATING (COMENTADO) ---
/*
function calculateTeamConsistency(team) {
  if (!team.players || team.players.length === 0) return 50;
  const stageMap = { Legends: 88, Challengers: 75, Contenders: 60 };
  const stageConsistency = stageMap[team.stage] || (team.id === "drafted-team" ? 65 : 50);
  const firepowers = team.players.map(p => p.firepower || 75);
  const avgFP = firepowers.reduce((a, b) => a + b, 0) / firepowers.length;
  const fpVariance = Math.sqrt(firepowers.reduce((sum, fp) => sum + Math.pow(fp - avgFP, 2), 0) / firepowers.length);
  const fpConsistency = Math.max(0, 100 - fpVariance * 3);
  let expSum = 0, expCount = 0;
  team.players.forEach(p => {
    if (p.mapStats) {
      const mapKeys = Object.keys(p.mapStats).filter(k => !k.startsWith("_"));
      if (mapKeys.length > 0) {
        const totalMaps = mapKeys.reduce((s, k) => s + p.mapStats[k].mapsPlayed, 0);
        expSum += totalMaps / mapKeys.length;
        expCount++;
      }
    }
  });
  const avgExp = expCount > 0 ? expSum / expCount : 10;
  const expScore = Math.min(100, (avgExp / 25) * 100);
  const consistency = Math.round(stageConsistency * 0.45 + fpConsistency * 0.25 + expScore * 0.30);
  return Math.max(30, Math.min(100, consistency));
}
function applyRandomVariance(consistency) {
  const maxVariance = Math.max(4, 22 - consistency * 0.2);
  return (Math.random() * 2 - 1) * maxVariance;
}
*/

// --- MAP SCORE (COMENTADO) ---
/*
function calculateMapScore(team, mapName, mapStrength) {
  if (mapStrength === undefined) mapStrength = calculateTeamMapStrength(team, mapName);
  let avgFirepower;
  if (team.players[0] && team.players[0].mapStats) {
    avgFirepower = team.players.reduce((s, p) => s + calculatePlayerFirepower(p), 0) / team.players.length;
  } else {
    avgFirepower = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
  }
  const recentForm = calculateRecentForm(team);
  const synergyMod = calculateSynergyModifier(team);
  const synergyScore = synergyToScore(synergyMod);
  const mapScore = mapStrength * 0.50 + avgFirepower * 0.25 + recentForm * 0.15 + synergyScore * 0.10;
  return mapScore;
}
*/

// --- VETO SYSTEM (COMENTADO) ---
/*
function rankMapsByStrength(mapStrengths) {
  return Object.entries(mapStrengths).sort((a, b) => b[1] - a[1]).map(entry => entry[0]);
}
function simulateVetoBan(teamAStrengths, teamBStrengths) {
  const allMaps = Object.keys(teamAStrengths);
  let available = [...allMaps];
  const rankedA = rankMapsByStrength(teamAStrengths);
  const rankedB = rankMapsByStrength(teamBStrengths);
  const seriesMaps = [];
  const banA1 = rankedA[rankedA.length - 1];
  available = available.filter(m => m !== banA1);
  const advantageB1 = available.map(m => ({ map: m, advantage: teamAStrengths[m] - teamBStrengths[m] })).sort((a, b) => b.advantage - a.advantage);
  const banB1 = advantageB1[0].map;
  available = available.filter(m => m !== banB1);
  const pickA1 = rankedA.find(m => available.includes(m));
  seriesMaps.push(pickA1);
  available = available.filter(m => m !== pickA1);
  const pickB1 = rankedB.find(m => available.includes(m));
  seriesMaps.push(pickB1);
  available = available.filter(m => m !== pickB1);
  const advantageForB = available.map(m => ({ map: m, advantage: teamBStrengths[m] - teamAStrengths[m] })).sort((a, b) => b.advantage - a.advantage);
  const banA2 = advantageForB[0].map;
  available = available.filter(m => m !== banA2);
  const advantageForA = available.map(m => ({ map: m, advantage: teamAStrengths[m] - teamBStrengths[m] })).sort((a, b) => b.advantage - a.advantage);
  const banB2 = advantageForA[0].map;
  available = available.filter(m => m !== banB2);
  if (available.length > 0) seriesMaps.push(available[0]);
  return seriesMaps;
}
*/

// --- WIN PROBABILITY (COMENTADO) ---
/*
function calculateWinProbability(teamAScore, teamBScore) {
  const difference = teamAScore - teamBScore;
  let probability = 1 / (1 + Math.exp(-difference / 7.5));
  probability = Math.min(0.90, Math.max(0.10, probability));
  return { teamA: Math.round(probability * 100), teamB: Math.round((1 - probability) * 100) };
}
function simulateMapResult(mapScoreA, mapScoreB, consistencyA, consistencyB) {
  const varianceA = applyRandomVariance(consistencyA);
  const varianceB = applyRandomVariance(consistencyB);
  const finalA = mapScoreA + varianceA;
  const finalB = mapScoreB + varianceB;
  const prob = calculateWinProbability(finalA, finalB);
  const random = Math.random() * 100;
  return random < prob.teamA ? "A" : "B";
}
*/

// ═══════════════════════════════════════════════════════════════════════════
// SWISS SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

class SwissGroup {
  constructor(teams) {
    this.standings = teams.map(team => ({
      team,
      wins: 0,
      losses: 0,
      mapsWon: 0,
      mapsLost: 0,
      matchResults: [],
      opponentStrength: 0
    }));
  }

  getEligibleStandings() {
    return this.standings.filter(s => s.wins < 3 && s.losses < 3);
  }

  getNextRoundPairings() {
    const eligible = this.getEligibleStandings();
    if (eligible.length < 2) return [];

    let withBye = [...eligible];
    let byeTeam = null;

    if (withBye.length % 2 !== 0) {
      withBye.sort((a, b) => (b.wins - b.losses) - (a.wins - a.losses));
      byeTeam = withBye.pop();
    }

    const byRecord = {};
    withBye.forEach(s => {
      const rec = `${s.wins}-${s.losses}`;
      if (!byRecord[rec]) byRecord[rec] = [];
      byRecord[rec].push(s);
    });

    const pairings = [];
    const used = new Set();

    Object.values(byRecord).forEach(group => {
      for (let i = group.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [group[i], group[j]] = [group[j], group[i]];
      }
      for (let i = 0; i < group.length - 1; i += 2) {
        if (!used.has(group[i]) && !used.has(group[i + 1])) {
          pairings.push([group[i], group[i + 1]]);
          used.add(group[i]);
          used.add(group[i + 1]);
        }
      }
    });

    const remaining = withBye.filter(s => !used.has(s));
    for (let i = 0; i < remaining.length - 1; i += 2) {
      if (!used.has(remaining[i]) && !used.has(remaining[i + 1])) {
        pairings.push([remaining[i], remaining[i + 1]]);
        used.add(remaining[i]);
        used.add(remaining[i + 1]);
      }
    }

    const finalRemaining = withBye.filter(s => !used.has(s));
    const finalBye = finalRemaining.length > 0 ? finalRemaining[0] : byeTeam;

    return { pairings, byeTeam: finalBye };
  }

  async executeRound(roundNum) {
    const { pairings, byeTeam } = this.getNextRoundPairings();
    const results = [];

    if (byeTeam) {
      byeTeam.wins++;
      byeTeam.matchResults.push({ bye: true, round: roundNum });
    }

    for (const [s1, s2] of pairings) {
      const match = simulateMD3(s1.team, s2.team);
      results.push({ team1: s1, team2: s2, match, round: roundNum });

      if (match.winner === "A") {
        s1.wins++;
        s2.losses++;
      } else {
        s2.wins++;
        s1.losses++;
      }

      if (match.score[0] > match.score[1]) {
        s1.mapsWon += match.score[0];
        s1.mapsLost += match.score[1];
        s2.mapsWon += match.score[1];
        s2.mapsLost += match.score[0];
      } else {
        s1.mapsWon += match.score[0];
        s1.mapsLost += match.score[1];
        s2.mapsWon += match.score[1];
        s2.mapsLost += match.score[0];
      }

      s1.matchResults.push(match);
      s2.matchResults.push(match);
      
      s1.opponentStrength += s2.team.powerScore || 50;
      s2.opponentStrength += s1.team.powerScore || 50;
    }

    return results;
  }

  isFinished() {
    return this.getEligibleStandings().length < 2;
  }

  getStandings() {
    return [...this.standings].sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      if (a.losses !== b.losses) return a.losses - b.losses;
      const mapDiffA = a.mapsWon - a.mapsLost;
      const mapDiffB = b.mapsWon - b.mapsLost;
      if (mapDiffA !== mapDiffB) return mapDiffB - mapDiffA;
      if (a.opponentStrength !== b.opponentStrength) {
        return b.opponentStrength - a.opponentStrength;
      }
      return (b.team.powerScore || 50) - (a.team.powerScore || 50);
    });
  }

  getClassification() {
    const standings = this.getStandings();
    const classified = standings.filter(s => s.wins >= 3);
    const eliminated = standings.filter(s => s.losses >= 3);
    return { classified, eliminated, remaining: this.getEligibleStandings(), standings };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PLAYOFFS
// ═══════════════════════════════════════════════════════════════════════════

class PlayoffsBracket {
  constructor(seededTeams) {
    this.seededTeams = seededTeams;
    this.semifinals = [];
    this.finals = [];
    this.champion = null;
    this.runnerUp = null;
  }

  async executeQuarters() {
    const quarters = [
      [this.seededTeams[0], this.seededTeams[7]],
      [this.seededTeams[1], this.seededTeams[6]],
      [this.seededTeams[2], this.seededTeams[5]],
      [this.seededTeams[3], this.seededTeams[4]]
    ];

    const results = [];
    const winners = [];

    for (const [t1, t2] of quarters) {
      const match = simulateMD3(t1.team, t2.team);
      results.push({ team1: t1, team2: t2, match, stage: "Quarterfinals" });
      winners.push(match.winner === "A" ? t1 : t2);
    }

    this.semifinals = [
      [winners[0], winners[1]],
      [winners[2], winners[3]]
    ];

    return results;
  }

  async executeSemifinals() {
    const results = [];
    const winners = [];

    for (const [t1, t2] of this.semifinals) {
      const match = simulateMD3(t1.team, t2.team);
      results.push({ team1: t1, team2: t2, match, stage: "Semifinals" });
      winners.push(match.winner === "A" ? t1 : t2);
    }

    this.finals = winners;
    return results;
  }

  async executeFinal() {
    const [t1, t2] = this.finals;
    const match = simulateMD3(t1.team, t2.team);
    this.champion = match.winner === "A" ? t1 : t2;
    this.runnerUp = match.winner === "A" ? t2 : t1;
    return { team1: t1, team2: t2, match, stage: "Final" };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETE TOURNAMENT SIMULATION
// ═══════════════════════════════════════════════════════════════════════════

async function simulateCompleteTournament(teams) {
  const tournament = {
    swiss: null,
    playoffs: null,
    champion: null,
    results: {
      swissRounds: [],
      quarterResults: [],
      semifinalResults: [],
      finalResults: null
    }
  };

  // Calcular Power Scores (versão simplificada: firepower only)
  teams.forEach(team => {
    team.powerScore = calculateTeamPowerScore(team);
  });

  // Swiss phase
  const swiss = new SwissGroup(teams);
  let round = 1;
  while (!swiss.isFinished() && round <= 5) {
    tournament.results.swissRounds.push(swiss.executeRound(round));
    round++;
  }

  const { classified, standings } = swiss.getClassification();
  tournament.swiss = { standings, classified };

  // Playoffs (top 8)
  const seededTeams = classified.slice(0, 8).map(s => ({
    team: s.team,
    seed: classified.indexOf(s) + 1,
    standing: s
  }));

  const playoffs = new PlayoffsBracket(seededTeams);
  tournament.results.quarterResults = await playoffs.executeQuarters();
  tournament.results.semifinalResults = await playoffs.executeSemifinals();
  tournament.results.finalResults = playoffs.executeFinal();

  tournament.playoffs = playoffs;
  tournament.champion = playoffs.champion;

  return tournament;
}

// ═══════════════════════════════════════════════════════════════════════════
// MULTIPLE SIMULATIONS FOR STATISTICS
// ═══════════════════════════════════════════════════════════════════════════

async function runMultipleSimulations(teams, iterations = 100) {
  const stats = {};

  teams.forEach(team => {
    stats[team.id] = {
      name: team.name,
      playoffsQualified: 0,
      semiFinals: 0,
      finals: 0,
      champion: 0,
      times: 0
    };
  });

  for (let i = 0; i < iterations; i++) {
    const tournament = await simulateCompleteTournament([...teams]);

    tournament.swiss.standings.forEach((standing, idx) => {
      if (idx < 8) stats[standing.team.id].playoffsQualified++;
    });

    tournament.playoffs.semifinals.forEach(pair => {
      pair.forEach(seeded => stats[seeded.team.id].semiFinals++);
    });

    tournament.playoffs.finals.forEach(seeded => {
      stats[seeded.team.id].finals++;
    });

    if (tournament.champion) {
      stats[tournament.champion.team.id].champion++;
    }
  }

  Object.keys(stats).forEach(id => {
    stats[id].playoffsQualifiedPct = (stats[id].playoffsQualified / iterations * 100).toFixed(1);
    stats[id].semiFinalsPct = (stats[id].semiFinals / iterations * 100).toFixed(1);
    stats[id].finalsPct = (stats[id].finals / iterations * 100).toFixed(1);
    stats[id].championPct = (stats[id].champion / iterations * 100).toFixed(1);
  });

  return { stats, iterations };
}