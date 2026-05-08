/**
 * Rules.json 数据契约定义模块
 *
 * @module schema
 * @description 验证规则目录的数据结构契约
 * 仅验证 JSON schema 层面的契约（类型、格式），语义验证在 rule-processor.mjs 中进行
 */

import { isValidCategory } from './categories.mjs';

/**
 * 验证规则条目的 JSON 结构
 *
 * @param {Object} entry - 规则条目
 * @returns {string[]} 错误消息数组
 */
function validateEntryStructure(entry) {
  const errors = [];
  const slug = entry?.slug || 'unknown';

  // 检查必需字段存在且类型正确
  if (typeof entry?.slug !== 'string') {
    errors.push(`Missing or invalid slug for entry`);
    return errors; // 如果 slug 无效，后续错误信息无法关联
  }

  if (typeof entry?.fileName !== 'string') {
    errors.push(`Missing or invalid fileName for ${slug}`);
  }

  if (typeof entry?.title !== 'string') {
    errors.push(`Missing or invalid title for ${slug}`);
  }

  if (typeof entry?.description !== 'string') {
    errors.push(`Missing or invalid description for ${slug}`);
  }

  if (!Array.isArray(entry?.globs)) {
    errors.push(`Missing or invalid globs (expected array) for ${slug}`);
  } else {
    // 检查数组元素类型
    for (const item of entry.globs) {
      if (typeof item !== 'string') {
        errors.push(`Invalid glob entry in ${slug}: expected string`);
        break;
      }
    }
  }

  if (typeof entry?.category !== 'string') {
    errors.push(`Missing or invalid category for ${slug}`);
  } else if (!isValidCategory(entry.category)) {
    errors.push(`Invalid category "${entry.category}" for ${slug}`);
  }

  return errors;
}

/**
 * 验证单个规则项（向后兼容的导出）
 *
 * @param {Object} entry - 规则条目
 * @returns {string[]} 错误消息数组
 */
export function validateRuleEntry(entry) {
  return validateEntryStructure(entry);
}

/**
 * 验证整个目录
 *
 * @param {Object[]} catalog - 规则目录数组
 * @returns {string[]} 错误消息数组
 */
export function validateCatalog(catalog) {
  const errors = [];

  if (!Array.isArray(catalog)) {
    return ['Catalog must be an array'];
  }

  if (catalog.length === 0) {
    return ['Catalog is empty'];
  }

  for (const entry of catalog) {
    const entryErrors = validateEntryStructure(entry);
    for (const error of entryErrors) {
      errors.push(`  - ${error}`);
    }
  }

  return errors;
}
