import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const configTs = fs.readFileSync(
  new URL('../docs/.vitepress/config.ts', import.meta.url),
  'utf8',
);

const ruleCatalog = fs.readFileSync(
  new URL('../docs/.vitepress/theme/components/RuleCatalog.vue', import.meta.url),
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

test('RuleCatalog component implements search, filter, and copy actions', () => {
  assert.match(ruleCatalog, /search-input/);
  assert.match(ruleCatalog, /chip-button/);
  assert.match(ruleCatalog, /copyInstall/);
  assert.match(ruleCatalog, /copyContent/);
});

test('index.md embeds RuleCatalog component without lang prop', () => {
  assert.match(indexMd, /<RuleCatalog\s*\/>/);
});
