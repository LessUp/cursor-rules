import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const configTs = fs.readFileSync(
  new URL('../docs/.vitepress/config.ts', import.meta.url),
  'utf8',
);

const buildScript = fs.readFileSync(
  new URL('../scripts/build-rule-catalog.mjs', import.meta.url),
  'utf8',
);

const indexMd = fs.readFileSync(
  new URL('../docs/index.md', import.meta.url),
  'utf8',
);

const catalogJsUrl = new URL('../docs/public/assets/catalog.js', import.meta.url);
const catalogJs = fs.readFileSync(catalogJsUrl, 'utf8');
const siteContentUrl = new URL('../docs/.vitepress/theme/content/site-content.ts', import.meta.url);
const siteContentTs = fs.readFileSync(siteContentUrl, 'utf8');
const siteContent = await import(
  `data:text/javascript,${encodeURIComponent(siteContentTs)}`,
);

test('VitePress config is Chinese-only without locales', () => {
  assert.match(configTs, /lang:\s*'zh-CN'/);
  assert.match(configTs, /\/rules\//);
  assert.doesNotMatch(configTs, /locales:/);
  assert.doesNotMatch(configTs, /\/zh\//);
  assert.doesNotMatch(configTs, /\/en\//);
});

test('build script generates site catalog artifacts and rule pages', () => {
  assert.match(buildScript, /rules\.json/);
  assert.match(buildScript, /categories\.json/);
  assert.match(buildScript, /sitemap\.xml/);
  assert.match(buildScript, /docs\/rules/);
});

test('index.md has catalog container elements', () => {
  assert.match(indexMd, /id="catalog"/);
  assert.match(indexMd, /id="rule-cards"/);
  assert.match(indexMd, /id="search-input"/);
});

test('homepage promotes philosophy, pathway map, and resource atlas before catalog', () => {
  assert.match(indexMd, /id="home-hero"/);
  assert.match(indexMd, /id="home-philosophy"/);
  assert.match(indexMd, /id="home-path-map"/);
  assert.match(indexMd, /id="home-resource-atlas"/);
  assert.match(indexMd, /toPortalHref\(pathwaysSection\.linkHref\)/);
  assert.match(indexMd, /toPortalHref\(resourcesSection\.linkHref\)/);
  assert.match(indexMd, /id="catalog"/);
});

test('homepage keeps hero metrics separate from catalog runtime stats', () => {
  assert.doesNotMatch(indexMd, /stat\.label === '规则' \? 'stat-rules'/);
  assert.match(indexMd, /id="catalog-stats"/);
  assert.match(indexMd, /:id="stat\.id"/);
  assert.deepEqual(
    siteContent.catalogSection.stats.map(({ id }) => id),
    ['stat-rules', 'stat-categories', 'stat-global'],
  );
});

test('homepage category shortcuts stay repo-subpath safe', () => {
  assert.doesNotMatch(indexMd, /href="\/\?cat=/);
  assert.match(indexMd, /:href="filter\.href"/);
  assert.deepEqual(
    siteContent.catalogSection.quickFilters.map(({ href }) => href),
    ['?cat=language', '?cat=frontend', '?cat=backend'],
  );
});

test('homepage portal links preserve repo-subpath safety', () => {
  assert.match(indexMd, /import\s*\{[^}]*withBase[^}]*\}\s*from 'vitepress'/);
  assert.match(indexMd, /const toPortalHref = \(href\) => href\.startsWith\('\/'\) \? withBase\(href\) : href/);
  assert.match(indexMd, /:href="toPortalHref\(pathway\.href\)"/);
  assert.match(indexMd, /:href="toPortalHref\(group\.href\)"/);
});

test('public portal contract exposes pathways and resources surfaces', () => {
  assert.match(configTs, /text:\s*'采用路径'/);
  assert.match(configTs, /text:\s*'资源'/);
  assert.match(configTs, /src:\s*`\$\{base\}assets\/catalog\.js`/);
  assert.doesNotMatch(configTs, /src:\s*'\/assets\/catalog\.js'/);
  assert.match(indexMd, /id="home-philosophy"/);
  assert.match(indexMd, /id="home-path-map"/);
  assert.match(indexMd, /id="home-resource-atlas"/);
  assert.equal(fs.existsSync(new URL('../docs/pathways/index.md', import.meta.url)), true);
  assert.equal(fs.existsSync(new URL('../docs/resources/index.md', import.meta.url)), true);
  assert.equal(fs.existsSync(catalogJsUrl), true);
  assert.match(buildScript, /pathways/);
  assert.match(buildScript, /resources/);
});

test('homepage raw HTML OpenSpec links stay static-export safe', () => {
  assert.match(indexMd, /toPortalHref\(link\.href\)/);
  assert.deepEqual(
    siteContent.resourcesSection.links.map(({ href }) => href),
    [
      './openspec/architecture.html',
      './openspec/ai-tooling.html',
      './openspec/workflow.html',
    ],
  );
  assert.ok(siteContent.resourcesSection.links.every(({ href }) => href.endsWith('.html')));
});

test('catalog runtime asset contract stays in sync with homepage shell', () => {
  assert.match(catalogJs, /document\.getElementById\('search-input'\)/);
  assert.match(catalogJs, /document\.getElementById\('rule-cards'\)/);
  assert.match(catalogJs, /fetch\(`\$\{base\}assets\/rules\.json`/);
  assert.match(catalogJs, /fetch\(`\$\{base\}assets\/categories\.json`/);
});

test('catalog runtime stays inert when the catalog shell is absent', async () => {
  const fetchCalls = [];
  const documentEvents = [];
  const context = {
    window: {
      location: { search: '?cat=language', pathname: '/cursor-rules/pathways/' },
      history: {
        replaceState() {
          throw new Error('history should stay untouched without catalog shell');
        },
      },
    },
    document: {
      readyState: 'complete',
      currentScript: { src: 'https://lessup.github.io/cursor-rules/assets/catalog.js' },
      getElementById() { return null; },
      addEventListener(type) {
        documentEvents.push(type);
      },
      querySelector() { return null; },
    },
    navigator: {},
    fetch: async (url) => {
      fetchCalls.push(String(url));
      return {
        ok: true,
        json: async () => [],
        text: async () => '',
      };
    },
    URL,
    URLSearchParams,
    console,
    setTimeout,
    clearTimeout,
  };

  context.window.document = context.document;
  context.window.navigator = context.navigator;

  vm.runInNewContext(catalogJs, context);
  await Promise.resolve();

  assert.deepEqual(fetchCalls, []);
  assert.deepEqual(documentEvents, []);
});

test('catalog runtime resolves repo subpath assets without relying on a base tag', async () => {
  const fetchCalls = [];
  const docListeners = [];
  const createElement = () => ({
    style: {},
    value: '',
    textContent: '',
    innerHTML: '',
    dataset: {},
    children: [],
    addEventListener() {},
    appendChild(child) {
      this.children.push(child);
    },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    focus() {},
    setAttribute() {},
  });
  const elements = {
    'search-input': createElement(),
    'search-clear': createElement(),
    'chip-row': createElement(),
    'result-count': createElement(),
    'copy-status': createElement(),
    'skeleton-grid': createElement(),
    'rule-grid': createElement(),
    'rule-cards': createElement(),
    'empty-state': createElement(),
    'stat-rules': createElement(),
    'stat-categories': createElement(),
    'stat-global': createElement(),
  };
  const context = {
    window: {
      location: { search: '', pathname: '/cursor-rules/' },
      history: { replaceState() {} },
    },
    document: {
      readyState: 'complete',
      currentScript: { src: 'https://lessup.github.io/cursor-rules/assets/catalog.js' },
      getElementById(id) { return elements[id] ?? null; },
      addEventListener(type, handler) {
        docListeners.push({ type, handler });
      },
      querySelector() { return null; },
      createElement,
    },
    navigator: {},
    fetch: async (url) => {
      fetchCalls.push(String(url));
      return {
        ok: true,
        json: async () => [],
        text: async () => '',
      };
    },
    URL,
    URLSearchParams,
    console,
    setTimeout,
    clearTimeout,
  };

  context.window.document = context.document;
  context.window.navigator = context.navigator;

  vm.runInNewContext(catalogJs, context);
  await Promise.resolve();

  assert.doesNotMatch(catalogJs, /querySelector\('base'\)/);
  assert.deepEqual(docListeners.map(({ type }) => type), ['keydown']);
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    ['/cursor-rules/assets/rules.json', '/cursor-rules/assets/categories.json'],
  );
});

test('site content exports populated portal content collections', () => {
  assert.ok(Array.isArray(siteContent.heroStats));
  assert.deepEqual(
    siteContent.heroStats.map(({ label }) => label),
    ['规则', '路径', '资源分组'],
  );
  assert.equal(typeof siteContent.homeHero.eyebrow, 'string');
  assert.equal(siteContent.homeHero.actions.length, 3);
  assert.equal(siteContent.homeHero.actions[0].href, '/pathways/');
  assert.equal(typeof siteContent.philosophySection.title, 'string');
  assert.ok(siteContent.philosophyCards.length >= 1);
  assert.equal(typeof siteContent.philosophyCards[0].icon, 'string');
  assert.ok(siteContent.philosophyCards[0].icon.length > 0);
  assert.doesNotMatch(siteContent.philosophyCards[0].icon, /^\//);
  assert.equal(siteContent.philosophyCards[0].title, '不是 prompts 杂货铺');
  assert.ok(Array.isArray(siteContent.pathways));
  assert.equal(siteContent.pathways.length, 3);
  assert.equal(siteContent.pathways[0].href, '/pathways/');
  assert.equal(typeof siteContent.pathways[0].summary, 'string');
  assert.equal(typeof siteContent.pathwaysSection.linkLabel, 'string');
  assert.ok(Array.isArray(siteContent.resourceGroups));
  assert.equal(siteContent.resourceGroups.length, 4);
  assert.equal(siteContent.resourceGroups[0].href, '/resources/');
  assert.equal(typeof siteContent.resourceGroups[0].items[0], 'string');
  assert.equal(siteContent.resourcesSection.links.length, 3);
  assert.equal(siteContent.catalogSection.quickFilters[0].href, '?cat=language');
  assert.equal(siteContent.catalogSection.shortcuts.length, 3);
  assert.equal(siteContent.catalogSection.emptyState.title, '没有匹配的规则');
});

test('homepage template renders homepage copy from site content exports', () => {
  assert.match(indexMd, /homeHero,/);
  assert.match(indexMd, /philosophySection,/);
  assert.match(indexMd, /pathwaysSection,/);
  assert.match(indexMd, /resourcesSection,/);
  assert.match(indexMd, /catalogSection,/);
  assert.match(indexMd, /v-for="action in homeHero\.actions"/);
  assert.match(indexMd, /{{ homeHero\.eyebrow }}/);
  assert.match(indexMd, /{{ philosophySection\.title }}/);
  assert.match(indexMd, /{{ pathwaysSection\.linkLabel }}/);
  assert.match(indexMd, /{{ resourcesSection\.linksLabel }}/);
  assert.match(indexMd, /{{ catalogSection\.footer }}/);
  assert.doesNotMatch(indexMd, /先讲理念、再给路径、再配资源，最后才进入规则目录。/);
  assert.doesNotMatch(indexMd, /为什么是门户而不是清单/);
  assert.doesNotMatch(indexMd, /已经理解理念、选好路径、拿到资源后，再按主题筛选规则。/);
});
