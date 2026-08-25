/* =========================================================
   Wolkenwanderer Cruise Finder – Wissensdatenbank

   Flotten, Schiffsklassen und Basisdaten sind auf dem Stand von
   August 2026 recherchiert. Cruise-Flotten ändern sich laufend
   (Neubauten, Umbenennungen, Verkäufe) – bei Bedarf gegen die
   aktuellen offiziellen Angaben der jeweiligen Reederei prüfen.
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
   profile.fleet: vollständige aktuelle Flotte (keine Auswahl) */
const CRUISE_LINES = [
  {
    id: 'aida', name: 'AIDA Cruises', tagline: 'Bunt, entspannt, Clubatmosphäre an Bord',
    website: 'https://www.aida.de',
    style: 'entertainment', budget: 1, family: true, adultsFocus: false,
    bestFor: 'Wer viel Programm, Musik und Trubel an Bord mag und dabei nicht Unsummen ausgeben will, ist bei AIDA richtig – vor allem junge Leute und Familien.',
    profile: {
      founded: '1996', headquarters: 'Rostock, Deutschland', fleetSize: '11 Schiffe',
      shipClasses: [
        'Helios-Klasse (LNG-angetrieben) – AIDAnova, AIDAcosma',
        'Hyperion-Klasse – AIDAprima, AIDAperla',
        'Sphinx-Klasse – AIDAdiva, AIDAbella, AIDAluna, AIDAblu, AIDAsol, AIDAmar, AIDAstella',
      ],
      fleet: ['AIDAnova', 'AIDAcosma', 'AIDAprima', 'AIDAperla', 'AIDAdiva', 'AIDAbella', 'AIDAluna', 'AIDAblu', 'AIDAsol', 'AIDAmar', 'AIDAstella'],
      highlights: [
        'An Bord wird durchgehend Deutsch gesprochen',
        'All-Inclusive ist optional dazubuchbar, nicht automatisch inklusive',
        'Beach Club, Wasserrutschen und Kletterwald sorgen für Action an Deck',
        'Das Buffet-Restaurant „Markt" mit offenen Schauküchen ist bei den meisten Gästen der Favorit',
      ],
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
    bestFor: 'Familien und Paare, denen ein modernes Großschiff mit viel Unterhaltung und italienischem Charme wichtiger ist als Understatement.',
    profile: {
      founded: '1990', headquarters: 'Genf, Schweiz', fleetSize: '25 Schiffe',
      shipClasses: [
        'World-Klasse (LNG) – MSC World Europa, MSC World America, MSC World Asia, MSC World Atlantic',
        'Meraviglia-Plus-Klasse – MSC Grandiosa, MSC Virtuosa',
        'Meraviglia-Klasse – MSC Meraviglia, MSC Bellissima',
        'Seaside- & Seaside-EVO-Klasse – MSC Seaside, MSC Seaview, MSC Seashore, MSC Seascape',
        'Fantasia-Klasse – MSC Fantasia, MSC Splendida, MSC Divina, MSC Preziosa',
        'Musica-Klasse – MSC Musica, MSC Orchestra, MSC Poesia, MSC Magnifica',
        'Lirica-Klasse – MSC Lirica, MSC Opera, MSC Armonia, MSC Sinfonia',
        'Sonstige – MSC Euribia (LNG-Neubau)',
      ],
      fleet: ['MSC World Europa', 'MSC World America', 'MSC World Asia', 'MSC World Atlantic', 'MSC Grandiosa', 'MSC Virtuosa', 'MSC Meraviglia', 'MSC Bellissima', 'MSC Seaside', 'MSC Seaview', 'MSC Seashore', 'MSC Seascape', 'MSC Fantasia', 'MSC Splendida', 'MSC Divina', 'MSC Preziosa', 'MSC Musica', 'MSC Orchestra', 'MSC Poesia', 'MSC Magnifica', 'MSC Lirica', 'MSC Opera', 'MSC Armonia', 'MSC Sinfonia', 'MSC Euribia'],
      highlights: [
        'Der Yacht Club ist ein eigener, abgetrennter Premium-Bereich an Bord',
        'Auf einigen Schiffen tritt der „Cirque du Soleil at Sea" auf',
        'Kids- und Teens-Club gehören zu den größten der Branche',
        'Ab Mai 2026 fährt MSC erstmals auch Alaska-Routen, mit der MSC Poesia ab Seattle',
      ],
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
    bestFor: 'Preisbewusste Erstkreuzfahrer und Familien, die italienisches Flair mögen und nicht das allerneueste Schiff brauchen.',
    profile: {
      founded: '1854 (Reederei-Wurzeln)', headquarters: 'Genua, Italien', fleetSize: '9 Schiffe – ab September 2026 8, wenn Costa Fortuna die Flotte verlässt',
      shipClasses: [
        'Excellence-Klasse (LNG) – Costa Toscana, Costa Smeralda',
        'Diadema-Klasse – Costa Diadema',
        'Concordia-Klasse – Costa Serena, Costa Pacifica, Costa Favolosa, Costa Fascinosa',
        'Luminosa-Klasse – Costa Deliziosa',
        'Destiny-Klasse – Costa Fortuna (wird im September 2026 verkauft)',
      ],
      fleet: ['Costa Toscana', 'Costa Smeralda', 'Costa Diadema', 'Costa Serena', 'Costa Pacifica', 'Costa Favolosa', 'Costa Fascinosa', 'Costa Deliziosa', 'Costa Fortuna'],
      highlights: [
        'Italienisches Ambiente inklusive Pizzeria an Bord',
        'Meist eines der günstigeren Tickets unter den großen Marken',
        'Mehrsprachiges Bordprogramm, nicht nur auf Italienisch oder Deutsch ausgelegt',
        'Die älteste Costa Fortuna wird 2026 verkauft, die Flotte wird dadurch etwas kleiner und jünger',
      ],
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
    bestFor: 'Paare und Familien, die einen gehobenen Standard möchten, aber keine steife Atmosphäre – dafür ist TUI Cruises so etwas wie der deutsche Mittelweg.',
    profile: {
      founded: '2008', headquarters: 'Hamburg, Deutschland', fleetSize: '9 Schiffe',
      shipClasses: [
        'InTUItion-Klasse – Mein Schiff Relax (seit März 2025), Mein Schiff Flow (ab Juli 2026)',
        'Neubauklasse 2015–2019 – Mein Schiff 3, 4, 5, 6, 7 (baugleiche Schwesterschiffe)',
        'Ältere, umgebaute Bestandsschiffe – Mein Schiff 1, Mein Schiff 2',
      ],
      fleet: ['Mein Schiff Flow', 'Mein Schiff Relax', 'Mein Schiff 7', 'Mein Schiff 6', 'Mein Schiff 5', 'Mein Schiff 4', 'Mein Schiff 3', 'Mein Schiff 2', 'Mein Schiff 1'],
      highlights: [
        'Durchgängig deutschsprachiges Clubschiff-Konzept',
        'Premium-All-Inclusive ist im Grundpreis schon enthalten, nicht nur optional',
        'Kein Bordzwang, entsprechend lockere Kleiderordnung abends',
        'Mit Mein Schiff Relax und Mein Schiff Flow kommen 2025/26 zwei komplett neue, effizientere Schiffe dazu',
      ],
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
    bestFor: 'Reifere, oft ältere Reisende, die eine ruhige, altmodisch-charmante Kreuzfahrt ohne Animationsprogramm für Kinder suchen und lange Landausflüge schätzen.',
    profile: {
      founded: '1984', headquarters: 'Bonn, Deutschland', fleetSize: '4 Hochseeschiffe',
      shipClasses: [
        'Keine einheitlichen Neubau-Klassen – jedes Schiff hat seinen eigenen Charakter und seine eigene Baugeschichte',
      ],
      fleet: ['Amadea', 'Amera', 'Artania', 'Deutschland'],
      highlights: [
        'Die Amadea ist als „Traumschiff" aus dem ZDF bekannt',
        'Landausflüge sind bei vielen Reisen schon im Preis enthalten, nicht nur optional buchbar',
        'Kein Animationsprogramm für Kinder – die Zielgruppe ist bewusst ruhebedürftig',
        'Die MS Deutschland läuft 2026 ihre letzte Saison für Phoenix Reisen',
      ],
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
    bestFor: 'Familien und Freundesgruppen, für die ein Kreuzfahrtschiff auch ein Freizeitpark sein darf – Wasserrutschen und Achterbahn inklusive.',
    profile: {
      founded: '1968', headquarters: 'Miami, USA', fleetSize: '29 Schiffe – ab Juli 2026 30 mit Legend of the Seas',
      shipClasses: [
        'Icon-Klasse – Icon of the Seas, Star of the Seas (Legend of the Seas ab Juli 2026)',
        'Oasis-Klasse – Oasis, Allure, Harmony, Symphony, Wonder und Utopia of the Seas',
        'Quantum-Klasse – Quantum, Anthem, Ovation, Spectrum und Odyssey of the Seas',
        'Freedom-Klasse – Freedom, Liberty und Independence of the Seas',
        'Voyager-Klasse – Voyager, Explorer, Adventure, Navigator und Mariner of the Seas',
        'Radiance-Klasse – Radiance, Brilliance, Serenade und Jewel of the Seas',
        'Vision-Klasse – Vision, Grandeur, Enchantment und Rhapsody of the Seas',
      ],
      fleet: ['Icon of the Seas', 'Star of the Seas', 'Oasis of the Seas', 'Allure of the Seas', 'Harmony of the Seas', 'Symphony of the Seas', 'Wonder of the Seas', 'Utopia of the Seas', 'Quantum of the Seas', 'Anthem of the Seas', 'Ovation of the Seas', 'Spectrum of the Seas', 'Odyssey of the Seas', 'Freedom of the Seas', 'Liberty of the Seas', 'Independence of the Seas', 'Voyager of the Seas', 'Explorer of the Seas', 'Adventure of the Seas', 'Navigator of the Seas', 'Mariner of the Seas', 'Radiance of the Seas', 'Brilliance of the Seas', 'Serenade of the Seas', 'Jewel of the Seas', 'Vision of the Seas', 'Grandeur of the Seas', 'Enchantment of the Seas', 'Rhapsody of the Seas'],
      highlights: [
        'Icon of the Seas und Star of the Seas zählen aktuell zu den größten Passagierschiffen der Welt',
        'Wasserparks, Achterbahnen (BOLT-ähnliche Attraktionen) und Zipline gehören auf den neueren Schiffen zum Standard',
        'Eislaufbühnen und Broadway-artige Shows sind auf vielen Schiffen fester Bestandteil',
        'Mit fast 30 Schiffen ist Royal Caribbean eine der größten Flotten überhaupt – entsprechend groß ist die Bandbreite von Riesenschiff bis kleinerem Vision-Klasse-Schiff',
      ],
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
    bestFor: 'Reisende, die sich nicht auf feste Tischzeiten oder Dresscodes festlegen lassen wollen und lieber spontan entscheiden, wann und wo sie essen.',
    profile: {
      founded: '1966', headquarters: 'Miami, USA', fleetSize: '21 Schiffe',
      shipClasses: [
        'Prima Plus-Klasse – Norwegian Aqua, Norwegian Luna',
        'Prima-Klasse – Norwegian Prima, Norwegian Viva',
        'Breakaway Plus-Klasse – Norwegian Bliss, Norwegian Encore, Norwegian Joy',
        'Breakaway-Klasse – Norwegian Breakaway, Norwegian Getaway, Norwegian Escape',
        'Jewel-Klasse – Norwegian Jewel, Norwegian Pearl, Norwegian Gem, Norwegian Jade',
        'Dawn-Klasse – Norwegian Dawn, Norwegian Star',
        'Sun-Klasse – Norwegian Sun, Norwegian Sky',
        'Einzelschiffe – Norwegian Epic, Pride of America, Norwegian Spirit',
      ],
      fleet: ['Norwegian Aqua', 'Norwegian Luna', 'Norwegian Prima', 'Norwegian Viva', 'Norwegian Bliss', 'Norwegian Encore', 'Norwegian Joy', 'Norwegian Breakaway', 'Norwegian Getaway', 'Norwegian Escape', 'Norwegian Jewel', 'Norwegian Pearl', 'Norwegian Gem', 'Norwegian Jade', 'Norwegian Dawn', 'Norwegian Star', 'Norwegian Sun', 'Norwegian Sky', 'Norwegian Epic', 'Pride of America', 'Norwegian Spirit'],
      highlights: [
        'Freestyle Cruising heißt: keine festen Tischzeiten, keine feste Tischnachbarschaft',
        'Ungewöhnlich große Auswahl an Spezialitätenrestaurants gegen Aufpreis',
        '„The Haven" ist ein abgeschlossener Suiten-Bereich mit eigenem Personal, quasi ein Schiff im Schiff',
        'Pride of America ist das einzige große Kreuzfahrtschiff mit ganzjähriger Interinsel-Route durch Hawaii',
      ],
    },
    regions: {
      hawaii:     [{ ship: 'Pride of America', durations: [7, 14], note: 'Einziges Schiff mit wöchentlicher Interinsel-Route durch Hawaii' }],
      karibik:    [{ ship: 'Norwegian Bliss',  durations: [7, 10], note: 'Ab Miami / New York' }],
      alaska:     [{ ship: 'Norwegian Encore', durations: [7],     note: 'Ab Seattle entlang der Inside Passage' }],
      mittelmeer: [{ ship: 'Norwegian Epic',   durations: [7, 10], note: 'Ab Rom durchs Mittelmeer' }],
    },
  },
  {
    id: 'celebrity', name: 'Celebrity Cruises', tagline: 'Modern Luxury – gehobenes Design, ruhiger Premium-Stil',
    website: 'https://www.celebritycruises.com',
    style: 'relax', budget: 3, family: true, adultsFocus: true,
    bestFor: 'Paare und Genießer, denen gutes Design, gutes Essen und Ruhe wichtiger sind als Rutschen und Kinderprogramm – Familien sind willkommen, stehen aber nicht im Mittelpunkt.',
    profile: {
      founded: '1988', headquarters: 'Miami, USA', fleetSize: '16 Schiffe',
      shipClasses: [
        'Edge-Klasse – Celebrity Edge, Apex, Beyond, Ascent, Xcel',
        'Solstice-Klasse – Celebrity Solstice, Equinox, Eclipse, Silhouette, Reflection',
        'Millennium-Klasse – Celebrity Millennium, Infinity, Summit, Constellation',
        'Galapagos-Expeditionsschiffe – Celebrity Flora, Celebrity Xpedition',
      ],
      fleet: ['Celebrity Edge', 'Celebrity Apex', 'Celebrity Beyond', 'Celebrity Ascent', 'Celebrity Xcel', 'Celebrity Solstice', 'Celebrity Equinox', 'Celebrity Eclipse', 'Celebrity Silhouette', 'Celebrity Reflection', 'Celebrity Millennium', 'Celebrity Infinity', 'Celebrity Summit', 'Celebrity Constellation', 'Celebrity Flora', 'Celebrity Xpedition'],
      highlights: [
        '„The Retreat" ist der abgeschirmte Suiten-Bereich mit eigener Lounge und eigenem Sonnendeck',
        'Die Küche gilt allgemein als eine der besseren im Mainstream-Segment',
        'Celebrity Flora und Xpedition sind reine Galapagos-Spezialisten, keine klassischen Großschiffe',
        'Trotz Familienfreundlichkeit liegt der Ton eher auf Ruhe und Stil als auf lautem Entertainment',
      ],
    },
    regions: {
      karibik:    [{ ship: 'Celebrity Beyond', durations: [7, 10], note: 'Ab Fort Lauderdale durch die östliche Karibik' }],
      mittelmeer: [{ ship: 'Celebrity Apex',   durations: [7, 10], note: 'Ab Barcelona durchs Mittelmeer' }],
      alaska:     [{ ship: 'Celebrity Silhouette', durations: [7], note: 'Ab Seattle entlang der Inside Passage' }],
    },
  },
  {
    id: 'princess', name: 'Princess Cruises', tagline: 'Klassisch-gehoben, ruhig und stilvoll',
    website: 'https://www.princess.com',
    style: 'relax', budget: 3, family: true, adultsFocus: true,
    bestFor: 'Paare und reifere Reisende, die einen eher klassischen, weniger lauten Stil mögen – Princess ist seit Jahrzehnten die Alaska-Reederei schlechthin.',
    profile: {
      founded: '1965', headquarters: 'Santa Clarita, USA', fleetSize: '17 Schiffe',
      shipClasses: [
        'Sphere-Klasse – Sun Princess, Star Princess',
        'Royal-Klasse – Royal, Regal, Majestic, Sky, Enchanted und Discovery Princess',
        'Grand-Klasse – Grand, Caribbean, Crown, Emerald, Ruby, Diamond und Sapphire Princess',
        'Coral-Klasse – Coral Princess, Island Princess',
      ],
      fleet: ['Sun Princess', 'Star Princess', 'Royal Princess', 'Regal Princess', 'Majestic Princess', 'Sky Princess', 'Enchanted Princess', 'Discovery Princess', 'Grand Princess', 'Caribbean Princess', 'Crown Princess', 'Emerald Princess', 'Ruby Princess', 'Diamond Princess', 'Sapphire Princess', 'Coral Princess', 'Island Princess'],
      highlights: [
        'MedallionClass: ein tragbares Medaillon öffnet die Kabine und bestellt Getränke, ganz ohne Schlüsselkarte',
        'Eine der wenigen großen Reedereien mit einem festen Jahresprogramm für Alaska',
        'Insgesamt ruhiger und weniger auf Party ausgelegt als etwa Carnival oder Royal Caribbean',
        'Coral Princess und Island Princess sind bewusst kleiner gebaut, um auch den alten Panamakanal zu passieren',
      ],
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
    id: 'holland', name: 'Holland America Line', tagline: 'Klassisch-elegant, stark bei Alaska & Weltreisen',
    website: 'https://www.hollandamerica.com',
    style: 'relax', budget: 3, family: false, adultsFocus: true,
    bestFor: 'Reifere Reisende und alle, die eine dezente, destinationsorientierte Kreuzfahrt suchen statt Rutschen und Rummel – Alaska ist die klassische Domäne dieser Reederei.',
    profile: {
      founded: '1873', headquarters: 'Seattle, USA', fleetSize: '11 Schiffe',
      shipClasses: [
        'Pinnacle-Klasse – Koningsdam (2016), Nieuw Statendam (2018), Rotterdam (2021)',
        'Signature-Klasse – Eurodam (2008), Nieuw Amsterdam (2010)',
        'Vista-Klasse – Zuiderdam (2002), Oosterdam (2003), Westerdam (2004), Noordam (2006)',
        'R-Klasse – Volendam (1999), Zaandam (2000)',
      ],
      fleet: ['Rotterdam', 'Nieuw Statendam', 'Koningsdam', 'Nieuw Amsterdam', 'Eurodam', 'Noordam', 'Westerdam', 'Oosterdam', 'Zuiderdam', 'Zaandam', 'Volendam'],
      highlights: [
        'Kulinarik-Partnerschaft mit America\'s Test Kitchen an Bord',
        'Traditionell die Alaska-Reederei mit dem größten Streckennetz in der Region',
        'Ruhiger, destinationsorientierter Stil ohne große Wasserparks oder Achterbahnen',
        'Es sind aktuell keine Neubauten bestellt, die Flotte bleibt vorerst wie sie ist',
      ],
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
    bestFor: 'Preisbewusste Familien und alle, die eine unkomplizierte, laute Urlaubsstimmung wollen – Understatement ist hier nicht das Ziel.',
    profile: {
      founded: '1972', headquarters: 'Miami, USA', fleetSize: '29 Schiffe',
      shipClasses: [
        'Excel-Klasse – Mardi Gras, Carnival Celebration, Carnival Jubilee',
        'Vista-Klasse – Carnival Vista, Horizon, Panorama, Firenze, Venezia',
        'Dream-Klasse – Carnival Dream, Magic, Breeze',
        'Splendor-Klasse – Carnival Splendor',
        'Conquest-Klasse – Carnival Conquest, Glory, Valor, Liberty, Freedom',
        'Spirit-Klasse – Carnival Spirit, Pride, Legend, Miracle',
        'Sunshine-Klasse – Carnival Sunshine, Sunrise, Radiance',
        'Fantasy-Klasse – Carnival Elation, Paradise',
        'Von P&O Cruises Australia übernommen – Carnival Adventure, Carnival Encounter',
      ],
      fleet: ['Mardi Gras', 'Carnival Celebration', 'Carnival Jubilee', 'Carnival Vista', 'Carnival Horizon', 'Carnival Panorama', 'Carnival Firenze', 'Carnival Venezia', 'Carnival Dream', 'Carnival Magic', 'Carnival Breeze', 'Carnival Splendor', 'Carnival Conquest', 'Carnival Glory', 'Carnival Valor', 'Carnival Liberty', 'Carnival Freedom', 'Carnival Spirit', 'Carnival Pride', 'Carnival Legend', 'Carnival Miracle', 'Carnival Sunshine', 'Carnival Sunrise', 'Carnival Radiance', 'Carnival Elation', 'Carnival Paradise', 'Carnival Adventure', 'Carnival Encounter', 'Carnival Luminosa'],
      highlights: [
        'RedFrog Pub und Guy\'s Burger Joint (von TV-Koch Guy Fieri) sind auf vielen Schiffen feste Anlaufstellen',
        'Meist die günstigsten Ticketpreise unter den großen US-Marken',
        'Größte Kreuzfahrtflotte Nordamerikas nach Schiffsanzahl',
        'Carnival Firenze und Venezia waren ursprünglich für Costa gebaut und wurden erst später umgeflaggt',
      ],
    },
    regions: {
      karibik: [{ ship: 'Mardi Gras', durations: [7], note: 'Ab Port Canaveral durch die östliche Karibik' }],
    },
  },
  {
    id: 'disney', name: 'Disney Cruise Line', tagline: 'Durchgestyltes Familienerlebnis mit Disney-Charakteren',
    website: 'https://disneycruise.disney.go.com',
    style: 'entertainment', budget: 4, family: true, adultsFocus: false,
    bestFor: 'Familien mit kleinen und größeren Kindern, denen Disney-Figuren, Broadway-Shows und ein durchgestyltes Erlebnis den höheren Preis wert sind.',
    profile: {
      founded: '1998', headquarters: 'Celebration, Florida, USA', fleetSize: '8 Schiffe',
      shipClasses: [
        'Wish-Klasse – Disney Wish (2022), Disney Treasure (2024), Disney Destiny (2025)',
        'Dream-Klasse – Disney Dream (2011), Disney Fantasy (2012)',
        'Magic-Klasse – Disney Magic (1998), Disney Wonder (1999)',
        'Neu seit 2026 – Disney Adventure (Asien-Homeport Singapur)',
      ],
      fleet: ['Disney Wish', 'Disney Treasure', 'Disney Destiny', 'Disney Dream', 'Disney Fantasy', 'Disney Magic', 'Disney Wonder', 'Disney Adventure'],
      highlights: [
        'Die private Insel Castaway Cay in der Karibik ist ausschließlich für Disney-Gäste reserviert',
        'Trotz des Familienfokus gibt es eigene Adults-Only-Bereiche wie die Rainforest-Spa-Zone',
        'Sehr hoher Betreuungsstandard für Kinder, mit nach Alter getrennten Clubs',
        'Disney Adventure, seit März 2026 in Singapur stationiert, ist das erste Disney-Schiff mit festem Standort in Asien',
      ],
    },
    regions: {
      karibik: [{ ship: 'Disney Wish', durations: [7], note: 'Ab Port Canaveral inkl. Privatinsel Castaway Cay' }],
    },
  },
  {
    id: 'cunard', name: 'Cunard', tagline: 'Britische Tradition, formelle Abende, echte Ozeanliner-Eleganz',
    website: 'https://www.cunard.com',
    style: 'relax', budget: 4, family: false, adultsFocus: true,
    bestFor: 'Traditionsbewusste Reisende, die britische Etikette, festliche Abende mit Dresscode und die Idee einer klassischen Überfahrt mehr schätzen als Bordrutschen.',
    profile: {
      founded: '1840', headquarters: 'Southampton, Vereinigtes Königreich', fleetSize: '4 Schiffe',
      shipClasses: [
        'Queen Mary 2 – der einzige noch aktive echte Ozeanliner (kein reines Kreuzfahrtschiff), gebaut für Transatlantiküberfahrten',
        'Queen-Klasse – Queen Victoria, Queen Elizabeth, Queen Anne',
      ],
      fleet: ['Queen Mary 2', 'Queen Victoria', 'Queen Elizabeth', 'Queen Anne'],
      highlights: [
        'Die Queen Mary 2 fährt weiterhin klassische Transatlantiküberfahrten zwischen Southampton und New York',
        'Formelle Abende mit Dresscode sind fester Bestandteil der Reisen, nicht optional',
        'Große Bibliothek und Ballsaal an Bord erinnern bewusst an die Ozeandampfer-Ära',
        'Queen Anne ist mit Baujahr 2024 das jüngste der vier Schiffe',
      ],
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
    bestFor: 'Erwachsene, denen ein sehr persönlicher Service und Spitzenküche wichtiger sind als Bordprogramm für die ganze Familie.',
    profile: {
      founded: 'Reederei-Tradition seit 1891', headquarters: 'Hamburg, Deutschland', fleetSize: '5 Schiffe',
      shipClasses: [
        'EUROPA-Klasse (5-Sterne-plus) – EUROPA, EUROPA 2',
        'HANSEATIC-Klasse (Expedition) – HANSEATIC nature, HANSEATIC inspiration, HANSEATIC spirit',
      ],
      fleet: ['EUROPA', 'EUROPA 2', 'HANSEATIC nature', 'HANSEATIC inspiration', 'HANSEATIC spirit'],
      highlights: [
        'Sehr kleine Passagierzahl pro Schiff, dadurch spürbar mehr Privatsphäre als auf Großschiffen',
        'Gourmet-Küche gehört zu den besten der ganzen Branche',
        'HANSEATIC inspiration ist das einzige Schiff der Reederei, auf dem konsequent zweisprachig (Deutsch/Englisch) gefahren wird',
        'Seit 2026 sind Softdrinks auf allen Schiffen ganztägig im Preis inbegriffen',
      ],
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
    id: 'dream', name: 'Dream Cruises', tagline: 'Asiatisches Flair, Casino & Entertainment ab Singapur',
    website: 'https://stardreamcruises.com',
    style: 'entertainment', budget: 2, family: true, adultsFocus: false,
    bestFor: 'Kurzentschlossene und Familien in Südostasien, die einen lebhaften, casino-lastigen Kurztrip ab Singapur suchen.',
    profile: {
      founded: 'Marke ursprünglich 2016 gestartet, 2025/26 als „Dream Cruises" unter StarDream Cruises neu aufgestellt', headquarters: 'Singapur', fleetSize: '1 Schiff',
      shipClasses: ['Global-Klasse – Genting Dream'],
      fleet: ['Genting Dream'],
      highlights: [
        'Casino und ein spürbar asiatisch geprägtes Entertainment-Programm an Bord',
        'Sehr kurze Reisen ab 2 Nächten machen den Einstieg leicht',
        'Große Auswahl an asiatischer Küche, von Kantonesisch bis Streetfood-Ständen',
        'Nach der Umstrukturierung 2025 firmiert das Schiff wieder unter der ursprünglichen Marke Dream Cruises statt Resorts World Cruises',
      ],
    },
    regions: {
      asien: [{ ship: 'Genting Dream', durations: [4, 5, 7], note: 'Kurzreisen ab Singapur nach Malaysia & Thailand' }],
    },
  },
  {
    id: 'hx', name: 'HX Expeditions', tagline: 'Kleine Expeditionsschiffe für Arktis, Antarktis & Wildnis',
    website: 'https://www.travelhx.com',
    style: 'relax', budget: 3, family: false, adultsFocus: true,
    bestFor: 'Naturliebhaber, Paare und Alleinreisende, die echte Wildnis und Expeditionen abseits der Massen suchen – Kinderanimation gibt es hier bewusst nicht.',
    profile: {
      founded: 'Ursprünglich als Hurtigruten-Expeditionssparte gestartet, seit November 2024 als eigenständiges Unternehmen unter dem Namen HX', headquarters: 'Oslo/London', fleetSize: '5 Schiffe',
      shipClasses: [
        'Explorer-Klasse (Hybridantrieb) – MS Roald Amundsen, MS Fridtjof Nansen',
        'Klassische Expeditionsschiffe – MS Fram, MS Spitsbergen, MS Santa Cruz II',
      ],
      fleet: ['MS Roald Amundsen', 'MS Fridtjof Nansen', 'MS Fram', 'MS Spitsbergen', 'MS Santa Cruz II'],
      highlights: [
        'Zodiac-Anlandungen und ein wissenschaftliches Expeditionsteam gehören zu jeder Fahrt dazu',
        'MS Roald Amundsen und MS Fridtjof Nansen fahren mit Hybridantrieb',
        'Seit der Trennung von Hurtigruten Ende 2024 ist HX eine eigenständige Gesellschaft, nicht mehr Teil der norwegischen Küstenschifffahrt',
        'MS Santa Cruz II ist speziell für die Galapagos-Inseln gebaut, deutlich kleiner als die Polarschiffe',
      ],
    },
    regions: {
      expedition: [{ ship: 'MS Fridtjof Nansen', durations: [10, 14, 18], note: 'Antarktis-Expedition mit Zodiac-Anlandungen' }],
      nordeuropa: [{ ship: 'MS Spitsbergen',      durations: [7, 11],      note: 'Svalbard & Norwegens Küste' }],
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
