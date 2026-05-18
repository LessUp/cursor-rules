---
title: System Architecture Overview
description: Core architecture design, data flow, and design constraints of Cursor Rules
---

# System Architecture Overview

Cursor Rules adopts a **Single Source of Truth** architecture design, ensuring that rule content, documentation site, and generated artifacts always stay synchronized.

## Core Design Principles

### 1. Root `.mdc` Files are the Product

The `.mdc` files in the repository root are the public contract. Filenames and paths are part of the contract, so they remain flat and are not moved to subdirectories.

Currently **26 rules** covering **6 categories**:

| Category | Count | Rule Files |
|----------|-------|------------|
| **General** | 3 | clean-code, codequality, gitflow |
| **Languages** | 8 | python, java, go, cpp, csharp-dotnet, php, ruby, typescript |
| **Backend** | 3 | node-express, spring, fastapi |
| **Frontend** | 6 | react, vue, svelte, nextjs, tailwind, medusa |
| **Mobile** | 4 | android, ios, wechat-miniprogram, nativescript |
| **Engineering** | 2 | database, docker |

### 2. Generative Architecture

The documentation site is a **projection** of the rule files, not an independently maintained content copy:

- `scripts/validate-rules.mjs` validates `.mdc` structure
- `scripts/lib/rule-catalog.mjs` normalizes rule metadata into unified catalog items
- `scripts/build-rule-catalog.mjs` generates `rules.json`, `categories.json`, and localized rule pages

### 3. Presentation Layer Separation

- `docs/.vitepress/` provides VitePress site configuration and theme
- `docs/public/assets/catalog.js` (~570 lines) handles rule catalog display and interaction (vanilla JavaScript)
- GitHub Pages is responsible for explanation, navigation, and search

## Data Flow Architecture

```mermaid
flowchart TB
    subgraph Source["Source Files"]
        mdc[".mdc files<br/>(26 rules)"]
    end

    subgraph Validation["Validation Layer"]
        validate["validate-rules.mjs<br/>validate structure"]
    end

    subgraph Processing["Processing Layer"]
        catalog["rule-catalog.mjs<br/>normalize catalog items"]
        build["build-rule-catalog.mjs<br/>generate artifacts"]
    end

    subgraph Output["Generated Artifacts"]
        json["rules.json<br/>categories.json"]
        pages["docs/{zh,en}/rules/*.md<br/>locale rule pages"]
        sitemap["sitemap.xml"]
    end

    subgraph Build["Build Layer"]
        vitepress["VitePress build"]
        static["Static site"]
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

## Rule Activation Flow

When a developer opens a file in Cursor IDE, the rule activation flow is:

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Cursor as Cursor IDE
    participant Matcher as Glob Matcher
    participant Rules as .mdc Rules
    participant AI as AI Assistant

    Dev->>Cursor: Open file (e.g., app.tsx)
    Cursor->>Matcher: Check file path
    Matcher->>Rules: Iterate all globs
    Rules-->>Matcher: Return matched rules
    Note over Matcher,Rules: May match multiple rules<br/>(e.g., typescript.mdc + react.mdc + tailwind.mdc)
    Matcher-->>Cursor: Active rule list
    Cursor->>AI: Inject rule context
    Dev->>AI: Write code / ask question
    AI-->>Dev: Suggestion following rules
```

## Design Constraints

| Constraint | Description |
|------------|-------------|
| **README doesn't maintain rule list** | Only serves as entry point, avoids duplication |
| **Pages doesn't maintain hand-written rule data** | Only consumes generated artifacts, ensures consistency |
| **OpenSpec only records boundaries** | Doesn't repeat README content, maintains information density |

## Layered Rule Design

This repository uses **layered rule design**, where multiple rules matching the same file is expected behavior:

| File Type | Language Layer | Framework Layer | UI Layer |
|-----------|----------------|-----------------|----------|
| `*.tsx` | typescript.mdc | react.mdc / nextjs.mdc | tailwind.mdc |
| `*.py` | python.mdc | fastapi.mdc | - |
| `*.java` | java.mdc | spring.mdc | - |

This design allows rules to be combined as needed, rather than forcing single matching.

## Further Reading

- [Data Flow Architecture](./data-flow) - Detailed data flow and build process
- [Glob Overlap Matrix](/openspec/glob-overlap-matrix) - Rule matching relationship analysis
- [Coverage Matrix](/openspec/coverage-matrix) - Rule coverage statistics
