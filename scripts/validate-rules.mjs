#!/usr/bin/env node

/**
 * MDC 规则文件校验器
 *
 * @description CLI 入口，调用 rule-processor 模块进行验证
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import {
  processAllRules,
  processRuleFile,
  detectGlobOverlap,
} from './lib/rule-processor.mjs';

const ROOT_DIR = process.cwd();

/**
 * 比较两个校验结果用于排序
 */
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

/**
 * 打印校验结果
 */
function printFindings(findings) {
  const sorted = [...findings].sort(compareFindings);

  for (const finding of sorted) {
    const relativePath = toPosixRelative(finding.filePath);
    console.log(`${finding.severity} ${relativePath}:${finding.line} ${finding.code} ${finding.message}`);
  }
}

/**
 * 转换为 POSIX 相对路径
 */
function toPosixRelative(filePath) {
  return path.relative(ROOT_DIR, filePath).split(path.sep).join('/');
}

/**
 * 判断是否有错误
 */
function hasErrors(findings) {
  return findings.some((finding) => finding.severity === 'ERROR');
}

/**
 * 统计错误和警告数量
 */
function countFindings(findings) {
  const errors = findings.filter((finding) => finding.severity === 'ERROR').length;
  const warnings = findings.filter((finding) => finding.severity === 'WARN').length;
  return { errors, warnings };
}

/**
 * 打印重叠检测结果
 */
function printOverlapFindings(overlapFindings) {
  if (overlapFindings.length === 0) {
    return;
  }

  console.log('\n--- Glob Overlap Detection ---');
  for (const finding of overlapFindings) {
    console.log(`${finding.severity} [overlap] ${finding.message}`);
  }
  console.log(`Found ${overlapFindings.length} overlapping glob pattern(s)`);
}

/**
 * 解析校验目标
 */
function resolveTargets(args, rootDir) {
  if (!args.length) {
    // 获取所有 .mdc 文件
    return fs
      .readdirSync(rootDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.mdc'))
      .map((entry) => path.join(rootDir, entry.name))
      .sort((left, right) => left.localeCompare(right));
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

/**
 * 主函数
 */
async function main() {
  try {
    const args = process.argv.slice(2);
    const targets = resolveTargets(args, ROOT_DIR);

    // 处理所有目标文件
    const rules = await Promise.all(targets.map(processRuleFile));
    const findings = rules.flatMap((rule) => rule.findings);

    printFindings(findings);

    const { errors, warnings } = countFindings(findings);
    console.log(
      `Checked ${targets.length} file${targets.length === 1 ? '' : 's'}: ${errors} error${errors === 1 ? '' : 's'}, ${warnings} warning${warnings === 1 ? '' : 's'}`,
    );

    // 如果是完整校验（无指定文件），执行重叠检测
    const defaultTargets = resolveTargets([], ROOT_DIR);
    if (targets.length === defaultTargets.length) {
      const overlapFindings = detectGlobOverlap(rules);
      printOverlapFindings(overlapFindings);
    }

    process.exitCode = errors > 0 ? 1 : 0;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`ERROR ${message}`);
    process.exitCode = 2;
  }
}

main();
