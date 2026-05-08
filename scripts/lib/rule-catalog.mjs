/**
 * 规则目录构建模块
 *
 * @module rule-catalog
 * @description 向后兼容的导出，实际逻辑在 rule-processor.mjs
 */

import { buildCatalog as buildCatalogImpl, processRuleFile as processRuleFileImpl } from './rule-processor.mjs';

/**
 * 解析单个规则文件
 *
 * @param {string} filePath - 规则文件路径
 * @returns {Promise<Object>} 规则条目对象
 */
export async function parseRuleFile(filePath) {
  const rule = await processRuleFileImpl(filePath);
  return {
    slug: rule.slug,
    fileName: rule.fileName,
    title: rule.title,
    description: rule.description,
    globs: rule.globs,
    category: rule.category,
  };
}

/**
 * 构建完整的规则目录
 *
 * @param {string} rootDir - 根目录路径
 * @returns {Promise<Object[]>} 排序后的规则目录数组
 */
export async function buildCatalog(rootDir) {
  return buildCatalogImpl(rootDir);
}
