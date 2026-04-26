const TEXT = {
  zh: {
    badge: 'Archive-grade Cursor .mdc 规则库',
    title: '用生成式目录浏览、筛选并采用 Cursor Rules',
    description:
      '规则文件仍然保持在仓库根目录，GitHub Pages 只负责发现、筛选、理解与复制采用路径。',
    browseRepo: '查看 GitHub 仓库',
    readme: '阅读 README',
    totalRules: '规则总数',
    categories: '分类数',
    globalRules: '全局规则',
    filtersTitle: '按主题筛选',
    filtersDescription: '搜索规则标题、描述或文件名；使用分类按钮快速收窄范围。',
    searchPlaceholder: '搜索规则、描述或文件名',
    results: '结果',
    emptyTitle: '没有匹配的规则',
    emptyDescription: '试试清空关键词，或者切换到其他分类。',
    installSnippet: '复制接入命令',
    openOnGithub: '在 GitHub 中打开',
    fileLabel: '文件',
    globLabel: '适用范围',
    globalLabel: '全局规则',
    footer:
      'README 负责快速开始；GitHub Pages 负责规则目录；OpenSpec 文档负责项目控制与交接。',
    categoriesMap: {
      all: '全部',
      general: '通用',
      language: '语言',
      backend: '后端',
      frontend: '前端',
      mobile: '移动端',
      engineering: '工程',
      other: '其他',
    },
  },
  en: {
    badge: 'Archive-grade Cursor .mdc library',
    title: 'Browse, filter, and adopt Cursor Rules from a generated catalog',
    description:
      'Rule files stay at the repository root; GitHub Pages focuses on discovery, filtering, understanding, and adoption.',
    browseRepo: 'Open GitHub repo',
    readme: 'Read README',
    totalRules: 'Rules',
    categories: 'Categories',
    globalRules: 'Global',
    filtersTitle: 'Filter by topic',
    filtersDescription: 'Search rule titles, descriptions, or filenames and narrow by category.',
    searchPlaceholder: 'Search rules, descriptions, or filenames',
    results: 'Results',
    emptyTitle: 'No matching rules',
    emptyDescription: 'Clear the search query or switch to another category.',
    installSnippet: 'Copy install command',
    openOnGithub: 'Open on GitHub',
    fileLabel: 'File',
    globLabel: 'Scope',
    globalLabel: 'Global rule',
    footer:
      'README is the quick-start entry, GitHub Pages is the rule catalog, and OpenSpec docs hold project control guidance.',
    categoriesMap: {
      all: 'All',
      general: 'General',
      language: 'Language',
      backend: 'Backend',
      frontend: 'Frontend',
      mobile: 'Mobile',
      engineering: 'Engineering',
      other: 'Other',
    },
  },
};

const CATEGORY_ORDER = [
  'all',
  'general',
  'language',
  'backend',
  'frontend',
  'mobile',
  'engineering',
  'other',
];

const state = {
  language: 'zh',
  query: '',
  category: 'all',
  rules: [],
  copyMessage: '',
};

function t() {
  return TEXT[state.language];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function categoryLabel(category) {
  return t().categoriesMap[category] ?? category;
}

function globalRuleCount() {
  return state.rules.filter((rule) => rule.globs.length === 0).length;
}

function categoryCounts() {
  const counts = new Map(CATEGORY_ORDER.map((category) => [category, 0]));
  counts.set('all', state.rules.length);

  for (const rule of state.rules) {
    counts.set(rule.category, (counts.get(rule.category) ?? 0) + 1);
  }

  return counts;
}

function filteredRules() {
  return state.rules.filter((rule) => {
    const matchesCategory =
      state.category === 'all' || rule.category === state.category;
    const haystack = `${rule.title} ${rule.description} ${rule.fileName}`.toLowerCase();
    const matchesQuery = haystack.includes(state.query.toLowerCase());

    return matchesCategory && matchesQuery;
  });
}

function installCommand(fileName) {
  return `mkdir -p .cursor/rules\ncp path/to/cursor-rules/${fileName} .cursor/rules/`;
}

function stat(label, value) {
  return `
    <div class="stat-card">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${escapeHtml(label)}</span>
    </div>
  `;
}

function renderHero() {
  const labels = t();
  const hero = document.querySelector('#hero');

  hero.innerHTML = `
    <header class="hero-shell">
      <div class="hero-topbar">
        <a class="brand" href="https://github.com/LessUp/cursor-rules" target="_blank" rel="noopener">
          <span class="brand-mark">◆</span>
          <span class="brand-text">Cursor Rules</span>
        </a>
        <div class="lang-toggle" role="group" aria-label="language switcher">
          <button class="lang-button ${state.language === 'zh' ? 'active' : ''}" data-lang="zh">中文</button>
          <button class="lang-button ${state.language === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>
      </div>
      <div class="hero-card">
        <p class="eyebrow">${escapeHtml(labels.badge)}</p>
        <h1>${escapeHtml(labels.title)}</h1>
        <p class="subtitle">${escapeHtml(labels.description)}</p>
        <div class="hero-actions">
          <a class="primary-link" href="https://github.com/LessUp/cursor-rules" target="_blank" rel="noopener">${escapeHtml(labels.browseRepo)}</a>
          <a class="secondary-link" href="https://github.com/LessUp/cursor-rules#readme" target="_blank" rel="noopener">${escapeHtml(labels.readme)}</a>
        </div>
        <div class="stats-grid">
          ${stat(labels.totalRules, state.rules.length)}
          ${stat(labels.categories, CATEGORY_ORDER.length - 1)}
          ${stat(labels.globalRules, globalRuleCount())}
        </div>
      </div>
    </header>
  `;
}

function renderFilters() {
  const labels = t();
  const counts = categoryCounts();
  const filters = document.querySelector('#filters');

  filters.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${escapeHtml(labels.filtersTitle)}</p>
          <h2>${escapeHtml(labels.filtersDescription)}</h2>
        </div>
        <div class="status-pill">${escapeHtml(labels.results)}: ${filteredRules().length}</div>
      </div>
      <div class="toolbar">
        <input
          id="search-input"
          class="search-input"
          type="search"
          value="${escapeHtml(state.query)}"
          placeholder="${escapeHtml(labels.searchPlaceholder)}"
          aria-label="${escapeHtml(labels.searchPlaceholder)}"
        >
        <div class="chip-row">
          ${CATEGORY_ORDER.map((category) => `
            <button
              class="chip-button ${state.category === category ? 'active' : ''}"
              data-category="${category}"
              type="button"
            >
              ${escapeHtml(categoryLabel(category))} <span>${counts.get(category) ?? 0}</span>
            </button>
          `).join('')}
        </div>
      </div>
      ${state.copyMessage ? `<p class="copy-status">${escapeHtml(state.copyMessage)}</p>` : ''}
    </section>
  `;
}

function renderRule(rule) {
  const labels = t();
  const globs = rule.globs.length
    ? rule.globs.map((glob) => `<code>${escapeHtml(glob)}</code>`).join('')
    : `<span class="scope-global">${escapeHtml(labels.globalLabel)}</span>`;

  return `
    <article class="rule-card">
      <div class="rule-card-head">
        <div>
          <p class="eyebrow">${escapeHtml(categoryLabel(rule.category))}</p>
          <h3>${escapeHtml(rule.title)}</h3>
        </div>
        <span class="file-pill">${escapeHtml(rule.fileName)}</span>
      </div>
      <p class="rule-description">${escapeHtml(rule.description)}</p>
      <dl class="rule-meta">
        <div>
          <dt>${escapeHtml(labels.fileLabel)}</dt>
          <dd><code>${escapeHtml(rule.fileName)}</code></dd>
        </div>
        <div>
          <dt>${escapeHtml(labels.globLabel)}</dt>
          <dd class="scope-list">${globs}</dd>
        </div>
      </dl>
      <div class="rule-actions">
        <button class="secondary-link button-reset" type="button" data-copy-file="${escapeHtml(rule.fileName)}">${escapeHtml(labels.installSnippet)}</button>
        <a class="secondary-link" href="https://github.com/LessUp/cursor-rules/blob/master/${encodeURIComponent(rule.fileName)}" target="_blank" rel="noopener">${escapeHtml(labels.openOnGithub)}</a>
      </div>
    </article>
  `;
}

function renderGrid() {
  const labels = t();
  const rules = filteredRules();
  const grid = document.querySelector('#rule-grid');

  if (!rules.length) {
    grid.innerHTML = `
      <section class="panel empty-state">
        <h2>${escapeHtml(labels.emptyTitle)}</h2>
        <p class="subtitle">${escapeHtml(labels.emptyDescription)}</p>
      </section>
    `;
    return;
  }

  grid.innerHTML = `
    <section class="grid-shell">
      <div class="grid">
        ${rules.map(renderRule).join('')}
      </div>
      <footer class="catalog-footer">
        <p>${escapeHtml(labels.footer)}</p>
      </footer>
    </section>
  `;
}

function render() {
  renderHero();
  renderFilters();
  renderGrid();
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

async function loadRules() {
  const response = await fetch('./assets/rules.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load rules: ${response.status}`);
  }

  state.rules = await response.json();
}

document.addEventListener('click', async (event) => {
  const langButton = event.target.closest('[data-lang]');
  if (langButton) {
    state.language = langButton.dataset.lang;
    state.copyMessage = '';
    render();
    return;
  }

  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) {
    state.category = categoryButton.dataset.category;
    state.copyMessage = '';
    render();
    return;
  }

  const copyButton = event.target.closest('[data-copy-file]');
  if (copyButton) {
    const fileName = copyButton.dataset.copyFile;
    await copyText(installCommand(fileName));
    state.copyMessage = `${fileName} copied`;
    renderFilters();
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'search-input') {
    state.query = event.target.value;
    renderFilters();
    renderGrid();
  }
});

async function init() {
  await loadRules();
  render();
}

init().catch((error) => {
  document.querySelector('#app').innerHTML = `
    <section class="panel empty-state">
      <h1>Failed to load catalog</h1>
      <p class="subtitle">${escapeHtml(error.message)}</p>
    </section>
  `;
});
