# Wolkenwanderer Cruise Finder

Ein interaktiver Quiz-Funnel, der Nutzer:innen Schritt für Schritt zur passenden
Traumkreuzfahrt führt: **Route → Reederei → Schiff → Kabine**.

## So funktioniert der Funnel

1. **Wer reist mit** – Begleitung (Solo, Paar, Familie, Freunde) und Altersgruppe.
2. **Priorität** – Route & Reiseziel, Bordleben/Entertainment, Ruhe & Erholung oder Budget.
3. **Vertiefung je nach Priorität**
   - *Route*: Region wählen (z. B. Hawaii & Südsee) → Ruhe vs. Entertainment.
   - *Bordleben*: Sport, Wellness, Kulinarik oder Familienspaß → Region.
   - *Ruhe & Erholung*: direkt Region wählen.
   - *Budget*: Preisstufe wählen → Region.
4. **Reisedauer** – gewünschte Länge der Reise.
5. **Kabinencheck** – Bedeutung des Ausblicks (Innen-/Außen-/Balkonkabine/Suite).
6. **Ergebnis** – konkrete Empfehlung, z. B. *„Hawaii & Südsee auf der Norwegian
   Cruise Line, 14 Tage an Bord der Pride of America, Balkonkabine“*, plus zwei
   Alternativ-Reedereien und ein Link direkt zur Website der jeweiligen Reederei.

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
