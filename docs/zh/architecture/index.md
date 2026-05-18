---
title: 系统架构总览
description: Cursor Rules 的核心架构设计、数据流与设计约束
---

# 系统架构总览

Cursor Rules 采用**单一事实源**架构设计，确保规则内容、文档站点和生成产物始终保持同步。

## 核心设计原则

### 1. 根目录 `.mdc` 是产品本体

仓库根目录的 `.mdc` 文件是对外契约。文件名和路径本身就是契约的一部分，因此保持扁平结构，不移动到子目录。

当前共 **26 个规则**，覆盖 **6 个分类**：

| 分类 | 数量 | 规则文件 |
|------|------|----------|
| **通用** | 3 | clean-code, codequality, gitflow |
| **语言** | 8 | python, java, go, cpp, csharp-dotnet, php, ruby, typescript |
| **后端** | 3 | node-express, spring, fastapi |
| **前端** | 6 | react, vue, svelte, nextjs, tailwind, medusa |
| **移动端** | 4 | android, ios, wechat-miniprogram, nativescript |
| **工程** | 2 | database, docker |

### 2. 生成式架构

文档站点是规则文件的**投影**，而非独立维护的内容副本：

- `scripts/validate-rules.mjs` 校验 `.mdc` 结构
- `scripts/lib/rule-catalog.mjs` 把规则元信息规范化为统一目录项
- `scripts/build-rule-catalog.mjs` 生成 `rules.json`、`categories.json` 以及本地化规则页面

### 3. 展示层职责分离

- `docs/.vitepress/` 提供 VitePress 文档站点配置和主题
- `docs/public/assets/catalog.js` (~570 行) 负责规则目录的展示和交互（vanilla JavaScript）
- GitHub Pages 负责解释、导读与检索

## 数据流架构

```mermaid
flowchart TB
    subgraph Source["源文件"]
        mdc[".mdc 文件<br/>(26 个规则)"]
    end

    subgraph Validation["校验层"]
        validate["validate-rules.mjs<br/>校验结构"]
    end

    subgraph Processing["处理层"]
        catalog["rule-catalog.mjs<br/>规范化目录项"]
        build["build-rule-catalog.mjs<br/>生成产物"]
    end

    subgraph Output["生成物"]
        json["rules.json<br/>categories.json"]
        pages["docs/{zh,en}/rules/*.md<br/>locale 规则页"]
        sitemap["sitemap.xml"]
    end

    subgraph Build["构建层"]
        vitepress["VitePress 构建"]
        static["静态站点"]
    end

    mdc --> validate
    mdc --> catalog --> build
    build --> json
    build --> pages
    build --> sitemap
    json --> vitepress
    pages --> vitepress
    vitepress --> static
```

## 规则激活流程

当开发者使用 Cursor IDE 打开文件时，规则激活流程如下：

```mermaid
sequenceDiagram
    participant Dev as 开发者
    participant Cursor as Cursor IDE
    participant Matcher as Glob Matcher
    participant Rules as .mdc 规则
    participant AI as AI Assistant

    Dev->>Cursor: 打开文件 (例: app.tsx)
    Cursor->>Matcher: 检查文件路径
    Matcher->>Rules: 遍历所有 globs
    Rules-->>Matcher: 返回匹配规则
    Note over Matcher,Rules: 可能匹配多个规则<br/>(如 typescript.mdc + react.mdc + tailwind.mdc)
    Matcher-->>Cursor: 激活规则列表
    Cursor->>AI: 注入规则上下文
    Dev->>AI: 编写代码/提问
    AI-->>Dev: 遵循规则的建议
```

## 设计约束

| 约束 | 说明 |
|------|------|
| **README 不维护规则清单** | 只做入口，避免重复 |
| **Pages 不维护手写规则数据** | 只消费生成产物，确保一致性 |
| **OpenSpec 只记录边界** | 不重复 README 文案，保持信息密度 |

## 分层规则设计

本仓库采用**分层规则设计**，多个规则匹配同一文件是预期行为：

| 文件类型 | 语言层 | 框架层 | UI 层 |
|---------|--------|--------|-------|
| `*.tsx` | typescript.mdc | react.mdc / nextjs.mdc | tailwind.mdc |
| `*.py` | python.mdc | fastapi.mdc | - |
| `*.java` | java.mdc | spring.mdc | - |

这种设计允许规则按需组合，而非强制单一匹配。

## 延伸阅读

- [数据流架构](./data-flow) - 详细的数据流和构建流程
- [Glob 重叠矩阵](/openspec/glob-overlap-matrix) - 规则匹配关系分析
- [规则覆盖矩阵](/openspec/coverage-matrix) - 规则覆盖范围统计
