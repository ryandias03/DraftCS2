const TEAMS = [
  {
    id: "vitality",
    name: "Team Vitality",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/e/e4/Team_Vitality_2023_lightmode.png/143px-Team_Vitality_2023_lightmode.png",
    players: [
      { nick: "apEX", name: "Dan Madesclaire", role: "IGL", firepower: 72, liquipedia: "ApEX", photo: "https://liquipedia.net/commons/images/thumb/b/b7/ApEX_at_BLAST_Open_Spring_2026.jpg/600px-ApEX_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "ZywOo", name: "Mathieu Herbaut", role: "AWPer", firepower: 99, liquipedia: "ZywOo", photo: "https://liquipedia.net/commons/images/thumb/2/2b/ZywOo_at_BLAST_Bounty_Winter_2026.jpg/600px-ZywOo_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "flameZ", name: "שחר שושן", role: "Entry", firepower: 90, liquipedia: "FlameZ", photo: "https://liquipedia.net/commons/images/thumb/2/29/FlameZ_at_BLAST_Open_Spring_2026.jpg/600px-FlameZ_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "mezii", name: "William Merriman", role: "Rifler", firepower: 78, liquipedia: "Mezii", photo: "https://liquipedia.net/commons/images/thumb/c/ca/Mezii_at_BLAST_Open_Spring_2026.jpg/600px-Mezii_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "ropz", name: "Robin Kool", role: "Lurker", firepower: 91, liquipedia: "Ropz", photo: "https://liquipedia.net/commons/images/thumb/f/f4/Ropz_at_BLAST_Open_Spring_2026.jpg/600px-Ropz_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "navi",
    name: "Natus Vincere",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/3/3f/Natus_Vincere_2021_lightmode.png/190px-Natus_Vincere_2021_lightmode.png",
    players: [
      { nick: "b1t", name: "Валерій Євгенійович Ваховський", role: "Support", firepower: 88, liquipedia: "B1t", photo: "https://liquipedia.net/commons/images/thumb/2/2e/B1t_at_BLAST_Open_Spring_2026.jpg/600px-B1t_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Aleksib", name: "Aleksi Antti Kaarlo Virolainen", role: "IGL", firepower: 65, liquipedia: "Aleksib", photo: "https://liquipedia.net/commons/images/thumb/2/26/Aleksib_at_BLAST_Open_Spring_2026.jpg/600px-Aleksib_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "iM", name: "Mihai Ivan", role: "Entry", firepower: 80, liquipedia: "IM", photo: "https://liquipedia.net/commons/images/thumb/8/8b/IM_at_BLAST_Open_Spring_2026.jpg/600px-IM_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "w0nderful", name: "Ігор Жданов", role: "AWPer", firepower: 87, liquipedia: "W0nderful", photo: "https://liquipedia.net/commons/images/thumb/9/9e/W0nderful_at_BLAST_Open_Spring_2026.jpg/600px-W0nderful_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "makazze", name: "Drin Shaqiri", role: "Rifler", firepower: 70, liquipedia: "Makazze", photo: "https://liquipedia.net/commons/images/thumb/7/7b/Makazze_at_BLAST_Open_Spring_2026.jpg/600px-Makazze_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "falcons",
    name: "Team Falcons",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/8/83/Team_Falcons_2022_allmode.png/144px-Team_Falcons_2022_allmode.png",
    players: [
      { nick: "NiKo", name: "Никола Ковач", role: "Entry", firepower: 96, liquipedia: "NiKo", photo: "https://liquipedia.net/commons/images/thumb/1/19/NiKo_at_BLAST_Open_Spring_2026.jpg/600px-NiKo_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "TeSeS", name: "René Stensig Madsen", role: "Entry", firepower: 83, liquipedia: "TeSeS", photo: "https://liquipedia.net/commons/images/thumb/f/fe/TeSeS_at_BLAST_Open_Spring_2026.jpg/600px-TeSeS_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "m0NESY", name: "Илья Осипов", role: "AWPer", firepower: 95, liquipedia: "M0NESY", photo: "https://liquipedia.net/commons/images/thumb/8/81/M0NESY_at_BLAST_Bounty_Winter_2026.jpg/600px-M0NESY_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "kyousuke", name: "Максим Лукин", role: "Entry", firepower: 73, liquipedia: "Kyousuke", photo: "https://liquipedia.net/commons/images/thumb/6/6d/Kyousuke_at_BLAST_Open_Spring_2026.jpg/600px-Kyousuke_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "karrigan", name: "Finn Andersen", role: "IGL", firepower: 64, liquipedia: "Karrigan", photo: "https://liquipedia.net/commons/images/thumb/e/e7/Karrigan_at_PGL_Astana_2026.jpg/600px-Karrigan_at_PGL_Astana_2026.jpg" },
    ]
  },
  {
    id: "mongolz",
    name: "The MongolZ",
    stage: "Legends",
    region: "Asia",
    logo: "https://liquipedia.net/commons/images/thumb/2/2b/The_MongolZ_2024_03_allmode.png/135px-The_MongolZ_2024_03_allmode.png",
    players: [
      { nick: "bLitz", name: "Бямбасүрэнгийн Гарьдмагнай", role: "IGL", firepower: 84, liquipedia: "BLitz", photo: "https://liquipedia.net/commons/images/thumb/9/96/BLitz_at_BLAST_Open_Spring_2026.jpg/600px-BLitz_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Techno4K", name: "Мөнхболдын Содбаяр", role: "Rifler", firepower: 80, liquipedia: "Techno4K", photo: "https://liquipedia.net/commons/images/thumb/d/d9/Techno4K_at_BLAST_Open_Spring_2026.jpg/600px-Techno4K_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "910", name: "Банзрагчийн Өсөхбаяр", role: "AWPer", firepower: 86, liquipedia: "910", photo: "https://liquipedia.net/commons/images/thumb/7/7d/910_at_BLAST_Open_Spring_2026.jpg/600px-910_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "mzinho", name: "Батболдын Аюуш", role: "Rifler", firepower: 70, liquipedia: "Mzinho", photo: "https://liquipedia.net/commons/images/thumb/b/bc/Mzinho_at_BLAST_Open_Spring_2026.jpg/600px-Mzinho_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "cobrazera", name: "Ууганбаярын Анарбилэг", role: "Rifler", firepower: 74, liquipedia: "Cobrazera", photo: "https://liquipedia.net/commons/images/thumb/6/67/Cobrazera_at_BLAST_Open_Spring_2026.jpg/600px-Cobrazera_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "parivision",
    name: "PARIVISION",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/9/9d/PARIVISION_allmode.png/190px-PARIVISION_allmode.png",
    players: [
      { nick: "BELCHONOKK", name: "Andrey Yasinskiy", role: "Rifler", firepower: 82, liquipedia: "BELCHONOKK", photo: "https://liquipedia.net/commons/images/thumb/f/f6/BELCHONOKK_at_StarLadder_StarSeries_Fall_2025.jpg/600px-BELCHONOKK_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "Jame", name: "Джами Али", role: "IGL", firepower: 84, liquipedia: "Jame", photo: "https://liquipedia.net/commons/images/thumb/c/c5/Jame_at_StarLadder_StarSeries_Fall_2025.jpg/600px-Jame_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "nota", name: "Эмиль Москвитин", role: "Rifler", firepower: 76, liquipedia: "Nota", photo: "https://liquipedia.net/commons/images/thumb/c/ca/Nota_at_StarLadder_StarSeries_Fall_2025.jpg/600px-Nota_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "xiELO", name: "Владислав Лысов", role: "Rifler", firepower: 74, liquipedia: "XiELO", photo: "https://liquipedia.net/commons/images/thumb/9/90/XiELO_at_StarLadder_StarSeries_Fall_2025.jpg/600px-XiELO_at_StarLadder_StarSeries_Fall_2025.jpg" },
      { nick: "zweih", name: "Иван Гогин", role: "Rifler", firepower: 69, liquipedia: "Zweih", photo: "https://liquipedia.net/commons/images/thumb/9/95/Zweih_at_BLAST_Bounty_Winter_2026.jpg/600px-Zweih_at_BLAST_Bounty_Winter_2026.jpg" },
    ]
  },
  {
    id: "aurora",
    name: "Aurora Gaming",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/1/1c/Aurora_Gaming_2025_allmode.png/174px-Aurora_Gaming_2025_allmode.png",
    players: [
      { nick: "XANTARES", name: "İsmailсan Dörtkardeş", role: "Entry", firepower: 89, liquipedia: "XANTARES", photo: "https://liquipedia.net/commons/images/thumb/d/d5/XANTARES_at_BLAST_Open_Spring_2026.jpg/600px-XANTARES_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "MAJ3R", name: "Engin Küpeli", role: "IGL", firepower: 71, liquipedia: "MAJ3R", photo: "https://liquipedia.net/commons/images/thumb/b/b5/MAJ3R_at_IEM_Krakow_2026.jpg/600px-MAJ3R_at_IEM_Krakow_2026.jpg" },
      { nick: "Wicadia", name: "Ali Haydar Yalçın", role: "Rifler", firepower: 77, liquipedia: "Wicadia", photo: "https://liquipedia.net/commons/images/thumb/c/cf/Wicadia_at_BLAST_Open_Spring_2026.jpg/600px-Wicadia_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "woxic", name: "Özgür Eker", role: "AWPer", firepower: 85, liquipedia: "Woxic", photo: "https://liquipedia.net/commons/images/thumb/4/49/Woxic_at_BLAST_Open_Spring_2026.jpg/600px-Woxic_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "soulfly", name: "Caner Kesici", role: "Rifler", firepower: 68, liquipedia: "Soulfly", photo: "https://liquipedia.net/commons/images/thumb/1/19/Soulfly_at_BLAST_Open_Spring_2026.jpg/600px-Soulfly_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "furia",
    name: "FURIA Esports",
    stage: "Legends",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/a/aa/FURIA_Esports_allmode.png/179px-FURIA_Esports_allmode.png",
    players: [
      { nick: "yuurih", name: "Yuri Gomes dos Santos Boian", role: "Rifler", firepower: 82, liquipedia: "Yuurih", photo: "https://liquipedia.net/commons/images/thumb/1/17/Yuurih_at_BLAST_Bounty_Winter_2026.jpg/600px-Yuurih_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "KSCERATO", name: "Kaike Silva Cerato", role: "Lurker", firepower: 87, liquipedia: "KSCERATO", photo: "https://liquipedia.net/commons/images/thumb/e/ef/KSCERATO_at_BLAST_Open_Spring_2026.jpg/600px-KSCERATO_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "FalleN", name: "Gabriel Toledo de Alcântara Sguario", role: "Rifler", firepower: 75, liquipedia: "FalleN", photo: "https://liquipedia.net/commons/images/thumb/1/14/FalleN_at_BLAST_Open_Spring_2026.jpg/600px-FalleN_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "molodoy", name: "Данил Голубенко", role: "AWPer", firepower: 79, liquipedia: "Molodoy", photo: "https://liquipedia.net/commons/images/thumb/4/48/Molodoy_at_IEM_Krak%C3%B3w_2026.jpg/600px-Molodoy_at_IEM_Krak%C3%B3w_2026.jpg" },
      { nick: "YEKINDAR", name: "Mareks Gaļinskis", role: "Entry", firepower: 88, liquipedia: "YEKINDAR", photo: "https://liquipedia.net/commons/images/thumb/5/50/YEKINDAR_at_BLAST_Open_Spring_2026.jpg/600px-YEKINDAR_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "mouz",
    name: "MOUZ",
    stage: "Legends",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/c/c2/MOUZ_2021_allmode.png/164px-MOUZ_2021_allmode.png",
    players: [
      { nick: "torzsi", name: "Ádám Torzsás", role: "AWPer", firepower: 88, liquipedia: "Torzsi", photo: "https://liquipedia.net/commons/images/thumb/f/f1/Torzsi_at_IEM_Rio_2026.jpg/600px-Torzsi_at_IEM_Rio_2026.jpg" },
      { nick: "xertioN", name: "דוריאן ברמן", role: "Rifler", firepower: 72, liquipedia: "XertioN", photo: "https://liquipedia.net/commons/images/thumb/b/b4/XertioN_at_IEM_Krakow_2026.jpg/600px-XertioN_at_IEM_Krakow_2026.jpg" },
      { nick: "Brollan", name: "Ludvig William Brolin", role: "Rifler", firepower: 86, liquipedia: "Brollan", photo: "https://liquipedia.net/commons/images/thumb/1/10/Brollan_at_IEM_Rio_2026.jpg/600px-Brollan_at_IEM_Rio_2026.jpg" },
      { nick: "Spinx", name: "לוטן גלעדי", role: "Lurker", firepower: 85, liquipedia: "Spinx", photo: "https://liquipedia.net/commons/images/thumb/e/e3/Spinx_at_IEM_Rio_2026.jpg/600px-Spinx_at_IEM_Rio_2026.jpg" },
      { nick: "xelex", name: "Adrian Vincze", role: "Rifler", firepower: 79, liquipedia: "Xelex", photo: "https://liquipedia.net/commons/images/thumb/6/60/Xelex_at_PGL_Astana_2026.jpg/600px-Xelex_at_PGL_Astana_2026.jpg" },
    ]
  },
  {
    id: "fut",
    name: "FUT Esports",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/9/90/Futbolist_2021_lightmode.png/92px-Futbolist_2021_lightmode.png",
    players: [
      { nick: "dem0n", name: "Дмитро Мирошниченко", role: "Rifler", firepower: 79, liquipedia: "Dem0n", photo: "https://liquipedia.net/commons/images/thumb/3/3a/Dem0n_at_BLAST_Rivals_Spring_2026.jpg/600px-Dem0n_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "Krabeni", name: "Aulon Fazlija", role: "IGL", firepower: 71, liquipedia: "Krabeni", photo: "https://liquipedia.net/commons/images/thumb/b/b6/Krabeni_at_BLAST_Rivals_Spring_2026.jpg/600px-Krabeni_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "cmtry", name: "Микита Самольотов", role: "AWPer", firepower: 82, liquipedia: "Cmtry", photo: "https://liquipedia.net/commons/images/thumb/1/18/Cmtry_at_BLAST_Rivals_Spring_2026.jpg/600px-Cmtry_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "dziugss", name: "Džiugas Steponavičius", role: "Rifler", firepower: 77, liquipedia: "Dziugss", photo: "https://liquipedia.net/commons/images/thumb/9/9a/Dziugss_at_BLAST_Rivals_Spring_2026.jpg/600px-Dziugss_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "lauNX", name: "Laurențiu Țârlea", role: "Rifler", firepower: 65, liquipedia: "LauNX", photo: "https://liquipedia.net/commons/images/thumb/a/ae/LauNX_at_PGL_Bucharest_2026.jpg/600px-LauNX_at_PGL_Bucharest_2026.jpg" },
    ]
  },
  {
    id: "spirit",
    name: "Team Spirit",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/6/66/Team_Spirit_2022_lightmode.png/149px-Team_Spirit_2022_lightmode.png",
    players: [
      { nick: "magixx", name: "Борис Воробьев", role: "IGL", firepower: 76, liquipedia: "Magixx", photo: "https://liquipedia.net/commons/images/thumb/e/e3/Magixx_at_BLAST_Bounty_Winter_2026.jpg/600px-Magixx_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "zont1x", name: "Мирослав Плахотя", role: "Rifler", firepower: 68, liquipedia: "Zont1x", photo: "https://liquipedia.net/commons/images/thumb/2/24/Zont1x_at_BLAST_Bounty_Winter_2026.jpg/600px-Zont1x_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "donk", name: "Данил Крышковец", role: "Entry", firepower: 100, liquipedia: "Donk", photo: "https://liquipedia.net/commons/images/thumb/a/a5/Donk_at_BLAST_Open_Spring_2026.jpg/600px-Donk_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "sh1ro", name: "Дмитрий Эдуардович Соколов", role: "AWPer", firepower: 91, liquipedia: "Sh1ro", photo: "https://liquipedia.net/commons/images/thumb/2/26/Sh1ro_at_IEM_Rio_2026.jpg/600px-Sh1ro_at_IEM_Rio_2026.jpg" },
      { nick: "tN1R", name: "Андрей Татаринович", role: "Rifler", firepower: 80, liquipedia: "TN1R", photo: "https://liquipedia.net/commons/images/thumb/0/01/TN1R_at_BLAST_Rivals_Fall_2025.jpg/600px-TN1R_at_BLAST_Rivals_Fall_2025.jpg" },
    ]
  },
  {
    id: "astralis",
    name: "Astralis",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/3/3d/Astralis_2020_allmode.png/143px-Astralis_2020_allmode.png",
    players: [
      { nick: "Staehr", name: "Victor Staehr Hansen", role: "Rifler", firepower: 82, liquipedia: "Staehr", photo: "https://liquipedia.net/commons/images/thumb/3/36/Staehr_at_BLAST_Rivals_Spring_2026.jpg/600px-Staehr_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "jabbi", name: "Jakob Nygaard Sørensen", role: "Rifler", firepower: 84, liquipedia: "Jabbi", photo: "https://liquipedia.net/commons/images/thumb/8/8f/Jabbi_at_BLAST_Rivals_Spring_2026.jpg/600px-Jabbi_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "HooXi", name: "Rasmus Pallisgaard Nielsen", role: "IGL", firepower: 63, liquipedia: "HooXi", photo: "https://liquipedia.net/commons/images/thumb/4/4a/HooXi_at_IEM_Krakow_2026.jpg/600px-HooXi_at_IEM_Krakow_2026.jpg" },
      { nick: "phzy", name: "Nils Love Smidebrant", role: "AWPer", firepower: 79, liquipedia: "Phzy", photo: "https://liquipedia.net/commons/images/thumb/5/50/Phzy_at_IEM_Krak%C3%B3w_2026.jpg/600px-Phzy_at_IEM_Krak%C3%B3w_2026.jpg" },
      { nick: "ryu", name: "Gytis Glušauskas", role: "Rifler", firepower: 77, liquipedia: "Ryu", photo: "https://liquipedia.net/commons/images/thumb/a/ab/Ryu_at_IEM_Krak%C3%B3w_2026.jpg/600px-Ryu_at_IEM_Krak%C3%B3w_2026.jpg" },
    ]
  },
  {
    id: "g2",
    name: "G2 Esports",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/4/4b/G2_Esports_2020_lightmode.png/150px-G2_Esports_2020_lightmode.png",
    players: [
      { nick: "huNter-", name: "Немања Ковач", role: "Rifler", firepower: 85, liquipedia: "HuNter-", photo: "https://liquipedia.net/commons/images/thumb/5/52/HuNter-_at_Stake_Ranked_Episode_1.jpg/600px-HuNter-_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "HeavyGod", name: "ניקיטה מרטיננקו", role: "Rifler", firepower: 87, liquipedia: "HeavyGod", photo: "https://liquipedia.net/commons/images/thumb/e/e1/HeavyGod_at_Stake_Ranked_Episode_1.jpg/600px-HeavyGod_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "SunPayus", name: "Álvaro Fernández García", role: "AWPer", firepower: 85, liquipedia: "SunPayus", photo: "https://liquipedia.net/commons/images/thumb/c/c6/SunPayus_at_Stake_Ranked_Episode_1.jpg/600px-SunPayus_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "MATYS", name: "Matúš Šimko", role: "Rifler", firepower: 83, liquipedia: "Matys", photo: "https://liquipedia.net/commons/images/thumb/d/d0/Matys_at_Stake_Ranked_Episode_1.jpg/600px-Matys_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "NertZ", name: "גיא אילוז", role: "Rifler", firepower: 90, liquipedia: "NertZ", photo: "https://liquipedia.net/commons/images/thumb/b/b4/NertZ_at_Stake_Ranked_Episode_1.jpg/600px-NertZ_at_Stake_Ranked_Episode_1.jpg" },
    ]
  },
  {
    id: "legacy",
    name: "Legacy",
    stage: "Challengers",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/3/34/Legacy_allmode.png/172px-Legacy_allmode.png",
    players: [
      { nick: "latto", name: "Bruno Rebelatto", role: "Rifler", firepower: 77, liquipedia: "Latto", photo: "https://liquipedia.net/commons/images/thumb/b/b6/Latto_at_IEM_Atlanta_2026.jpg/600px-Latto_at_IEM_Atlanta_2026.jpg" },
      { nick: "dumau", name: "Eduardo Araujo Wolkmer da Silva", role: "Rifler", firepower: 80, liquipedia: "Dumau", photo: "https://liquipedia.net/commons/images/thumb/6/61/Dumau_at_IEM_Krakow_2026.jpg/600px-Dumau_at_IEM_Krakow_2026.jpg" },
      { nick: "saadzin", name: "Guilherme Pacheco de Rosa", role: "AWPer", firepower: 76, liquipedia: "Saadzin", photo: "https://liquipedia.net/commons/images/thumb/f/f6/Saadzin_at_IEM_Rio_2026.jpg/600px-Saadzin_at_IEM_Rio_2026.jpg" },
      { nick: "n1ssim", name: "Vinicius Pereira", role: "Rifler", firepower: 75, liquipedia: "N1ssim", photo: "https://liquipedia.net/commons/images/thumb/0/01/N1ssim_at_IEM_Rio_2026.jpg/600px-N1ssim_at_IEM_Rio_2026.jpg" },
      { nick: "arT", name: "Andrei Felipe Piovezan Machado", role: "IGL", firepower: 74, liquipedia: "ArT", photo: "https://liquipedia.net/commons/images/thumb/a/ab/ArT_at_IEM_Rio_2026.jpg/600px-ArT_at_IEM_Rio_2026.jpg" },
    ]
  },
  {
    id: "pain",
    name: "paiN Gaming",
    stage: "Challengers",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/6/6f/PaiN_Gaming_2023_lightmode.png/190px-PaiN_Gaming_2023_lightmode.png",
    players: [
      { nick: "biguzera", name: "Rodrigo Barbosa Bittencourt Papelbaum", role: "IGL", firepower: 83, liquipedia: "Biguzera", photo: "https://liquipedia.net/commons/images/thumb/6/65/Biguzera_at_IEM_Atlanta_2026.jpg/600px-Biguzera_at_IEM_Atlanta_2026.jpg" },
      { nick: "snow", name: "João Vinicius Bueno Filho", role: "Support", firepower: 76, liquipedia: "Snow", photo: "https://liquipedia.net/commons/images/thumb/1/18/Snow_at_IEM_Atlanta_2026.jpg/600px-Snow_at_IEM_Atlanta_2026.jpg" },
      { nick: "piriajr", name: "Guilherme Barbosa de Menezes", role: "Entry", firepower: 79, liquipedia: "Piriajr", photo: "https://liquipedia.net/commons/images/thumb/c/ca/Piriajr_at_IEM_Atlanta_2026.jpg/600px-Piriajr_at_IEM_Atlanta_2026.jpg" },
      { nick: "v$m", name: "Vinicius Moreira", role: "Rifler", firepower: 78, liquipedia: "V$m", photo: "https://liquipedia.net/commons/images/thumb/1/19/V%24m_at_IEM_Atlanta_2026.jpg/600px-V%24m_at_IEM_Atlanta_2026.jpg" },
      { nick: "saffee", name: "Rafael Innocencio da Costa", role: "AWPer", firepower: 81, liquipedia: "Saffee", photo: "https://liquipedia.net/commons/images/thumb/5/54/Saffee_at_IEM_Atlanta_2026.jpg/600px-Saffee_at_IEM_Atlanta_2026.jpg" },
    ]
  },
  {
    id: "monte",
    name: "Monte",
    stage: "Challengers",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/2/22/Monte_2022_allmode.png/122px-Monte_2022_allmode.png",
    players: [
      { nick: "Gizmy", name: "Jack von Spreckelsen", role: "Rifler", firepower: 70, liquipedia: "Gizmy", photo: "https://liquipedia.net/commons/images/thumb/f/f4/Gizmy_at_CCT_Season_3_Global_Finals.jpg/600px-Gizmy_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "afro", name: "Aurélien Drapier", role: "AWPer", firepower: 80, liquipedia: "Afro", photo: "https://liquipedia.net/commons/images/thumb/c/c4/Afro_at_CCT_Season_3_Global_Finals.jpg/600px-Afro_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "AZUWU", name: "Oscar Bell", role: "Rifler", firepower: 78, liquipedia: "AZUWU", photo: "https://liquipedia.net/commons/images/thumb/e/ea/AZUWU_at_CCT_Season_3_Global_Finals.jpg/600px-AZUWU_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "Bymas", name: "Aurimas Pipiras", role: "Lurker", firepower: 76, liquipedia: "Bymas", photo: "https://liquipedia.net/commons/images/thumb/2/21/Bymas_at_CCT_Season_3_Global_Finals.jpg/600px-Bymas_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "Rainwaker", name: "Алекс Огнянов Петров", role: "Rifler", firepower: 74, liquipedia: "Rainwaker", photo: "https://liquipedia.net/commons/images/thumb/c/c4/Rainwaker_at_CCT_Season_3_Global_Finals.jpg/600px-Rainwaker_at_CCT_Season_3_Global_Finals.jpg" },
    ]
  },
  {
    id: "9z",
    name: "9z Team",
    stage: "Challengers",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/7/7f/9z_Team_2024_lightmode.png/190px-9z_Team_2024_lightmode.png",
    players: [
      { nick: "max", name: "Maximiliano Gonzalez", role: "IGL", firepower: 80, liquipedia: "Max", photo: "https://liquipedia.net/commons/images/thumb/e/e4/Max_at_BLAST_Open_Spring_2026.jpg/600px-Max_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "HUASOPEEK", name: "Matías Ibañez Hernandez", role: "Entry", firepower: 78, liquipedia: "HUASOPEEK", photo: "https://liquipedia.net/commons/images/thumb/1/1e/HUASOPEEK_at_BLAST_Open_Spring_2026.jpg/600px-HUASOPEEK_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "luchov", name: "Luciano Valentin Herrera", role: "Entry", firepower: 74, liquipedia: "Luchov", photo: "https://liquipedia.net/commons/images/thumb/f/f7/Luchov_at_BLAST_Open_Spring_2026.jpg/600px-Luchov_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "meyern", name: "Ignacio Naim Meyer", role: "AWPer", firepower: 76, liquipedia: "Meyern", photo: "https://liquipedia.net/commons/images/thumb/5/55/Meyern_at_BLAST_Open_Spring_2026.jpg/600px-Meyern_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "dgt", name: "Franco Manuel Garcia Cabrera", role: "Lurker", firepower: 72, liquipedia: "Dgt", photo: "https://liquipedia.net/commons/images/thumb/4/4c/Dgt_at_BLAST_Open_Spring_2026.jpg/600px-Dgt_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "gamerlegion",
    name: "GamerLegion",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/2/21/GamerLegion_2026_allmode.png/172px-GamerLegion_2026_allmode.png",
    players: [
      { nick: "Tauson", name: "Sebastian Tauson Lindelof", role: "Rifler", firepower: 82, liquipedia: "Tauson", photo: "https://liquipedia.net/commons/images/thumb/4/40/Tauson_at_Stake_Ranked_Episode_1.jpg/600px-Tauson_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "PR", name: "Oldřich Nový", role: "Rifler", firepower: 73, liquipedia: "PR", photo: "https://liquipedia.net/commons/images/thumb/7/7f/PR_at_Stake_Ranked_Episode_1.jpg/600px-PR_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "REZ", name: "Bo Fredrik Sterner", role: "Rifler", firepower: 86, liquipedia: "REZ", photo: "https://liquipedia.net/commons/images/thumb/2/28/REZ_at_Stake_Ranked_Episode_1.jpg/600px-REZ_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "hypex", name: "Milan Polowiec", role: "AWPer", firepower: 81, liquipedia: "Hypex", photo: "https://liquipedia.net/commons/images/thumb/4/4f/Hypex_at_BLAST_Rivals_Spring_2026.jpg/600px-Hypex_at_BLAST_Rivals_Spring_2026.jpg" },
      { nick: "Snax", name: "Janusz Andrzej Pogorzelski", role: "IGL", firepower: 70, liquipedia: "Snax", photo: "https://liquipedia.net/commons/images/thumb/3/37/Snax_at_BLAST_Bounty_Winter_2026.jpg/600px-Snax_at_BLAST_Bounty_Winter_2026.jpg" },
    ]
  },
  {
    id: "b8",
    name: "B8 Esports",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/c/c6/B8_lightmode.png/145px-B8_lightmode.png",
    players: [
      { nick: "npl", name: "Андрій Кухарський", role: "Rifler", firepower: 72, liquipedia: "Npl", photo: "https://liquipedia.net/commons/images/thumb/b/ba/Npl_at_BLAST_Open_Spring_2026.jpg/600px-Npl_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "esenthial", name: "Дмитро Цвір", role: "Rifler", firepower: 76, liquipedia: "Esenthial", photo: "https://liquipedia.net/commons/images/thumb/b/bf/Esenthial_at_BLAST_Open_Spring_2026.jpg/600px-Esenthial_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "alex666", name: "Олексій Ярмощук", role: "Rifler", firepower: 80, liquipedia: "Alex666", photo: "https://liquipedia.net/commons/images/thumb/2/26/Alex666_at_BLAST_Open_Spring_2026.jpg/600px-Alex666_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "kensizor", name: "Артем Капран", role: "Rifler", firepower: 78, liquipedia: "Kensizor", photo: "https://liquipedia.net/commons/images/thumb/4/4e/Kensizor_at_BLAST_Open_Spring_2026.jpg/600px-Kensizor_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "s1zzi", name: "Данило Вінник", role: "AWPer", firepower: 67, liquipedia: "S1zzi", photo: "https://liquipedia.net/commons/images/thumb/2/2c/S1zzi_at_BLAST_Open_Spring_2026.jpg/600px-S1zzi_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "heroic",
    name: "HEROIC",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/0/0d/HEROIC_2024_allmode.png/190px-HEROIC_2024_allmode.png",
    players: [
      { nick: "yxngstxr", name: "Simon Boije", role: "Rifler", firepower: 77, liquipedia: "Yxngstxr", photo: "https://liquipedia.net/commons/images/thumb/a/a2/Yxngstxr_at_Stake_Ranked_Episode_1.jpg/600px-Yxngstxr_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "xfl0ud", name: "Yasin Koç", role: "Support", firepower: 76, liquipedia: "Xfl0ud", photo: "https://liquipedia.net/commons/images/thumb/2/27/Xfl0ud_at_Stake_Ranked_Episode_1.jpg/600px-Xfl0ud_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "nilo", name: "Linus Bergman", role: "Rifler", firepower: 78, liquipedia: "Nilo", photo: "https://liquipedia.net/commons/images/thumb/a/a5/Nilo_at_Stake_Ranked_Episode_1.jpg/600px-Nilo_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "Chr1zN", name: "Christoffer Jung Storgaard", role: "IGL", firepower: 76, liquipedia: "Chr1zN", photo: "https://liquipedia.net/commons/images/thumb/a/a2/Chr1zN_at_BLAST_Bounty_Winter_2026.jpg/600px-Chr1zN_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "susp", name: "Tim Sebastian Ångström", role: "Rifler", firepower: 80, liquipedia: "Susp", photo: "https://liquipedia.net/commons/images/thumb/e/e5/Susp_at_BLAST_Bounty_Winter_2026.jpg/600px-Susp_at_BLAST_Bounty_Winter_2026.jpg" },
    ]
  },
  {
    id: "betboom",
    name: "BetBoom Team",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/5/5b/BetBoom_Team_2024_allmode.png/190px-BetBoom_Team_2024_allmode.png",
    players: [
      { nick: "zorte", name: "Александр Загодыренко", role: "AWPer", firepower: 84, liquipedia: "Zorte", photo: "https://liquipedia.net/commons/images/thumb/4/40/Zorte_at_Stake_Ranked_Episode_1.jpg/600px-Zorte_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "Magnojez", name: "Кирилл Роднов", role: "Rifler", firepower: 78, liquipedia: "Magnojez", photo: "https://liquipedia.net/commons/images/thumb/a/a9/Magnojez_at_Stake_Ranked_Episode_1.jpg/600px-Magnojez_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "Boombl4", name: "Кирилл Сергеевич Михайлов", role: "IGL", firepower: 74, liquipedia: "Boombl4", photo: "https://liquipedia.net/commons/images/thumb/0/03/Boombl4_at_Stake_Ranked_Episode_1.jpg/600px-Boombl4_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "FL4MUS", name: "Тимур Марьев", role: "Entry", firepower: 82, liquipedia: "FL4MUS", photo: "https://liquipedia.net/commons/images/thumb/a/ae/FL4MUS_at_Stake_Ranked_Episode_1.jpg/600px-FL4MUS_at_Stake_Ranked_Episode_1.jpg" },
      { nick: "d1Ledez", name: "Даниил Кустов", role: "Rifler", firepower: 70, liquipedia: "D1Ledez", photo: "https://liquipedia.net/commons/images/thumb/c/cc/D1Ledez_at_LanDaLan_3.jpg/600px-D1Ledez_at_LanDaLan_3.jpg" },
    ]
  },
  {
    id: "big",
    name: "BIG Clan",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/4/4c/BIG_2020_lightmode.png/121px-BIG_2020_lightmode.png",
    players: [
      { nick: "tabseN", name: "Johannes Wodarz", role: "Rifler", firepower: 68, liquipedia: "TabseN", photo: "https://liquipedia.net/commons/images/thumb/5/5e/TabseN_at_CCT_Season_3_Global_Finals.jpg/600px-TabseN_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "JDC", name: "Jon de Castro", role: "Support", firepower: 76, liquipedia: "JDC", photo: "https://liquipedia.net/commons/images/thumb/7/76/JDC_at_CCT_Season_3_Global_Finals.jpg/600px-JDC_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "gr1ks", name: "Глеб Газін", role: "AWPer", firepower: 79, liquipedia: "Gr1ks", photo: "https://liquipedia.net/commons/images/thumb/4/4f/Gr1ks_at_Roman_Imperium_Cup_VII.jpg/600px-Gr1ks_at_Roman_Imperium_Cup_VII.jpg" },
      { nick: "blameF", name: "Benjamin Vang Bremer", role: "Lurker", firepower: 88, liquipedia: "BlameF", photo: "https://liquipedia.net/commons/images/thumb/4/4c/BlameF_at_Roman_Imperium_Cup_IV.jpg/600px-BlameF_at_Roman_Imperium_Cup_IV.jpg" },
      { nick: "faveN", name: "Josef Baumann", role: "Rifler", firepower: 82, liquipedia: "FaveN", photo: "https://liquipedia.net/commons/images/thumb/a/ab/FaveN_at_Roman_Imperium_Cup_IV.jpg/600px-FaveN_at_Roman_Imperium_Cup_IV.jpg" },
    ]
  },
  {
    id: "m80",
    name: "M80",
    stage: "Contenders",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/5/55/M80_2023_allmode.png/152px-M80_2023_allmode.png",
    players: [
      { nick: "Swisher", name: "Michael Bradly Schmid", role: "Entry", firepower: 72, liquipedia: "Swisher", photo: "https://liquipedia.net/commons/images/thumb/5/52/Swisher_at_IEM_Atlanta_2026.jpg/600px-Swisher_at_IEM_Atlanta_2026.jpg" },
      { nick: "slaxz-", name: "Fritz Vincent Dietrich", role: "AWPer", firepower: 77, liquipedia: "Slaxz-", photo: "https://liquipedia.net/commons/images/thumb/8/86/Slaxz-_at_IEM_Atlanta_2026.jpg/600px-Slaxz-_at_IEM_Atlanta_2026.jpg" },
      { nick: "s1n", name: "Elias Leonhard Etienne Stein", role: "Rifler", firepower: 79, liquipedia: "S1n", photo: "https://liquipedia.net/commons/images/thumb/3/3d/S1n_at_IEM_Atlanta_2026.jpg/600px-S1n_at_IEM_Atlanta_2026.jpg" },
      { nick: "Lake", name: "Mason David Sanderson", role: "Rifler", firepower: 85, liquipedia: "Lake", photo: "https://liquipedia.net/commons/images/thumb/7/73/Lake_at_IEM_Atlanta_2026.jpg/600px-Lake_at_IEM_Atlanta_2026.jpg" },
      { nick: "JBa", name: "Joshua John Barutt", role: "Rifler", firepower: 74, liquipedia: "JBa", photo: "https://liquipedia.net/commons/images/thumb/4/49/JBa_at_IEM_Atlanta_2026.jpg/600px-JBa_at_IEM_Atlanta_2026.jpg" },
    ]
  },
  {
    id: "mibr",
    name: "MIBR",
    stage: "Contenders",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/8/85/MIBR_2018_lightmode.png/190px-MIBR_2018_lightmode.png",
    players: [
      { nick: "brnz4n", name: "Breno Augusto de Oliveira Poletto", role: "Entry", firepower: 85, liquipedia: "Brnz4n", photo: "https://liquipedia.net/commons/images/thumb/3/3f/Brnz4n_at_ESL_Pro_League_S21.jpg/600px-Brnz4n_at_ESL_Pro_League_S21.jpg" },
      { nick: "insani", name: "Felipe Yuji Tasaka Kuratani", role: "Support", firepower: 84, liquipedia: "Insani", photo: "https://liquipedia.net/commons/images/thumb/4/43/Insani_at_PGL_Cluj-Napoca_2025.jpg/600px-Insani_at_PGL_Cluj-Napoca_2025.jpg" },
      { nick: "kl1m", name: "Климентий Кривошеев", role: "AWPer", firepower: 83, liquipedia: "Kl1m", photo: "https://liquipedia.net/commons/images/thumb/4/4e/Kl1m_at_SL_Budapest_Major_2025.jpg/600px-Kl1m_at_SL_Budapest_Major_2025.jpg" },
      { nick: "LNZ", name: "Linus Oscar Holtäng", role: "IGL", firepower: 74, liquipedia: "LNZ", photo: "https://liquipedia.net/commons/images/thumb/8/8b/LNZ_at_BLAST_Bounty_Spring_2025.jpg/600px-LNZ_at_BLAST_Bounty_Spring_2025.jpg" },
      { nick: "venomzera", name: "Carlos Eduardo Dias Junior", role: "Rifler", firepower: 80, liquipedia: "Venomzera", photo: "https://liquipedia.net/commons/images/thumb/0/0d/Venomzera_at_SL_Budapest_Major_2025.jpg/600px-Venomzera_at_SL_Budapest_Major_2025.jpg" },
    ]
  },
  {
    id: "sinners",
    name: "SINNERS Esports",
    stage: "Contenders",
    region: "Europe",
    logo: "https://liquipedia.net/commons/images/thumb/4/4f/SINNERS_Esports_allmode.png/136px-SINNERS_Esports_allmode.png",
    players: [
      { nick: "beastik", name: "Sebastian Daňo", role: "Rifler", firepower: 83, liquipedia: "Beastik", photo: "https://liquipedia.net/commons/images/thumb/c/c9/Beastik_at_Roman_Imperium_Cup_VII.jpg/600px-Beastik_at_Roman_Imperium_Cup_VII.jpg" },
      { nick: "SHOCK", name: "Max Kvapil", role: "Rifler", firepower: 75, liquipedia: "SHOCK", photo: "https://liquipedia.net/commons/images/thumb/4/47/SHOCK_at_Roman_Imperium_Cup_VII.jpg/600px-SHOCK_at_Roman_Imperium_Cup_VII.jpg" },
      { nick: "kisserek", name: "Kamil Banak", role: "Rifler", firepower: 78, liquipedia: "Kisserek", photo: "https://liquipedia.net/commons/images/thumb/1/18/Kisserek_at_Roman_Imperium_Cup_VII.jpg/600px-Kisserek_at_Roman_Imperium_Cup_VII.jpg" },
      { nick: "stressarN", name: "Jordan Manevski", role: "Rifler", firepower: 74, liquipedia: "StressarN", photo: "https://liquipedia.net/commons/images/thumb/3/33/StressarN_at_Roman_Imperium_Cup_VII.jpg/600px-StressarN_at_Roman_Imperium_Cup_VII.jpg" },
      { nick: "MoDo", name: "Mădălin-Andrei Mirea", role: "AWPer", firepower: 76, liquipedia: "MoDo", photo: "https://liquipedia.net/commons/images/thumb/f/fe/MoDo_at_Roman_Imperium_Cup_VII.jpg/600px-MoDo_at_Roman_Imperium_Cup_VII.jpg" },
    ]
  },
  {
    id: "nrg",
    name: "NRG Esports",
    stage: "Contenders",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/5/57/NRG_2024_lightmode.png/190px-NRG_2024_lightmode.png",
    players: [
      { nick: "oSee", name: "Joshua Ohm", role: "AWPer", firepower: 81, liquipedia: "OSee", photo: "https://liquipedia.net/commons/images/thumb/2/24/OSee_at_IEM_Krakow_2026.jpg/600px-OSee_at_IEM_Krakow_2026.jpg" },
      { nick: "nitr0", name: "Nicholas Cannella", role: "IGL", firepower: 70, liquipedia: "Nitr0", photo: "https://liquipedia.net/commons/images/thumb/2/22/Nitr0_at_BLAST_Open_Spring_2026.jpg/600px-Nitr0_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "br0", name: "Alexander Talevski Bro", role: "Rifler", firepower: 79, liquipedia: "Br0", photo: "https://liquipedia.net/commons/images/thumb/3/30/Br0_at_BLAST_Open_Spring_2026.jpg/600px-Br0_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Sonic", name: "Aran Groesbeek", role: "Rifler", firepower: 78, liquipedia: "Sonic", photo: "https://liquipedia.net/commons/images/thumb/c/c3/Sonic_at_SL_Budapest_Major_2025.jpg/600px-Sonic_at_SL_Budapest_Major_2025.jpg" },
      { nick: "Grim", name: "Michael Vance Wince", role: "Entry", firepower: 82, liquipedia: "Grim", photo: "https://liquipedia.net/commons/images/thumb/a/a2/Grim_at_BLAST_Open_Spring_2026.jpg/600px-Grim_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "tyloo",
    name: "TYLOO",
    stage: "Contenders",
    region: "Asia",
    logo: "https://liquipedia.net/commons/images/thumb/5/5f/TyLoo_2016_allmode.png/190px-TyLoo_2016_allmode.png",
    players: [
      { nick: "JamYoung", name: "杨易", role: "Rifler", firepower: 73, liquipedia: "JamYoung", photo: "https://liquipedia.net/commons/images/thumb/e/e6/JamYoung_at_BLAST_Open_Spring_2026.jpg/600px-JamYoung_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Moseyuh", name: "陈千豪", role: "Rifler", firepower: 78, liquipedia: "Moseyuh", photo: "https://liquipedia.net/commons/images/thumb/6/67/Moseyuh_at_BLAST_Open_Spring_2026.jpg/600px-Moseyuh_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Mercury", name: "汪靖翔", role: "Rifler", firepower: 76, liquipedia: "Mercury", photo: "https://liquipedia.net/commons/images/thumb/3/36/Mercury_at_BLAST_Open_Spring_2026.jpg/600px-Mercury_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Jee", name: "季冬凯", role: "AWPer", firepower: 79, liquipedia: "Jee", photo: "https://liquipedia.net/commons/images/thumb/e/e7/Jee_at_BLAST_Open_Spring_2026.jpg/600px-Jee_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "Zero", name: "苏景深", role: "Rifler", firepower: 77, liquipedia: "Zero", photo: "https://liquipedia.net/commons/images/thumb/7/7a/Zero_at_BLAST_Open_Spring_2026.jpg/600px-Zero_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "sharks",
    name: "Sharks Esports",
    stage: "Contenders",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/b/b4/Sharks_Esports_2026_allmode.png/190px-Sharks_Esports_2026_allmode.png",
    players: [
      { nick: "gafolo", name: "Victor Alves Pinto Andrade", role: "Rifler", firepower: 80, liquipedia: "Gafolo", photo: "https://liquipedia.net/commons/images/thumb/7/72/Gafolo_at_Roman_Imperium_Cup_III.jpg/600px-Gafolo_at_Roman_Imperium_Cup_III.jpg" },
      { nick: "rdnzao", name: "Daniel de Sá Monteiro", role: "Rifler", firepower: 77, liquipedia: "Rdnzao", photo: "https://liquipedia.net/commons/images/thumb/9/9c/Rdnzao_at_CCT_Season_3_Global_Finals.jpg/600px-Rdnzao_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "doc", name: "Danilo Moraes Barros", role: "Rifler", firepower: 81, liquipedia: "Doc", photo: "https://liquipedia.net/commons/images/thumb/d/d2/Doc_at_CCT_Season_3_Global_Finals.jpg/600px-Doc_at_CCT_Season_3_Global_Finals.jpg" },
      { nick: "koala", name: "João Pedro Alves Pfeffer", role: "Rifler", firepower: 78, liquipedia: "Koala", photo: "https://liquipedia.net/commons/images/thumb/5/55/Koala_at_Roman_Imperium_Cup_III.jpg/600px-Koala_at_Roman_Imperium_Cup_III.jpg" },
      { nick: "maxxkor", name: "Máximo Antonio Cortina", role: "AWPer", firepower: 72, liquipedia: "Maxxkor", photo: "https://liquipedia.net/commons/images/thumb/0/09/Maxxkor_at_Roman_Imperium_Cup_III.jpg/600px-Maxxkor_at_Roman_Imperium_Cup_III.jpg" },
    ]
  },
  {
    id: "gaimin",
    name: "Gaimin Gladiators",
    stage: "Contenders",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/7/78/Gladiators_2022_allmode.png/105px-Gladiators_2022_allmode.png",
    players: [
      { nick: "JOTA", name: "Jhonatan Wilian Leopoldo Gaudencio", role: "Rifler", firepower: 82, liquipedia: "JOTA", photo: "https://liquipedia.net/commons/images/thumb/2/22/JOTA_at_Roman_Imperium_Cup_VI.jpg/600px-JOTA_at_Roman_Imperium_Cup_VI.jpg" },
      { nick: "NEKIZ", name: "Gabriel Selayaran Schenato", role: "Entry", firepower: 73, liquipedia: "NEKIZ", photo: "https://liquipedia.net/commons/images/thumb/1/1c/NEKIZ_at_Roman_Imperium_Cup_VI.jpg/600px-NEKIZ_at_Roman_Imperium_Cup_VI.jpg" },
      { nick: "HEN1", name: "Henrique Teles Ferreira da Fonseca", role: "AWPer", firepower: 84, liquipedia: "HEN1", photo: "https://liquipedia.net/commons/images/thumb/a/a4/HEN1_at_Roman_Imperium_Cup_VI.jpg/600px-HEN1_at_Roman_Imperium_Cup_VI.jpg" },
      { nick: "Luken", name: "Luca Nadotti", role: "Rifler", firepower: 76, liquipedia: "Luken", photo: "https://liquipedia.net/commons/images/thumb/a/a8/Luken_at_Roman_Imperium_Cup_VI.jpg/600px-Luken_at_Roman_Imperium_Cup_VI.jpg" },
      { nick: "fer", name: "Fernando Alvarenga", role: "Entry", firepower: 77, liquipedia: "Fer", photo: "https://liquipedia.net/commons/images/thumb/b/ba/Fer_%40_PGL_Antwerp_2022_AME_RMR.jpg/600px-Fer_%40_PGL_Antwerp_2022_AME_RMR.jpg" },
    ]
  },
  {
    id: "liquid",
    name: "Team Liquid",
    stage: "Contenders",
    region: "Americas",
    logo: "https://liquipedia.net/commons/images/thumb/0/01/Team_Liquid_2024_lightmode.png/153px-Team_Liquid_2024_lightmode.png",
    players: [
      { nick: "NAF", name: "Keith Jordan Markovic", role: "Rifler", firepower: 82, liquipedia: "NAF", photo: "https://liquipedia.net/commons/images/thumb/6/62/NAF_at_BLAST_Open_Spring_2026.jpg/600px-NAF_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "ultimate", name: "Roland Tomkowiak", role: "AWPer", firepower: 78, liquipedia: "Ultimate", photo: "https://liquipedia.net/commons/images/thumb/6/63/Ultimate_at_BLAST_Open_Spring_2026.jpg/600px-Ultimate_at_BLAST_Open_Spring_2026.jpg" },
      { nick: "siuhy", name: "Kamil Tomasz Szkaradek", role: "IGL", firepower: 71, liquipedia: "Siuhy", photo: "https://liquipedia.net/commons/images/thumb/d/df/Siuhy_at_BLAST_Bounty_Winter_2026.jpg/600px-Siuhy_at_BLAST_Bounty_Winter_2026.jpg" },
      { nick: "EliGE", name: "Jonathan David Jablonowski", role: "Entry", firepower: 84, liquipedia: "EliGE", photo: "https://liquipedia.net/commons/images/thumb/e/e3/EliGE_at_SL_Budapest_Major_2025.jpg/600px-EliGE_at_SL_Budapest_Major_2025.jpg" },
      { nick: "malbsMd", name: "Mario Alberto Samayoa Díaz", role: "Entry", firepower: 80, liquipedia: "MalbsMd", photo: "https://liquipedia.net/commons/images/thumb/d/d4/MalbsMd_at_BLAST_Open_Spring_2026.jpg/600px-MalbsMd_at_BLAST_Open_Spring_2026.jpg" },
    ]
  },
  {
    id: "lynnvision",
    name: "Lynn Vision Gaming",
    stage: "Contenders",
    region: "Asia",
    logo: "https://liquipedia.net/commons/images/thumb/e/e7/Lynn_Vision_Gaming_2024_allmode.png/190px-Lynn_Vision_Gaming_2024_allmode.png",
    players: [
      { nick: "westmelon", name: "牛哲", role: "IGL", firepower: 74, liquipedia: "Westmelon", photo: "https://liquipedia.net/commons/images/thumb/8/87/Westmelon_at_ESL_Pro_League_S21.jpg/600px-Westmelon_at_ESL_Pro_League_S21.jpg" },
      { nick: "z4KR", name: "张斯柯", role: "AWPer", firepower: 79, liquipedia: "Z4kr", photo: "https://liquipedia.net/commons/images/thumb/7/7f/Z4kr_at_ESL_Pro_League_S21.jpg/600px-Z4kr_at_ESL_Pro_League_S21.jpg" },
      { nick: "EmiliaQAQ", name: "汤骏杰", role: "Rifler", firepower: 77, liquipedia: "EmiliaQAQ", photo: "https://liquipedia.net/commons/images/thumb/0/04/EmiliaQAQ_at_ESL_Pro_League_S21.jpg/600px-EmiliaQAQ_at_ESL_Pro_League_S21.jpg" },
      { nick: "Starry", name: "叶力至", role: "Rifler", firepower: 80, liquipedia: "Starry", photo: "https://liquipedia.net/commons/images/thumb/0/06/Starry_at_ESL_Pro_League_S21.jpg/600px-Starry_at_ESL_Pro_League_S21.jpg" },
      { nick: "C4LLM3SU3", name: "苏啟浩", role: "Rifler", firepower: 71, liquipedia: "C4LLM3SU3", photo: "https://liquipedia.net/commons/images/thumb/6/6d/C4LLM3SU3_at_ESL_Pro_League_S21.jpg/600px-C4LLM3SU3_at_ESL_Pro_League_S21.jpg" },
    ]
  },
  {
    id: "thunder",
    name: "THUNDER dOWNUNDER",
    stage: "Contenders",
    region: "Asia",
    logo: "https://liquipedia.net/commons/images/thumb/0/05/THUNDERdOWNUNDER_2026_allmode.png/175px-THUNDERdOWNUNDER_2026_allmode.png",
    players: [
      { nick: "asap", name: "Tyson Paterson", role: "Rifler", firepower: 76, liquipedia: "Asap", photo: "https://liquipedia.net/commons/images/thumb/a/ad/Asap_at_ESL_Challenger_Melbourne_2024.jpg/600px-Asap_at_ESL_Challenger_Melbourne_2024.jpg" },
      { nick: "TjP", name: "Tynan Purtell", role: "Rifler", firepower: 75, liquipedia: "TjP", photo: "https://liquipedia.net/commons/images/thumb/6/62/TjP_at_ESL_Pro_League_S22.jpg/600px-TjP_at_ESL_Pro_League_S22.jpg" },
      { nick: "aliStair", name: "Alistair Johnston", role: "AWPer", firepower: 70, liquipedia: "AliStair", photo: "https://liquipedia.net/commons/images/thumb/0/03/AliStair_at_IEM_Chengdu_2024.jpg/600px-AliStair_at_IEM_Chengdu_2024.jpg" },
      { nick: "dexter", name: "Christopher Nong", role: "Rifler", firepower: 74, liquipedia: "Dexter", photo: "https://liquipedia.net/commons/images/thumb/b/bf/Dexter_at_PGL_Cluj-Napoca_2025.jpg/600px-Dexter_at_PGL_Cluj-Napoca_2025.jpg" },
      { nick: "Liazz", name: "John James Tregillgas", role: "Lurker", firepower: 73, liquipedia: "Liazz", photo: "https://liquipedia.net/commons/images/thumb/4/41/Liazz_at_PGL_Cluj-Napoca_2025.jpg/600px-Liazz_at_PGL_Cluj-Napoca_2025.jpg" },
    ]
  },
  {
    id: "flyquest",
    name: "FlyQuest",
    stage: "Contenders",
    region: "Asia",
    logo: "https://liquipedia.net/commons/images/thumb/b/b2/FlyQuest_2021_allmode.png/178px-FlyQuest_2021_allmode.png",
    players: [
      { nick: "INS", name: "Joshua Potter", role: "IGL", firepower: 80, liquipedia: "INS", photo: "https://liquipedia.net/commons/images/thumb/5/53/INS_at_PGL_Cluj-Napoca_2025.jpg/600px-INS_at_PGL_Cluj-Napoca_2025.jpg" },
      { nick: "Vexite", name: "Declan Portelli", role: "Rifler", firepower: 78, liquipedia: "Vexite", photo: "https://liquipedia.net/commons/images/thumb/4/44/Vexite_at_PGL_Cluj-Napoca_2025.jpg/600px-Vexite_at_PGL_Cluj-Napoca_2025.jpg" },
      { nick: "nettik", name: "Corey Browne", role: "Rifler", firepower: 79, liquipedia: "Nettik", photo: "https://liquipedia.net/commons/images/thumb/5/53/Nettik_at_BLAST_Rivals_Spring_2025.jpg/600px-Nettik_at_BLAST_Rivals_Spring_2025.jpg" },
      { nick: "jks", name: "Justin Kyle Savage", role: "Rifler", firepower: 82, liquipedia: "Jks", photo: "https://liquipedia.net/commons/images/thumb/a/a5/Jks_at_IEM_Cologne_2025.jpg/600px-Jks_at_IEM_Cologne_2025.jpg" },
      { nick: "story", name: "João Paulo da Silva Vieira", role: "AWPer", firepower: 73, liquipedia: "Story", photo: "https://liquipedia.net/commons/images/thumb/1/1c/Story_at_PGL_Cluj-Napoca_2025.jpg/600px-Story_at_PGL_Cluj-Napoca_2025.jpg" },
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

function calcTeamScore(pickedPlayers) {
  if (!pickedPlayers || pickedPlayers.length === 0) return 0;
  const avgFP = pickedPlayers.reduce((s, p) => s + p.firepower, 0) / pickedPlayers.length;
  
  const roleCounts = {};
  pickedPlayers.forEach(p => {
    roleCounts[p.role] = (roleCounts[p.role] || 0) + 1;
  });
  
  let multiplier = 1.0;
  for (const [role, cfg] of Object.entries(IDEAL_COMPOSITION)) {
    if ((roleCounts[role] || 0) > cfg.max) multiplier *= cfg.penalty;
  }
  
  const hasIGL = (roleCounts["IGL"] || 0) >= 1;
  const hasAWP = (roleCounts["AWPer"] || 0) >= 1;
  const hasEntry = (roleCounts["Entry"] || 0) >= 1;
  const hasSupport = (roleCounts["Support"] || 0) >= 1;
  const hasRiflerOrLurker = (roleCounts["Rifler"] || 0) + (roleCounts["Lurker"] || 0) >= 1;
  
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
