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
    title: 'Mit wem geht deine Reise?',
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
    ],
  },
  vibe: {
    title: 'Was ist dir dort am wichtigsten?',
    subtitle: 'Ruhe & Entspannung oder Entertainment & Party?',
    key: 'vibe',
    options: [
      { value: 'relax', label: 'Ruhe & Entspannung', emoji: '🌅', desc: 'Entschleunigt und stilvoll' },
      { value: 'entertainment', label: 'Entertainment & Party', emoji: '🎶', desc: 'Action, Shows, Stimmung' },
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

function computeResult() {
  const a = state.answers;
  const vibe = a.vibe || (a.onboardFocus === 'wellness' ? 'relax'
    : a.onboardFocus ? 'entertainment'
    : a.priority === 'relax' ? 'relax' : null);

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
