#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT_DIR = process.cwd();
const ALLOWED_KEYS = new Set(['description', 'globs']);

function toPosixRelative(filePath) {
  return path.relative(ROOT_DIR, filePath).split(path.sep).join('/');
}

function normalizeNewlines(text) {
  return text.replace(/\r\n/g, '\n');
}

function createFinding(severity, filePath, line, code, message) {
  return {
    severity,
    filePath,
    line,
    code,
    message,
  };
}

function isStandaloneDelimiter(line) {
  return line.trim() === '---';
}

function unwrapMatchingQuotes(value) {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1);
    }
  }

  return value;
}

function parseFrontmatter(content, filePath) {
  const findings = [];
  const lines = content.split('\n');

  if (!lines.length || !isStandaloneDelimiter(lines[0])) {
    findings.push(createFinding('ERROR', filePath, 1, 'E001', 'Missing opening frontmatter delimiter'));
    return { findings, frontmatter: null, body: '', bodyStartLine: 1 };
  }

  let closingIndex = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (isStandaloneDelimiter(lines[index])) {
      closingIndex = index;
      break;
    }
  }

  if (closingIndex === -1) {
    findings.push(createFinding('ERROR', filePath, 1, 'E002', 'Missing closing frontmatter delimiter'));
    return { findings, frontmatter: null, body: '', bodyStartLine: 1 };
  }

  const frontmatter = new Map();

  for (let index = 1; index < closingIndex; index += 1) {
    const line = lines[index];
    if (!line.trim()) {
      continue;
    }

    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) {
      findings.push(createFinding('ERROR', filePath, index + 1, 'E003', 'Invalid frontmatter line; expected key: value'));
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (!key) {
      findings.push(createFinding('ERROR', filePath, index + 1, 'E003', 'Invalid frontmatter line; key must not be empty'));
      continue;
    }

    if (frontmatter.has(key)) {
      findings.push(createFinding('ERROR', filePath, index + 1, 'E003', `Duplicate frontmatter key: ${key}`));
      continue;
    }

    frontmatter.set(key, value);

    if (!ALLOWED_KEYS.has(key)) {
      findings.push(createFinding('WARN', filePath, index + 1, 'W003', `Unknown frontmatter key: ${key}`));
    }
  }

  const bodyLines = lines.slice(closingIndex + 1);
  return {
    findings,
    frontmatter,
    body: bodyLines.join('\n'),
    bodyStartLine: closingIndex + 2,
  };
}

function validateDescription(frontmatter, filePath) {
  const findings = [];

  if (!frontmatter.has('description')) {
    findings.push(createFinding('ERROR', filePath, 1, 'E004', 'Missing required frontmatter key: description'));
    return findings;
  }

  const description = unwrapMatchingQuotes(frontmatter.get('description') ?? '').trim();
  if (!description) {
    findings.push(createFinding('ERROR', filePath, 2, 'E005', 'description must not be empty'));
  }

  return findings;
}

function validateGlobs(frontmatter, filePath) {
  const findings = [];

  if (!frontmatter.has('globs')) {
    findings.push(createFinding('ERROR', filePath, 1, 'E006', 'Missing required frontmatter key: globs'));
    return findings;
  }

  const rawGlobs = frontmatter.get('globs') ?? '';
  const trimmed = rawGlobs.trim();
  if (!trimmed) {
    return findings;
  }

  const normalized = unwrapMatchingQuotes(trimmed);
  const entries = normalized.split(',').map((entry) => entry.trim());

  if (!entries.length || entries.some((entry) => !entry)) {
    findings.push(createFinding('ERROR', filePath, 3, 'E007', 'globs must contain non-empty comma-separated entries'));
  }

  return findings;
}

function validateBody(body, filePath, bodyStartLine) {
  const findings = [];
  const bodyLines = body.split('\n');

  const firstNonEmptyIndex = bodyLines.findIndex((line) => line.trim());
  if (firstNonEmptyIndex === -1) {
    findings.push(createFinding('ERROR', filePath, bodyStartLine, 'E008', 'Rule body must not be empty'));
    return findings;
  }

  const h1Indexes = [];
  for (let index = 0; index < bodyLines.length; index += 1) {
    if (/^#\s+\S/.test(bodyLines[index])) {
      h1Indexes.push(index);
    }
  }

  if (!h1Indexes.length) {
    findings.push(createFinding('ERROR', filePath, bodyStartLine + firstNonEmptyIndex, 'E009', 'Rule body must contain at least one H1 heading'));
    return findings;
  }

  const firstH1Index = h1Indexes[0];
  const hasContentBeforeFirstH1 = bodyLines
    .slice(0, firstH1Index)
    .some((line) => line.trim());

  if (hasContentBeforeFirstH1) {
    findings.push(createFinding('WARN', filePath, bodyStartLine + firstNonEmptyIndex, 'W001', 'Content appears before the first H1 heading'));
  }

  if (h1Indexes.length > 1) {
    findings.push(createFinding('WARN', filePath, bodyStartLine + h1Indexes[1], 'W002', `Multiple H1 headings found (${h1Indexes.length})`));
  }

  return findings;
}

function validateFile(filePath) {
  const content = normalizeNewlines(fs.readFileSync(filePath, 'utf8'));
  const findings = [];

  const parsed = parseFrontmatter(content, filePath);
  findings.push(...parsed.findings);

  if (!parsed.frontmatter) {
    return findings;
  }

  findings.push(...validateDescription(parsed.frontmatter, filePath));
  findings.push(...validateGlobs(parsed.frontmatter, filePath));
  findings.push(...validateBody(parsed.body, filePath, parsed.bodyStartLine));

  return findings;
}

function compareFindings(left, right) {
  if (left.filePath !== right.filePath) {
    return left.filePath.localeCompare(right.filePath);
  }

  if (left.line !== right.line) {
    return left.line - right.line;
  }

  if (left.severity !== right.severity) {
    return left.severity.localeCompare(right.severity);
  }

  return left.code.localeCompare(right.code);
}

function printFindings(findings) {
  const sorted = [...findings].sort(compareFindings);

  for (const finding of sorted) {
    const relativePath = toPosixRelative(finding.filePath);
    console.log(`${finding.severity} ${relativePath}:${finding.line} ${finding.code} ${finding.message}`);
  }
}

function getDefaultTargets(rootDir) {
  return fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.mdc'))
    .map((entry) => path.join(rootDir, entry.name))
    .sort((left, right) => left.localeCompare(right));
}

function resolveTargets(args, rootDir) {
  if (!args.length) {
    return getDefaultTargets(rootDir);
  }

  return args.map((inputPath) => {
    const resolvedPath = path.resolve(rootDir, inputPath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Path does not exist: ${inputPath}`);
    }

    const stats = fs.statSync(resolvedPath);
    if (!stats.isFile()) {
      throw new Error(`Path is not a file: ${inputPath}`);
    }

    if (!resolvedPath.endsWith('.mdc')) {
      throw new Error(`Path is not an .mdc file: ${inputPath}`);
    }

    return resolvedPath;
  });
}

function main() {
  try {
    const args = process.argv.slice(2);
    const targets = resolveTargets(args, ROOT_DIR);
    const findings = targets.flatMap((filePath) => validateFile(filePath));

    printFindings(findings);

    const errorCount = findings.filter((finding) => finding.severity === 'ERROR').length;
    const warningCount = findings.filter((finding) => finding.severity === 'WARN').length;

    console.log(`Checked ${targets.length} file${targets.length === 1 ? '' : 's'}: ${errorCount} error${errorCount === 1 ? '' : 's'}, ${warningCount} warning${warningCount === 1 ? '' : 's'}`);

    process.exitCode = errorCount > 0 ? 1 : 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`ERROR ${message}`);
    process.exitCode = 2;
  }
}

main();
