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
   bestFor: Kurzbeschreibung, für wen die Reederei am besten passt
   profile: allgemeine Basics, Flotte/Schiffsklassen (Auswahl) & Bord-Highlights */
const CRUISE_LINES = [
  {
    id: 'aida', name: 'AIDA Cruises', tagline: 'Bunt, entspannt, Clubatmosphäre an Bord',
    website: 'https://www.aida.de',
    style: 'entertainment', budget: 1, family: true, adultsFocus: false,
    bestFor: 'Junge Reisende und Familien, die viel Programm und Stimmung an Bord lieben – bei moderatem Preis.',
    profile: {
      founded: '1996', headquarters: 'Rostock, Deutschland', fleetSize: 'rund 11 Schiffe',
      shipClasses: ['AIDAnova-Klasse – AIDAnova, AIDAcosma (LNG-angetrieben)', 'Hyperion-Klasse – AIDAprima, AIDAperla', 'Sphinx-Klasse – AIDAsol, AIDAmar, AIDAblu, AIDAbella, AIDAluna'],
      fleet: ['AIDAnova', 'AIDAcosma', 'AIDAprima', 'AIDAperla', 'AIDAsol', 'AIDAmar', 'AIDAblu'],
      highlights: ['Deutschsprachige Crew & Ansagen', 'Optionales All-Inclusive-Paket buchbar', 'Beach Club, Wasserrutschen & Kletterwald an Bord', 'Buffet-Restaurant „Markt" mit Schauküchen'],
    },
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
    profile: {
      founded: '1990', headquarters: 'Genf, Schweiz', fleetSize: 'rund 22 Schiffe',
      shipClasses: ['World-Klasse – MSC World Europa, MSC World America', 'Meraviglia-Klasse – MSC Meraviglia, MSC Bellissima, MSC Grandiosa', 'Seaside-Klasse – MSC Seaside, MSC Seascape'],
      fleet: ['MSC World Europa', 'MSC Grandiosa', 'MSC Meraviglia', 'MSC Seascape', 'MSC Virtuosa', 'MSC Bellissima'],
      highlights: ['Italienisches Flair & Küche an Bord', 'Yacht Club – exklusiver Schiff-im-Schiff-Bereich', '„Cirque du Soleil at Sea" auf ausgewählten Schiffen', 'Großes Kids- & Teens-Programm'],
    },
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
    profile: {
      founded: '1854 (Reederei-Wurzeln)', headquarters: 'Genua, Italien', fleetSize: 'rund 8 Schiffe',
      shipClasses: ['Excellence-Klasse – Costa Smeralda, Costa Toscana (LNG-angetrieben)', 'Concordia-Klasse – u. a. Costa Diadema'],
      fleet: ['Costa Toscana', 'Costa Smeralda', 'Costa Diadema', 'Costa Fascinosa', 'Costa Favolosa'],
      highlights: ['Italienisches Ambiente & Pizzeria an Bord', 'Familienfreundliches Unterhaltungsprogramm', 'Oft günstige Einstiegspreise', 'Mehrsprachiges Bordprogramm'],
    },
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
    profile: {
      founded: '2008', headquarters: 'Hamburg, Deutschland', fleetSize: '7 Schiffe',
      shipClasses: ['Mein Schiff-Neubauklasse – Mein Schiff 3 bis Mein Schiff 7 (baugleiche Schwesterschiffe)', 'Mein Schiff 1 & 2 – umgebaute, kleinere Bestandsschiffe'],
      fleet: ['Mein Schiff 7', 'Mein Schiff 6', 'Mein Schiff 5', 'Mein Schiff 4', 'Mein Schiff 3', 'Mein Schiff 2', 'Mein Schiff 1'],
      highlights: ['Deutschsprachiges Clubschiff-Konzept', 'Premium-All-Inclusive inklusive', 'Kein Bordzwang – lockere Kleiderordnung', 'Ruhige, erwachsenenfreundliche Atmosphäre'],
    },
    regions: {
      karibik:    [{ ship: 'Mein Schiff 6', durations: [10, 14],     note: 'Ab Bridgetown durch die Karibik' }],
      mittelmeer: [{ ship: 'Mein Schiff 7', durations: [7, 10],      note: 'Ab Palma durchs Mittelmeer' }],
      nordeuropa: [{ ship: 'Mein Schiff 4', durations: [10, 14],     note: 'Norwegen & Nordkap ab Hamburg' }],
      kanaren:    [{ ship: 'Mein Schiff 3', durations: [7, 14],      note: 'Winterroute ab Teneriffa' }],
      weltreise:  [{ ship: 'Mein Schiff 5', durations: [14, 30, 120], note: 'Große Weltreise-Abschnitte' }],
    },
  },
  {
    id: 'phoenix', name: 'Phoenix Reisen', tagline: 'Klassische Hochseekreuzfahrt ohne Trubel',
    website: 'https://www.phoenixreisen.com',
    style: 'relax', budget: 2, family: false, adultsFocus: true,
    bestFor: 'Reifere, oft ältere Reisende, die klassische Kreuzfahrten ohne Familientrubel und mit ausführlichen Landausflügen schätzen.',
    profile: {
      founded: '1984', headquarters: 'Bonn, Deutschland', fleetSize: '2 Hochseeschiffe (plus Flusskreuzfahrt-Flotte)',
      shipClasses: ['Traditionsschiffe – Amadea und Artania, keine modernen Großschiffe'],
      fleet: ['Amadea', 'Artania'],
      highlights: ['Sehr klassischer, unaufgeregter Kreuzfahrtstil', 'Landausflüge oft im Reisepreis enthalten', 'Deutschsprachige Reiseleitung', 'Treue Stammgästeschaft, ruhige Atmosphäre'],
    },
    regions: {
      mittelmeer: [{ ship: 'Artania', durations: [10, 14], note: 'Klassische Mittelmeer-Rundreise' }],
      nordeuropa: [{ ship: 'Amadea',  durations: [10, 14], note: 'Fjordroute ab Bremerhaven' }],
      weltreise:  [{ ship: 'Artania', durations: [14, 30, 120], note: 'Lange Weltreise-Abschnitte' }],
    },
  },
  {
    id: 'royal', name: 'Royal Caribbean International', tagline: 'Action, Rekorde, XXL-Entertainment',
    website: 'https://www.royalcaribbean.com',
    style: 'entertainment', budget: 3, family: true, adultsFocus: false,
    bestFor: 'Familien und Gruppen, die Rekorde, Action und XXL-Entertainment an Bord lieben.',
    profile: {
      founded: '1968', headquarters: 'Miami, USA', fleetSize: 'rund 28 Schiffe',
      shipClasses: ['Icon-Klasse – Icon of the Seas, Star of the Seas', 'Oasis-Klasse – u. a. Wonder of the Seas, Symphony of the Seas', 'Quantum-Klasse – u. a. Quantum of the Seas, Spectrum of the Seas'],
      fleet: ['Icon of the Seas', 'Wonder of the Seas', 'Symphony of the Seas', 'Spectrum of the Seas', 'Quantum of the Seas'],
      highlights: ['Zu den größten Passagierschiffen der Welt', 'Wasserparks, Achterbahnen & Zipline an Bord', 'Broadway-Shows & Eislaufbühnen', 'Sehr familienfreundliches Aktivitätsprogramm'],
    },
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
    profile: {
      founded: '1966', headquarters: 'Miami, USA', fleetSize: 'rund 20 Schiffe',
      shipClasses: ['Prima-Klasse – u. a. Norwegian Prima, Norwegian Viva', 'Breakaway-Plus-Klasse – u. a. Norwegian Bliss, Norwegian Encore'],
      fleet: ['Norwegian Bliss', 'Norwegian Encore', 'Norwegian Epic', 'Pride of America', 'Norwegian Prima'],
      highlights: ['Freestyle Cruising – keine festen Tischzeiten', 'Große Auswahl an Spezialitätenrestaurants', '„The Haven" – exklusiver Suiten-Bereich', 'Flexibel & international ausgerichtet'],
    },
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
    profile: {
      founded: '1965', headquarters: 'Santa Clarita, USA', fleetSize: 'rund 15 Schiffe',
      shipClasses: ['Sphere-Klasse – Sun Princess, Star Princess', 'Royal-Klasse – u. a. Royal Princess, Discovery Princess'],
      fleet: ['Sun Princess', 'Discovery Princess', 'Royal Princess', 'Diamond Princess', 'Island Princess'],
      highlights: ['Klassisch-gehobenes Ambiente', '„MedallionClass" – digitales Wearable an Bord', 'Bekannt für Alaska- & Weltreisen', 'Ruhiger, weniger party-lastiger Stil'],
    },
    regions: {
      alaska:     [{ ship: 'Discovery Princess', durations: [7, 10], note: 'Gletscherfahrt & Naturparks' }],
      hawaii:     [{ ship: 'Royal Princess',     durations: [14, 15], note: 'Südsee-Route ab Los Angeles' }],
      karibik:    [{ ship: 'Sun Princess',       durations: [7, 10], note: 'Ab Fort Lauderdale' }],
      asien:      [{ ship: 'Diamond Princess',   durations: [7, 10, 14], note: 'Japan-Rundreise inkl. Kyoto & Okinawa' }],
      weltreise:  [{ ship: 'Island Princess',    durations: [14, 28, 111], note: 'Lange Fernost- & Weltreise-Abschnitte' }],
    },
  },
  {
    id: 'celebrity', name: 'Celebrity Cruises', tagline: 'Modern Luxury – gehobenes Design, ruhiger Premium-Stil',
    website: 'https://www.celebritycruises.com',
    style: 'relax', budget: 3, family: true, adultsFocus: true,
    bestFor: 'Paare und Genießer, die modernen, stilvollen Komfort ohne starken Kinderprogramm-Fokus suchen.',
    profile: {
      founded: '1988', headquarters: 'Miami, USA', fleetSize: 'rund 15 Schiffe',
      shipClasses: ['Edge-Klasse – Celebrity Edge, Celebrity Apex, Celebrity Beyond, Celebrity Ascent', 'Solstice-Klasse – u. a. Celebrity Silhouette, Celebrity Reflection'],
      fleet: ['Celebrity Beyond', 'Celebrity Apex', 'Celebrity Edge', 'Celebrity Silhouette', 'Celebrity Reflection'],
      highlights: ['„Modern Luxury" – gehobenes Design & Gastronomie', 'The Retreat – exklusiver Suiten-Bereich', 'Sehr gute Spezialitätenrestaurants', 'Ruhigere, adult-orientierte Atmosphäre'],
    },
    regions: {
      karibik:    [{ ship: 'Celebrity Beyond', durations: [7, 10], note: 'Ab Fort Lauderdale durch die östliche Karibik' }],
      mittelmeer: [{ ship: 'Celebrity Apex',   durations: [7, 10], note: 'Ab Barcelona durchs Mittelmeer' }],
      alaska:     [{ ship: 'Celebrity Silhouette', durations: [7], note: 'Ab Seattle entlang der Inside Passage' }],
    },
  },
  {
    id: 'holland', name: 'Holland America Line', tagline: 'Klassisch-elegant, stark bei Alaska & Weltreisen',
    website: 'https://www.hollandamerica.com',
    style: 'relax', budget: 3, family: false, adultsFocus: true,
    bestFor: 'Reifere Reisende und Naturliebhaber, die klassische Eleganz und Ziele wie Alaska schätzen.',
    profile: {
      founded: '1873', headquarters: 'Seattle, USA', fleetSize: 'rund 11 Schiffe',
      shipClasses: ['Pinnacle-Klasse – Koningsdam, Nieuw Statendam, Rotterdam, Santa Maria', 'Signature-Klasse – u. a. Eurodam, Nieuw Amsterdam'],
      fleet: ['Koningsdam', 'Nieuw Statendam', 'Rotterdam', 'Eurodam', 'Nieuw Amsterdam'],
      highlights: ['Klassisch-elegantes Ambiente', 'Sehr stark im Alaska-Segment', 'Kulinarik-Partnerschaft mit America\'s Test Kitchen', 'Ruhiger, destinationsorientierter Stil'],
    },
    regions: {
      alaska:    [{ ship: 'Koningsdam', durations: [7, 10], note: 'Gletscherrouten & Inside Passage ab Seattle' }],
      karibik:   [{ ship: 'Nieuw Amsterdam', durations: [7, 10], note: 'Ab Fort Lauderdale durch die Karibik' }],
      weltreise: [{ ship: 'Rotterdam', durations: [14, 30, 116], note: 'Grand World Voyage in mehreren Abschnitten' }],
    },
  },
  {
    id: 'carnival', name: 'Carnival Cruise Line', tagline: '„Fun Ship"-Feeling zu günstigen Preisen',
    website: 'https://www.carnival.com',
    style: 'entertainment', budget: 1, family: true, adultsFocus: false,
    bestFor: 'Preisbewusste Familien und Erstkreuzfahrer, die unkompliziertes „Fun Ship"-Feeling suchen.',
    profile: {
      founded: '1972', headquarters: 'Miami, USA', fleetSize: 'rund 27 Schiffe',
      shipClasses: ['Excel-Klasse – Mardi Gras, Carnival Celebration, Carnival Jubilee', 'Vista-Klasse – u. a. Carnival Horizon, Carnival Panorama'],
      fleet: ['Mardi Gras', 'Carnival Celebration', 'Carnival Jubilee', 'Carnival Horizon', 'Carnival Panorama'],
      highlights: ['„Fun Ship"-Konzept mit viel Programm', 'Sehr günstige Einstiegspreise', 'RedFrog Pub & Guy\'s Burger Joint an Bord', 'Größte Kreuzfahrtflotte Nordamerikas'],
    },
    regions: {
      karibik: [{ ship: 'Mardi Gras', durations: [7], note: 'Ab Port Canaveral durch die östliche Karibik' }],
    },
  },
  {
    id: 'disney', name: 'Disney Cruise Line', tagline: 'Durchgestyltes Familienerlebnis mit Disney-Charakteren',
    website: 'https://disneycruise.disney.go.com',
    style: 'entertainment', budget: 4, family: true, adultsFocus: false,
    bestFor: 'Familien mit Kindern, die ein durchgestyltes Disney-Erlebnis inklusive Charakteren an Bord suchen.',
    profile: {
      founded: '1998', headquarters: 'Celebration, Florida, USA', fleetSize: '6 Schiffe',
      shipClasses: ['Wish-Klasse – Disney Wish, Disney Treasure', 'Dream-Klasse – Disney Dream, Disney Fantasy', 'Magic-Klasse – Disney Magic, Disney Wonder'],
      fleet: ['Disney Wish', 'Disney Treasure', 'Disney Dream', 'Disney Fantasy', 'Disney Magic'],
      highlights: ['Private Insel Castaway Cay in der Karibik', 'Disney-Charaktere & Broadway-Shows an Bord', 'Adults-Only-Bereiche trotz Familienfokus', 'Sehr hoher Betreuungsstandard für Kinder'],
    },
    regions: {
      karibik: [{ ship: 'Disney Wish', durations: [7], note: 'Ab Port Canaveral inkl. Privatinsel Castaway Cay' }],
    },
  },
  {
    id: 'cunard', name: 'Cunard', tagline: 'Britische Tradition, formelle Abende, echte Ozeanliner-Eleganz',
    website: 'https://www.cunard.com',
    style: 'relax', budget: 4, family: false, adultsFocus: true,
    bestFor: 'Traditionsbewusste Reisende, die britische Eleganz, formelle Abende und klassische Transatlantiküberfahrten lieben.',
    profile: {
      founded: '1840', headquarters: 'Southampton, Vereinigtes Königreich', fleetSize: '4 Schiffe',
      shipClasses: ['Queen Mary 2 – einziger echter Ozeanliner im aktiven Liniendienst', 'Queen-Klasse – Queen Victoria, Queen Elizabeth, Queen Anne'],
      fleet: ['Queen Mary 2', 'Queen Victoria', 'Queen Elizabeth', 'Queen Anne'],
      highlights: ['Klassische Transatlantiküberfahrt mit der Queen Mary 2', 'Formelle Abende mit Dresscode', 'Sehr traditionsreiche, britische Atmosphäre', 'Große Bibliothek & Ballsaal an Bord'],
    },
    regions: {
      weltreise:  [{ ship: 'Queen Mary 2', durations: [7, 14, 30], note: 'Klassische Transatlantiküberfahrt & Weltreise-Abschnitte' }],
      mittelmeer: [{ ship: 'Queen Victoria', durations: [10, 14], note: 'Ab Southampton durchs Mittelmeer' }],
    },
  },
  {
    id: 'hlc', name: 'Hapag-Lloyd Cruises', tagline: '5-Sterne-plus, Gourmet, Ruhe und Exklusivität',
    website: 'https://www.hl-cruises.com',
    style: 'relax', budget: 4, family: false, adultsFocus: true,
    bestFor: 'Erwachsene, die höchsten Komfort, Gourmet-Küche und Exklusivität suchen.',
    profile: {
      founded: 'Reederei-Tradition seit 1891', headquarters: 'Hamburg, Deutschland', fleetSize: '5 Schiffe',
      shipClasses: ['EUROPA-Klasse – EUROPA, EUROPA 2 (5-Sterne-plus)', 'HANSEATIC-Klasse – HANSEATIC nature, HANSEATIC inspiration, HANSEATIC spirit (Expedition)'],
      fleet: ['EUROPA', 'EUROPA 2', 'HANSEATIC nature', 'HANSEATIC inspiration', 'HANSEATIC spirit'],
      highlights: ['5-Sterne-plus-Standard, sehr persönlicher Service', 'Gourmet-Küche auf höchstem Niveau', 'Kleine Passagierzahl, viel Privatsphäre', 'Expeditions- und Weltreise-Spezialist'],
    },
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
    profile: {
      founded: 'Marke seit 2016 (vormals Dream Cruises)', headquarters: 'Singapur', fleetSize: '2 Schiffe',
      shipClasses: ['Global-Klasse – Genting Dream, Resorts World One'],
      fleet: ['Genting Dream', 'Resorts World One'],
      highlights: ['Casino & asiatisch geprägtes Entertainment', 'Kurzreisen ideal für Erstkreuzfahrer', 'Vielfältige asiatische Küche an Bord', 'Ab Singapur in wenigen Tagen unterwegs'],
    },
    regions: {
      asien: [{ ship: 'Genting Dream', durations: [4, 5, 7], note: 'Kurzreisen ab Singapur nach Malaysia & Thailand' }],
    },
  },
  {
    id: 'hurtigruten', name: 'Hurtigruten Expeditions', tagline: 'Kleine Expeditionsschiffe für Arktis, Antarktis & Wildnis',
    website: 'https://www.hurtigruten.com',
    style: 'relax', budget: 3, family: false, adultsFocus: true,
    bestFor: 'Naturliebhaber, Paare und Alleinreisende, die echte Wildnis und Expeditionen abseits der Massen suchen.',
    profile: {
      founded: '1893', headquarters: 'Oslo, Norwegen', fleetSize: 'rund 15 Schiffe (Expedition & Postschiffroute)',
      shipClasses: ['Explorer-Klasse – MS Fridtjof Nansen, MS Roald Amundsen (Hybridantrieb)', 'Klassische Postschiffe – u. a. MS Trollfjord, MS Nordkapp'],
      fleet: ['MS Fridtjof Nansen', 'MS Roald Amundsen', 'MS Trollfjord', 'MS Nordkapp'],
      highlights: ['Zodiac-Anlandungen & Expeditionsteam an Bord', 'Fokus auf Natur, Wissenschaft & Nachhaltigkeit', 'Hybridantrieb auf neueren Schiffen', 'Kleine Passagierzahl, keine Kinderanimation'],
    },
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

/* Style- & Preis-Metadaten: Label, Emoji und Farbe fürs Hervorheben im Explorer */
const STYLE_META = {
  relax:         { label: 'Ruhe & Entspannung',   emoji: '🧘', color: '#6a95ca' },
  balanced:      { label: 'Ausgewogener Mix',      emoji: '⚖️', color: '#7a8fae' },
  entertainment: { label: 'Entertainment & Party', emoji: '🎉', color: '#e8a37e' },
};

const BUDGET_META = {
  1: { label: 'Günstig',   symbol: '€' },
  2: { label: 'Mittel',    symbol: '€€' },
  3: { label: 'Gehoben',   symbol: '€€€' },
  4: { label: 'Luxuriös',  symbol: '€€€€' },
};
