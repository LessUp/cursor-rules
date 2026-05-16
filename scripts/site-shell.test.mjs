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

const rootIndexMd = fs.readFileSync(
  new URL('../docs/index.md', import.meta.url),
  'utf8',
);

const zhIndexMd = fs.readFileSync(
  new URL('../docs/zh/index.md', import.meta.url),
  'utf8',
);

const enIndexMd = fs.readFileSync(
  new URL('../docs/en/index.md', import.meta.url),
  'utf8',
);

const indexMd = zhIndexMd;

const pathwaysMd = fs.readFileSync(
  new URL('../docs/pathways/index.md', import.meta.url),
  'utf8',
);

const resourcesMd = fs.readFileSync(
  new URL('../docs/resources/index.md', import.meta.url),
  'utf8',
);

const styleCss = fs.readFileSync(
  new URL('../docs/.vitepress/theme/style.css', import.meta.url),
  'utf8',
);

const catalogJsUrl = new URL('../docs/public/assets/catalog.js', import.meta.url);
const catalogJs = fs.readFileSync(catalogJsUrl, 'utf8');
const siteContentUrl = new URL('../docs/.vitepress/theme/content/site-content.ts', import.meta.url);
const siteContentTs = fs.readFileSync(siteContentUrl, 'utf8');
const siteContent = await import(
  `data:text/javascript,${encodeURIComponent(siteContentTs)}`,
);

test('VitePress config is locale-first with zh and en trees', () => {
  assert.match(configTs, /locales:\s*\{/);
  assert.match(configTs, /zh:\s*\{/);
  assert.match(configTs, /en:\s*\{/);
  assert.match(configTs, /link:\s*'\/zh\/'/);
  assert.match(configTs, /link:\s*'\/en\/'/);
  assert.match(configTs, /\/zh\/guides\/reading-map/);
  assert.match(configTs, /\/zh\/academy\/rule-philosophy/);
  assert.match(configTs, /\/zh\/architecture\/system-overview/);
  assert.match(configTs, /\/zh\/research\/related-work/);
  assert.match(configTs, /\/en\/guides\/reading-map/);
  assert.match(configTs, /\/en\/academy\/rule-philosophy/);
  assert.match(configTs, /\/en\/architecture\/system-overview/);
  assert.match(configTs, /\/en\/research\/related-work/);
  assert.match(configTs, /\/zh\/rules\//);
  assert.match(configTs, /\/en\/rules\//);
  assert.match(configTs, /guide\/\*\*/);
  assert.match(configTs, /architecture\/\*\*/);
  assert.match(configTs, /reference\/\*\*/);
  assert.match(configTs, /advanced\/\*\*/);
  assert.match(configTs, /whitepaper\/\*\*/);
});

test('root index redirects visitors into locale entry points', () => {
  assert.match(rootIndexMd, /import \{ onMounted \} from 'vue'/);
  assert.match(rootIndexMd, /import \{ withBase \} from 'vitepress'/);
  assert.match(rootIndexMd, /navigator\.language \|\| navigator\.userLanguage/);
  assert.match(rootIndexMd, /window\.location\.search/);
  assert.match(rootIndexMd, /window\.location\.hash/);
  assert.match(rootIndexMd, /window\.location\.replace/);
  assert.match(rootIndexMd, /withBase\('\/zh\/'\)/);
  assert.match(rootIndexMd, /withBase\('\/en\/'\)/);
  assert.match(enIndexMd, /layout:\s*home/);
  assert.match(zhIndexMd, /layout:\s*home/);
});

test('locale documentation tree exposes guide, academy, architecture, and research entry pages', () => {
  for (const docPath of [
    '../docs/zh/guides/reading-map.md',
    '../docs/zh/academy/rule-philosophy.md',
    '../docs/zh/architecture/system-overview.md',
    '../docs/zh/research/related-work.md',
    '../docs/zh/research/references.md',
    '../docs/zh/research/evolution.md',
    '../docs/en/guides/reading-map.md',
    '../docs/en/academy/rule-philosophy.md',
    '../docs/en/architecture/system-overview.md',
    '../docs/en/research/related-work.md',
    '../docs/en/research/references.md',
    '../docs/en/research/evolution.md',
  ]) {
    assert.equal(fs.existsSync(new URL(docPath, import.meta.url)), true, `${docPath} should exist`);
  }

  const zhGuideMd = fs.readFileSync(new URL('../docs/zh/guides/reading-map.md', import.meta.url), 'utf8');
  const zhArchitectureMd = fs.readFileSync(new URL('../docs/zh/architecture/system-overview.md', import.meta.url), 'utf8');
  const zhResearchMd = fs.readFileSync(new URL('../docs/zh/research/related-work.md', import.meta.url), 'utf8');

  assert.match(zhGuideMd, /# 项目导读/);
  assert.match(zhArchitectureMd, /# 系统架构总览/);
  assert.match(zhResearchMd, /# 相关工作/);
});

test('build script generates site catalog artifacts and rule pages', () => {
  assert.match(buildScript, /rules\.json/);
  assert.match(buildScript, /categories\.json/);
  assert.match(buildScript, /sitemap\.xml/);
  assert.match(buildScript, /docs\/zh\/rules/);
  assert.match(buildScript, /docs\/en\/rules/);
});

test('index.md has catalog container elements', () => {
  assert.match(indexMd, /id="catalog"/);
  assert.match(indexMd, /id="rule-cards"/);
  assert.match(indexMd, /id="search-input"/);
});

test('english homepage mirrors the whitepaper shell and catalog surface', () => {
  assert.match(enIndexMd, /id="home-hero"/);
  assert.match(enIndexMd, /id="home-thesis"/);
  assert.match(enIndexMd, /id="home-curriculum"/);
  assert.match(enIndexMd, /id="home-architecture-lab"/);
  assert.match(enIndexMd, /id="home-research"/);
  assert.match(enIndexMd, /id="catalog"/);
});

test('homepage promotes whitepaper, curriculum, architecture, and research surfaces before catalog', () => {
  assert.match(indexMd, /id="home-hero"/);
  assert.match(indexMd, /id="home-thesis"/);
  assert.match(indexMd, /id="home-curriculum"/);
  assert.match(indexMd, /id="home-architecture-lab"/);
  assert.match(indexMd, /id="home-research"/);
  assert.match(indexMd, /toPortalHref\(curriculumSection\.linkHref\)/);
  assert.match(indexMd, /toPortalHref\(researchSection\.linkHref\)/);
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
  assert.match(indexMd, /:href="toPortalHref\(track\.href\)"/);
  assert.match(indexMd, /:href="toPortalHref\(item\.href\)"/);
});

test('public portal contract exposes whitepaper surfaces and generated catalog assets', () => {
  assert.match(configTs, /text:\s*'采用路径'/);
  assert.match(configTs, /text:\s*'技术白皮书'/);
  assert.match(configTs, /src:\s*`\$\{base\}assets\/catalog\.js`/);
  assert.doesNotMatch(configTs, /src:\s*'\/assets\/catalog\.js'/);
  assert.match(indexMd, /id="home-thesis"/);
  assert.match(indexMd, /id="home-curriculum"/);
  assert.match(indexMd, /id="home-architecture-lab"/);
  assert.match(indexMd, /id="home-research"/);
  assert.equal(fs.existsSync(new URL('../docs/pathways/index.md', import.meta.url)), true);
  assert.equal(fs.existsSync(new URL('../docs/resources/index.md', import.meta.url)), true);
  assert.equal(fs.existsSync(catalogJsUrl), true);
});

test('pathways and resources page links send visitors to filtered homepage catalog anchors', () => {
  assert.match(pathwaysMd, /site-content/);
  assert.match(pathwaysMd, /v-for="pathway in pathways"/);
  assert.match(pathwaysMd, /toPortalHref\(pathwaysPage\.catalogHref\)/);
  assert.match(resourcesMd, /toPortalHref\(resourcesPage\.catalogHref\)/);
  assert.doesNotMatch(pathwaysMd, /toPortalHref\('\/\?cat=general'\)/);
  assert.match(siteContent.pathwaysPage.catalogHref, /\?cat=.*#catalog$/);
  assert.match(siteContent.resourcesPage.catalogHref, /\?cat=.*#catalog$/);
  assert.ok(siteContent.pathways.every(({ catalogHref }) => /\?cat=.*#catalog$/.test(catalogHref)));
});

test('resources page renders resource groups and highlights OpenSpec', () => {
  assert.match(resourcesMd, /site-content/);
  assert.match(resourcesMd, /v-for="group in resourceGroups"/);
  assert.match(resourcesMd, /OpenSpec/);
});

test('portal design system contract exposes whitepaper grids and figure treatments', () => {
  assert.match(styleCss, /\.portal-hero\s*\{/);
  assert.match(styleCss, /\.thesis-grid\s*\{/);
  assert.match(styleCss, /\.curriculum-grid\s*\{/);
  assert.match(styleCss, /\.architecture-grid\s*\{/);
  assert.match(styleCss, /\.citation-card\s*\{/);
  assert.match(styleCss, /\.diagram-frame\s*\{/);
  assert.match(styleCss, /\.portal-icon\s*\{/);

  assert.match(indexMd, /class="panel portal-hero"/);
  assert.match(indexMd, /class="feature-map thesis-grid"/);
  assert.match(indexMd, /class="feature-map curriculum-grid"/);
  assert.match(indexMd, /class="feature-map architecture-grid"/);
  assert.match(indexMd, /class="feature-card citation-card"/);
  assert.match(indexMd, /class="portal-icon"/);
  assert.match(pathwaysMd, /class="feature-map pathway-grid"/);
  assert.match(resourcesMd, /class="feature-card resource-group"/);
  assert.match(resourcesMd, /class="portal-icon"/);
});

test('resource group CTAs do not self-link back to the resources index', () => {
  assert.ok(
    siteContent.resourceGroups.every(({ href }) => href !== '/resources/'),
    'resource group CTA href should point to a real destination',
  );
});

test('build script sitemap includes locale surfaces and key OpenSpec docs', () => {
  assert.match(buildScript, /path:\s*'zh\/'/);
  assert.match(buildScript, /path:\s*'en\/'/);
  assert.match(buildScript, /path:\s*'zh\/guides\/reading-map\.html'/);
  assert.match(buildScript, /path:\s*'zh\/research\/related-work\.html'/);
  assert.match(buildScript, /path:\s*'zh\/research\/references\.html'/);
  assert.match(buildScript, /path:\s*'zh\/research\/evolution\.html'/);
  assert.match(buildScript, /path:\s*'en\/research\/related-work\.html'/);
  assert.match(buildScript, /routePrefix\}\/\$\{rule\.slug\}\.html/);
  assert.match(buildScript, /path:\s*'openspec\/architecture\.html'/);
  assert.match(buildScript, /path:\s*'openspec\/ai-tooling\.html'/);
  assert.match(buildScript, /path:\s*'openspec\/workflow\.html'/);
});

test('resources page raw HTML OpenSpec links stay static-export safe', () => {
  assert.match(resourcesMd, /toPortalHref\(link\.href\)/);
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
  assert.match(catalogJs, /window\.location\.pathname\.includes\('\/en\/'\)/);
  assert.match(catalogJs, /Copy rule content/);
  assert.match(catalogJs, /Source view/);
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

test('catalog runtime initializes once the homepage shell appears after SPA navigation', async () => {
  const fetchCalls = [];
  const documentEvents = [];
  const observers = [];

  const createElement = (overrides = {}) => {
    const listeners = new Map();
    return {
      style: {},
      value: '',
      textContent: '',
      innerHTML: '',
      dataset: {},
      children: [],
      tagName: 'DIV',
      addEventListener(type, handler) {
        const handlers = listeners.get(type) ?? [];
        handlers.push(handler);
        listeners.set(type, handlers);
      },
      appendChild(child) {
        this.children.push(child);
      },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      focus() {},
      scrollIntoView() {},
      setAttribute(name, value) {
        this[name] = value;
      },
      getAttribute(name) {
        return this[name] ?? null;
      },
      listeners,
      ...overrides,
    };
  };

  let elements = {};
  let triggers = [];

  class MutationObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }

    observe() {}
    disconnect() {}
  }

  const context = {
    window: {
      location: {
        href: 'https://lessup.github.io/cursor-rules/pathways/',
        search: '',
        pathname: '/cursor-rules/pathways/',
        hash: '',
      },
      history: { replaceState() {} },
    },
    document: {
      readyState: 'complete',
      currentScript: { src: 'https://lessup.github.io/cursor-rules/assets/catalog.js' },
      body: createElement(),
      documentElement: createElement(),
      getElementById(id) { return elements[id] ?? null; },
      addEventListener(type) {
        documentEvents.push(type);
      },
      querySelector() { return null; },
      querySelectorAll(selector) {
        if (selector === '[data-catalog-trigger]') return triggers;
        return [];
      },
      createElement,
    },
    MutationObserver,
    navigator: {},
    fetch: async (url) => {
      fetchCalls.push(String(url));
      if (String(url).endsWith('/assets/rules.json')) {
        return {
          ok: true,
          json: async () => [
            {
              slug: 'alpha-backend',
              title: 'Alpha Backend',
              description: 'Alpha rule',
              fileName: 'alpha-backend.mdc',
              category: 'backend',
              globs: [],
            },
          ],
        };
      }
      return {
        ok: true,
        json: async () => ({
          backend: { label: '后端', order: 1 },
        }),
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

  elements = {
    'catalog': createElement(),
    'search-input': createElement({ tagName: 'INPUT' }),
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
  triggers = [
    createElement({
      tagName: 'A',
      href: '/?cat=backend#catalog',
      dataset: { catalogTrigger: 'backend' },
    }),
  ];
  context.window.location = {
    href: 'https://lessup.github.io/cursor-rules/?cat=backend#catalog',
    search: '?cat=backend',
    pathname: '/cursor-rules/',
    hash: '#catalog',
  };

  for (const observer of observers) {
    observer.callback([{ type: 'childList' }]);
  }
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(elements['result-count'].textContent, 1);
  assert.equal(elements['search-input'].value, '');
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    ['/cursor-rules/assets/rules.json', '/cursor-rules/assets/categories.json'],
  );
  assert.equal(documentEvents.filter((type) => type === 'keydown').length, 1);
  assert.equal(triggers[0].listeners.get('click')?.length, 1);

  for (const observer of observers) {
    observer.callback([{ type: 'childList' }]);
  }
  await Promise.resolve();
  await Promise.resolve();

  assert.equal(documentEvents.filter((type) => type === 'keydown').length, 1);
  assert.equal(triggers[0].listeners.get('click')?.length, 1);
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    ['/cursor-rules/assets/rules.json', '/cursor-rules/assets/categories.json'],
  );
});

test('catalog runtime retries data load after a transient failure on a later shell mount', async () => {
  const fetchCalls = [];
  const observers = [];
  const consoleErrors = [];

  const createElement = (overrides = {}) => {
    const listeners = new Map();
    return {
      style: {},
      value: '',
      textContent: '',
      innerHTML: '',
      dataset: {},
      children: [],
      tagName: 'DIV',
      addEventListener(type, handler) {
        const handlers = listeners.get(type) ?? [];
        handlers.push(handler);
        listeners.set(type, handlers);
      },
      appendChild(child) {
        this.children.push(child);
      },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      focus() {},
      scrollIntoView() {},
      setAttribute(name, value) {
        this[name] = value;
      },
      getAttribute(name) {
        return this[name] ?? null;
      },
      listeners,
      ...overrides,
    };
  };

  let elements = {
    'catalog': createElement(),
    'search-input': createElement({ tagName: 'INPUT' }),
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

  class MutationObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }

    observe() {}
    disconnect() {}
  }

  let rulesAttempts = 0;
  const context = {
    window: {
      location: {
        href: 'https://lessup.github.io/cursor-rules/',
        search: '',
        pathname: '/cursor-rules/',
        hash: '',
      },
      history: { replaceState() {} },
    },
    document: {
      readyState: 'complete',
      currentScript: { src: 'https://lessup.github.io/cursor-rules/assets/catalog.js' },
      body: createElement(),
      documentElement: createElement(),
      getElementById(id) { return elements[id] ?? null; },
      addEventListener() {},
      querySelector() { return null; },
      querySelectorAll() { return []; },
      createElement,
    },
    MutationObserver,
    navigator: {},
    fetch: async (url) => {
      fetchCalls.push(String(url));
      if (String(url).endsWith('/assets/rules.json')) {
        rulesAttempts += 1;
        if (rulesAttempts === 1) {
          throw new Error('transient rules fetch failure');
        }
        return {
          ok: true,
          json: async () => [
            {
              slug: 'alpha-backend',
              title: 'Alpha Backend',
              description: 'Alpha rule',
              fileName: 'alpha-backend.mdc',
              category: 'backend',
              globs: [],
            },
          ],
        };
      }
      return {
        ok: true,
        json: async () => ({
          backend: { label: '后端', order: 1 },
        }),
      };
    },
    URL,
    URLSearchParams,
    console: {
      ...console,
      error(...args) {
        consoleErrors.push(args);
      },
    },
    setTimeout,
    clearTimeout,
  };

  context.window.document = context.document;
  context.window.navigator = context.navigator;

  vm.runInNewContext(catalogJs, context);
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(consoleErrors.length, 1);
  assert.equal(elements['result-count'].textContent, '');
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    ['/cursor-rules/assets/rules.json', '/cursor-rules/assets/categories.json'],
  );

  elements = {};
  for (const observer of observers) {
    observer.callback([{ type: 'childList' }]);
  }
  await Promise.resolve();

  elements = {
    'catalog': createElement(),
    'search-input': createElement({ tagName: 'INPUT' }),
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

  for (const observer of observers) {
    observer.callback([{ type: 'childList' }]);
  }
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(elements['result-count'].textContent, 1);
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    [
      '/cursor-rules/assets/rules.json',
      '/cursor-rules/assets/categories.json',
      '/cursor-rules/assets/rules.json',
      '/cursor-rules/assets/categories.json',
    ],
  );
});

test('catalog runtime retries after a non-ok rules response on a later shell mount', async () => {
  const fetchCalls = [];
  const observers = [];
  const consoleErrors = [];

  const createElement = (overrides = {}) => {
    const listeners = new Map();
    return {
      style: {},
      value: '',
      textContent: '',
      innerHTML: '',
      dataset: {},
      children: [],
      tagName: 'DIV',
      addEventListener(type, handler) {
        const handlers = listeners.get(type) ?? [];
        handlers.push(handler);
        listeners.set(type, handlers);
      },
      appendChild(child) {
        this.children.push(child);
      },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      focus() {},
      scrollIntoView() {},
      setAttribute(name, value) {
        this[name] = value;
      },
      getAttribute(name) {
        return this[name] ?? null;
      },
      listeners,
      ...overrides,
    };
  };

  let elements = {
    'catalog': createElement(),
    'search-input': createElement({ tagName: 'INPUT' }),
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

  class MutationObserver {
    constructor(callback) {
      this.callback = callback;
      observers.push(this);
    }

    observe() {}
    disconnect() {}
  }

  let rulesAttempts = 0;
  const context = {
    window: {
      location: {
        href: 'https://lessup.github.io/cursor-rules/',
        search: '',
        pathname: '/cursor-rules/',
        hash: '',
      },
      history: { replaceState() {} },
    },
    document: {
      readyState: 'complete',
      currentScript: { src: 'https://lessup.github.io/cursor-rules/assets/catalog.js' },
      body: createElement(),
      documentElement: createElement(),
      getElementById(id) { return elements[id] ?? null; },
      addEventListener() {},
      querySelector() { return null; },
      querySelectorAll() { return []; },
      createElement,
    },
    MutationObserver,
    navigator: {},
    fetch: async (url) => {
      fetchCalls.push(String(url));
      if (String(url).endsWith('/assets/rules.json')) {
        rulesAttempts += 1;
        if (rulesAttempts === 1) {
          return {
            ok: false,
            status: 404,
            json: async () => {
              throw new Error('json should not be read for non-ok response');
            },
          };
        }
        return {
          ok: true,
          json: async () => [
            {
              slug: 'alpha-backend',
              title: 'Alpha Backend',
              description: 'Alpha rule',
              fileName: 'alpha-backend.mdc',
              category: 'backend',
              globs: [],
            },
          ],
        };
      }
      return {
        ok: true,
        json: async () => ({
          backend: { label: '后端', order: 1 },
        }),
      };
    },
    URL,
    URLSearchParams,
    console: {
      ...console,
      error(...args) {
        consoleErrors.push(args);
      },
    },
    setTimeout,
    clearTimeout,
  };

  context.window.document = context.document;
  context.window.navigator = context.navigator;

  vm.runInNewContext(catalogJs, context);
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(consoleErrors.length, 1);
  assert.equal(elements['result-count'].textContent, '');
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    ['/cursor-rules/assets/rules.json', '/cursor-rules/assets/categories.json'],
  );

  elements = {};
  for (const observer of observers) {
    observer.callback([{ type: 'childList' }]);
  }
  await Promise.resolve();

  elements = {
    'catalog': createElement(),
    'search-input': createElement({ tagName: 'INPUT' }),
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

  for (const observer of observers) {
    observer.callback([{ type: 'childList' }]);
  }
  await Promise.resolve();
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(elements['result-count'].textContent, 1);
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    [
      '/cursor-rules/assets/rules.json',
      '/cursor-rules/assets/categories.json',
      '/cursor-rules/assets/rules.json',
      '/cursor-rules/assets/categories.json',
    ],
  );
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

test('homepage portal entry points opt into catalog triggers', () => {
  assert.match(indexMd, /data-catalog-trigger/);
  assert.match(indexMd, /action\.href === '#catalog' \? '' : null/);
  assert.match(indexMd, /filter\.href\.replace\('\?cat=', ''\)/);
});

test('catalog runtime applies portal triggers without clearing active search', async () => {
  const fetchCalls = [];
  const historyCalls = [];
  const focusCalls = [];
  const scrollCalls = [];

  const createElement = (overrides = {}) => {
    const listeners = new Map();
    return {
      style: {},
      value: '',
      textContent: '',
      innerHTML: '',
      dataset: {},
      children: [],
      tagName: 'DIV',
      addEventListener(type, handler) {
        const handlers = listeners.get(type) ?? [];
        handlers.push(handler);
        listeners.set(type, handlers);
      },
      dispatch(type, event = {}) {
        for (const handler of listeners.get(type) ?? []) {
          handler({
            preventDefault() {},
            stopPropagation() {},
            currentTarget: this,
            target: this,
            ...event,
          });
        }
      },
      appendChild(child) {
        this.children.push(child);
      },
      querySelector() { return null; },
      querySelectorAll() { return []; },
      focus() {
        focusCalls.push(this);
      },
      scrollIntoView(options) {
        scrollCalls.push(options);
      },
      setAttribute(name, value) {
        this[name] = value;
      },
      getAttribute(name) {
        return this[name] ?? null;
      },
      ...overrides,
      listeners,
    };
  };

  const elements = {
    'catalog': createElement(),
    'search-input': createElement({ tagName: 'INPUT' }),
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

  const browseTrigger = createElement({
    tagName: 'A',
    href: '#catalog',
    dataset: { catalogTrigger: '' },
  });
  const quickFilterTrigger = createElement({
    tagName: 'A',
    href: '?cat=backend',
    dataset: { catalogTrigger: 'backend' },
  });

  const context = {
    window: {
      location: {
        href: 'https://lessup.github.io/cursor-rules/',
        search: '',
        pathname: '/cursor-rules/',
      },
      history: {
        replaceState(_state, _title, url) {
          historyCalls.push(url);
        },
      },
    },
    document: {
      readyState: 'complete',
      currentScript: { src: 'https://lessup.github.io/cursor-rules/assets/catalog.js' },
      getElementById(id) { return elements[id] ?? null; },
      addEventListener() {},
      querySelector() { return null; },
      querySelectorAll(selector) {
        if (selector === '[data-catalog-trigger]') {
          return [browseTrigger, quickFilterTrigger];
        }
        return [];
      },
      createElement,
    },
    navigator: {},
    fetch: async (url) => {
      fetchCalls.push(String(url));
      if (String(url).endsWith('/assets/rules.json')) {
        return {
          ok: true,
          json: async () => [
            {
              slug: 'alpha-backend',
              title: 'Alpha Backend',
              description: 'Alpha rule',
              fileName: 'alpha-backend.mdc',
              category: 'backend',
              globs: [],
            },
            {
              slug: 'beta-language',
              title: 'Beta Language',
              description: 'Beta rule',
              fileName: 'beta-language.mdc',
              category: 'language',
              globs: [],
            },
          ],
        };
      }
      return {
        ok: true,
        json: async () => ({
          backend: { label: '后端', order: 3 },
          language: { label: '语言', order: 1 },
        }),
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
  await Promise.resolve();
  await new Promise((resolve) => setTimeout(resolve, 0));

  elements['search-input'].value = 'Alpha';
  elements['search-input'].dispatch('input', { target: elements['search-input'] });

  let prevented = false;
  quickFilterTrigger.dispatch('click', {
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
  assert.equal(elements['search-input'].value, 'Alpha');
  assert.equal(elements['result-count'].textContent, 1);
  assert.equal(historyCalls.at(-1), '/cursor-rules/?q=Alpha&cat=backend');
  assert.equal(focusCalls.length, 1);
  assert.equal(scrollCalls.length, 1);

  let heroPrevented = false;
  browseTrigger.dispatch('click', {
    preventDefault() {
      heroPrevented = true;
    },
  });

  assert.equal(heroPrevented, true);
  assert.equal(elements['search-input'].value, 'Alpha');
  assert.equal(focusCalls.length, 2);
  assert.equal(scrollCalls.length, 2);
  assert.deepEqual(
    fetchCalls.map((url) => new URL(url, 'https://lessup.github.io').pathname),
    ['/cursor-rules/assets/rules.json', '/cursor-rules/assets/categories.json'],
  );
});

test('site content exports populated whitepaper content collections', () => {
  assert.ok(Array.isArray(siteContent.heroStats));
  assert.deepEqual(
    siteContent.heroStats.map(({ label }) => label),
    ['规则', '分类', '代码行'],
  );
  assert.equal(typeof siteContent.homeHero.eyebrow, 'string');
  assert.equal(siteContent.homeHero.actions.length, 3);
  assert.equal(siteContent.homeHero.actions[0].href, '/zh/guides/reading-map');
  assert.equal(typeof siteContent.thesisSection.title, 'string');
  assert.ok(siteContent.thesisCards.length >= 3);
  assert.equal(siteContent.thesisCards[0].title, '规则文件是产品本体');
  assert.equal(typeof siteContent.curriculumSection.title, 'string');
  assert.ok(Array.isArray(siteContent.curriculumTracks));
  assert.equal(siteContent.curriculumTracks.length, 4);
  assert.equal(siteContent.curriculumTracks[0].href, '/zh/guides/reading-map');
  assert.equal(typeof siteContent.architectureSection.title, 'string');
  assert.ok(siteContent.architectureHighlights.length >= 3);
  assert.equal(typeof siteContent.researchSection.linkLabel, 'string');
  assert.ok(Array.isArray(siteContent.researchHighlights));
  assert.equal(siteContent.researchHighlights.length, 3);
  assert.equal(siteContent.catalogSection.quickFilters[0].href, '?cat=language');
  assert.equal(siteContent.catalogSection.shortcuts.length, 3);
  assert.equal(siteContent.catalogSection.emptyState.title, '没有匹配的规则');
});

test('homepage template renders homepage copy from whitepaper content exports', () => {
  assert.match(indexMd, /homeHero,/);
  assert.match(indexMd, /thesisSection,/);
  assert.match(indexMd, /curriculumSection,/);
  assert.match(indexMd, /architectureSection,/);
  assert.match(indexMd, /researchSection,/);
  assert.match(indexMd, /catalogSection,/);
  assert.match(indexMd, /v-for="action in homeHero\.actions"/);
  assert.match(indexMd, /{{ homeHero\.eyebrow }}/);
  assert.match(indexMd, /{{ thesisSection\.title }}/);
  assert.match(indexMd, /{{ curriculumSection\.linkLabel }}/);
  assert.match(indexMd, /{{ architectureSection\.title }}/);
  assert.match(indexMd, /{{ researchSection\.linkLabel }}/);
  assert.match(indexMd, /{{ catalogSection\.footer }}/);
  assert.doesNotMatch(indexMd, /为什么是门户而不是清单/);
  assert.doesNotMatch(indexMd, /把仓库文档、策展入口与维护触点放在同一个资源图谱里/);
});
