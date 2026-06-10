/**
 * TOURNAMENT SIMULATOR v3.0
 * Sistema completo de simulação de CS2 com dados reais da HLTV
 * 
 * Fluxo completo:
 * 1. PlayerFirepower = Rating×35% + Impact×25% + ADR×15% + KPR×15% + Experience×10%
 * 2. PlayerMapStrength = RatingMapa×40% + ImpactMapa×25% + ADRMapa×15% + KPRMapa×10% + Experience×10%
 * 3. TeamMapStrength = Média dos 5 PlayerMapStrength por mapa
 * 4. Role Synergy = Bônus/Penalidades baseado na composição
 * 5. RecentForm = Winrate dos últimos jogos + força dos oponentes
 * 6. Consistency = Estabilidade baseada em ranking, experiência, tempo de lineup
 * 7. Veto → Mapas definidos → MapScore específico
 * 8. MapScore = TeamMapStrength×50% + Firepower×25% + RecentForm×15% + Synergy×10%
 * 9. FinalMapScore = MapScore + RandomVariance (baseado na Consistency)
 * 10. Win Probability = Função logística
 */

// ─────────────────────────────────────────────────────────────────────────
// MAP POOL (2026 competitive pool - Train replaces Overpass)
// ─────────────────────────────────────────────────────────────────────────
const MAPS = ["Mirage", "Inferno", "Nuke", "Ancient", "Anubis", "Dust2", "Train"];

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 1: PLAYER FIREPOWER
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula PlayerFirepower (0-100) baseado em dados reais.
 * Fórmula: Rating×35% + Impact×25% + ADR×15% + KPR×15% + Experience×10%
 * 
 * Experience considera: total de mapas jogados na carreira
 */
function calculatePlayerFirepower(player) {
  if (!player.mapStats) {
    return player.firepower || 75;
  }

  // Coletar stats médios do jogador
  const mapValues = Object.values(player.mapStats);
  if (mapValues.length === 0) return player.firepower || 75;

  const avgRating = mapValues.reduce((s, m) => s + m.rating, 0) / mapValues.length;
  const avgImpact = mapValues.reduce((s, m) => s + m.impact, 0) / mapValues.length;
  const avgADR = mapValues.reduce((s, m) => s + m.adr, 0) / mapValues.length;
  const avgKPR = mapValues.reduce((s, m) => s + m.kpr, 0) / mapValues.length;
  const avgMapsPlayed = mapValues.reduce((s, m) => s + m.mapsPlayed, 0) / mapValues.length;

  // Normalizar cada componente para 0-100
  const ratingScore = normalizeRating(avgRating);
  const impactScore = normalizeImpact(avgImpact);
  const adrScore = normalizeADR(avgADR);
  const kprScore = normalizeKPR(avgKPR);
  const experienceScore = normalizeExperience(avgMapsPlayed);

  // Fórmula do Firepower
  const firepower = 
    ratingScore * 0.35 +
    impactScore * 0.25 +
    adrScore * 0.15 +
    kprScore * 0.15 +
    experienceScore * 0.10;

  return Math.round(Math.max(0, Math.min(100, firepower)));
}

// ─────────────────────────────────────────────────────────────────────────
// FUNÇÕES DE NORMALIZAÇÃO
// ─────────────────────────────────────────────────────────────────────────

function normalizeRating(rating) {
  // Rating HLTV 2.1: típico 0.8 a 1.5, normalizar para 0-100
  // 0.8 = 20, 1.0 = 50, 1.2 = 70, 1.4 = 90
  return Math.min(100, Math.max(0, (rating - 0.5) * 66.67));
}

function normalizeImpact(impact) {
  // Impact HLTV: típico 0.8 a 1.6
  return Math.min(100, Math.max(0, (impact - 0.5) * 66.67));
}

function normalizeADR(adr) {
  // ADR: típico 60 a 100
  return Math.min(100, Math.max(0, ((adr - 40) / 60) * 100));
}

function normalizeKPR(kpr) {
  // KPR (Kills Per Round): típico 0.55 a 0.85
  return Math.min(100, Math.max(0, ((kpr - 0.40) / 0.50) * 100));
}

function normalizeExperience(mapsPlayed) {
  // Experience baseada em mapas jogados
  return Math.min(100, (mapsPlayed / 25) * 100);
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 2: PLAYER MAP STRENGTH
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula força individual em um mapa específico (0-100).
 * Fórmula: RatingMapa×40% + ImpactMapa×25% + ADRMapa×15% + KPRMapa×10% + Experience×10%
 */
function calculatePlayerMapStrength(player, mapName) {
  if (!player.mapStats || !player.mapStats[mapName]) {
    return 50; // neutro se não tiver dados
  }

  const stats = player.mapStats[mapName];
  
  const ratingScore = normalizeRating(stats.rating);
  const impactScore = normalizeImpact(stats.impact);
  const adrScore = normalizeADR(stats.adr);
  const kprScore = normalizeKPR(stats.kpr);
  const experienceScore = normalizeExperience(stats.mapsPlayed);

  const mapStrength = 
    ratingScore * 0.40 +
    impactScore * 0.25 +
    adrScore * 0.15 +
    kprScore * 0.10 +
    experienceScore * 0.10;

  return Math.round(Math.max(0, Math.min(100, mapStrength)));
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 3: TEAM MAP STRENGTH
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula a força da equipe em um mapa específico.
 * Média dos 5 jogadores.
 */
function calculateTeamMapStrength(team, mapName) {
  if (!team.players || team.players.length === 0) return 50;

  const strengths = team.players.map(p => calculatePlayerMapStrength(p, mapName));
  const avg = strengths.reduce((s, v) => s + v, 0) / strengths.length;
  return Math.round(avg);
}

/**
 * Calcula força em todos os mapas.
 */
function calculateTeamAllMapStrengths(team) {
  const mapStrengths = {};
  MAPS.forEach(map => {
    mapStrengths[map] = calculateTeamMapStrength(team, map);
  });
  return mapStrengths;
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 4: ROLE SYNERGY
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula modificador de sinergia baseado na composição de funções.
 * Composição ideal: 1 AWPer, 1 IGL, 1 Entry, 1 Support, 1 Rifler/Lurker
 * 
 * Penalidades:
 *   Mais de 1 AWPer: -15%
 *   Mais de 1 IGL: -20%
 *   Mais de 1 Lurker: -15%
 *   Mais de 2 Entrys: -10%
 *   Mais de 2 Supports: -10%
 * Bônus:
 *   Composição perfeitamente balanceada: +5%
 * 
 * Limite: -25% a +10%
 */
function calculateSynergyModifier(team) {
  const roles = {
    awper: 0,
    igl: 0,
    entry: 0,
    support: 0,
    rifler: 0,
    lurker: 0
  };

  team.players.forEach(player => {
    if (!player.roles) return;
    player.roles.forEach(role => {
      const key = role.toLowerCase();
      if (key in roles) roles[key]++;
    });
  });

  let modifier = 0;

  // Penalidades
  if (roles.awper > 1) modifier -= 0.15;
  if (roles.igl > 1) modifier -= 0.20;
  if (roles.lurker > 1) modifier -= 0.15;
  if (roles.entry > 2) modifier -= 0.10;
  if (roles.support > 2) modifier -= 0.10;

  // Bônus para composição perfeita: 1 de cada função principal
  if (roles.awper === 1 && roles.igl === 1 && roles.entry === 1 && 
      roles.support === 1 && (roles.rifler + roles.lurker) >= 1) {
    modifier += 0.05;
  }

  return Math.max(-0.25, Math.min(0.10, modifier));
}

/**
 * Converte synergy modifier (-0.25 a +0.10) para score 0-100.
 * -0.25 → 37.5, 0 → 50, +0.10 → 55
 */
function synergyToScore(synergyMod) {
  return 50 + synergyMod * 50;
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 5: RECENT FORM
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula RecentForm (0-100) baseado nos últimos resultados.
 * Como não temos resultados reais em tempo real, estimamos:
 * - PowerScore alto → forma positiva
 * - Estágio do time (Legends > Challengers > Contenders)
 * - Consistência do firepower entre os jogadores
 */
function calculateRecentForm(team) {
  if (!team.players || team.players.length === 0) return 50;

  // Firepower médio como proxy de forma recente
  const avgFP = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
  const fpScore = Math.min(100, avgFP);

  // Bônus por estágio
  const stageBonus = { Legends: 15, Challengers: 8, Contenders: 0 };
  const sBonus = stageBonus[team.stage] || 0;

  // Penalidade se for time draftado (sem histórico)
  const draftedPenalty = team.id === "drafted-team" ? -10 : 0;

  // FormScore = fpScore ajustado + stageBonus + penalty
  const formScore = Math.max(20, Math.min(100, fpScore * 0.85 + sBonus + draftedPenalty));
  return Math.round(formScore);
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 6: CONSISTENCY RATING
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula Consistency Rating (0-100).
 * Determina o quanto o RNG pode afetar o desempenho.
 * 
 * Fatores:
 * - Estágio do time e ranking (base)
 * - Tempo de lineup (simulado via estágio)
 * - Experiência média dos jogadores
 * - Consistência do firepower entre os jogadores
 * 
 * times top: 85-95, top 10: 75-90, tier 2: 60-80, tier 3: 40-70
 */
function calculateTeamConsistency(team) {
  if (!team.players || team.players.length === 0) return 50;

  // Base por estágio
  const stageMap = { Legends: 88, Challengers: 75, Contenders: 60 };
  const stageConsistency = stageMap[team.stage] || 
    (team.id === "drafted-team" ? 65 : 50);

  // Consistência de firepower entre os players
  const firepowers = team.players.map(p => p.firepower || 75);
  const avgFP = firepowers.reduce((a, b) => a + b, 0) / firepowers.length;
  const fpVariance = Math.sqrt(firepowers.reduce((sum, fp) => sum + Math.pow(fp - avgFP, 2), 0) / firepowers.length);
  // Quanto menor a variação, maior a consistência
  const fpConsistency = Math.max(0, 100 - fpVariance * 3);

  // Experiência média
  let expSum = 0, expCount = 0;
  team.players.forEach(p => {
    if (p.mapStats) {
      const maps = Object.values(p.mapStats);
      if (maps.length > 0) {
        expSum += maps.reduce((s, m) => s + m.mapsPlayed, 0) / maps.length;
        expCount++;
      }
    }
  });
  const avgExp = expCount > 0 ? expSum / expCount : 10;
  const expScore = Math.min(100, (avgExp / 25) * 100);

  // Combinar: stage 45% + fp consistency 25% + experience 30%
  const consistency = Math.round(
    stageConsistency * 0.45 +
    fpConsistency * 0.25 +
    expScore * 0.30
  );

  return Math.max(30, Math.min(100, consistency));
}

/**
 * Aplica variação aleatória baseada na consistência.
 * consistency 90 → ±4
 * consistency 80 → ±5
 * consistency 70 → ±6
 * consistency 60 → ±8
 * consistency 50 → ±10
 * consistency 40 → ±12
 * consistency 30 → ±14
 */
function applyRandomVariance(consistency) {
  const maxVariance = Math.max(4, 22 - consistency * 0.2);
  return (Math.random() * 2 - 1) * maxVariance;
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 7: MAP SCORE
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula o MapScore final para uma equipe em um mapa específico.
 * 
 * MapScore = TeamMapStrength×50% + Firepower médio×25% + RecentForm×15% + Synergy×10%
 * 
 * Este score é calculado APÓS o veto, apenas nos mapas selecionados.
 */
function calculateMapScore(team, mapName, mapStrength) {
  if (mapStrength === undefined) {
    mapStrength = calculateTeamMapStrength(team, mapName);
  }

  // Firepower médio (calculado dinamicamente se tiver mapStats)
  let avgFirepower;
  if (team.players[0] && team.players[0].mapStats) {
    avgFirepower = team.players.reduce((s, p) => s + calculatePlayerFirepower(p), 0) / team.players.length;
  } else {
    avgFirepower = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
  }

  // Recent Form
  const recentForm = calculateRecentForm(team);

  // Synergy (convertido para 0-100)
  const synergyMod = calculateSynergyModifier(team);
  const synergyScore = synergyToScore(synergyMod);

  // MapScore final
  const mapScore = 
    mapStrength * 0.50 +
    avgFirepower * 0.25 +
    recentForm * 0.15 +
    synergyScore * 0.10;

  return mapScore;
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 8: VETO SYSTEM
// ─────────────────────────────────────────────────────────────────────────

/**
 * Ordena mapas de mais forte a mais fraco.
 */
function rankMapsByStrength(mapStrengths) {
  return Object.entries(mapStrengths)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
}

/**
 * Simula o processo completo de veto e pick.
 * Fluxo: Ban, Ban, Pick, Pick, Ban, Ban, Decider
 * 
 * 1. Time A bane pior mapa
 * 2. Time B bane pior mapa  
 * 3. Time A pick melhor mapa → Mapa 1
 * 4. Time B pick melhor mapa → Mapa 2
 * 5. Time A bane o mapa mais favorável ao Time B
 * 6. Time B bane o mapa mais favorável ao Time A
 * 7. Decider: último mapa → Mapa 3
 * 
 * Retorna array com 3 mapas.
 */
function simulateVetoBan(teamAStrengths, teamBStrengths) {
  const allMaps = Object.keys(teamAStrengths);
  let available = [...allMaps];

  const rankedA = rankMapsByStrength(teamAStrengths);
  const rankedB = rankMapsByStrength(teamBStrengths);

  const seriesMaps = [];

  // Step 1: Team A bans weakest map
  const banA1 = rankedA[rankedA.length - 1];
  available = available.filter(m => m !== banA1);

  // Step 2: Team B bans weakest map (that Team A is good at)
  const advantageB1 = available.map(m => ({
    map: m,
    advantage: teamAStrengths[m] - teamBStrengths[m]
  })).sort((a, b) => b.advantage - a.advantage);
  const banB1 = advantageB1[0].map;
  available = available.filter(m => m !== banB1);

  // Step 3: Team A picks best map → Map 1
  const pickA1 = rankedA.find(m => available.includes(m));
  seriesMaps.push(pickA1);
  available = available.filter(m => m !== pickA1);

  // Step 4: Team B picks best map → Map 2
  const pickB1 = rankedB.find(m => available.includes(m));
  seriesMaps.push(pickB1);
  available = available.filter(m => m !== pickB1);

  // Step 5: Team A bans map most favorable to Team B
  const advantageForB = available.map(m => ({
    map: m,
    advantage: teamBStrengths[m] - teamAStrengths[m]
  })).sort((a, b) => b.advantage - a.advantage);
  const banA2 = advantageForB[0].map;
  available = available.filter(m => m !== banA2);

  // Step 6: Team B bans map most favorable to Team A
  const advantageForA = available.map(m => ({
    map: m,
    advantage: teamAStrengths[m] - teamBStrengths[m]
  })).sort((a, b) => b.advantage - a.advantage);
  const banB2 = advantageForA[0].map;
  available = available.filter(m => m !== banB2);

  // Step 7: Decider = last map → Map 3
  if (available.length > 0) {
    seriesMaps.push(available[0]);
  }

  return seriesMaps;
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 9 & 10: WIN PROBABILITY (Função Logística)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Converte diferença de FinalMapScore em probabilidade usando função logística.
 * 
 * Diferença 0: 50%
 * Diferença 5: ~60%
 * Diferença 10: ~70%
 * Diferença 15: ~80%
 * Diferença 20: ~90%
 * 
 * Limites: mínimo 10%, máximo 90%
 */
function calculateWinProbability(teamAScore, teamBScore) {
  const difference = teamAScore - teamBScore;
  
  // Curva logística com fator 7.5
  let probability = 1 / (1 + Math.exp(-difference / 7.5));
  
  // Limitar entre 10% e 90%
  probability = Math.min(0.90, Math.max(0.10, probability));
  
  return {
    teamA: Math.round(probability * 100),
    teamB: Math.round((1 - probability) * 100)
  };
}

/**
 * Simula resultado de um mapa.
 * Aplica RandomVariance baseado na consistência de cada equipe,
 * depois compara os FinalMapScores.
 */
function simulateMapResult(mapScoreA, mapScoreB, consistencyA, consistencyB) {
  const varianceA = applyRandomVariance(consistencyA);
  const varianceB = applyRandomVariance(consistencyB);
  
  const finalA = mapScoreA + varianceA;
  const finalB = mapScoreB + varianceB;
  
  // Probabilidade usando a diferença dos scores finais
  const prob = calculateWinProbability(finalA, finalB);
  const random = Math.random() * 100;
  
  return random < prob.teamA ? "A" : "B";
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 11: MD3 SIMULATION
// ─────────────────────────────────────────────────────────────────────────

/**
 * Simula série MD3 completa.
 * 
 * Fluxo:
 * 1. Calcular map strengths para veto
 * 2. Executar veto para definir os mapas
 * 3. Para cada mapa: calcular MapScore específico
 * 4. Simular cada mapa com variação controlada
 * 
 * Retorna: { winner, score, results, maps, consistencyA, consistencyB }
 */
function simulateMD3(teamA, teamB) {
  // Calcular forças em todos os mapas para o veto
  const mapStrengthsA = calculateTeamAllMapStrengths(teamA);
  const mapStrengthsB = calculateTeamAllMapStrengths(teamB);

  // Executar veto → define os 3 mapas da série
  const seriesMaps = simulateVetoBan(mapStrengthsA, mapStrengthsB);

  // Calcular consistência de cada equipe
  const consistencyA = calculateTeamConsistency(teamA);
  const consistencyB = calculateTeamConsistency(teamB);

  const results = [];
  let scoreA = 0, scoreB = 0;

  // Simular cada mapa individualmente
  for (let i = 0; i < seriesMaps.length && scoreA < 2 && scoreB < 2; i++) {
    const map = seriesMaps[i];
    
    // Força específica no mapa selecionado
    const mapStrA = mapStrengthsA[map];
    const mapStrB = mapStrengthsB[map];
    
    // MapScore com a fórmula completa
    const mapScoreA = calculateMapScore(teamA, map, mapStrA);
    const mapScoreB = calculateMapScore(teamB, map, mapStrB);

    // Simular com variação controlada
    const winner = simulateMapResult(mapScoreA, mapScoreB, consistencyA, consistencyB);
    results.push({ 
      map, 
      winner, 
      scoreA: Math.round(mapScoreA * 10) / 10, 
      scoreB: Math.round(mapScoreB * 10) / 10
    });

    if (winner === "A") scoreA++;
    else scoreB++;
  }

  return {
    winner: scoreA > scoreB ? "A" : "B",
    score: [scoreA, scoreB],
    results,
    maps: seriesMaps.slice(0, results.length),
    consistencyA,
    consistencyB
  };
}

// ─────────────────────────────────────────────────────────────────────────
// TEAM POWER SCORE (Força geral para exibição)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Calcula o Power Score geral da equipe (0-100) para exibição.
 * Usa o Top 4 mapas (os melhores) em vez da média dos 7,
 * pois reflete melhor a força real já que mapas fracos são banidos.
 */
function calculateTeamPowerScore(team, mapStrengths) {
  if (!mapStrengths) {
    mapStrengths = calculateTeamAllMapStrengths(team);
  }

  // Top 4 mapas
  const values = Object.values(mapStrengths).sort((a, b) => b - a);
  const topMaps = values.slice(0, 4);
  const avgMapStrength = topMaps.reduce((a, b) => a + b, 0) / topMaps.length;

  // Firepower médio (dinâmico se possível)
  let avgFirepower;
  if (team.players[0] && team.players[0].mapStats) {
    avgFirepower = team.players.reduce((s, p) => s + calculatePlayerFirepower(p), 0) / team.players.length;
  } else {
    avgFirepower = team.players.reduce((s, p) => s + (p.firepower || 75), 0) / team.players.length;
  }

  const synergyMod = calculateSynergyModifier(team);
  const baseScore = avgMapStrength * 0.55 + avgFirepower * 0.45;
  const finalScore = baseScore * (1 + synergyMod);

  return Math.round(Math.max(0, Math.min(100, finalScore)));
}

// ─────────────────────────────────────────────────────────────────────────
// ETAPA 12: SWISS SYSTEM
// ─────────────────────────────────────────────────────────────────────────

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

    // Se número ímpar, time com pior record fica de bye
    if (withBye.length % 2 !== 0) {
      withBye.sort((a, b) => (b.wins - b.losses) - (a.wins - a.losses));
      byeTeam = withBye.pop();
    }

    // Agrupar por record
    const byRecord = {};
    withBye.forEach(s => {
      const rec = `${s.wins}-${s.losses}`;
      if (!byRecord[rec]) byRecord[rec] = [];
      byRecord[rec].push(s);
    });

    const pairings = [];
    const used = new Set();

    Object.values(byRecord).forEach(group => {
      // Embaralhar
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

    // Parear times restantes de grupos diferentes
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

      // Track map scores
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
      // 1. Wins
      if (a.wins !== b.wins) return b.wins - a.wins;
      // 2. Losses (menos losses = melhor)
      if (a.losses !== b.losses) return a.losses - b.losses;
      // 3. Map difference
      const mapDiffA = a.mapsWon - a.mapsLost;
      const mapDiffB = b.mapsWon - b.mapsLost;
      if (mapDiffA !== mapDiffB) return mapDiffB - mapDiffA;
      // 4. Strength of Schedule
      if (a.opponentStrength !== b.opponentStrength) {
        return b.opponentStrength - a.opponentStrength;
      }
      // 5. Power Score
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

// ─────────────────────────────────────────────────────────────────────────
// PLAYOFFS
// ─────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────
// COMPLETE TOURNAMENT SIMULATION
// ─────────────────────────────────────────────────────────────────────────

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

  // Calcular Power Scores
  teams.forEach(team => {
    const mapStrengths = calculateTeamAllMapStrengths(team);
    team.mapStrengths = mapStrengths;
    team.powerScore = calculateTeamPowerScore(team, mapStrengths);
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

// ─────────────────────────────────────────────────────────────────────────
// MULTIPLE SIMULATIONS FOR STATISTICS
// ─────────────────────────────────────────────────────────────────────────

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