import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildCatalog, processRuleFile, toCatalogEntry } from './rule-processor.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');

test('processRuleFile normalizes a language rule', async () => {
  const rule = await processRuleFile(path.join(rootDir, 'python.mdc'));
  const entry = toCatalogEntry(rule);

  assert.equal(entry.slug, 'python');
  assert.equal(entry.title, 'Python 最佳实践');
  assert.equal(entry.category, 'language');
  assert.deepEqual(entry.globs, ['**/*.py', 'src/**/*.py', 'tests/**/*.py']);
  assert.match(entry.description, /Python/);
});

test('processRuleFile keeps empty globs as an empty list', async () => {
  const rule = await processRuleFile(path.join(rootDir, 'clean-code.mdc'));
  const entry = toCatalogEntry(rule);

  assert.equal(entry.slug, 'clean-code');
  assert.equal(entry.category, 'general');
  assert.deepEqual(entry.globs, []);
});

test('buildCatalog returns a stable sorted catalog', async () => {
  const catalog = await buildCatalog(rootDir);

  assert.ok(catalog.length >= 26);
  assert.equal(catalog[0].slug, 'android');
  assert.ok(catalog.some((entry) => entry.slug === 'react'));
  assert.ok(catalog.every((entry) => entry.title && entry.description));
});
