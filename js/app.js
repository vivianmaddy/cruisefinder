/* =========================================================
   Wolkenwanderer Cruise Finder – Quiz-Engine
   ========================================================= */

const state = {
  flow: ['start', 'companion', 'age', 'priority'],
  index: 0,
  answers: {},
};

const STEP_META = { start: 0, companion: 1, age: 1, priority: 1 };

function branchStepsFor(priority) {
  switch (priority) {
    case 'route':   return ['region', 'vibe', 'duration', 'cabinView', 'result'];
    case 'schiff':  return ['onboardFocus', 'region', 'duration', 'cabinView', 'result'];
    case 'relax':   return ['region', 'duration', 'cabinView', 'result'];
    case 'preis':   return ['budget', 'region', 'duration', 'cabinView', 'result'];
    default:        return ['region', 'duration', 'cabinView', 'result'];
  }
}

const app = document.getElementById('quiz-app');

function currentStep() { return state.flow[state.index]; }

function goTo(index) {
  state.index = Math.max(0, Math.min(index, state.flow.length - 1));
  render();
  app.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function answer(key, value) {
  state.answers[key] = value;

  if (key === 'priority') {
    // Verzweigung neu aufbauen, alte verzweigungsspezifische Antworten verwerfen
    ['region', 'vibe', 'onboardFocus', 'budget', 'duration', 'cabinView'].forEach(
      (k) => delete state.answers[k]
    );
    state.flow = ['start', 'companion', 'age', 'priority', ...branchStepsFor(value)];
  }

  goTo(state.index + 1);
}

function back() {
  if (state.index === 0) return;
  goTo(state.index - 1);
}

function restart() {
  state.flow = ['start', 'companion', 'age', 'priority'];
  state.index = 0;
  state.answers = {};
  render();
}

/* ---------- Fragen-Definitionen ---------- */

const QUESTIONS = {
  region: {
    title: 'Welche Region reizt dich am meisten?',
    subtitle: 'Wähle das Reiseziel, das dich am meisten anspricht.',
    key: 'region',
    options: REGIONS.map((r) => ({ value: r.id, label: r.name, emoji: r.emoji, desc: r.desc })),
  },
  companion: {
    title: 'Mit wem reist du?',
    subtitle: 'Das hilft uns, Schiffe mit dem passenden Publikum zu finden.',
    key: 'companion',
    options: [
      { value: 'solo', label: 'Alleine', emoji: '🧳' },
      { value: 'paar', label: 'Zu zweit', emoji: '💑' },
      { value: 'familie', label: 'Familie mit Kindern', emoji: '👨‍👩‍👧‍👦' },
      { value: 'freunde', label: 'Freunde / Gruppe', emoji: '🎉' },
    ],
  },
  age: {
    title: 'Wie alt bist du?',
    subtitle: 'Manche Reedereien und Schiffe passen besser zu bestimmten Altersgruppen.',
    key: 'age',
    options: [
      { value: 'jung', label: 'Unter 30', emoji: '🌱' },
      { value: 'mittel', label: '30–45', emoji: '🌤️' },
      { value: 'reif', label: '46–60', emoji: '🍷' },
      { value: 'senior', label: 'Über 60', emoji: '🕰️' },
    ],
  },
  priority: {
    title: 'Was ist dir am wichtigsten?',
    subtitle: 'Wähle, wonach wir deine Traumreise zuerst ausrichten sollen.',
    key: 'priority',
    options: [
      { value: 'route', label: 'Die Route & das Reiseziel', emoji: '🗺️', desc: 'Erst das Wohin, dann der Rest' },
      { value: 'schiff', label: 'Das Schiff & Bordleben', emoji: '🚢', desc: 'Entertainment, Sport, Kulinarik' },
      { value: 'relax', label: 'Ruhe & Erholung', emoji: '🧘', desc: 'Entschleunigung steht im Vordergrund' },
      { value: 'preis', label: 'Das Budget', emoji: '💶', desc: 'Der Preis entscheidet zuerst' },
    ],
  },
  onboardFocus: {
    title: 'Was wünschst du dir an Bord?',
    subtitle: 'Damit finden wir das Schiff mit dem passenden Bordleben.',
    key: 'onboardFocus',
    options: [
      { value: 'sport', label: 'Sport & Action', emoji: '🎢', desc: 'Wasserrutschen, Kletterwand, Sportkurse' },
      { value: 'wellness', label: 'Wellness & Spa', emoji: '💆', desc: 'Ruhe, Sauna, Verwöhnprogramm' },
      { value: 'kulinarik', label: 'Kulinarik & Genuss', emoji: '🍽️', desc: 'Gourmet-Restaurants, Weinproben' },
      { value: 'familie', label: 'Familienspaß', emoji: '🏊', desc: 'Kids Club, Familienprogramm' },
      { value: 'mix', label: 'Ein bisschen von allem', emoji: '🎡', desc: 'Kein klarer Favorit – Hauptsache Abwechslung' },
    ],
  },
  vibe: {
    title: 'Was ist dir dort am wichtigsten?',
    subtitle: 'Ruhe & Entspannung oder Entertainment & Party?',
    key: 'vibe',
    options: [
      { value: 'relax', label: 'Ruhe & Entspannung', emoji: '🌅', desc: 'Entschleunigt und stilvoll' },
      { value: 'entertainment', label: 'Entertainment & Party', emoji: '🎶', desc: 'Action, Shows, Stimmung' },
      { value: 'mix', label: 'Ein bisschen von beidem', emoji: '🎭', desc: 'Ruhe und Trubel im Wechsel' },
    ],
  },
  budget: {
    title: 'Wie viel möchtest du investieren?',
    subtitle: 'Wir zeigen dir Reedereien in deiner Preisklasse.',
    key: 'budget',
    options: [
      { value: 1, label: 'Günstig', emoji: '💰', desc: 'Preis-Leistung im Vordergrund' },
      { value: 2, label: 'Mittel', emoji: '💶', desc: 'Guter Komfort zu fairem Preis' },
      { value: 3, label: 'Gehoben', emoji: '💎', desc: 'Premium-Komfort & Service' },
      { value: 4, label: 'Luxuriös', emoji: '👑', desc: 'Das Beste vom Besten' },
    ],
  },
  duration: {
    title: 'Wie lange soll deine Reise dauern?',
    subtitle: 'Wir suchen die passende Route in dieser Länge.',
    key: 'duration',
    options: Object.entries(DURATION_LABELS).map(([value, v]) => ({
      value, label: v.label, emoji: '📅',
    })),
  },
  cabinView: {
    title: 'Der Kabinencheck: Wie wichtig ist dir der Ausblick?',
    subtitle: 'Letzter Schritt – dann steht deine Traumreise fest.',
    key: 'cabinView',
    options: [
      { value: 'keiner', label: 'Unwichtig, Hauptsache günstig', emoji: '🛏️' },
      { value: 'fenster', label: 'Tageslicht ist mir wichtig', emoji: '🌤️' },
      { value: 'balkon', label: 'Ich möchte einen eigenen Balkon', emoji: '🌊' },
      { value: 'suite', label: 'Maximaler Komfort – eine Suite', emoji: '👑' },
    ],
  },
};

/* ---------- Matching-Logik ---------- */

function scoreLine(line, region, vibe, budgetLevel, companion) {
  if (!line.regions[region]) return -Infinity;
  let score = 0;

  if (vibe) score += line.style === vibe ? 3 : line.style === 'balanced' ? 1.5 : 0;
  if (budgetLevel) score += 3 - Math.abs(line.budget - budgetLevel);

  if (companion === 'familie' && line.family) score += 2;
  if (companion === 'paar' && line.adultsFocus) score += 1;
  if (companion === 'solo' && line.style !== 'entertainment') score += 0.5;
  if (companion === 'freunde' && line.style === 'entertainment') score += 1;

  return score;
}

function pickShip(line, region, durationKey) {
  const options = line.regions[region];
  const targetDays = DURATION_LABELS[durationKey]?.target;
  if (!targetDays) return options[0];
  return options.reduce((best, cur) => {
    const bestDiff = Math.min(...best.durations.map((d) => Math.abs(d - targetDays)));
    const curDiff = Math.min(...cur.durations.map((d) => Math.abs(d - targetDays)));
    return curDiff < bestDiff ? cur : best;
  }, options[0]);
}

function closestDuration(durations, durationKey) {
  const targetDays = DURATION_LABELS[durationKey]?.target;
  if (!targetDays) return durations[0];
  return durations.reduce((best, cur) => (Math.abs(cur - targetDays) < Math.abs(best - targetDays) ? cur : best));
}

function determineCabin(viewPref, budgetLevel, companion) {
  let type;
  if (viewPref === 'suite' || (budgetLevel && budgetLevel >= 4)) type = 'suite';
  else if (viewPref === 'balkon' || (budgetLevel && budgetLevel === 3)) type = 'balkon';
  else if (viewPref === 'fenster') type = 'aussen';
  else type = 'innen';

  let note = '';
  if (companion === 'familie' || companion === 'freunde') {
    note = ' Für eure Gruppe empfehlen wir zwei benachbarte oder verbundene Kabinen dieses Typs.';
  } else if (companion === 'paar' && (type === 'balkon' || type === 'suite')) {
    note = ' Perfekt für einen romantischen Sonnenuntergang zu zweit.';
  }
  return { ...CABIN_TYPES[type], id: type, note };
}

function deriveVibe(a) {
  // "mix" heißt: keine Stil-Präferenz – alle Reedereien bekommen eine faire Chance.
  if (a.vibe === 'mix' || a.onboardFocus === 'mix') return null;
  if (a.vibe) return a.vibe;
  if (a.onboardFocus === 'wellness') return 'relax';
  if (a.onboardFocus) return 'entertainment';
  if (a.priority === 'relax') return 'relax';
  return null;
}

function computeResult() {
  const a = state.answers;
  const vibe = deriveVibe(a);

  const candidates = CRUISE_LINES
    .map((line) => ({ line, score: scoreLine(line, a.region, vibe, a.budget, a.companion) }))
    .filter((c) => c.score > -Infinity)
    .sort((x, y) => y.score - x.score);

  const region = REGIONS.find((r) => r.id === a.region);
  const cabin = determineCabin(a.cabinView, a.budget, a.companion);

  if (candidates.length === 0) {
    return { fallback: true, region, cabin };
  }

  const top = candidates[0].line;
  const ship = pickShip(top, a.region, a.duration);
  const days = closestDuration(ship.durations, a.duration);
  const alternatives = candidates.slice(1, 3).map((c) => c.line);

  return { region, line: top, ship, days, cabin, alternatives };
}

/* ---------- Rendering ---------- */

function progressPercent() {
  if (state.index === 0) return 0;
  return Math.round((state.index / (state.flow.length - 1)) * 100);
}

function render() {
  const step = currentStep();
  app.innerHTML = '';

  const progress = document.createElement('div');
  progress.className = 'progress';
  progress.innerHTML = `<div class="progress-bar" style="width:${progressPercent()}%"></div>`;
  if (step !== 'start') app.appendChild(progress);

  if (step === 'start') app.appendChild(renderStart());
  else if (step === 'result') app.appendChild(renderResult());
  else app.appendChild(renderQuestion(QUESTIONS[step]));
}

function renderStart() {
  const el = document.createElement('div');
  el.className = 'card start-card';
  el.innerHTML = `
    <div class="start-emoji">🚢</div>
    <p class="eyebrow">Wolkenwanderer Cruise Finder</p>
    <h1 class="hero-title">
      <span class="hero-caps">Finde deine</span>
      <span class="hero-script">Traumroute</span>
    </h1>
    <p>Beantworte ein paar kurze Fragen und wir zeigen dir die passende Route, Reederei, dein Traumschiff und die ideale Kabine – ganz persönlich abgestimmt auf dich.</p>
    <button class="btn btn-primary" id="start-btn">Los geht's</button>
  `;
  el.querySelector('#start-btn').addEventListener('click', () => goTo(1));
  return el;
}

function renderQuestion(q) {
  const el = document.createElement('div');
  el.className = 'card';
  const selected = state.answers[q.key];

  el.innerHTML = `
    <h2>${q.title}</h2>
    <p class="subtitle">${q.subtitle}</p>
    <div class="options-grid">
      ${q.options.map((o) => `
        <button class="option-card ${selected === o.value ? 'selected' : ''}" data-value="${o.value}">
          <span class="option-emoji">${o.emoji}</span>
          <span class="option-label">${o.label}</span>
          ${o.desc ? `<span class="option-desc">${o.desc}</span>` : ''}
        </button>
      `).join('')}
    </div>
    <div class="nav-row">
      ${state.index > 1 ? '<button class="btn btn-ghost" id="back-btn">← Zurück</button>' : '<span></span>'}
    </div>
  `;

  el.querySelectorAll('.option-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      const raw = btn.dataset.value;
      const value = q.key === 'budget' ? Number(raw) : raw;
      answer(q.key, value);
    });
  });
  const backBtn = el.querySelector('#back-btn');
  if (backBtn) backBtn.addEventListener('click', back);

  return el;
}

function renderResult() {
  const r = computeResult();
  const el = document.createElement('div');
  el.className = 'card result-card';

  if (r.fallback) {
    el.innerHTML = `
      <div class="result-emoji">🧭</div>
      <h2>Für diese Kombination haben wir noch keinen passenden Vorschlag</h2>
      <p class="subtitle">Versuch es gern mit einer anderen Region oder starte den Cruise Finder noch einmal von vorn.</p>
      <button class="btn btn-primary" id="restart-btn">Nochmal von vorn</button>
    `;
  } else {
    el.innerHTML = `
      <div class="result-emoji">${r.region.emoji}</div>
      <span class="result-tag">Dein Ergebnis</span>
      <h2 class="hero-title"><span class="hero-script">Deine Traumreise</span></h2>
      <p class="result-region-line">${r.region.name} auf der ${r.line.name}</p>
      <p class="result-summary">
        <strong>${r.days} Tage</strong> an Bord der <strong>${r.ship.ship}</strong> —
        ${r.ship.note}. Dazu empfehlen wir dir eine <strong>${r.cabin.name}</strong>.
      </p>

      <div class="result-details">
        <div class="detail-block">
          <span class="detail-emoji">🚢</span>
          <div>
            <h3>${r.line.name}</h3>
            <p>${r.line.tagline}</p>
          </div>
        </div>
        <div class="detail-block">
          <span class="detail-emoji">${r.cabin.emoji}</span>
          <div>
            <h3>${r.cabin.name}</h3>
            <p>${r.cabin.desc}${r.cabin.note}</p>
          </div>
        </div>
      </div>

      ${r.alternatives.length ? `
        <div class="alternatives">
          <h4>Weitere Optionen für dich</h4>
          <div class="alt-grid">
            ${r.alternatives.map((l) => `
              <a class="alt-card" href="${l.website}" target="_blank" rel="noopener noreferrer">
                <strong>${l.name}</strong>
                <span>${l.tagline}</span>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="result-actions">
        <a class="btn btn-primary" href="${r.line.website}" target="_blank" rel="noopener noreferrer">Zur Website von ${r.line.name} ↗</a>
        <button class="btn btn-ghost" id="restart-btn">Nochmal von vorn</button>
      </div>
    `;
  }

  el.querySelector('#restart-btn').addEventListener('click', restart);
  return el;
}

render();

/* =========================================================
   Reederei-Explorer – unabhängig vom Quiz jederzeit erreichbar
   ========================================================= */

const explorer = {
  tab: document.getElementById('explorer-tab'),
  backdrop: document.getElementById('explorer-backdrop'),
  panel: document.getElementById('explorer-panel'),
  body: document.getElementById('explorer-body'),
  currentLineId: null,
};

function openExplorer() {
  explorer.backdrop.classList.add('open');
  explorer.panel.classList.add('open');
  explorer.panel.setAttribute('aria-hidden', 'false');
  renderExplorer();
}

function closeExplorer() {
  explorer.backdrop.classList.remove('open');
  explorer.panel.classList.remove('open');
  explorer.panel.setAttribute('aria-hidden', 'true');
}

function styleBadge(styleKey) {
  const s = STYLE_META[styleKey];
  return `<span class="explorer-badge" style="background:${s.color}22; color:${s.color}; border-color:${s.color}55;">${s.emoji} ${s.label}</span>`;
}

function budgetBadge(budgetLevel) {
  const b = BUDGET_META[budgetLevel];
  return `<span class="explorer-badge explorer-badge-budget">${b.symbol} ${b.label}</span>`;
}

function renderExplorer() {
  if (!explorer.currentLineId) {
    explorer.body.innerHTML = `
      <p class="explorer-intro">Stöbere unabhängig vom Cruise Finder durch alle Reedereien: Routen, Schiffe, Stil und für wen sie sich am besten eignen.</p>
      ${CRUISE_LINES.map((line) => `
        <button class="explorer-list-item" data-line="${line.id}">
          <span class="explorer-avatar" style="background:${STYLE_META[line.style].color};">${STYLE_META[line.style].emoji}</span>
          <span class="explorer-list-text">
            <strong>${line.name}</strong>
            <span class="tagline">${line.tagline}</span>
            <span class="explorer-badges">
              ${styleBadge(line.style)}
              ${budgetBadge(line.budget)}
              ${line.family ? '<span class="explorer-badge">👨‍👩‍👧 Familienfreundlich</span>' : '<span class="explorer-badge">🥂 Eher für Erwachsene</span>'}
            </span>
          </span>
        </button>
      `).join('')}
    `;
    explorer.body.querySelectorAll('.explorer-list-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        explorer.currentLineId = btn.dataset.line;
        renderExplorer();
        explorer.body.scrollTo({ top: 0 });
      });
    });
  } else {
    const line = CRUISE_LINES.find((l) => l.id === explorer.currentLineId);
    const p = line.profile;
    const routeRows = Object.entries(line.regions).map(([regionId, ships]) => {
      const region = REGIONS.find((r) => r.id === regionId);
      return ships.map((s) => `
        <div class="route-item">
          <span class="route-emoji">${region ? region.emoji : '🚢'}</span>
          <div>
            <strong>${region ? region.name : regionId} — ${s.ship}</strong>
            <p>${s.note} · ${s.durations.join('/')} Tage</p>
          </div>
        </div>
      `).join('');
    }).join('');

    explorer.body.innerHTML = `
      <button class="explorer-back" id="explorer-back">← Alle Reedereien</button>
      <div class="explorer-detail">
        <span class="explorer-avatar explorer-avatar-lg" style="background:${STYLE_META[line.style].color};">${STYLE_META[line.style].emoji}</span>
        <h2>${line.name}</h2>
        <p class="tagline">${line.tagline}</p>

        <div class="explorer-section">
          <h4>Auf einen Blick</h4>
          <span class="explorer-badges">
            ${styleBadge(line.style)}
            ${budgetBadge(line.budget)}
            ${line.family ? '<span class="explorer-badge">👨‍👩‍👧 Familienfreundlich</span>' : ''}
            ${line.adultsFocus ? '<span class="explorer-badge">🥂 Eher für Erwachsene</span>' : ''}
          </span>
        </div>

        <div class="explorer-section">
          <h4>Am besten geeignet für</h4>
          <p>${line.bestFor}</p>
        </div>

        <div class="explorer-section">
          <h4>Basics</h4>
          <div class="explorer-basics">
            <div><span>Gegründet</span><strong>${p.founded}</strong></div>
            <div><span>Sitz</span><strong>${p.headquarters}</strong></div>
            <div><span>Flottengröße</span><strong>${p.fleetSize}</strong></div>
          </div>
        </div>

        <div class="explorer-section">
          <h4>Angebote & Highlights an Bord</h4>
          <ul class="explorer-highlights">
            ${p.highlights.map((h) => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <div class="explorer-section">
          <h4>Schiffsklassen</h4>
          <ul class="explorer-highlights">
            ${p.shipClasses.map((c) => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div class="explorer-section">
          <h4>Flotte (Auswahl)</h4>
          <div class="explorer-fleet">
            ${p.fleet.map((s) => `<span class="fleet-chip">🚢 ${s}</span>`).join('')}
          </div>
        </div>

        <div class="explorer-section">
          <h4>Routen & Schiffe im Cruise Finder</h4>
          ${routeRows}
        </div>

        <a class="btn btn-primary" href="${line.website}" target="_blank" rel="noopener noreferrer">Zur Website von ${line.name} ↗</a>
      </div>
    `;
    document.getElementById('explorer-back').addEventListener('click', () => {
      explorer.currentLineId = null;
      renderExplorer();
    });
  }
}

explorer.tab.addEventListener('click', openExplorer);
explorer.backdrop.addEventListener('click', closeExplorer);
explorer.close = document.getElementById('explorer-close');
explorer.close.addEventListener('click', closeExplorer);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeExplorer();
});
