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

test('homepage category shortcuts stay repo-subpath safe', () => {
  assert.doesNotMatch(indexMd, /href="\/\?cat=/);
  assert.match(indexMd, /href="\?cat=language"/);
  assert.match(indexMd, /href="\?cat=frontend"/);
  assert.match(indexMd, /href="\?cat=backend"/);
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
  assert.match(indexMd, /href="\.\/openspec\/architecture\.html"/);
  assert.match(indexMd, /href="\.\/openspec\/ai-tooling\.html"/);
  assert.match(indexMd, /href="\.\/openspec\/workflow\.html"/);
  assert.doesNotMatch(indexMd, /href="\.\/openspec\/architecture(?=")/);
  assert.doesNotMatch(indexMd, /href="\.\/openspec\/ai-tooling(?=")/);
  assert.doesNotMatch(indexMd, /href="\.\/openspec\/workflow(?=")/);
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

test('site content scaffold exports stay stable', () => {
  assert.ok(Array.isArray(siteContent.heroStats));
  assert.deepEqual(
    siteContent.heroStats.map(({ label }) => label),
    ['规则', '路径', '资源分组'],
  );
  assert.equal(siteContent.philosophyCards.length, 1);
  assert.equal(typeof siteContent.philosophyCards[0].icon, 'string');
  assert.ok(siteContent.philosophyCards[0].icon.length > 0);
  assert.doesNotMatch(siteContent.philosophyCards[0].icon, /^\//);
  assert.equal(siteContent.philosophyCards[0].title, '不是 prompts 杂货铺');
  assert.ok(Array.isArray(siteContent.pathways));
  assert.ok(Array.isArray(siteContent.resourceGroups));
});
