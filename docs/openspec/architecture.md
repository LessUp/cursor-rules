# Architecture

## Core assets

### 1. Root `*.mdc`

仓库的唯一核心产物。文件名和路径本身就是对外契约，因此保持扁平结构，不移动到子目录。

当前共 **26 个规则**，覆盖 **6 个分类**：
- **通用** (3): clean-code, codequality, gitflow
- **语言** (8): python, java, go, cpp, csharp-dotnet, php, ruby, typescript
- **后端** (3): node-express, spring, fastapi
- **前端** (6): react, vue, svelte, nextjs, tailwind, medusa
- **移动端** (4): android, ios, wechat-miniprogram, nativescript
- **工程** (2): database, docker

### 2. Validation and catalog pipeline

- `scripts/validate-rules.mjs` 校验 `.mdc` 结构
- `scripts/lib/rule-catalog.mjs` 把规则元信息规范化为统一目录项
- `scripts/build-rule-catalog.mjs` 生成 `docs/public/assets/rules.json`、`docs/public/assets/categories.json`，以及 locale-aware 规则 Markdown 页面

### 3. Static Pages surface

- `docs/.vitepress/` 提供 VitePress 文档站点配置和主题
- `docs/public/assets/catalog.js` (~540 行) 负责规则目录的展示和交互（vanilla JavaScript）

## Data flow

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

## Rule activation flow

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

## Design constraints

1. **README 不维护规则清单**，只做入口
2. **Pages 不维护手写规则数据**，只消费生成产物
3. **OpenSpec 文档只记录边界、流程和决策**，不重复 README 文案

## Glob overlap strategy

本仓库采用**分层规则设计**，多个规则匹配同一文件是预期行为：

| 文件类型 | 语言层 | 框架层 | UI 层 |
|---------|--------|--------|-------|
| `*.tsx` | typescript.mdc | react.mdc / nextjs.mdc | tailwind.mdc |
| `*.py` | python.mdc | fastapi.mdc | - |
| `*.java` | java.mdc | spring.mdc | - |

详见 [Glob 重叠矩阵](/openspec/glob-overlap-matrix)。
