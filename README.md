# Wolkenwanderer Cruise Finder

Ein interaktiver Quiz-Funnel, der Nutzer:innen Schritt für Schritt zur passenden
Traumkreuzfahrt führt: **Route → Reederei → Schiff → Kabine**.

## So funktioniert der Funnel

1. **Wer reist mit** – Begleitung (Solo, Paar, Familie, Freunde) und Altersgruppe.
2. **Priorität** – Route & Reiseziel, Bordleben/Entertainment, Ruhe & Erholung oder Budget.
3. **Vertiefung je nach Priorität**
   - *Route*: Region wählen (z. B. Hawaii & Südsee) → Ruhe, Entertainment oder
     „ein bisschen von beidem" (Mix, keine Stilpräferenz).
   - *Bordleben*: Sport, Wellness, Kulinarik, Familienspaß oder „ein bisschen
     von allem" (Mix) → Region.
   - *Ruhe & Erholung*: direkt Region wählen.
   - *Budget*: Preisstufe wählen → Region.
4. **Reisedauer** – gewünschte Länge der Reise.
5. **Kabinencheck** – Bedeutung des Ausblicks (Innen-/Außen-/Balkonkabine/Suite).
6. **Ergebnis** – konkrete Empfehlung, z. B. *„Hawaii & Südsee auf der Norwegian
   Cruise Line, 14 Tage an Bord der Pride of America, Balkonkabine“*, plus zwei
   Alternativ-Reedereien und ein Link direkt zur Website der jeweiligen Reederei.

Verfügbare Regionen: Karibik, Mittelmeer, Nordeuropa & Fjorde, Kanaren &
Atlantik, Alaska, Hawaii & Südsee, Asien & Fernost, Expedition (Arktis &
Antarktis) sowie Weltreise.

Enthaltene Reedereien (16): AIDA Cruises, MSC Cruises, Costa Kreuzfahrten,
TUI Cruises (Mein Schiff), Phoenix Reisen, Royal Caribbean International,
Norwegian Cruise Line, Celebrity Cruises, Princess Cruises, Holland America
Line, Carnival Cruise Line, Disney Cruise Line, Cunard, Hapag-Lloyd Cruises,
Resorts World Cruises, Hurtigruten Expeditions.

## Reederei-Explorer

Unabhängig vom Quiz gibt es einen Reiter am rechten Bildschirmrand
("⚓ Alle Reedereien"), der jederzeit erreichbar ist. Er öffnet eine
Seitenleiste mit allen Reedereien zum Stöbern – jede mit farblich hervorgehobenem
Stil-Badge (🧘/⚖️/🎉) und Preis-Badge mit €-Symbolen statt nur einem Wort, damit
sofort klar ist, ob "Mittel" die Preisklasse meint. In der Detailansicht gibt es
zusätzlich: Basics (gegründet, Sitz, Flottengröße), Angebote & Highlights an
Bord, Schiffsklassen, eine Auswahl der Flotte als Chips sowie alle Routen mit
Schiffen und den Website-Link. So können Nutzer:innen auch ohne den Fragebogen
einfach vergleichen und stöbern.

Die Zusatzangaben pro Reederei (Gründungsjahr, Sitz, Flottengröße, Schiffsklassen,
Flottenauswahl) sind als allgemeine Orientierung gedacht und wurden ohne
Live-Zugriff auf aktuelle Reederei-Daten erstellt – vor dem Live-Gang gegen die
aktuellen offiziellen Angaben der jeweiligen Reederei prüfen.

## Projektstruktur

```
index.html        Seitengerüst
css/style.css      Design (Ozean-Thema, responsive)
js/data.js         Wissensdatenbank: Regionen, Reedereien, Schiffe, Kabinentypen
js/app.js          Quiz-Engine: Fragenfluss, Matching-Logik, Rendering
.github/workflows/pages.yml   Automatisches Deployment auf GitHub Pages
```

## Lokal testen

Kein Build-Schritt nötig – einfach einen lokalen Server starten:

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000` im Browser öffnen.

## Deployment

Bei jedem Push auf `main` deployt die GitHub Action die Seite automatisch auf
GitHub Pages (unter **Settings → Pages → Source: GitHub Actions** einmalig
aktivieren).

## Daten anpassen

Alle Reedereien, Schiffe, Regionen und Kabinentypen liegen zentral in
`js/data.js`. Neue Reederei hinzufügen, Schiff ergänzen oder eine Region für
eine Reederei freischalten – alles über dieses eine Objekt.

Jede Reederei hat dort ein `website`-Feld mit der offiziellen Startseite; dieser
Link wird im Ergebnis als CTA ("Zur Website von …") sowie bei den Alternativen
verwendet. Die hinterlegten Domains sind gut etablierte, öffentliche Reederei-
Websites – vor dem Live-Gang trotzdem kurz gegenprüfen, ob sie noch aktuell
sind. Ein reiner Link zur Startseite einer Reederei ist datenschutzrechtlich
unproblematisch, da dabei keine personenbezogenen Daten übertragen werden; die
Links öffnen sich mit `rel="noopener noreferrer"` in einem neuen Tab.
