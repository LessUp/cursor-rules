# 数据流架构

## 概述

本文档展示 Cursor Rules 的完整数据流架构，从源文件到最终用户交互。

## 系统架构

```mermaid
flowchart TB
    subgraph Input["输入层"]
        mdc[".mdc 规则文件<br/>(26 个)"]
        config["项目配置<br/>.cursorrules"]
    end

    subgraph Processing["处理层"]
        validate["校验引擎<br/>validate-rules.mjs"]
        catalog["目录生成器<br/>build-rule-catalog.mjs"]
    end

    subgraph Output["输出层"]
        json["rules.json<br/>categories.json"]
        pages["规则详情页<br/>docs/{zh,en}/rules/*.md"]
        sitemap["sitemap.xml"]
    end

    subgraph Presentation["展示层"]
        vitepress["VitePress<br/>静态站点生成"]
        catalog_js["catalog.js<br/>交互运行时"]
    end

    subgraph User["用户层"]
        browser["浏览器"]
        cursor["Cursor IDE"]
    end

    mdc --> validate --> catalog
    catalog --> json & pages & sitemap
    json --> catalog_js
    pages --> vitepress
    vitepress --> browser
    catalog_js --> browser
    config --> cursor
    mdc --> cursor
```

## 规则激活时序

```mermaid
sequenceDiagram
    autonumber
    participant Dev as 开发者
    participant IDE as Cursor IDE
    participant Engine as 规则引擎
    participant Files as 文件系统
    participant AI as AI 助手

    Note over Dev,IDE: 开发阶段
    Dev->>IDE: 打开项目
    IDE->>Files: 扫描 .mdc 文件
    Files-->>IDE: 返回规则列表

    Note over IDE,Engine: 规则加载
    IDE->>Engine: 初始化规则引擎
    Engine->>Engine: 解析 frontmatter
    Engine->>Engine: 构建 glob 索引

    Note over Dev,AI: 编码阶段
    Dev->>IDE: 打开文件 (例: Button.tsx)
    IDE->>Engine: 查询匹配规则
    Engine->>Engine: glob 匹配<br/>**/*.tsx
    Engine-->>IDE: 返回 [typescript, react, tailwind]
    IDE->>AI: 注入规则上下文
    Dev->>AI: "创建一个按钮组件"
    AI->>AI: 遵循规则生成代码
    AI-->>Dev: 输出符合规范的代码
```

## 分类体系

```mermaid
mindmap
  root((Cursor Rules))
    通用
      clean-code
      codequality
      gitflow
    语言
      Python
      Java
      Go
      TypeScript
      C/C++
      C#
      PHP
      Ruby
    后端
      Node.js/Express
      Spring
      FastAPI
    前端
      React
      Vue
      Svelte
      Next.js
      Tailwind
      Medusa
    移动端
      Android
      iOS
      微信小程序
      NativeScript
    工程
      Database
      Docker
```

## 构建流水线

```mermaid
flowchart LR
    subgraph S1["阶段 1: 校验"]
        v1["检查 frontmatter"]
        v2["验证 description"]
        v3["检查 globs 语法"]
    end

    subgraph S2["阶段 2: 提取"]
        e1["解析分类"]
        e2["提取元数据"]
        e3["计算统计"]
    end

    subgraph S3["阶段 3: 生成"]
        g1["生成 JSON"]
        g2["生成 Markdown"]
        g3["生成 Sitemap"]
    end

    subgraph S4["阶段 4: 构建"]
        b1["VitePress 构建"]
        b2["静态资源优化"]
        b3["部署到 Pages"]
    end

    S1 --> S2 --> S3 --> S4
```

## 文件依赖关系

```
cursor-rules/
├── *.mdc                    # 源文件（唯一真相来源）
├── scripts/
│   ├── validate-rules.mjs   # 校验脚本
│   ├── build-rule-catalog.mjs
│   └── lib/
│       ├── category-resolver.mjs
│       ├── frontmatter.mjs
│       └── rule-processor.mjs
├── docs/
│   ├── .vitepress/
│   │   └── config.ts
│   ├── public/assets/
│   │   ├── rules.json       # 生成物
│   │   ├── categories.json  # 生成物
│   │   └── catalog.js       # 运行时
│   ├── zh/rules/            # 中文规则页生成物
│   └── en/rules/            # 英文规则页生成物（原文视图）
└── .github/workflows/
    └── pages.yml            # CI/CD
```
