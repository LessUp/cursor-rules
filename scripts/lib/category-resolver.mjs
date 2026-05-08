/**
 * 分类解析器模块
 *
 * @module category-resolver
 * @description 将分类分配逻辑从三元表达式提取为领域对象
 */

import { isValidCategory, DEFAULT_CATEGORY_MAP } from './categories.mjs';

/**
 * 从 slug 推断分类的模式匹配规则
 */
const CATEGORY_PATTERNS = [
  // Language - 语言规则
  { pattern: /^(python|java|go|cpp|csharp-dotnet|php|ruby|typescript)$/, category: 'language' },

  // Backend - 后端框架
  { pattern: /^(node-express|spring|fastapi)$/, category: 'backend' },

  // Frontend - 前端框架
  { pattern: /^(react|vue|svelte|nextjs|tailwind|medusa)$/, category: 'frontend' },

  // Mobile - 移动端
  { pattern: /^(android|ios|wechat-miniprogram|nativescript)$/, category: 'mobile' },

  // Engineering - 工程规则
  { pattern: /^(database|docker)$/, category: 'engineering' },

  // General - 通用规则
  { pattern: /^(clean-code|codequality|gitflow)$/, category: 'general' },
];

/**
 * 分类解析器
 *
 * @description 封装分类分配逻辑，提供可测试的接口
 */
export class CategoryResolver {
  /**
   * @param {Map<string, string>} [defaultMap] - 默认分类映射
   */
  constructor(defaultMap = null) {
    this.defaultMap = defaultMap;
  }

  /**
   * 解析分类
   *
   * @param {string} slug - 规则 slug
   * @param {string} [explicitCategory] - frontmatter 中显式指定的分类
   * @returns {string} 分类键
   */
  resolve(slug, explicitCategory = null) {
    // 优先使用显式指定的分类
    if (explicitCategory && isValidCategory(explicitCategory)) {
      return explicitCategory;
    }

    // 尝试从默认映射获取
    if (this.defaultMap) {
      const fromDefault = this.defaultMap.get(slug);
      if (fromDefault) {
        return fromDefault;
      }
    }

    // 从 slug 模式推断
    const fromPattern = this.inferFromSlug(slug);
    if (fromPattern) {
      return fromPattern;
    }

    return 'other';
  }

  /**
   * 从 slug 推断分类
   *
   * @param {string} slug - 规则 slug
   * @returns {string|null} 推断的分类，无法推断时返回 null
   */
  inferFromSlug(slug) {
    for (const { pattern, category } of CATEGORY_PATTERNS) {
      if (pattern.test(slug)) {
        return category;
      }
    }
    return null;
  }
}

/**
 * 默认分类解析器实例
 */
let defaultResolver = null;

/**
 * 获取默认分类解析器
 *
 * @returns {CategoryResolver} 默认解析器实例
 */
export function getDefaultResolver() {
  if (!defaultResolver) {
    defaultResolver = new CategoryResolver(DEFAULT_CATEGORY_MAP);
  }
  return defaultResolver;
}

/**
 * 解析分类（便捷函数）
 *
 * @param {string} slug - 规则 slug
 * @param {string} [explicitCategory] - frontmatter 中显式指定的分类
 * @returns {string} 分类键
 */
export function resolveCategory(slug, explicitCategory = null) {
  // 直接使用静态模式匹配，无需 DEFAULT_CATEGORY_MAP
  if (explicitCategory && isValidCategory(explicitCategory)) {
    return explicitCategory;
  }

  // 从 slug 模式推断
  for (const { pattern, category } of CATEGORY_PATTERNS) {
    if (pattern.test(slug)) {
      return category;
    }
  }

  return 'other';
}
