---
title: 技术白皮书
---

# Cursor Rules 技术白皮书

## 概述

Cursor Rules 是一个 **archive-grade** 的规则库，为 Cursor IDE 提供可维护、可审视的工程约束。

与零散的 prompts 集合不同，Cursor Rules 强调：

- **可维护性**：规则以 `.mdc` 文件形式存在于仓库中，可进行版本控制
- **可审视性**：每个规则都有明确的描述和适用范围（globs）
- **可组合性**：采用分层设计，语言规则 + 框架规则 + 工程规则

## 核心设计原则

### 1. 单一产物原则

根目录的 `.mdc` 文件是**唯一核心产物**。所有其他内容（GitHub Pages、OpenSpec 文档、构建脚本）都是围绕规则库的展示层。

```
cursor-rules/
├── *.mdc           # 核心产物
├── scripts/        # 辅助工具
├── docs/           # 展示层
└── README.md       # 入口
```

### 2. 生成即契约

Pages 站点不维护手写规则数据，只消费 `rules.json` 等生成产物。这确保了：

- 规则内容与展示内容永远一致
- 更新规则只需修改 `.mdc` 文件
- 构建过程自动化，减少人为错误

### 3. 分层规则设计

规则按职责分为三层：

```
┌─────────────────────────────────────────┐
│           工程 (docker, database)        │  ← 跨领域实践
├─────────────────────────────────────────┤
│   框架 (react, nextjs, spring, etc.)    │  ← 领域特定约定
├─────────────────────────────────────────┤
│ 语言 (typescript, python, java, etc.)   │  ← 基础规范
└─────────────────────────────────────────┘
```

这种设计允许规则**组合使用**，例如一个 Next.js 项目可以同时激活：
- `typescript.mdc` - TypeScript 语言规范
- `nextjs.mdc` - Next.js 框架约定
- `tailwind.mdc` - Tailwind CSS 规范

## 文档索引

- [设计原则](/whitepaper/design-principles) - 详细的规则设计哲学
- [实现架构](/whitepaper/implementation) - 技术架构和数据流
- [.mdc 格式规范](/whitepaper/rule-format-spec) - 规则文件格式说明

## 快速开始

1. **浏览规则目录**：在 [首页](/) 搜索和筛选规则
2. **选择规则组合**：参考 [覆盖矩阵](/openspec/coverage-matrix) 找到适合的规则
3. **复制到项目**：将 `.mdc` 文件复制到项目根目录
4. **开始编码**：Cursor IDE 会自动激活匹配的规则
