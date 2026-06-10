# 🎲 GUIA DE USO - TOURNAMENT SIMULATOR

## ✅ Implementação Completa

### Arquivos Criados/Modificados
1. **tournament-simulator.js** - Motor de simulação (~540 linhas)
2. **player-map-stats.js** - Dados de exemplo + geração automática
3. **index.html** - UI integrada para simular campeonatos
4. **TOURNAMENT_SIMULATOR_README.md** - Documentação técnica

---

## 🚀 Como Usar (Na Prática)

### Passo 1: Montar uma Equipe
1. Clique em "SPIN ◈" para sortear um time
2. Selecione um jogador
3. Repita 5 vezes até completar sua equipe

### Passo 2: Simular Campeonato
Após montar sua equipe:

1. **Clique em "🎲 Abrir Simulador de Campeonato"**
   - Seção aparece acima da tela de draft

2. **Escolha uma simulação:**
   
   **Opção A: Simular Uma Vez**
   - Clique em "🎲 Simular Campeonato"
   - Vê exatamente o que aconteceria em 1 torneio
   - Mostra: Campeão, semifinalistas, top 8

   **Opção B: 1000 Simulações**
   - Clique em "🔁 1000 Simulações"
   - Vê probabilidades de cada time
   - Formato: Playoffs % | Semifinal % | Final % | Campeão %

### Passo 3: Interpretar Resultados

**Exemplo de Resultado Único:**
```
🏆 Campeão: Team Vitality
Seed #2 · Record: 3-0

Semifinalistas
- Natus Vincere
- FUT Esports

Fase Swiss - Top 8
1. Team Vitality: 3-0 (Power: 89)
2. FUR Esports: 3-0 (Power: 76)
...
```

**Exemplo de Probabilidades (1000x):**
```
Time                 | Playoffs | Semifinal | Final | Campeão
Team Vitality       | 99.2%    | 87.5%     | 62.1% | 38.4%
Sua Equipe          | 41.3%    | 18.7%     | 8.2%  | 2.1%
Natus Vincere       | 95.6%    | 79.2%     | 51.8% | 31.5%
...
```

---

## 📊 O Que Está Sendo Simulado

### 1. **Força Individual de Cada Jogador**
Por cada mapa, baseado em:
- Rating (40%)
- Impact (30%)
- ADR (20%)
- Experiência (10%)

Exemplo:
```
ZywOo em Mirage: 89/100
- Rating: 1.40 (excelente)
- Impact: 1.50 (muito acima da média)
- ADR: 92 (dano consistente)
- Mapas jogados: 18 (experiência)
```

### 2. **Força da Equipe em Cada Mapa**
Média dos 5 jogadores

Exemplo:
```
Team Vitality em Mirage:
(89 + 84 + 86 + 78 + 82) / 5 = 84/100
```

### 3. **Modificador de Sinergia**
Bônus/penalidades por composição

Exemplo:
```
1 AWPer (m0NESY): +3%
1 IGL (apEX): +2%
Sem penalidades
Total: +5% de bônus na força
```

### 4. **Veto Estratégico Realista**
Simula exatamente como times reais escolhem/banem mapas

Exemplo:
```
Team A escolhe Mirage (seu melhor)
↓
Team B bane Inferno (muito forte para A)
↓
Team B escolhe Dust2 (seu melhor restante)
↓
Team A bane Nuke (forte para B)
↓
Decider = Anubis (último mapa)
```

### 5. **Probabilidade por Mapa**
Baseada na diferença de força

Exemplo:
```
Team Vitality (84) vs Sua Equipe (76)
Diferença: 8 pontos
Probabilidade: ~61% x 39%
→ Vitality é favorita mas Sua Equipe tem chance
```

### 6. **Sistema Swiss**
16 equipes, 3 rodadas

Rodada 1: Todos 0-0 (emparelhamento aleatório)
Rodada 2: 1-0 vs 1-0, 0-1 vs 0-1 (mesmo record)
Rodada 3: 2-0 vs 2-0, 1-1 vs 1-1, 0-2 vs 0-2

Resultado:
- ✅ 3 vitórias = Playoffs
- ❌ 3 derrotas = Eliminado
- ➡️ <3W e <3L = Depende de tiebreaker

### 7. **Playoffs**
Quartas de Final: 1v8, 2v7, 3v6, 4v5
Semifinais: Vencedores
Final: MD3 para decidir campeão

---

## 🔧 Próximas Tarefas

### Priority 1: Dados Reais
**Arquivo: fetch_players.py**
- Coletar estatísticas reais da HLTV para 2026
- Atualizar player-map-stats.js com dados verdadeiros
- Validar contra histórico de resultados

### Priority 2: Calibração
- Ajustar tabela de probabilidades
- Validar contra resultados reais
- Fine-tune pesos de sinergia

### Priority 3: Features Avançadas
- [ ] Salvar histórico de simulações
- [ ] Comparar duas equipes lado a lado
- [ ] Ver força detalhada por mapa
- [ ] Export de resultados (PDF/CSV)
- [ ] Mobile responsiveness

---

## 🧪 Testes Rápidos

### Teste 1: Verificar se dados foram injetados
Abra o Console (F12) e execute:
```javascript
console.log(TEAMS[0].players[0].mapStats);
// Deve mostrar { Mirage: {...}, Inferno: {...}, ... }
```

### Teste 2: Calcular força de um jogador
```javascript
const player = TEAMS[0].players[0]; // ZywOo
const strength = calculatePlayerMapStrength(player, "Mirage");
console.log(strength); // Deve mostrar 85-95
```

### Teste 3: Força da equipe
```javascript
const team = TEAMS[0];
const mapStrengths = calculateTeamAllMapStrengths(team);
console.log(mapStrengths);
// { Mirage: 87, Inferno: 83, Nuke: 80, ... }
```

### Teste 4: Team Power Score
```javascript
const powerScore = calculateTeamPowerScore(team, mapStrengths);
console.log(powerScore); // Deve mostrar 0-100
```

---

## 📈 Fluxo Visual na UI

```
┌─ CS2 Major Draft ─────────────────────┐
│                                        │
│  [🎲 Abrir Simulador de Campeonato]   │ ← NOVO!
│                                        │
├─ Tournament Simulator ─────────────────┤
│                                        │
│  [🎲 Simular Campeonato]              │
│  [🔁 1000 Simulações]                 │
│                                        │
│  Resultados:                          │
│  🏆 Campeão: Team X                   │
│  Semifinalistas: Team Y, Team Z       │
│  Top 8 Standings...                   │
│                                        │
├─ Draft Section ───────────────────────┤
│                                        │
│  Pick 1 of 5  [SPIN ◈]  [↺ Reroll]   │
│                                        │
│  [Equipes com Firepower]              │
│                                        │
│  ┌─ Sua Equipe ────────────────────┐  │
│  │ [Firepower médio: 82]           │  │
│  │ [Card 1] [Card 2] [Card 3] ...  │  │
│  │ [RESULT MODAL]                  │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 💡 Dicas

1. **Composição Importa**: 1 AWPer + 1 IGL dá +5%, mas 2 AWPers dá -5%
2. **Experimento**: Monte diferentes composições e veja como muda a probabilidade
3. **Dados Crescem**: Enquanto os dados de HLTV forem coletados, precisão melhora
4. **Seed Importa**: Equipes #1 tem mais chance de ganhar que #8
5. **Variância é Real**: 1000 simulações mostram a realidade—uma não significa nada

---

## 🐛 Se Algo Não Funcionar

1. **Checar Console (F12)**
   - Abra DevTools → Console
   - Procure por erros em vermelho

2. **Verificar se mapStats foram injetados**
   ```javascript
   Object.keys(TEAMS[0].players[0]).includes('mapStats')
   // Deve retornar: true
   ```

3. **Verificar se scripts carregaram**
   ```javascript
   typeof tournament-simulator !== 'undefined'
   // Deve retornar: true
   ```

---

**Sistema pronto para uso! 🚀**
