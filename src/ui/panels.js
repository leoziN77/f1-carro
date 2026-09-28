import { PARTS, CATEGORIES, LAYERS, OVERVIEW } from '../data/parts.js';
import { LIVERY_COLORS } from '../car/materials.js';

const PRESET_LABELS = [
  ['assembled', 'Montado'],
  ['shell', 'Sem carroceria'],
  ['exploded', 'Explodido'],
];

const COMPOUNDS = [
  ['Macio', '#e10600'],
  ['Médio', '#ffd12e'],
  ['Duro', '#f4f4f4'],
  ['Interm.', '#39b54a'],
  ['Chuva', '#0067ad'],
];

const $ = (id) => document.getElementById(id);
const searchable = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-BR');

export function initUI(h) {
  const { state } = h;

  /* expose the top bar's height to CSS (the key and menus sit just below it) */
  const topbar = $('topbar');
  const trackTopbar = () => document.documentElement.style.setProperty('--topbar-bottom', `${topbar.getBoundingClientRect().bottom}px`);
  new ResizeObserver(trackTopbar).observe(topbar);
  trackTopbar();

  /* dropdown menus */
  const menus = [...document.querySelectorAll('[data-menu]')];
  const closeMenus = (except) =>
    menus.forEach((b) => {
      if (b === except) return;
      b.classList.remove('on');
      b.setAttribute('aria-expanded', 'false');
      $(b.dataset.menu).hidden = true;
    });
  for (const b of menus) {
    b.setAttribute('aria-expanded', 'false');
    b.setAttribute('aria-controls', b.dataset.menu);
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenus(b);
      const m = $(b.dataset.menu);
      m.style.top = `${$('topbar').getBoundingClientRect().bottom + 8}px`;
      m.hidden = !m.hidden;
      b.classList.toggle('on', !m.hidden);
      b.setAttribute('aria-expanded', String(!m.hidden));
      if (!m.hidden) m.querySelector('input[type=search]')?.focus();
    });
  }
  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.menu, [data-menu]')) closeMenus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenus();
  });

  /* presets */
  const presets = $('presets');
  for (const [id, label] of PRESET_LABELS) {
    const b = document.createElement('button');
    b.textContent = label;
    b.dataset.p = id;
    b.addEventListener('click', () => h.onPreset(id));
    presets.append(b);
  }
  /** Highlight the view that matches the current state (none after a manual layer change). */
  const markPreset = () => {
    const off = LAYERS.filter((l) => !state.layers[l.id]).map((l) => l.id).join();
    const current = state.explodeTarget > 0 ? (off ? null : 'exploded') : off === '' ? 'assembled' : off === 'body' ? 'shell' : null;
    presets.querySelectorAll('button').forEach((x) => {
      x.classList.toggle('on', x.dataset.p === current);
      x.setAttribute('aria-pressed', String(x.dataset.p === current));
    });
  };
  markPreset();

  /* explode slider */
  const ex = $('explode');
  const exVal = $('explode-val');
  const showExplode = (v) => {
    exVal.textContent = `${Math.round(v * 100)}%`;
    ex.setAttribute('aria-valuetext', `${Math.round(v * 100)}% separado`);
    ex.style.setProperty('--p', `${v * 100}%`); // filled track
  };
  ex.addEventListener('input', () => {
    h.onExplode(+ex.value);
    showExplode(+ex.value);
    markPreset();
  });

  /* layers */
  const layerEl = $('layers');
  const chips = {};
  for (const l of LAYERS) {
    const c = document.createElement('button');
    c.className = 'chip';
    c.textContent = l.label;
    c.setAttribute('aria-pressed', 'true');
    c.addEventListener('click', () => {
      const on = c.classList.toggle('off') === false;
      c.setAttribute('aria-pressed', String(on));
      h.onLayer(l.id, on);
      markPreset();
    });
    chips[l.id] = c;
    layerEl.append(c);
  }

  /* toggle buttons */
  const toggle = (id, cb) => {
    const b = $(id);
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      const on = b.classList.toggle('on');
      b.setAttribute('aria-pressed', String(on));
      cb(on);
    });
    return b;
  };
  toggle('view-mode', (on) => h.onView(on ? 'category' : 'real'));
  toggle('xray', h.onXray);
  toggle('dims', h.onDims);
  toggle('spin', h.onSpin);
  toggle('aero-mode', (on) => {
    h.onAero(on);
    $('aero-mode').textContent = on ? 'Aero: Reta' : 'Aero: Curva';
    $('aero-mode').setAttribute('aria-label', `Aerodinâmica ativa: modo ${on ? 'Reta' : 'Curva'}`);
  });

  /* tyre compound: click to cycle */
  const tyre = $('compound');
  let ci = 0;
  const names = tyre.querySelector('.names');
  names.innerHTML = COMPOUNDS.map(([name]) => `<span>${name}</span>`).join('');
  const showCompound = () => {
    const fullName = ['Macio', 'Médio', 'Duro', 'Intermediário', 'Chuva extrema'][ci];
    tyre.setAttribute('aria-label', `Composto dos pneus: ${fullName}`);
    tyre.title = `Composto: ${fullName}. Clique para trocar.`;
    tyre.querySelector('i').style.background = COMPOUNDS[ci][1];
    [...names.children].forEach((s, i) => s.classList.toggle('on', i === ci));
  };
  showCompound();
  tyre.addEventListener('click', () => {
    ci = (ci + 1) % COMPOUNDS.length;
    showCompound();
    h.onCompound(COMPOUNDS[ci][1]);
  });

  /* paint colour: click to cycle */
  const paint = $('paint');
  let pi = 0;
  const showPaint = () => {
    const [name, hex] = LIVERY_COLORS[pi];
    paint.querySelector('i').style.background = hex;
    paint.title = `Pintura: ${name}`;
    paint.setAttribute('aria-label', `Cor do carro: ${name}`);
  };
  showPaint();
  paint.addEventListener('click', () => {
    pi = (pi + 1) % LIVERY_COLORS.length;
    showPaint();
    h.onPaint(LIVERY_COLORS[pi][1]);
  });

  /* camera bar */
  const cams = $('cams');
  cams.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.classList.contains('on'))));
  cams.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => {
      cams.querySelectorAll('button').forEach((x) => {
        x.classList.toggle('on', x === b);
        x.setAttribute('aria-pressed', String(x === b));
      });
      h.onCam(b.dataset.cam);
    }),
  );

  /* legend */
  const legend = $('legend');
  for (const [k, c] of Object.entries(CATEGORIES)) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="dot" style="background:${c.color}"></span><div><b>${c.label}</b><small>${c.who}</small></div><span class="count">${h.counts[k]}</span>`;
    li.addEventListener('mouseenter', () => h.onCategoryHover(k));
    li.addEventListener('mouseleave', () => h.onCategoryHover(null));
    legend.append(li);
  }

  /* always-visible colour key (top right) */
  const key = $('key');
  for (const [k, c] of Object.entries(CATEGORIES)) {
    const li = document.createElement('li');
    li.innerHTML = `<i style="background:${c.color}"></i>${c.label}`;
    li.title = c.who;
    li.addEventListener('mouseenter', () => h.onCategoryHover(k));
    li.addEventListener('mouseleave', () => h.onCategoryHover(null));
    key.append(li);
  }

  /* overview */
  $('overview-list').innerHTML = OVERVIEW.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');

  /* part index */
  const list = $('part-list');
  const items = {};
  const groups = {};
  for (const [id, p] of Object.entries(PARTS)) (groups[p.group] ??= []).push([id, p]);
  for (const [g, entries] of Object.entries(groups)) {
    const t = document.createElement('div');
    t.className = 'group-title';
    t.textContent = g;
    list.append(t);
    for (const [id, p] of entries) {
      const b = document.createElement('button');
      b.className = 'part-item';
      b.dataset.search = searchable(`${p.name} ${g} ${CATEGORIES[p.cat].label} ${p.cat}`);
      b.title = p.name;
      b.setAttribute('aria-pressed', 'false');
      b.innerHTML = `<span class="dot" style="background:${CATEGORIES[p.cat].color}"></span><span class="nm">${p.name}</span>${p.isNew ? '<span class="new">NOVO</span>' : ''}<span class="cat">${p.cat}</span>`;
      b.addEventListener('click', () => h.onPick(id));
      b.addEventListener('mouseenter', () => h.onHoverInfo(id));
      b.addEventListener('mouseleave', () => h.onHoverInfo(null));
      items[id] = b;
      list.append(b);
    }
  }
  $('search').addEventListener('input', (e) => {
    const q = searchable(e.target.value.trim());
    for (const b of Object.values(items)) b.hidden = q && !b.dataset.search.includes(q);
    list.querySelectorAll('.group-title').forEach((t) => {
      let n = t.nextElementSibling;
      let any = false;
      while (n && !n.classList.contains('group-title')) {
        if (!n.hidden) any = true;
        n = n.nextElementSibling;
      }
      t.hidden = !any;
    });
    $('search-empty').hidden = Object.values(items).some((b) => !b.hidden);
  });

  return {
    sync() {
      ex.value = state.explodeTarget;
      showExplode(state.explodeTarget);
      for (const l of LAYERS) {
        chips[l.id].classList.toggle('off', !state.layers[l.id]);
        chips[l.id].setAttribute('aria-pressed', String(state.layers[l.id]));
      }
      $('xray').classList.toggle('on', state.xray);
      $('xray').setAttribute('aria-pressed', String(state.xray));
      markPreset();
    },
    markHot(id) {
      for (const [k, b] of Object.entries(items)) b.classList.toggle('hot', k === id);
    },
    markSelected(id) {
      for (const [k, b] of Object.entries(items)) {
        b.classList.toggle('sel', k === id);
        b.setAttribute('aria-pressed', String(k === id));
      }
      if (id && items[id]) items[id].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    },
  };
}
