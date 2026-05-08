import test from 'node:test';
import assert from 'node:assert/strict';

import { CategoryResolver, resolveCategory, getDefaultResolver } from './category-resolver.mjs';
import { DEFAULT_CATEGORY_MAP } from './categories.mjs';

// ========== resolveCategory 便捷函数测试 ==========

test('resolveCategory uses explicit category when valid', () => {
  assert.equal(resolveCategory('python', 'backend'), 'backend');
  assert.equal(resolveCategory('react', 'engineering'), 'engineering');
});

test('resolveCategory ignores invalid explicit category', () => {
  assert.equal(resolveCategory('python', 'invalid'), 'language');
});

test('resolveCategory returns category from map', () => {
  assert.equal(resolveCategory('python'), 'language');
  assert.equal(resolveCategory('react'), 'frontend');
  assert.equal(resolveCategory('clean-code'), 'general');
});

test('resolveCategory returns "other" for unknown slugs', () => {
  assert.equal(resolveCategory('completely-unknown-framework'), 'other');
  assert.equal(resolveCategory('xyz-123'), 'other');
});

// ========== CategoryResolver 类测试 ==========

test('CategoryResolver resolves with map and patterns', () => {
  const resolver = new CategoryResolver(DEFAULT_CATEGORY_MAP);

  assert.equal(resolver.resolve('python'), 'language');
  assert.equal(resolver.resolve('react'), 'frontend');
  assert.equal(resolver.resolve('clean-code'), 'general');

  assert.equal(resolver.resolve('xyz'), 'other');
});

test('CategoryResolver works without map', () => {
  const resolver = new CategoryResolver();

  assert.equal(resolver.resolve('python'), 'language');
  assert.equal(resolver.resolve('react'), 'frontend');
  assert.equal(resolver.resolve('xyz'), 'other');
});

test('CategoryResolver prioritizes explicit category', () => {
  const resolver = new CategoryResolver(DEFAULT_CATEGORY_MAP);

  assert.equal(resolver.resolve('python', 'backend'), 'backend');
  assert.equal(resolver.resolve('react', 'engineering'), 'engineering');
});

test('CategoryResolver ignores invalid explicit category', () => {
  const resolver = new CategoryResolver(DEFAULT_CATEGORY_MAP);

  assert.equal(resolver.resolve('python', 'invalid'), 'language');
  assert.equal(resolver.resolve('xyz', 'not-a-category'), 'other');
});

test('getDefaultResolver returns singleton', () => {
  const resolver1 = getDefaultResolver();
  const resolver2 = getDefaultResolver();

  assert.equal(resolver1, resolver2);
});

test('getDefaultResolver has DEFAULT_CATEGORY_MAP', () => {
  const resolver = getDefaultResolver();

  assert.equal(resolver.resolve('python'), 'language');
  assert.equal(resolver.resolve('react'), 'frontend');
});
