import fs from 'node:fs/promises';
import path from 'node:path';

const CATEGORY_MAP = new Map([
  ['clean-code', 'general'],
  ['codequality', 'general'],
  ['gitflow', 'general'],
  ['database', 'engineering'],
  ['docker', 'engineering'],
  ['python', 'language'],
  ['java', 'language'],
  ['go', 'language'],
  ['cpp', 'language'],
  ['csharp-dotnet', 'language'],
  ['php', 'language'],
  ['ruby', 'language'],
  ['typescript', 'language'],
  ['node-express', 'backend'],
  ['spring', 'backend'],
  ['fastapi', 'backend'],
  ['react', 'frontend'],
  ['vue', 'frontend'],
  ['svelte', 'frontend'],
  ['nextjs', 'frontend'],
  ['tailwind', 'frontend'],
  ['medusa', 'frontend'],
  ['android', 'mobile'],
  ['ios', 'mobile'],
  ['wechat-miniprogram', 'mobile'],
  ['nativescript', 'mobile'],
]);

function splitFrontmatter(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const closingIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === '---',
  );

  return {
    frontmatterLines: lines.slice(1, closingIndex),
    bodyLines: lines.slice(closingIndex + 1),
  };
}

function parseFrontmatter(lines) {
  const frontmatter = new Map();

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(':');
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    frontmatter.set(key, value);
  }

  return frontmatter;
}

function parseGlobs(rawGlobs) {
  if (!rawGlobs) {
    return [];
  }

  const normalized = rawGlobs.replace(/^['"]|['"]$/g, '');
  if (!normalized.trim()) {
    return [];
  }

  return normalized
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function firstHeading(lines) {
  return lines.find((line) => /^#\s+\S/.test(line))?.replace(/^#\s+/, '').trim() ?? '';
}

export async function parseRuleFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  const { frontmatterLines, bodyLines } = splitFrontmatter(content);
  const frontmatter = parseFrontmatter(frontmatterLines);
  const slug = path.basename(filePath, '.mdc');

  return {
    slug,
    fileName: path.basename(filePath),
    title: firstHeading(bodyLines),
    description:
      frontmatter.get('description')?.replace(/^['"]|['"]$/g, '') ?? '',
    globs: parseGlobs(frontmatter.get('globs') ?? ''),
    category: CATEGORY_MAP.get(slug) ?? 'other',
  };
}

export async function buildCatalog(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const files = entries.filter(
    (entry) => entry.isFile() && entry.name.endsWith('.mdc'),
  );
  const catalog = await Promise.all(
    files.map((entry) => parseRuleFile(path.join(rootDir, entry.name))),
  );

  return catalog.sort((left, right) => left.slug.localeCompare(right.slug, 'en'));
}
