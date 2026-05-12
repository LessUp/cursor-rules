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

const zhIndex = fs.readFileSync(
  new URL('../docs/zh/index.md', import.meta.url),
  'utf8',
);

const enIndex = fs.readFileSync(
  new URL('../docs/en/index.md', import.meta.url),
  'utf8',
);

test('VitePress config defines zh/en locales and rule navigation', () => {
  assert.match(configTs, /label:\s*'简体中文'/);
  assert.match(configTs, /label:\s*'English'/);
  assert.match(configTs, /\/zh\/rules\//);
  assert.match(configTs, /\/en\/rules\//);
});

test('RuleCatalog component implements search, filter, and copy actions', () => {
  assert.match(ruleCatalog, /search-input/);
  assert.match(ruleCatalog, /chip-button/);
  assert.match(ruleCatalog, /copyInstall/);
  assert.match(ruleCatalog, /copyContent/);
});

test('zh/index.md embeds RuleCatalog component', () => {
  assert.match(zhIndex, /<RuleCatalog\s+lang="zh"\s*\/>/);
});

test('en/index.md embeds RuleCatalog component', () => {
  assert.match(enIndex, /<RuleCatalog\s+lang="en"\s*\/>/);
});
