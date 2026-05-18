---
title: Data Flow Architecture
description: Complete data flow from source files to user interaction in Cursor Rules
---

# Data Flow Architecture

This document shows the complete data flow architecture of Cursor Rules, from source files to final user interaction.

## System Architecture

```mermaid
flowchart TB
    subgraph Input["Input Layer"]
        mdc[".mdc rule files<br/>(26 rules)"]
        config["Project config<br/>.cursorrules"]
    end

    subgraph Processing["Processing Layer"]
        validate["Validation engine<br/>validate-rules.mjs"]
        catalog["Catalog generator<br/>build-rule-catalog.mjs"]
    end

    subgraph Output["Output Layer"]
        json["rules.json<br/>categories.json"]
        pages["Rule detail pages<br/>docs/{zh,en}/rules/*.md"]
        sitemap["sitemap.xml"]
    end

    subgraph Presentation["Presentation Layer"]
        vitepress["VitePress<br/>static site generation"]
        catalog_js["catalog.js<br/>interaction runtime"]
    end

    subgraph User["User Layer"]
        browser["Browser"]
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

## Rule Activation Timing

When a developer uses Cursor IDE for coding, the rule activation and injection flow:

```mermaid
sequenceDiagram
    autonumber
    participant Dev as Developer
    participant IDE as Cursor IDE
    participant Engine as Rule Engine
    participant Files as File System
    participant AI as AI Assistant

    Note over Dev,IDE: Development Phase
    Dev->>IDE: Open project
    IDE->>Files: Scan .mdc files
    Files-->>IDE: Return rule list

    Note over IDE,Engine: Rule Loading
    IDE->>Engine: Initialize rule engine
    Engine->>Engine: Parse frontmatter
    Engine->>Engine: Build glob index

    Note over Dev,AI: Coding Phase
    Dev->>IDE: Open file (e.g., Button.tsx)
    IDE->>Engine: Query matching rules
    Engine->>Engine: glob matching<br/>**/*.tsx
    Engine-->>IDE: Return [typescript, react, tailwind]
    IDE->>AI: Inject rule context
    Dev->>AI: "Create a button component"
    AI->>AI: Generate code following rules
    AI-->>Dev: Output compliant code
```

## Category System

```mermaid
mindmap
  root((Cursor Rules))
    General
      clean-code
      codequality
      gitflow
    Languages
      Python
      Java
      Go
      TypeScript
      C/C++
      C#
      PHP
      Ruby
    Backend
      Node.js/Express
      Spring
      FastAPI
    Frontend
      React
      Vue
      Svelte
      Next.js
      Tailwind
      Medusa
    Mobile
      Android
      iOS
      WeChat Mini Program
      NativeScript
    Engineering
      Database
      Docker
```

## Build Pipeline

```mermaid
flowchart LR
    subgraph S1["Stage 1: Validation"]
        v1["Check frontmatter"]
        v2["Validate description"]
        v3["Check globs syntax"]
    end

    subgraph S2["Stage 2: Extraction"]
        e1["Parse categories"]
        e2["Extract metadata"]
        e3["Calculate statistics"]
    end

    subgraph S3["Stage 3: Generation"]
        g1["Generate JSON"]
        g2["Generate Markdown"]
        g3["Generate Sitemap"]
    end

    subgraph S4["Stage 4: Build"]
        b1["VitePress build"]
        b2["Asset optimization"]
        b3["Deploy to Pages"]
    end

    S1 --> S2 --> S3 --> S4
```

## File Dependencies

```
cursor-rules/
├── *.mdc                    # Source files (single source of truth)
├── scripts/
│   ├── validate-rules.mjs   # Validation script
│   ├── build-rule-catalog.mjs
│   └── lib/
│       ├── category-resolver.mjs
│       ├── frontmatter.mjs
│       └── rule-processor.mjs
├── docs/
│   ├── .vitepress/
│   │   └── config.ts
│   ├── public/assets/
│   │   ├── rules.json       # Generated artifact
│   │   ├── categories.json  # Generated artifact
│   │   └── catalog.js       # Runtime
│   ├── zh/rules/            # Chinese rule pages (generated)
│   └── en/rules/            # English rule pages (generated)
└── .github/workflows/
    └── pages.yml            # CI/CD
```

## Further Reading

- [System Architecture Overview](./) - Core design principles and constraints
- [Glob Overlap Matrix](/openspec/glob-overlap-matrix) - Rule matching relationship analysis
- [Workflow](/openspec/workflow) - Maintainer workflow
