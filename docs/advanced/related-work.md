---
title: 相关工作
description: AI 编码规则注入方案的横向比较与分析
---

# 相关工作

AI 编码助手的"规则注入"机制在各工具间实现方式各有差异。本文对主流方案进行横向比较。

## 方案对比矩阵

| 方案 | 文件格式 | 版本控制 | 精准作用域 | 团队共享 | 工具无关 |
|------|---------|---------|-----------|---------|---------|
| **cursor-rules**（.mdc） | `.mdc` | ✅ | ✅ glob 匹配 | ✅ Git 提交 | ❌ Cursor 专用 |
| `.cursorrules`（单文件） | 无结构纯文本 | ✅ | ❌ 全局生效 | ✅ Git 提交 | ❌ Cursor 专用 |
| GitHub Copilot Instructions | `.github/copilot-instructions.md` | ✅ | ❌ 全局生效 | ✅ Git 提交 | ❌ Copilot 专用 |
| Continue.dev `.continuerules` | Markdown | ✅ | ⚠️ 部分支持 | ✅ | ❌ Continue.dev 专用 |
| 手动 System Prompt | 无 | ❌ | ❌ | ❌ 需手动传递 | ✅ |
| OpenAI Custom Instructions | 无结构文本 | ❌ | ❌ 全局生效 | ❌ 个人级别 | ✅ |

---

## `.cursorrules`（传统单文件方案）

**仓库**：[PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)（⭐ 50k+）

这是 Cursor 早期使用的规则格式：在项目根目录放置单个 `.cursorrules` 文件，内容为纯文本。

### 优点
- 简单直接，零学习成本
- 可提交到 Git
- 大量现成的社区规则（awesome-cursorrules 仓库）

### 局限性

```
.cursorrules（全局规则）
├── 对所有文件类型生效 ← 无法区分 Python 文件和 SQL 文件
├── 单文件，所有约定堆砌 ← 难以组合和维护
└── 无结构化元数据 ← 无法自动生成目录
```

**与 cursor-rules 的差异**：`.cursorrules` 是"一个文件覆盖一切"，而 `.mdc` 支持多文件、精准的 glob 作用域。对于大型项目，`.mdc` 方案在上下文利用率上有显著优势。

::: tip 迁移路径
已有 `.cursorrules` 文件的项目，可以将其内容按技术栈拆分，转换为多个 `.mdc` 文件，放入 `.cursor/rules/` 目录。
:::

---

## GitHub Copilot Instructions

**文档**：[GitHub Copilot 自定义说明](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

GitHub Copilot 支持在 `.github/copilot-instructions.md` 中放置仓库级别的 AI 约束文件。

### 架构差异

```
.github/copilot-instructions.md
├── 单文件，无 glob 支持
├── 对所有 Copilot 交互全局生效
└── 官方支持，与 GitHub 生态深度集成
```

### 优点
- 官方原生支持，无需额外配置
- 与 GitHub PR、Code Review 中的 Copilot 联动

### 局限性
- 无文件级别的精准匹配（不支持 glob）
- 只适用于 GitHub Copilot，不适用于 Cursor、Continue.dev 等

---

## Continue.dev 规则

**仓库**：[continuedev/continue](https://github.com/continuedev/continue)

Continue.dev 是一个开源 AI 编码助手，支持多种 LLM 后端。其规则系统与 Cursor 类似：

```
.continuerules       ← 项目级规则（Markdown 格式）
~/.continue/rules/   ← 用户全局规则
```

### 与 cursor-rules 的比较

Continue.dev 的规则格式与 `.mdc` 相似，但生态系统成熟度不同：
- Continue.dev 规则社区相对较小
- `.mdc` 格式有更结构化的 frontmatter 约束
- Cursor 在 AI 编码助手市场占有率更高

---

## awesome-cursorrules 社区

**仓库**：[PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)

这是目前最大的 Cursor 规则社区集合（⭐ 50k+），收录了大量 `.cursorrules` 格式的社区贡献。

### 与 cursor-rules 的定位差异

| 维度 | awesome-cursorrules | cursor-rules（本库） |
|------|--------------------|--------------------|
| 格式 | `.cursorrules`（单文件） | `.mdc`（支持 glob） |
| 定位 | 社区收集，多样性优先 | 精选策划，质量优先 |
| 验证 | 无自动验证 | `npm test` 自动验证 |
| 目录 | 静态 README | 动态生成站点 |
| 更新频率 | 高（社区驱动） | 低（精选策略） |

两者可以互补使用：awesome-cursorrules 作为灵感来源，cursor-rules 作为质量保证层。

---

## 工具无关方案：`.editorconfig` 的启示

`.editorconfig` 是编辑器配置领域的成功案例：一个简单的、工具无关的规范文件，被几乎所有编辑器支持。

AI 编码规则领域目前尚无类似的**跨工具标准**。`.mdc` 格式是 Cursor 专有的；Copilot Instructions 是 GitHub 专有的。

这是一个潜在的机会：如果 AI 编码助手社区能就一套通用格式达成共识，规则文件将可以跨工具复用。这个方向值得持续关注。

---

## 相关开源项目

| 项目 | 描述 | Stars |
|------|------|-------|
| [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | 最大的 Cursor 规则社区集合 | 50k+ |
| [continuedev/continue](https://github.com/continuedev/continue) | 开源 AI 编码助手，支持多种 LLM | 20k+ |
| [getcursor/cursor](https://cursor.sh) | Cursor 编辑器官方站点 | — |
| [microsoft/vscode](https://github.com/microsoft/vscode) | VS Code，Copilot 的宿主环境 | 160k+ |

---

## 参考

- [学术参考](/advanced/academic-references)——支撑规则设计的研究背景
- [为什么需要规则](/guide/why-rules)——规则的工程化价值分析
