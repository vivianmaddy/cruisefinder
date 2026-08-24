/* =========================================================
   Wolkenwanderer Cruise Finder – Wissensdatenbank
   ========================================================= */

const REGIONS = [
  { id: 'karibik',    name: 'Karibik',              emoji: '🏝️', desc: 'Weiße Strände, türkises Wasser, Inselhopping' },
  { id: 'mittelmeer', name: 'Mittelmeer',            emoji: '🏛️', desc: 'Kultur, Kulinarik und malerische Häfen' },
  { id: 'nordeuropa', name: 'Nordeuropa & Fjorde',   emoji: '🏔️', desc: 'Dramatische Landschaften, Mitternachtssonne' },
  { id: 'kanaren',    name: 'Kanaren & Atlantik',    emoji: '🌋', desc: 'Ganzjährig mild, vulkanische Inselwelt' },
  { id: 'alaska',     name: 'Alaska',                emoji: '🐋', desc: 'Gletscher, Wildnis, Wale' },
  { id: 'hawaii',     name: 'Hawaii & Südsee',       emoji: '🌺', desc: 'Traumstrände am anderen Ende der Welt' },
  { id: 'asien',      name: 'Asien & Fernost',       emoji: '🏮', desc: 'Tempel, Megacitys und exotische Häfen in Fernost' },
  { id: 'expedition', name: 'Expedition: Arktis & Antarktis', emoji: '🧊', desc: 'Pinguine, Gletscher und echte Wildnis abseits der Massen' },
  { id: 'weltreise',  name: 'Weltreise',             emoji: '🌏', desc: 'Große Weltreise-Abschnitte über mehrere Kontinente' },
];

/* style: 'entertainment' | 'balanced' | 'relax'
   budget: 1 (günstig) – 4 (luxuriös)
   family: eignet sich gut für Familien mit Kindern
   adultsFocus: eher ruhiges, erwachsenenorientiertes Publikum
   bestFor: Kurzbeschreibung, für wen die Reederei am besten passt */
const CRUISE_LINES = [
  {
    id: 'aida', name: 'AIDA Cruises', tagline: 'Bunt, entspannt, Clubatmosphäre an Bord',
    website: 'https://www.aida.de',
    style: 'entertainment', budget: 1, family: true, adultsFocus: false,
    bestFor: 'Junge Reisende und Familien, die viel Programm und Stimmung an Bord lieben – bei moderatem Preis.',
    regions: {
      karibik:    [{ ship: 'AIDAperla',  durations: [7, 11, 14], note: 'Inselhopping ab Guadeloupe' }],
      mittelmeer: [{ ship: 'AIDAcosma',  durations: [7, 10, 14], note: 'Klassische Westmittelmeer-Route' }],
      kanaren:    [{ ship: 'AIDAprima',  durations: [7, 14],     note: 'Winterroute ab Gran Canaria' }],
      nordeuropa: [{ ship: 'AIDAsol',    durations: [7, 10],     note: 'Norwegens Fjorde ab Kiel' }],
    },
  },
  {
    id: 'msc', name: 'MSC Cruises', tagline: 'Italienisches Flair, moderne Mega-Schiffe',
    website: 'https://www.msccruises.de',
    style: 'entertainment', budget: 2, family: true, adultsFocus: false,
    bestFor: 'Familien und Paare, die moderne Mega-Schiffe mit viel Entertainment und italienischem Flair mögen.',
    regions: {
      karibik:    [{ ship: 'MSC Seascape',   durations: [7, 10, 14], note: 'Ab Miami durch die östliche Karibik' }],
      mittelmeer: [{ ship: 'MSC World Europa', durations: [7, 10],   note: 'Ab Barcelona ins westliche Mittelmeer' }],
      kanaren:    [{ ship: 'MSC Virtuosa',   durations: [7, 14],     note: 'Winterroute ab Teneriffa' }],
      nordeuropa: [{ ship: 'MSC Poesia',     durations: [10, 14],    note: 'Fjorde & Nordkap' }],
    },
  },
  {
    id: 'costa', name: 'Costa Kreuzfahrten', tagline: 'La Dolce Vita – italienisches Lebensgefühl',
    website: 'https://www.costakreuzfahrten.de',
    style: 'entertainment', budget: 2, family: true, adultsFocus: false,
    bestFor: 'Genießer italienischer Lebensart, Familien und preisbewusste Erstkreuzfahrer.',
    regions: {
      mittelmeer: [{ ship: 'Costa Smeralda', durations: [7, 10], note: 'Ab Savona durchs Westmittelmeer' }],
      karibik:    [{ ship: 'Costa Toscana',  durations: [7, 14], note: 'Winterroute ab Guadeloupe' }],
    },
  },
  {
    id: 'tui', name: 'TUI Cruises (Mein Schiff)', tagline: 'Premium-Clubschiff, entspannt & stilvoll',
    website: 'https://www.tuicruises.com',
    style: 'balanced', budget: 3, family: true, adultsFocus: false,
    bestFor: 'Paare und Familien, die Premium-Komfort in entspannter Club-Atmosphäre suchen.',
    regions: {
      karibik:    [{ ship: 'Mein Schiff 6', durations: [10, 14],     note: 'Ab Bridgetown durch die Karibik' }],
      mittelmeer: [{ ship: 'Mein Schiff 7', durations: [7, 10],      note: 'Ab Palma durchs Mittelmeer' }],
      nordeuropa: [{ ship: 'Mein Schiff 4', durations: [10, 14],     note: 'Norwegen & Nordkap ab Hamburg' }],
      kanaren:    [{ ship: 'Mein Schiff 3', durations: [7, 14],      note: 'Winterroute ab Teneriffa' }],
      weltreise:  [{ ship: 'Mein Schiff 5', durations: [14, 30, 120], note: 'Große Weltreise-Abschnitte' }],
    },
  },
  {
    id: 'royal', name: 'Royal Caribbean International', tagline: 'Action, Rekorde, XXL-Entertainment',
    website: 'https://www.royalcaribbean.com',
    style: 'entertainment', budget: 3, family: true, adultsFocus: false,
    bestFor: 'Familien und Gruppen, die Rekorde, Action und XXL-Entertainment an Bord lieben.',
    regions: {
      karibik:    [{ ship: 'Icon of the Seas',  durations: [7],      note: 'Wasserpark & Achterbahn-Feeling' }],
      mittelmeer: [{ ship: 'Wonder of the Seas', durations: [7, 10], note: 'Ab Rom durchs Mittelmeer' }],
      alaska:     [{ ship: 'Quantum of the Seas', durations: [7, 10], note: 'Gletscher & Wildnis' }],
      asien:      [{ ship: 'Spectrum of the Seas', durations: [4, 7], note: 'Ab Singapur durch Südostasien' }],
    },
  },
  {
    id: 'ncl', name: 'Norwegian Cruise Line', tagline: 'Freestyle Cruising – flexibel & international',
    website: 'https://www.ncl.com',
    style: 'balanced', budget: 3, family: true, adultsFocus: false,
    bestFor: 'Flexible Reisende und Paare, die Freestyle-Atmosphäre ohne feste Tischzeiten schätzen.',
    regions: {
      hawaii:     [{ ship: 'Pride of America', durations: [7, 14], note: 'Einziges Schiff mit wöchentlicher Interinsel-Route durch Hawaii' }],
      karibik:    [{ ship: 'Norwegian Bliss',  durations: [7, 10], note: 'Ab Miami / New York' }],
      alaska:     [{ ship: 'Norwegian Encore', durations: [7],     note: 'Ab Seattle entlang der Inside Passage' }],
      mittelmeer: [{ ship: 'Norwegian Epic',   durations: [7, 10], note: 'Ab Rom durchs Mittelmeer' }],
    },
  },
  {
    id: 'princess', name: 'Princess Cruises', tagline: 'Klassisch-gehoben, ruhig und stilvoll',
    website: 'https://www.princess.com',
    style: 'relax', budget: 3, family: true, adultsFocus: true,
    bestFor: 'Paare und reifere Reisende, die einen klassisch-gehobenen, ruhigen Stil bevorzugen.',
    regions: {
      alaska:     [{ ship: 'Discovery Princess', durations: [7, 10], note: 'Gletscherfahrt & Naturparks' }],
      hawaii:     [{ ship: 'Royal Princess',     durations: [14, 15], note: 'Südsee-Route ab Los Angeles' }],
      karibik:    [{ ship: 'Sun Princess',       durations: [7, 10], note: 'Ab Fort Lauderdale' }],
      asien:      [{ ship: 'Diamond Princess',   durations: [7, 10, 14], note: 'Japan-Rundreise inkl. Kyoto & Okinawa' }],
      weltreise:  [{ ship: 'Island Princess',    durations: [14, 28, 111], note: 'Lange Fernost- & Weltreise-Abschnitte' }],
    },
  },
  {
    id: 'hlc', name: 'Hapag-Lloyd Cruises', tagline: '5-Sterne-plus, Gourmet, Ruhe und Exklusivität',
    website: 'https://www.hl-cruises.com',
    style: 'relax', budget: 4, family: false, adultsFocus: true,
    bestFor: 'Erwachsene, die höchsten Komfort, Gourmet-Küche und Exklusivität suchen.',
    regions: {
      nordeuropa: [{ ship: 'EUROPA 2',    durations: [10, 14], note: 'Norwegen exklusiv & kleine Häfen' }],
      weltreise:  [{ ship: 'EUROPA',      durations: [14, 30, 120], note: 'Große Weltreise in höchstem Komfort' }],
      hawaii:     [{ ship: 'HANSEATIC inspiration', durations: [14, 17], note: 'Südsee-Expedition abseits der Massen' }],
      mittelmeer: [{ ship: 'EUROPA 2',    durations: [7, 10],  note: 'Kleine, exklusive Häfen abseits der Massen' }],
      expedition: [{ ship: 'HANSEATIC nature', durations: [14, 20], note: 'Antarktis & Arktis in kleinen Gruppen, 5-Sterne-Komfort' }],
    },
  },
  {
    id: 'reswc', name: 'Resorts World Cruises', tagline: 'Asiatisches Flair, Casino & Entertainment ab Singapur',
    website: 'https://www.resortsworldcruises.com',
    style: 'entertainment', budget: 2, family: true, adultsFocus: false,
    bestFor: 'Kurzentschlossene und Familien, die einen lebhaften Kurztrip ab Singapur suchen.',
    regions: {
      asien: [{ ship: 'Genting Dream', durations: [4, 5, 7], note: 'Kurzreisen ab Singapur nach Malaysia & Thailand' }],
    },
  },
  {
    id: 'hurtigruten', name: 'Hurtigruten Expeditions', tagline: 'Kleine Expeditionsschiffe für Arktis, Antarktis & Wildnis',
    website: 'https://www.hurtigruten.com',
    style: 'relax', budget: 3, family: false, adultsFocus: true,
    bestFor: 'Naturliebhaber, Paare und Alleinreisende, die echte Wildnis und Expeditionen abseits der Massen suchen.',
    regions: {
      expedition: [{ ship: 'MS Fridtjof Nansen', durations: [10, 14, 18], note: 'Antarktis-Expedition mit Zodiac-Anlandungen' }],
      nordeuropa: [{ ship: 'MS Trollfjord',      durations: [7, 11],      note: 'Norwegens Küste entlang der klassischen Postschiffroute' }],
    },
  },
];

/* Kabinentypen */
const CABIN_TYPES = {
  innen: {
    name: 'Innenkabine', emoji: '🛏️',
    desc: 'Der günstigste Einstieg: kompakt, gemütlich, ohne Fenster – ideal, wenn du ohnehin die meiste Zeit an Deck verbringst.',
  },
  aussen: {
    name: 'Außenkabine', emoji: '🌤️',
    desc: 'Tageslicht durch Bullauge oder Fenster, ohne Balkon – guter Mittelweg aus Preis und Meerblick.',
  },
  balkon: {
    name: 'Balkonkabine', emoji: '🌊',
    desc: 'Dein eigener Rückzugsort mit Meerblick und frischer Luft direkt an Bord – der Klassiker für Paare.',
  },
  suite: {
    name: 'Suite', emoji: '👑',
    desc: 'Maximaler Komfort: mehr Platz, oft eigener Butler-Service und exklusive Extras – für den ganz besonderen Urlaub.',
  },
};

const DURATION_LABELS = {
  kurz: { label: '4–7 Tage', target: 7 },
  mittel: { label: '8–11 Tage', target: 10 },
  lang: { label: '12+ Tage', target: 14 },
  egal: { label: 'Egal, Hauptsache passend', target: null },
};

const STYLE_LABELS = {
  relax: 'Ruhe & Entspannung',
  balanced: 'Ausgewogen',
  entertainment: 'Entertainment & Party',
};

const BUDGET_LABELS = { 1: 'Günstig', 2: 'Mittel', 3: 'Gehoben', 4: 'Luxuriös' };
