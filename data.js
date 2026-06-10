const TEAMS = [
  {
    id: "vitality",
    name: "Team Vitality",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/e/e4/Team_Vitality_2023_lightmode.png/143px-Team_Vitality_2023_lightmode.png",
    players: [
      { nick: "apEX", name: "Dan Madesclaire", roles: ["IGL"], firepower: 72, liquipedia: "ApEX", photo: "https://liquipedia.net/commons/images/thumb/b/b7/ApEX_at_BLAST_Open_Spring_2026.jpg/600px-ApEX_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "ZywOo", name: "Mathieu Herbaut", roles: ["AWPer", "Rifler"], firepower: 99, liquipedia: "ZywOo", photo: "https://liquipedia.net/commons/images/thumb/2/2b/ZywOo_at_BLAST_Bounty_Winter_2026.jpg/600px-ZywOo_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "flameZ", name: "Shahar Shushan", roles: ["Entry"], firepower: 90, liquipedia: "FlameZ", photo: "https://liquipedia.net/commons/images/thumb/2/29/FlameZ_at_BLAST_Open_Spring_2026.jpg/600px-FlameZ_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "mezii", name: "William Merriman", roles: ["Rifler"], firepower: 78, liquipedia: "Mezii", photo: "https://liquipedia.net/commons/images/thumb/c/ca/Mezii_at_BLAST_Open_Spring_2026.jpg/600px-Mezii_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "ropz", name: "Robin Kool", roles: ["Lurker"], firepower: 91, liquipedia: "Ropz", photo: "https://liquipedia.net/commons/images/thumb/f/f4/Ropz_at_BLAST_Open_Spring_2026.jpg/600px-Ropz_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "navi",
    name: "Natus Vincere",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/3/3f/Natus_Vincere_2021_lightmode.png/190px-Natus_Vincere_2021_lightmode.png",
    players: [
      { nick: "b1t", name: "Valerii Yevheniiovych Vakhovskyi", roles: ["Support"], firepower: 88, liquipedia: "B1t", photo: "https://liquipedia.net/commons/images/thumb/2/2e/B1t_at_BLAST_Open_Spring_2026.jpg/600px-B1t_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Aleksib", name: "Aleksi Antti Kaarlo Virolainen", roles: ["IGL"], firepower: 65, liquipedia: "Aleksib", photo: "https://liquipedia.net/commons/images/thumb/2/26/Aleksib_at_BLAST_Open_Spring_2026.jpg/600px-Aleksib_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "iM", name: "Mihai Ivan", roles: ["Rifler"], firepower: 80, liquipedia: "IM", photo: "https://liquipedia.net/commons/images/thumb/8/8b/IM_at_BLAST_Open_Spring_2026.jpg/600px-IM_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "w0nderful", name: "Ihor Zhdanov", roles: ["AWPer"], firepower: 87, liquipedia: "W0nderful", photo: "https://liquipedia.net/commons/images/thumb/9/9e/W0nderful_at_BLAST_Open_Spring_2026.jpg/600px-W0nderful_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "makazze", name: "Drin Shaqiri", roles: ["Rifler"], firepower: 70, liquipedia: "Makazze", photo: "https://liquipedia.net/commons/images/thumb/7/7b/Makazze_at_BLAST_Open_Spring_2026.jpg/600px-Makazze_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "falcons",
    name: "Team Falcons",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/8/83/Team_Falcons_2022_allmode.png/144px-Team_Falcons_2022_allmode.png",
    players: [
      { nick: "NiKo", name: "Nikola Kovač", roles: ["Rifler"], firepower: 96, liquipedia: "NiKo", photo: "https://liquipedia.net/commons/images/thumb/1/19/NiKo_at_BLAST_Open_Spring_2026.jpg/600px-NiKo_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "TeSeS", name: "René Stensig Madsen", roles: ["Entry"], firepower: 83, liquipedia: "TeSeS", photo: "https://liquipedia.net/commons/images/thumb/f/fe/TeSeS_at_BLAST_Open_Spring_2026.jpg/600px-TeSeS_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "m0NESY", name: "Ilya Osipov", roles: ["AWPer"], firepower: 95, liquipedia: "M0NESY", photo: "https://liquipedia.net/commons/images/thumb/8/81/M0NESY_at_BLAST_Bounty_Winter_2026.jpg/600px-M0NESY_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "kyousuke", name: "Maksim Lukin", roles: ["Support"], firepower: 73, liquipedia: "Kyousuke", photo: "https://liquipedia.net/commons/images/thumb/6/6d/Kyousuke_at_BLAST_Open_Spring_2026.jpg/600px-Kyousuke_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "karrigan", name: "Finn Andersen", roles: ["IGL"], firepower: 64, liquipedia: "Karrigan", photo: "https://liquipedia.net/commons/images/thumb/e/e7/Karrigan_at_PGL_Astana_2026.jpg/600px-Karrigan_at_PGL_Astana_2026.jpg" },
    ]
  },
  {
    id: "mongolz",
    name: "The MongolZ",
    stage: "Legends",
    region: "Asia",
    logo: "https://liquipedia.net/commons/images/thumb/2/2b/The_MongolZ_2024_03_allmode.png/135px-The_MongolZ_2024_03_allmode.png",
    players: [
      { nick: "bLitz", name: "Garidmagnai Byambasuren", roles: ["IGL", "Rifler"], firepower: 84, liquipedia: "BLitz", photo: "https://liquipedia.net/commons/images/thumb/9/96/BLitz_at_BLAST_Open_Spring_2026.jpg/600px-BLitz_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Techno4K", name: "Sodbayar Munkhbold", roles: ["Rifler"], firepower: 80, liquipedia: "Techno4K", photo: "https://liquipedia.net/commons/images/thumb/d/d9/Techno4K_at_BLAST_Open_Spring_2026.jpg/600px-Techno4K_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "910", name: "Usukhbayar Banzragch", roles: ["AWPer"], firepower: 86, liquipedia: "910", photo: "https://liquipedia.net/commons/images/thumb/7/7d/910_at_BLAST_Open_Spring_2026.jpg/600px-910_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "mzinho", name: "Ayush Batbold", roles: ["Rifler"], firepower: 70, liquipedia: "Mzinho", photo: "https://liquipedia.net/commons/images/thumb/b/bc/Mzinho_at_BLAST_Open_Spring_2026.jpg/600px-Mzinho_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "cobrazera", name: "Anarbileg Uuganbayar", roles: ["Rifler"], firepower: 74, liquipedia: "Cobrazera", photo: "https://liquipedia.net/commons/images/thumb/6/67/Cobrazera_at_BLAST_Open_Spring_2026.jpg/600px-Cobrazera_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "parivision",
    name: "PARIVISION",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/9/9d/PARIVISION_allmode.png/190px-PARIVISION_allmode.png",
    players: [
      { nick: "BELCHONOKK", name: "Andrey Yasinskiy", roles: ["Rifler"], firepower: 82, liquipedia: "BELCHONOKK", photo: "https://liquipedia.net/commons/images/thumb/f/f6/BELCHONOKK_at_StarLadder_StarSeries_Fall_2025.jpg/600px-BELCHONOKK_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "Jame", name: "Dzhami Ali", roles: ["IGL", "AWPer"], firepower: 84, liquipedia: "Jame", photo: "https://liquipedia.net/commons/images/thumb/c/c5/Jame_at_StarLadder_StarSeries_Fall_2025.jpg/600px-Jame_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "nota", name: "Emil Moskvitin", roles: ["Rifler"], firepower: 76, liquipedia: "Nota", photo: "https://liquipedia.net/commons/images/thumb/c/ca/Nota_at_StarLadder_StarSeries_Fall_2025.jpg/600px-Nota_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "xiELO", name: "Vladislav Lysov", roles: ["Rifler"], firepower: 74, liquipedia: "XiELO", photo: "https://liquipedia.net/commons/images/thumb/9/90/XiELO_at_StarLadder_StarSeries_Fall_2025.jpg/600px-XiELO_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "zweih", name: "Ivan Gogin", roles: ["Rifler"], firepower: 69, liquipedia: "Zweih", photo: "https://liquipedia.net/commons/images/thumb/9/95/Zweih_at_BLAST_Bounty_Winter_2026.jpg/600px-Zweih_at_BLAST_Bounty_Winter_2026.jpg" },
    ]
  },
  {
    id: "aurora",
    name: "Aurora Gaming",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/1/1c/Aurora_Gaming_2025_allmode.png/174px-Aurora_Gaming_2025_allmode.png",
    players: [
      { nick: "XANTARES", name: "İsmailсan Dörtkardeş", roles: ["Entry"], firepower: 89, liquipedia: "XANTARES", photo: "https://liquipedia.net/commons/images/thumb/d/d5/XANTARES_at_BLAST_Open_Spring_2026.jpg/600px-XANTARES_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "MAJ3R", name: "Engin Küpeli", roles: ["IGL", "Rifler"], firepower: 71, liquipedia: "MAJ3R", photo: "https://liquipedia.net/commons/images/thumb/b/b5/MAJ3R_at_IEM_Krakow_2026.jpg/600px-MAJ3R_at_IEM_Krakow_2026.jpg" },
      { nick: "Wicadia", name: "Ali Haydar Yalçın", roles: ["Rifler"], firepower: 77, liquipedia: "Wicadia", photo: "https://liquipedia.net/commons/images/thumb/c/cf/Wicadia_at_BLAST_Open_Spring_2026.jpg/600px-Wicadia_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "woxic", name: "Özgür Eker", roles: ["AWPer"], firepower: 85, liquipedia: "Woxic", photo: "https://liquipedia.net/commons/images/thumb/4/49/Woxic_at_BLAST_Open_Spring_2026.jpg/600px-Woxic_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "soulfly", name: "Caner Kesici", roles: ["Rifler"], firepower: 68, liquipedia: "Soulfly", photo: "https://liquipedia.net/commons/images/thumb/1/19/Soulfly_at_BLAST_Open_Spring_2026.jpg/600px-Soulfly_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "furia",
    name: "FURIA Esports",
    stage: "Legends",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/a/aa/FURIA_Esports_allmode.png/179px-FURIA_Esports_allmode.png",
    players: [
      { nick: "yuurih", name: "Yuri Gomes dos Santos Boian", roles: ["Rifler"], firepower: 82, liquipedia: "Yuurih", photo: "https://liquipedia.net/commons/images/thumb/1/17/Yuurih_at_BLAST_Bounty_Winter_2026.jpg/600px-Yuurih_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "KSCERATO", name: "Kaike Silva Cerato", roles: ["Lurker"], firepower: 87, liquipedia: "KSCERATO", photo: "https://liquipedia.net/commons/images/thumb/e/ef/KSCERATO_at_BLAST_Open_Spring_2026.jpg/600px-KSCERATO_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "FalleN", name: "Gabriel Toledo de Alcântara Sguario", roles: ["IGL", "Rifler"], firepower: 75, liquipedia: "FalleN", photo: "https://liquipedia.net/commons/images/thumb/1/14/FalleN_at_BLAST_Open_Spring_2026.jpg/600px-FalleN_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "molodoy", name: "Danil Golubenko", roles: ["AWPer"], firepower: 79, liquipedia: "Molodoy", photo: "https://liquipedia.net/commons/images/thumb/4/48/Molodoy_at_IEM_Krak%C3%B3w_2026.jpg/600px-Molodoy_at_IEM_Krak%C3%B3w_2026.jpg" },
      { nick: "YEKINDAR", name: "Mareks Gaļinskis", roles: ["Rifler"], firepower: 88, liquipedia: "YEKINDAR", photo: "https://liquipedia.net/commons/images/thumb/5/50/YEKINDAR_at_BLAST_Open_Spring_2026.jpg/600px-YEKINDAR_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "mouz",
    name: "MOUZ",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/c/c2/MOUZ_2021_allmode.png/164px-MOUZ_2021_allmode.png",
    players: [
      { nick: "torzsi", name: "Ádám Torzsás", roles: ["AWPer"], firepower: 88, liquipedia: "Torzsi", photo: "https://liquipedia.net/commons/images/thumb/f/f1/Torzsi_at_IEM_Rio_2026.jpg/600px-Torzsi_at_IEM_Rio_2026.jpg" },
      { nick: "xertioN", name: "Dorian Berman", roles: ["IGL"], firepower: 72, liquipedia: "XertioN", photo: "https://liquipedia.net/commons/images/thumb/b/b4/XertioN_at_IEM_Krakow_2026.jpg/600px-XertioN_at_IEM_Krakow_2026.jpg" },
      { nick: "Brollan", name: "Ludvig William Brolin", roles: ["IGL"], firepower: 86, liquipedia: "Brollan", photo: "https://liquipedia.net/commons/images/thumb/1/10/Brollan_at_IEM_Rio_2026.jpg/600px-Brollan_at_IEM_Rio_2026.jpg" },
      { nick: "Spinx", name: "Lotan Giladi", roles: ["Lurker"], firepower: 85, liquipedia: "Spinx", photo: "https://liquipedia.net/commons/images/thumb/e/e3/Spinx_at_IEM_Rio_2026.jpg/600px-Spinx_at_IEM_Rio_2026.jpg" },
      { nick: "xelex", name: "Adrian Vincze", roles: ["Rifler"], firepower: 79, liquipedia: "Xelex", photo: "https://liquipedia.net/commons/images/thumb/6/60/Xelex_at_PGL_Astana_2026.jpg/600px-Xelex_at_PGL_Astana_2026.jpg" },
    ]
  },
  {
    id: "fut",
    name: "FUT Esports",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/9/90/Futbolist_2021_lightmode.png/92px-Futbolist_2021_lightmode.png",
    players: [
      { nick: "dem0n", name: "Dmytro Myroshnychenko", roles: ["Rifler"], firepower: 79, liquipedia: "Dem0n", photo: "https://liquipedia.net/commons/images/thumb/3/3a/Dem0n_at_BLAST_Rivals_Spring_2026.jpg/600px-Dem0n_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "Krabeni", name: "Aulon Fazlija", roles: ["IGL"], firepower: 71, liquipedia: "Krabeni", photo: "https://liquipedia.net/commons/images/thumb/b/b6/Krabeni_at_BLAST_Rivals_Spring_2026.jpg/600px-Krabeni_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "cmtry", name: "Mykyta Samolotov", roles: ["AWPer"], firepower: 82, liquipedia: "Cmtry", photo: "https://liquipedia.net/commons/images/thumb/1/18/Cmtry_at_BLAST_Rivals_Spring_2026.jpg/600px-Cmtry_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "dziugss", name: "Džiugas Steponavičius", roles: ["Rifler"], firepower: 77, liquipedia: "Dziugss", photo: "https://liquipedia.net/commons/images/thumb/9/9a/Dziugss_at_BLAST_Rivals_Spring_2026.jpg/600px-Dziugss_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "lauNX", name: "Laurențiu Țârlea", roles: ["Rifler"], firepower: 65, liquipedia: "LauNX", photo: "https://liquipedia.net/commons/images/thumb/a/ae/LauNX_at_PGL_Bucharest_2026.jpg/600px-LauNX_at_PGL_Bucharest_2026.jpg" },
    ]
  },
  {
    id: "spirit",
    name: "Team Spirit",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/6/66/Team_Spirit_2022_lightmode.png/149px-Team_Spirit_2022_lightmode.png",
    players: [
      { nick: "magixx", name: "Boris Vorobyev", roles: ["IGL"], firepower: 76, liquipedia: "Magixx", photo: "https://liquipedia.net/commons/images/thumb/e/e3/Magixx_at_BLAST_Bounty_Winter_2026.jpg/600px-Magixx_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "zont1x", name: "Myroslav Plakhotia", roles: ["Rifler"], firepower: 68, liquipedia: "Zont1x", photo: "https://liquipedia.net/commons/images/thumb/2/24/Zont1x_at_BLAST_Bounty_Winter_2026.jpg/600px-Zont1x_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "donk", name: "Danil Kryshkovets", roles: ["Rifler"], firepower: 100, liquipedia: "Donk", photo: "https://liquipedia.net/commons/images/thumb/a/a5/Donk_at_BLAST_Open_Spring_2026.jpg/600px-Donk_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "sh1ro", name: "Dmitriy Eduardovich Sokolov", roles: ["AWPer"], firepower: 91, liquipedia: "Sh1ro", photo: "https://liquipedia.net/commons/images/thumb/2/26/Sh1ro_at_IEM_Rio_2026.jpg/600px-Sh1ro_at_IEM_Rio_2026.jpg" },
      { nick: "tN1R", name: "Andrey Tatarinovich", roles: ["Rifler"], firepower: 80, liquipedia: "TN1R", photo: "https://liquipedia.net/commons/images/thumb/0/01/TN1R_at_BLAST_Rivals_Fall_2025.jpg/600px-TN1R_at_BLAST_Rivals_Fall_2025.jpg" },
    ]
  },
  {
    id: "betboom",
    name: "BetBoom Team",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/5/5b/BetBoom_Team_2024_allmode.png/600px-BetBoom_Team_2024_allmode.png",
    players: [
      { nick: "Boombl4", name: "Kirill Mikhailov", roles: ["IGL"], firepower: 74, liquipedia: "Boombl4", photo: "https://liquipedia.net/commons/images/thumb/0/03/Boombl4_at_Stake_Ranked_Episode_1.jpg/600px-Boombl4_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "zorte", name: "Aleksandr Zagodyrenko", roles: ["AWPer"], firepower: 78, liquipedia: "Zorte", photo: "https://liquipedia.net/commons/images/thumb/4/40/Zorte_at_Stake_Ranked_Episode_1.jpg/600px-Zorte_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "Magnojez", name: "Kirill Rodnov", roles: ["Rifler"], firepower: 80, liquipedia: "Magnojez", photo: "https://liquipedia.net/commons/images/thumb/a/a9/Magnojez_at_Stake_Ranked_Episode_1.jpg/600px-Magnojez_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "FL4MUS", name: "Timur Maryev", roles: [""], firepower: 82, liquipedia: "FL4MUS", photo: "https://liquipedia.net/commons/images/thumb/a/ae/FL4MUS_at_Stake_Ranked_Episode_1.jpg/600px-FL4MUS_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "d1Ledez", name: "Daniil Kustov", roles: ["Rifler"], firepower: 77, liquipedia: "D1Ledez", photo: "https://liquipedia.net/commons/images/thumb/c/cc/D1Ledez_at_LanDaLan_3.jpg/600px-D1Ledez_at_LanDaLan_3.jpg" },
    ]
  },
  {
    id: "g2",
    name: "G2 Esports",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/4/4b/G2_Esports_2020_lightmode.png/150px-G2_Esports_2020_lightmode.png",
    players: [
      { nick: "huNter-", name: "Nemanja Kovač", roles: ["IGL", "Lurker"], firepower: 85, liquipedia: "HuNter-", photo: "https://liquipedia.net/commons/images/thumb/5/52/HuNter-_at_Stake_Ranked_Episode_1.jpg/600px-HuNter-_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "HeavyGod", name: "Nikita Martynenko", roles: ["Rifler"], firepower: 87, liquipedia: "HeavyGod", photo: "https://liquipedia.net/commons/images/thumb/e/e1/HeavyGod_at_Stake_Ranked_Episode_1.jpg/600px-HeavyGod_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "SunPayus", name: "Álvaro Fernández García", roles: ["AWPer"], firepower: 85, liquipedia: "SunPayus", photo: "https://liquipedia.net/commons/images/thumb/c/c6/SunPayus_at_Stake_Ranked_Episode_1.jpg/600px-SunPayus_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "MATYS", name: "Matúš Šimko", roles: ["Rifler"], firepower: 83, liquipedia: "Matys", photo: "https://liquipedia.net/commons/images/thumb/d/d0/Matys_at_Stake_Ranked_Episode_1.jpg/600px-Matys_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "NertZ", name: "Guy Iluz", roles: ["Rifler"], firepower: 90, liquipedia: "NertZ", photo: "https://liquipedia.net/commons/images/thumb/b/b4/NertZ_at_Stake_Ranked_Episode_1.jpg/600px-NertZ_at_Stake_Ranked_Episode_1.jpg" },
    ]
  },
  {
    id: "monte",
    name: "Monte",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/2/22/Monte_2022_allmode.png/122px-Monte_2022_allmode.png",
    players: [
      { nick: "Gizmy", name: "Jack von Spreckelsen", roles: ["IGL", "Rifler"], firepower: 70, liquipedia: "Gizmy", photo: "https://liquipedia.net/commons/images/thumb/f/f4/Gizmy_at_CCT_Season_3_Global_Finals.jpg/600px-Gizmy_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "afro", name: "Aurélien Drapier", roles: ["AWPer"], firepower: 80, liquipedia: "Afro", photo: "https://liquipedia.net/commons/images/thumb/c/c4/Afro_at_CCT_Season_3_Global_Finals.jpg/600px-Afro_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "AZUWU", name: "Oscar Bell", roles: ["Rifler"], firepower: 78, liquipedia: "AZUWU", photo: "https://liquipedia.net/commons/images/thumb/e/ea/AZUWU_at_CCT_Season_3_Global_Finals.jpg/600px-AZUWU_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "Bymas", name: "Aurimas Pipiras", roles: ["Lurker"], firepower: 76, liquipedia: "Bymas", photo: "https://liquipedia.net/commons/images/thumb/2/21/Bymas_at_CCT_Season_3_Global_Finals.jpg/600px-Bymas_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "Rainwaker", name: "Aleks Ognyanov Petrov", roles: ["Lurker", "Support"], firepower: 74, liquipedia: "Rainwaker", photo: "https://liquipedia.net/commons/images/thumb/c/c4/Rainwaker_at_CCT_Season_3_Global_Finals.jpg/600px-Rainwaker_at_CCT_Season_3_Global_Finals.jpg" },
    ]
  },
  {
    id: "9z",
    name: "9z Team",
    stage: "Challengers",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/7/7f/9z_Team_2024_lightmode.png/190px-9z_Team_2024_lightmode.png",
    players: [
      { nick: "max", name: "Maximiliano Gonzalez", roles: ["IGL"], firepower: 80, liquipedia: "Max", photo: "https://liquipedia.net/commons/images/thumb/e/e4/Max_at_BLAST_Open_Spring_2026.jpg/600px-Max_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "HUASOPEEK", name: "Matías Ibañez Hernandez", roles: ["Rifler"], firepower: 78, liquipedia: "HUASOPEEK", photo: "https://liquipedia.net/commons/images/thumb/1/1e/HUASOPEEK_at_BLAST_Open_Spring_2026.jpg/600px-HUASOPEEK_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "luchov", name: "Luciano Valentin Herrera", roles: ["Rifler"], firepower: 74, liquipedia: "Luchov", photo: "https://liquipedia.net/commons/images/thumb/f/f7/Luchov_at_BLAST_Open_Spring_2026.jpg/600px-Luchov_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "meyern", name: "Ignacio Naim Meyer", roles: ["AWPer"], firepower: 76, liquipedia: "Meyern", photo: "https://liquipedia.net/commons/images/thumb/5/55/Meyern_at_BLAST_Open_Spring_2026.jpg/600px-Meyern_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "dgt", name: "Franco Manuel Garcia Cabrera", roles: ["Lurker"], firepower: 72, liquipedia: "Dgt", photo: "https://liquipedia.net/commons/images/thumb/4/4c/Dgt_at_BLAST_Open_Spring_2026.jpg/600px-Dgt_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "b8",
    name: "B8 Esports",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/c/c6/B8_lightmode.png/145px-B8_lightmode.png",
    players: [
      { nick: "npl", name: "Andrii Kukharskyi", roles: ["IGL", "Rifler"], firepower: 72, liquipedia: "Npl", photo: "https://liquipedia.net/commons/images/thumb/b/ba/Npl_at_BLAST_Open_Spring_2026.jpg/600px-Npl_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "esenthial", name: "Dmytro Tsvir", roles: ["Rifler"], firepower: 76, liquipedia: "Esenthial", photo: "https://liquipedia.net/commons/images/thumb/b/bf/Esenthial_at_BLAST_Open_Spring_2026.jpg/600px-Esenthial_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "alex666", name: "Oleksii Yarmoshchuk", roles: ["IGL", "Rifler"], firepower: 80, liquipedia: "Alex666", photo: "https://liquipedia.net/commons/images/thumb/2/26/Alex666_at_BLAST_Open_Spring_2026.jpg/600px-Alex666_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "kensizor", name: "Artem Kapran", roles: ["Rifler"], firepower: 78, liquipedia: "Kensizor", photo: "https://liquipedia.net/commons/images/thumb/4/4e/Kensizor_at_BLAST_Open_Spring_2026.jpg/600px-Kensizor_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "s1zzi", name: "Danylo Vinnyk", roles: ["AWPer"], firepower: 67, liquipedia: "S1zzi", photo: "https://liquipedia.net/commons/images/thumb/2/2c/S1zzi_at_BLAST_Open_Spring_2026.jpg/600px-S1zzi_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "legacy",
    name: "Legacy",
    stage: "Challengers",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/3/34/Legacy_allmode.png/172px-Legacy_allmode.png",
    players: [
      { nick: "latto", name: "Bruno Rebelatto", roles: ["Rifler", "AWPer"], firepower: 77, liquipedia: "Latto", photo: "https://liquipedia.net/commons/images/thumb/b/b6/Latto_at_IEM_Atlanta_2026.jpg/600px-Latto_at_IEM_Atlanta_2026.jpg" },
      { nick: "dumau", name: "Eduardo Araujo Wolkmer da Silva", roles: ["Rifler", "AWPer"], firepower: 80, liquipedia: "Dumau", photo: "https://liquipedia.net/commons/images/thumb/6/61/Dumau_at_IEM_Krakow_2026.jpg/600px-Dumau_at_IEM_Krakow_2026.jpg" },
      { nick: "saadzin", name: "Guilherme Pacheco de Rosa", roles: ["AWPer"], firepower: 76, liquipedia: "Saadzin", photo: "https://liquipedia.net/commons/images/thumb/f/f6/Saadzin_at_IEM_Rio_2026.jpg/600px-Saadzin_at_IEM_Rio_2026.jpg" },
      { nick: "n1ssim", name: "Vinicius Pereira", roles: ["Rifler"], firepower: 75, liquipedia: "N1ssim", photo: "https://liquipedia.net/commons/images/thumb/0/01/N1ssim_at_IEM_Rio_2026.jpg/600px-N1ssim_at_IEM_Rio_2026.jpg" },
      { nick: "arT", name: "Andrei Felipe Piovezan Machado", roles: ["IGL"], firepower: 74, liquipedia: "ArT", photo: "https://liquipedia.net/commons/images/thumb/a/ab/ArT_at_IEM_Rio_2026.jpg/600px-ArT_at_IEM_Rio_2026.jpg" },
    ]
  },
];

const ROLE_ICONS = {
  "AWPer":   { emoji: "🎯", color: "#4ade80", label: "AWPer" },
  "IGL":     { emoji: "👑", color: "#60a5fa", label: "IGL" },
  "Entry":   { emoji: "⚡", color: "#fb923c", label: "Entry" },
  "Support": { emoji: "🛡️", color: "#facc15", label: "Support" },
  "Rifler":  { emoji: "🔫", color: "#c084fc", label: "Rifler" },
  "Lurker":  { emoji: "👤", color: "#94a3b8", label: "Lurker" }
};

const IDEAL_COMPOSITION = {
  "IGL": { max: 1, penalty: 0.85 },
  "AWPer": { max: 1, penalty: 0.85 },
  "Lurker": { max: 1, penalty: 0.90 },
  "Entry": { max: 2, penalty: 0.92 },
  "Support": { max: 2, penalty: 0.92 }
};

function getPlayerRoles(player) {
  if (Array.isArray(player.roles) && player.roles.length) return player.roles;
  if (player.role) return [player.role];
  return ["Rifler"];
}

function getPrimaryRole(player) {
  return getPlayerRoles(player)[0];
}

function formatPlayerRoles(player) {
  return getPlayerRoles(player).join(" / ");
}

function getBestRoleAssignment(players) {
  const roleLists = players.map(getPlayerRoles);
  let bestCounts = {};
  let bestOverflow = Infinity;

  function overflow(counts) {
    let total = 0;
    for (const [role, cfg] of Object.entries(IDEAL_COMPOSITION)) {
      const excess = (counts[role] || 0) - cfg.max;
      if (excess > 0) total += excess;
    }
    return total;
  }

  function assign(idx, counts) {
    if (idx === roleLists.length) {
      const ov = overflow(counts);
      if (ov < bestOverflow) {
        bestOverflow = ov;
        bestCounts = { ...counts };
      }
      return;
    }
    for (const role of roleLists[idx]) {
      assign(idx + 1, { ...counts, [role]: (counts[role] || 0) + 1 });
    }
  }

  if (roleLists.length) assign(0, {});
  return bestCounts;
}

function getRolePenaltyMultiplier(roleCounts) {
  let multiplier = 1.0;
  for (const [role, cfg] of Object.entries(IDEAL_COMPOSITION)) {
    if ((roleCounts[role] || 0) > cfg.max) multiplier *= cfg.penalty;
  }
  return multiplier;
}

function getCompositionWarnings(players) {
  const roleCounts = getBestRoleAssignment(players);
  const warnings = [];
  if ((roleCounts["AWPer"] || 0) > IDEAL_COMPOSITION.AWPer.max) {
    warnings.push(`${roleCounts["AWPer"]} AWPers — penalidade aplicada`);
  }
  if ((roleCounts["IGL"] || 0) > IDEAL_COMPOSITION.IGL.max) {
    warnings.push(`${roleCounts["IGL"]} IGLs — penalidade aplicada`);
  }
  if ((roleCounts["Lurker"] || 0) > IDEAL_COMPOSITION.Lurker.max) {
    warnings.push(`${roleCounts["Lurker"]} Lurkers — penalidade aplicada`);
  }
  if ((roleCounts["Entry"] || 0) > IDEAL_COMPOSITION.Entry.max) {
    warnings.push(`${roleCounts["Entry"]} Entries — penalidade aplicada`);
  }
  if ((roleCounts["Support"] || 0) > IDEAL_COMPOSITION.Support.max) {
    warnings.push(`${roleCounts["Support"]} Supports — penalidade aplicada`);
  }
  return warnings;
}

function calcTeamScore(pickedPlayers) {
  if (!pickedPlayers || pickedPlayers.length === 0) return 0;
  const avgFP = pickedPlayers.reduce((s, p) => s + p.firepower, 0) / pickedPlayers.length;

  const roleCounts = getBestRoleAssignment(pickedPlayers);
  const multiplier = getRolePenaltyMultiplier(roleCounts);

  const allRoles = pickedPlayers.flatMap(getPlayerRoles);
  const hasIGL = allRoles.includes("IGL");
  const hasAWP = allRoles.includes("AWPer");
  const hasEntry = allRoles.includes("Entry");
  const hasSupport = allRoles.includes("Support");
  const hasRiflerOrLurker = allRoles.includes("Rifler") || allRoles.includes("Lurker");

  const idealBonus = (hasIGL && hasAWP && hasEntry && hasSupport && hasRiflerOrLurker) ? 1.1 : 1.0;

  const roleFitScore = multiplier * idealBonus * 100;
  const teamScore = (avgFP * 0.8) + (roleFitScore * 0.2);

  return Math.round(teamScore);
}

function scoreToRecord(score) {
  if (score >= 95) return "18–0";
  if (score >= 90) return "16–2";
  if (score >= 85) return "14–4";
  if (score >= 80) return "12–6";
  if (score >= 75) return "10–8";
  if (score >= 70) return "8–10";
  if (score >= 65) return "6–12";
  if (score >= 60) return "4–14";
  return "2–16";
}
