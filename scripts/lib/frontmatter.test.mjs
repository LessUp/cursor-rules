import test from 'node:test';
import assert from 'node:assert/strict';

import { parseFrontmatter, unwrapQuotes, parseGlobs, extractH1Title } from './frontmatter.mjs';

// ========== parseFrontmatter 测试 ==========

test('parseFrontmatter parses valid frontmatter', () => {
  const content = `---
description: "Test description"
globs: **/*.py
---
# Test Title
Body content`;

  const result = parseFrontmatter(content, 'test.mdc');

  assert.equal(result.findings.length, 0);
  assert.equal(result.frontmatter.get('description'), '"Test description"');
  assert.equal(result.frontmatter.get('globs'), '**/*.py');
  assert.equal(result.bodyStartLine, 5);
  assert.ok(result.body.includes('# Test Title'));
});

test('parseFrontmatter handles missing opening delimiter', () => {
  const content = `description: "Test"
---
# Title`;

  const result = parseFrontmatter(content, 'test.mdc');

  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].code, 'E001');
  assert.equal(result.frontmatter, null);
});

test('parseFrontmatter handles missing closing delimiter', () => {
  const content = `---
description: "Test"`;

  const result = parseFrontmatter(content, 'test.mdc');

  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].code, 'E002');
  assert.equal(result.frontmatter, null);
});

test('parseFrontmatter handles duplicate keys', () => {
  const content = `---
description: "First"
description: "Second"
---
# Title`;

  const result = parseFrontmatter(content, 'test.mdc');

  assert.ok(result.findings.some(f => f.code === 'E003' && f.message.includes('Duplicate')));
  // 注意：检测到重复键时不会覆盖，保留第一个值
  assert.equal(result.frontmatter.get('description'), '"First"');
});

test('parseFrontmatter handles unknown keys with allowedKeys option', () => {
  const content = `---
description: "Test"
globs: "**/*.py"
unknown: "value"
---
# Title`;

  const allowedKeys = new Set(['description', 'globs']);
  const result = parseFrontmatter(content, 'test.mdc', { allowedKeys });

  assert.ok(result.findings.some(f => f.code === 'W003' && f.message.includes('unknown')));
});

test('parseFrontmatter handles empty frontmatter', () => {
  const content = `---
---
# Title`;

  const result = parseFrontmatter(content, 'test.mdc');

  assert.equal(result.findings.length, 0);
  assert.equal(result.frontmatter.size, 0);
});

test('parseFrontmatter normalizes CRLF to LF', () => {
  const content = '---\r\ndescription: "Test"\r\n---\r\n# Title';

  const result = parseFrontmatter(content, 'test.mdc');

  assert.equal(result.findings.length, 0);
  assert.equal(result.frontmatter.get('description'), '"Test"');
});

// ========== unwrapQuotes 测试 ==========

test('unwrapQuotes removes double quotes', () => {
  assert.equal(unwrapQuotes('"test"'), 'test');
});

test('unwrapQuotes removes single quotes', () => {
  assert.equal(unwrapQuotes("'test'"), 'test');
});

test('unwrapQuotes preserves unquoted values', () => {
  assert.equal(unwrapQuotes('test'), 'test');
});

test('unwrapQuotes handles mismatched quotes', () => {
  assert.equal(unwrapQuotes('"test'), '"test');
  assert.equal(unwrapQuotes('test"'), 'test"');
});

test('unwrapQuotes handles empty string', () => {
  assert.equal(unwrapQuotes(''), '');
});

// ========== parseGlobs 测试 ==========

test('parseGlobs parses comma-separated globs', () => {
  assert.deepEqual(parseGlobs('**/*.py, src/**/*.py'), ['**/*.py', 'src/**/*.py']);
});

test('parseGlobs handles quoted values', () => {
  // 注意：parseGlobs 只去除整体两端的引号，不会处理每个条目的引号
  assert.deepEqual(parseGlobs('"**/*.py, *.js"'), ['**/*.py', '*.js']);
});

test('parseGlobs handles empty string', () => {
  assert.deepEqual(parseGlobs(''), []);
});

test('parseGlobs handles undefined', () => {
  assert.deepEqual(parseGlobs(undefined), []);
});

test('parseGlobs trims whitespace', () => {
  assert.deepEqual(parseGlobs('  **/*.py  ,  src/**/*.py  '), ['**/*.py', 'src/**/*.py']);
});

test('parseGlobs filters empty entries', () => {
  assert.deepEqual(parseGlobs('**/*.py, , src/**/*.py'), ['**/*.py', 'src/**/*.py']);
});

// ========== extractH1Title 测试 ==========

test('extractH1Title extracts first H1', () => {
  const body = `# Main Title

Some content

## Subtitle`;

  assert.equal(extractH1Title(body), 'Main Title');
});

test('extractH1Title handles title with trailing spaces', () => {
  const body = '# Title with spaces   ';
  assert.equal(extractH1Title(body), 'Title with spaces');
});

test('extractH1Title returns empty string for no H1', () => {
  const body = '## Only H2\n\nContent';
  assert.equal(extractH1Title(body), '');
});

test('extractH1Title ignores H2 and below', () => {
  const body = `## H2 Title
### H3 Title
# H1 Title`;
  assert.equal(extractH1Title(body), 'H1 Title');
});

test('extractH1Title handles empty body', () => {
  assert.equal(extractH1Title(''), '');
});
