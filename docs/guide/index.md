---
title: 指南
description: Cursor Rules 完整使用指南——从入门到精通
---

# 指南

<div class="feature-map docs-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:16px; margin:24px 0">
  <a href="./getting-started" style="text-decoration:none">
    <div class="feature-card" style="height:100%">
      <div class="feature-card-title">🚀 快速开始</div>
      <div class="feature-card-desc">三分钟内将第一条规则接入 Cursor，立即感受 AI 约束带来的编码体验提升。</div>
    </div>
  </a>
  <a href="./why-rules" style="text-decoration:none">
    <div class="feature-card" style="height:100%">
      <div class="feature-card-title">🧭 为什么需要规则</div>
      <div class="feature-card-desc">深入理解规则与 prompt 的本质区别，以及"工程约束"哲学的长期价值。</div>
    </div>
  </a>
  <a href="./writing-rules" style="text-decoration:none">
    <div class="feature-card" style="height:100%">
      <div class="feature-card-title">✍️ 编写规则</div>
      <div class="feature-card-desc">掌握 .mdc 文件格式、Frontmatter 字段和 glob 路径模式，编写精准有效的规则。</div>
    </div>
  </a>
</div>

## 什么是 Cursor Rules？

`cursor-rules` 是一个**工程级 `.mdc` 规则库**，专为将 AI 编码行为约束成可维护、可审视的工程资产而设计。

规则文件（`.mdc`）是 Cursor 的原生机制，用于向 AI 助手提供持久化的上下文约束。不同于一次性的 prompt，`.mdc` 规则会在每次 AI 交互时**自动注入**，确保 AI 的行为符合团队的编码约定。

## 核心概念

| 概念 | 说明 |
|------|------|
| **`.mdc` 文件** | 存放在 `.cursor/rules/` 目录下的规则文件，包含 Frontmatter 和规则正文 |
| **glob 模式** | 控制规则应用范围的文件路径模式（如 `**/*.py`） |
| **全局规则** | 不设 glob 的规则，适用于所有文件 |
| **局部规则** | 带有 glob 的规则，仅在匹配文件时注入 |

## 项目特征

- **26 条实践验证的规则**——覆盖 Python、TypeScript、Go、React、Vue 等主流技术栈
- **扁平结构**——根目录 `.mdc` 文件是唯一产品，不引入子目录层级
- **工程化管道**——自动化验证、目录构建与 GitHub Pages 发布
- **中文优先**——所有规则内容以中文撰写，贴近中文开发者习惯

## 与其他方案的区别

许多开发者使用 `.cursorrules` 文件或 `system_prompt` 来约束 AI 行为，但这些方案存在局限：

- **`.cursorrules`（旧格式）**：全局生效，无法按文件类型精细控制
- **`system_prompt`**：对话级别，不跨会话持久化
- **`.mdc` 规则**：按 glob 精确匹配，跨会话持久化，可版本控制、可审查

> **工程约束的核心价值**：规则不是给 AI 的 prompt，而是给代码库的**架构约束**——它应该像 `.eslintrc` 一样被对待。

## 下一步

1. [**快速开始**](./getting-started)——5 分钟接入第一条规则
2. [**为什么需要规则**](./why-rules)——建立正确的规则观
3. [**编写规则**](./writing-rules)——掌握 `.mdc` 格式

如果已经了解基础，可以直接前往 [规则目录](/){data-catalog-trigger} 按技术栈筛选并复制。
