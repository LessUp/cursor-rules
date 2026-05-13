import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

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

test('public portal contract exposes pathways and resources surfaces', () => {
  assert.match(configTs, /text:\s*'采用路径'/);
  assert.match(configTs, /text:\s*'资源'/);
  assert.match(configTs, /src:\s*'\/assets\/catalog\.js'/);
  assert.match(indexMd, /id="home-philosophy"/);
  assert.match(indexMd, /id="home-path-map"/);
  assert.match(indexMd, /id="home-resource-atlas"/);
  assert.equal(fs.existsSync(new URL('../docs/pathways/index.md', import.meta.url)), true);
  assert.equal(fs.existsSync(new URL('../docs/resources/index.md', import.meta.url)), true);
  assert.equal(fs.existsSync(catalogJsUrl), true);
  assert.match(buildScript, /pathways/);
  assert.match(buildScript, /resources/);
});

test('catalog runtime asset contract stays in sync with homepage shell', () => {
  const catalogJs = fs.readFileSync(catalogJsUrl, 'utf8');
  assert.match(catalogJs, /document\.getElementById\('search-input'\)/);
  assert.match(catalogJs, /document\.getElementById\('rule-cards'\)/);
  assert.match(catalogJs, /fetch\(`\$\{base\}assets\/rules\.json`/);
  assert.match(catalogJs, /fetch\(`\$\{base\}assets\/categories\.json`/);
});

test('site content scaffold exports stay stable', () => {
  assert.ok(Array.isArray(siteContent.heroStats));
  assert.deepEqual(
    siteContent.heroStats.map(({ label }) => label),
    ['规则', '路径', '资源分组'],
  );
  assert.equal(siteContent.philosophyCards.length, 1);
  assert.equal(siteContent.philosophyCards[0].icon, '/icons/philosophy.svg');
  assert.equal(siteContent.philosophyCards[0].title, '不是 prompts 杂货铺');
  assert.ok(Array.isArray(siteContent.pathways));
  assert.ok(Array.isArray(siteContent.resourceGroups));
});
