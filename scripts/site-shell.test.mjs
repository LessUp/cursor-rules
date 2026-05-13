import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const configTs = fs.readFileSync(
  new URL('../docs/.vitepress/config.ts', import.meta.url),
  'utf8',
);

const catalogJs = fs.readFileSync(
  new URL('../docs/public/assets/catalog.js', import.meta.url),
  'utf8',
);

const indexMd = fs.readFileSync(
  new URL('../docs/index.md', import.meta.url),
  'utf8',
);

test('VitePress config is Chinese-only without locales', () => {
  assert.match(configTs, /lang:\s*'zh-CN'/);
  assert.match(configTs, /\/rules\//);
  assert.doesNotMatch(configTs, /locales:/);
  assert.doesNotMatch(configTs, /\/zh\//);
  assert.doesNotMatch(configTs, /\/en\//);
});

test('catalog.js implements search, filter, and copy actions', () => {
  assert.match(catalogJs, /search-input/);
  assert.match(catalogJs, /chip-button/);
  assert.match(catalogJs, /copyInstall/);
  assert.match(catalogJs, /copyContent/);
});

test('index.md has catalog container elements', () => {
  assert.match(indexMd, /id="catalog"/);
  assert.match(indexMd, /id="rule-cards"/);
  assert.match(indexMd, /id="search-input"/);
});
