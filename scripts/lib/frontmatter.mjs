/**
 * 统一的 MDC 文件 frontmatter 解析模块
 *
 * @module frontmatter
 * @description 提供深接口：一次调用获取完整解析结果
 * 这个模块是所有 frontmatter 解析逻辑的单一来源
 */

/**
 * @typedef {Object} Finding
 * @property {'ERROR'|'WARN'} severity
 * @property {string} filePath
 * @property {number} line
 * @property {string} code
 * @property {string} message
 */

/**
 * @typedef {Object} ParseResult
 * @property {Map<string, string>|null} frontmatter - 解析后的键值对
 * @property {string} body - frontmatter 之后的内容
 * @property {number} bodyStartLine - body 开始的行号
 * @property {Finding[]} findings - 解析过程中发现的问题
 */

/**
 * 检查行是否为独立的分隔符（---）
 *
 * @param {string} line - 要检查的行
 * @returns {boolean} 是否为分隔符
 */
function isStandaloneDelimiter(line) {
  return line.trim() === '---';
}

/**
 * 创建校验结果对象
 *
 * @param {'ERROR'|'WARN'} severity - 严重程度
 * @param {string} filePath - 文件路径
 * @param {number} line - 行号
 * @param {string} code - 错误码
 * @param {string} message - 错误消息
 * @returns {Finding} 校验结果
 */
export function createFinding(severity, filePath, line, code, message) {
  return { severity, filePath, line, code, message };
}

/**
 * 解析 MDC 文件的 frontmatter
 *
 * @param {string} content - 文件完整内容
 * @param {string} filePath - 文件路径（用于错误报告）
 * @param {Object} [options] - 解析选项
 * @param {Set<string>} [options.allowedKeys] - 允许的键名集合（未知键会生成警告）
 * @returns {ParseResult} 解析结果
 */
export function parseFrontmatter(content, filePath, options = {}) {
  const { allowedKeys = null } = options;
  const findings = [];

  // 规范化换行符
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  // 检查开分隔符
  if (!lines.length || !isStandaloneDelimiter(lines[0])) {
    findings.push(
      createFinding('ERROR', filePath, 1, 'E001', 'Missing opening frontmatter delimiter'),
    );
    return { frontmatter: null, body: '', bodyStartLine: 1, findings };
  }

  // 查找闭合分隔符
  const closingIndex = lines.findIndex(
    (line, index) => index > 0 && isStandaloneDelimiter(line),
  );
  if (closingIndex === -1) {
    findings.push(
      createFinding('ERROR', filePath, 1, 'E002', 'Missing closing frontmatter delimiter'),
    );
    return { frontmatter: null, body: '', bodyStartLine: 1, findings };
  }

  // 解析键值对
  const frontmatter = new Map();
  for (let index = 1; index < closingIndex; index += 1) {
    const line = lines[index];
    if (!line.trim()) continue;

    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      findings.push(
        createFinding(
          'ERROR',
          filePath,
          index + 1,
          'E003',
          'Invalid frontmatter line; expected key: value',
        ),
      );
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!key) {
      findings.push(
        createFinding(
          'ERROR',
          filePath,
          index + 1,
          'E003',
          'Invalid frontmatter line; key must not be empty',
        ),
      );
      continue;
    }

    if (frontmatter.has(key)) {
      findings.push(
        createFinding(
          'ERROR',
          filePath,
          index + 1,
          'E003',
          `Duplicate frontmatter key: ${key}`,
        ),
      );
      continue;
    }

    frontmatter.set(key, value);

    if (allowedKeys && !allowedKeys.has(key)) {
      findings.push(
        createFinding('WARN', filePath, index + 1, 'W003', `Unknown frontmatter key: ${key}`),
      );
    }
  }

  const bodyLines = lines.slice(closingIndex + 1);
  return {
    frontmatter,
    body: bodyLines.join('\n'),
    bodyStartLine: closingIndex + 2,
    findings,
  };
}

/**
 * 去除值两端的匹配引号
 *
 * @param {string} value - 要处理的值
 * @returns {string} 去除引号后的值
 */
export function unwrapQuotes(value) {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1);
    }
  }
  return value;
}

/**
 * 从 frontmatter 获取文本字段（自动去引号和 trim）
 *
 * @param {Map<string, string>} frontmatter - frontmatter 键值对
 * @param {string} key - 键名
 * @returns {string} 处理后的值
 */
export function getTextField(frontmatter, key) {
  const raw = frontmatter.get(key) ?? '';
  return unwrapQuotes(raw).trim();
}

/**
 * 解析 globs 字段为数组
 *
 * @param {string|undefined} rawGlobs - 原始 globs 值
 * @returns {string[]} 解析后的 glob 模式数组
 */
export function parseGlobs(rawGlobs) {
  if (!rawGlobs) return [];

  const normalized = unwrapQuotes(rawGlobs.trim());
  if (!normalized.trim()) return [];

  return normalized
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/**
 * 提取第一个 H1 标题
 *
 * @param {string} body - 文档主体内容
 * @returns {string} H1 标题文本（不含 # 符号）
 */
export function extractH1Title(body) {
  const lines = body.split('\n');
  return (
    lines.find((line) => /^#\s+\S/.test(line))?.replace(/^#\s+/, '').trim() ?? ''
  );
}
