/**
 * 规则分类定义模块
 *
 * @module categories
 * @description 单一来源：前后端共享的分类定义
 */

/**
 * 分类定义
 *
 * @typedef {Object} CategoryDefinition
 * @property {Object} label - 多语言标签
 * @property {string} label.zh - 中文标签
 * @property {string} label.en - 英文标签
 * @property {number} order - 排序权重
 */

/**
 * 所有分类定义
 *
 * @type {Record<string, CategoryDefinition>}
 */
export const CATEGORIES = Object.freeze({
  general: { label: { zh: '通用', en: 'General' }, order: 1 },
  language: { label: { zh: '语言', en: 'Language' }, order: 2 },
  backend: { label: { zh: '后端', en: 'Backend' }, order: 3 },
  frontend: { label: { zh: '前端', en: 'Frontend' }, order: 4 },
  mobile: { label: { zh: '移动端', en: 'Mobile' }, order: 5 },
  engineering: { label: { zh: '工程', en: 'Engineering' }, order: 6 },
  other: { label: { zh: '其他', en: 'Other' }, order: 99 },
});

/**
 * 规则文件 slug 到分类的默认映射
 *
 * @description 当规则文件 frontmatter 未指定 category 时使用此映射
 * @type {Map<string, string>}
 */
export const DEFAULT_CATEGORY_MAP = new Map([
  // General - 通用规则
  ['clean-code', 'general'],
  ['codequality', 'general'],
  ['gitflow', 'general'],

  // Language - 语言规则
  ['python', 'language'],
  ['java', 'language'],
  ['go', 'language'],
  ['cpp', 'language'],
  ['csharp-dotnet', 'language'],
  ['php', 'language'],
  ['ruby', 'language'],
  ['typescript', 'language'],

  // Backend - 后端框架规则
  ['node-express', 'backend'],
  ['spring', 'backend'],
  ['fastapi', 'backend'],

  // Frontend - 前端框架规则
  ['react', 'frontend'],
  ['vue', 'frontend'],
  ['svelte', 'frontend'],
  ['nextjs', 'frontend'],
  ['tailwind', 'frontend'],
  ['medusa', 'frontend'],

  // Mobile - 移动端规则
  ['android', 'mobile'],
  ['ios', 'mobile'],
  ['wechat-miniprogram', 'mobile'],
  ['nativescript', 'mobile'],

  // Engineering - 工程规则
  ['database', 'engineering'],
  ['docker', 'engineering'],
]);

/**
 * 获取排序后的分类列表
 *
 * @returns {Array<{key: string, label: Object, order: number}>} 排序后的分类数组
 */
export function getSortedCategories() {
  return Object.entries(CATEGORIES)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key, value]) => ({ key, ...value }));
}

/**
 * 获取有效的分类键列表
 *
 * @returns {string[]} 分类键数组
 */
export function getValidCategoryKeys() {
  return Object.keys(CATEGORIES);
}

/**
 * 检查分类是否有效
 *
 * @param {string} category - 分类键
 * @returns {boolean} 是否为有效分类
 */
export function isValidCategory(category) {
  return Object.hasOwn(CATEGORIES, category);
}
