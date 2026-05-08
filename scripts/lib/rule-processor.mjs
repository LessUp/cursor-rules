/**
 * 规则处理模块
 *
 * @module rule-processor
 * @description 深接口：一次解析同时产出验证结果和目录条目
 * 消除 validate-rules.mjs 和 build-rule-catalog.mjs 之间的重复解析
 */

import fs from 'node:fs/promises';
import path from 'node:path';

import {
  parseFrontmatter,
  parseGlobs,
  extractH1Title,
  createFinding,
  getTextField,
} from './frontmatter.mjs';
import { resolveCategory } from './category-resolver.mjs';

/**
 * @typedef {Object} Finding
 * @property {'ERROR'|'WARN'} severity
 * @property {string} filePath
 * @property {number} line
 * @property {string} code
 * @property {string} message
 */

/**
 * @typedef {Object} Rule
 * @property {string} slug - 规则标识
 * @property {string} fileName - 文件名
 * @property {string} title - H1 标题
 * @property {string} description - 描述
 * @property {string[]} globs - glob 模式数组
 * @property {string} category - 分类
 * @property {Finding[]} findings - 验证发现
 */

/**
 * 允许的 frontmatter 键名
 */
const ALLOWED_KEYS = new Set(['description', 'globs', 'category']);

/**
 * 解析 category 字段
 *
 * @param {Map<string, string>} frontmatter - frontmatter 键值对
 * @param {string} slug - 规则 slug
 * @returns {string} 分类键
 */
function parseCategory(frontmatter, slug) {
  const explicitCategory = getTextField(frontmatter, 'category');
  return resolveCategory(slug, explicitCategory);
}

/**
 * 验证 description 字段
 *
 * @param {Map<string, string>} frontmatter - frontmatter 键值对
 * @param {string} filePath - 文件路径
 * @returns {Finding[]} 验证发现
 */
function validateDescription(frontmatter, filePath) {
  const findings = [];

  if (!frontmatter.has('description')) {
    findings.push(
      createFinding('ERROR', filePath, 1, 'E004', 'Missing required frontmatter key: description'),
    );
    return findings;
  }

  const description = getTextField(frontmatter, 'description');
  if (!description) {
    findings.push(createFinding('ERROR', filePath, 2, 'E005', 'description must not be empty'));
  }

  return findings;
}

/**
 * 验证 globs 字段
 *
 * @param {Map<string, string>} frontmatter - frontmatter 键值对
 * @param {string} filePath - 文件路径
 * @returns {Finding[]} 验证发现
 */
function validateGlobs(frontmatter, filePath) {
  const findings = [];

  if (!frontmatter.has('globs')) {
    findings.push(
      createFinding('ERROR', filePath, 1, 'E006', 'Missing required frontmatter key: globs'),
    );
    return findings;
  }

  const rawGlobs = frontmatter.get('globs') ?? '';
  const trimmed = rawGlobs.trim();
  if (!trimmed) {
    // globs 为空表示全局规则，这是允许的
    return findings;
  }

  const entries = parseGlobs(trimmed);

  if (!entries.length) {
    findings.push(
      createFinding('ERROR', filePath, 3, 'E007', 'globs must contain non-empty comma-separated entries'),
    );
  }

  return findings;
}

/**
 * 验证规则主体内容
 *
 * @param {string} body - 规则主体内容
 * @param {string} filePath - 文件路径
 * @param {number} bodyStartLine - body 开始行号
 * @returns {Finding[]} 验证发现
 */
function validateBody(body, filePath, bodyStartLine) {
  const findings = [];
  const bodyLines = body.split('\n');

  const firstNonEmptyIndex = bodyLines.findIndex((line) => line.trim());
  if (firstNonEmptyIndex === -1) {
    findings.push(createFinding('ERROR', filePath, bodyStartLine, 'E008', 'Rule body must not be empty'));
    return findings;
  }

  const h1Title = extractH1Title(body);
  if (!h1Title) {
    findings.push(
      createFinding(
        'ERROR',
        filePath,
        bodyStartLine + firstNonEmptyIndex,
        'E009',
        'Rule body must contain at least one H1 heading',
      ),
    );
    return findings;
  }

  // 检查 H1 之前是否有内容
  const h1LineIndex = bodyLines.findIndex((line) => /^#\s+\S/.test(line));
  const hasContentBeforeFirstH1 = bodyLines.slice(0, h1LineIndex).some((line) => line.trim());

  if (hasContentBeforeFirstH1) {
    findings.push(
      createFinding(
        'WARN',
        filePath,
        bodyStartLine + firstNonEmptyIndex,
        'W001',
        'Content appears before the first H1 heading',
      ),
    );
  }

  // 检查多个 H1
  const h1Count = bodyLines.filter((line) => /^#\s+\S/.test(line)).length;
  if (h1Count > 1) {
    findings.push(
      createFinding(
        'WARN',
        filePath,
        bodyStartLine + h1LineIndex,
        'W002',
        `Multiple H1 headings found (${h1Count})`,
      ),
    );
  }

  return findings;
}

/**
 * 处理单个规则文件
 *
 * @param {string} filePath - 规则文件路径
 * @returns {Promise<Rule>} 规则对象
 */
export async function processRuleFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const parsed = parseFrontmatter(content, filePath, { allowedKeys: ALLOWED_KEYS });

  const slug = path.basename(filePath, '.mdc');
  const findings = [...parsed.findings];

  // 如果 frontmatter 解析失败，返回基础结构
  if (!parsed.frontmatter) {
    return {
      slug,
      fileName: path.basename(filePath),
      title: '',
      description: '',
      globs: [],
      category: 'other',
      findings,
    };
  }

  // 运行字段验证
  findings.push(...validateDescription(parsed.frontmatter, filePath));
  findings.push(...validateGlobs(parsed.frontmatter, filePath));

  // Body 验证
  findings.push(...validateBody(parsed.body, filePath, parsed.bodyStartLine));

  return {
    slug,
    fileName: path.basename(filePath),
    title: extractH1Title(parsed.body),
    description: getTextField(parsed.frontmatter, 'description'),
    globs: parseGlobs(parsed.frontmatter.get('globs')),
    category: parseCategory(parsed.frontmatter, slug),
    findings,
  };
}

/**
 * 发现规则文件
 *
 * @param {string} rootDir - 根目录
 * @returns {Promise<string[]>} 规则文件路径数组
 */
export async function discoverRuleFiles(rootDir) {
  const fsSync = await import('node:fs');
  const entries = fsSync.readdirSync(rootDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdc'))
    .map((entry) => path.join(rootDir, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

/**
 * 处理所有规则文件
 *
 * @param {string} rootDir - 根目录
 * @returns {Promise<{rules: Rule[], findings: Finding[]}>} 处理结果
 */
export async function processAllRules(rootDir) {
  const filePaths = await discoverRuleFiles(rootDir);
  const rules = await Promise.all(filePaths.map(processRuleFile));

  const allFindings = rules.flatMap((rule) => rule.findings);

  return { rules, findings: allFindings };
}

/**
 * 将规则转换为目录条目（不含 findings）
 *
 * @param {Rule} rule - 规则对象
 * @returns {Object} 目录条目
 */
export function toCatalogEntry(rule) {
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
 * 构建规则目录
 *
 * @param {string} rootDir - 根目录
 * @returns {Promise<Object[]>} 排序后的规则目录数组
 */
export async function buildCatalog(rootDir) {
  const { rules } = await processAllRules(rootDir);
  const catalog = rules.map(toCatalogEntry);

  return catalog.sort((left, right) => left.slug.localeCompare(right.slug, 'en'));
}

/**
 * 检测规则 globs 重叠
 *
 * @param {Rule[]|Object[]} rules - 规则数组
 * @returns {Object[]} 重叠检测结果
 */
export function detectGlobOverlap(rules) {
  const findings = [];
  const globMap = new Map(); // glob -> [ruleSlugs]

  for (const rule of rules) {
    for (const glob of rule.globs) {
      if (!globMap.has(glob)) {
        globMap.set(glob, []);
      }
      globMap.get(glob).push(rule.slug);
    }
  }

  for (const [glob, slugs] of globMap) {
    if (slugs.length > 1) {
      findings.push({
        severity: 'WARN',
        glob,
        rules: slugs,
        message: `Glob "${glob}" matches ${slugs.length} rules: ${slugs.join(', ')}`,
      });
    }
  }

  return findings;
}
