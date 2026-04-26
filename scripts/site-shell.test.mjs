import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const indexHtml = fs.readFileSync(
  new URL('../docs/index.html', import.meta.url),
  'utf8',
);

test('index shell references generated assets and empty render targets', () => {
  assert.match(indexHtml, /<main id="app">/);
  assert.match(indexHtml, /<section id="hero">/);
  assert.match(indexHtml, /<section id="filters">/);
  assert.match(indexHtml, /<section id="rule-grid"><\/section>/);
  assert.match(
    indexHtml,
    /<script type="module" src="\.\/assets\/site\.js"><\/script>/,
  );
});
