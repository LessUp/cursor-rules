---
title: Related Work
description: Comparative analysis of AI coding rule injection approaches
---

# Related Work

AI coding assistants implement "rule injection" mechanisms differently across tools. This article provides a comparative analysis of mainstream approaches.

## Comparison Matrix

| Approach | File Format | Version Control | Precise Scope | Team Sharing | Tool Agnostic |
|----------|-------------|-----------------|---------------|--------------|---------------|
| **cursor-rules** (.mdc) | `.mdc` | ✅ | ✅ glob matching | ✅ Git commits | ❌ Cursor only |
| `.cursorrules` (single file) | Unstructured text | ✅ | ❌ Global | ✅ Git commits | ❌ Cursor only |
| GitHub Copilot Instructions | `.github/copilot-instructions.md` | ✅ | ❌ Global | ✅ Git commits | ❌ Copilot only |
| Continue.dev `.continuerules` | Markdown | ✅ | ⚠️ Partial | ✅ | ❌ Continue.dev only |
| Manual System Prompt | None | ❌ | ❌ | ❌ Manual transfer | ✅ |
| OpenAI Custom Instructions | Unstructured text | ❌ | ❌ Global | ❌ Personal level | ✅ |

---

## `.cursorrules` (Traditional Single File Approach)

**Repository**: [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) (⭐ 50k+)

This is the rule format Cursor used in early days: place a single `.cursorrules` file in the project root, with plain text content.

### Advantages

- Simple and direct, zero learning curve
- Can be committed to Git
- Large collection of existing community rules (awesome-cursorrules repo)

### Limitations

```
.cursorrules (Global Rules)
├── Affects all file types ← Cannot distinguish Python files from SQL files
├── Single file, all conventions piled up ← Difficult to combine and maintain
└── No structured metadata ← Cannot auto-generate catalog
```

**Difference from cursor-rules**: `.cursorrules` is "one file covers everything", while `.mdc` supports multiple files with precise glob scopes. For large projects, `.mdc` approach has significant advantages in context utilization.

::: tip Migration Path
Projects with existing `.cursorrules` files can split content by tech stack and convert to multiple `.mdc` files in `.cursor/rules/` directory.
:::

---

## GitHub Copilot Instructions

**Documentation**: [GitHub Copilot Custom Instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

GitHub Copilot supports placing repository-level AI constraint files in `.github/copilot-instructions.md`.

### Architecture Differences

```
.github/copilot-instructions.md
├── Single file, no glob support
├── Globally affects all Copilot interactions
└── Official support, deeply integrated with GitHub ecosystem
```

### Advantages

- Official native support, no extra configuration
- Links with Copilot in GitHub PRs and Code Reviews

### Limitations

- No file-level precise matching (no glob support)
- Only works with GitHub Copilot, not Cursor, Continue.dev, etc.

---

## Continue.dev Rules

**Repository**: [continuedev/continue](https://github.com/continuedev/continue)

Continue.dev is an open-source AI coding assistant supporting multiple LLM backends. Its rule system is similar to Cursor:

```
.continuerules       ← Project-level rules (Markdown format)
~/.continue/rules/   ← User global rules
```

### Comparison with cursor-rules

Continue.dev's rule format is similar to `.mdc`, but ecosystem maturity differs:

- Continue.dev rule community is relatively smaller
- `.mdc` format has more structured frontmatter constraints
- Cursor has higher market share in AI coding assistants

---

## awesome-cursorrules Community

**Repository**: [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)

This is the largest Cursor rule community collection (⭐ 50k+), containing many community-contributed `.cursorrules` format rules.

### Positioning Differences from cursor-rules

| Dimension | awesome-cursorrules | cursor-rules (this library) |
|-----------|--------------------|--------------------|
| Format | `.cursorrules` (single file) | `.mdc` (glob support) |
| Positioning | Community collection, diversity first | Curated, quality first |
| Validation | No automatic validation | `npm test` auto validation |
| Catalog | Static README | Dynamic generated site |
| Update frequency | High (community-driven) | Low (curation strategy) |

Both can be used complementarily: awesome-cursorrules as inspiration source, cursor-rules as quality assurance layer.

---

## Tool-Agnostic Approaches: Inspiration from `.editorconfig`

`.editorconfig` is a successful case in editor configuration: a simple, tool-agnostic specification file supported by almost all editors.

AI coding rules field currently lacks a similar **cross-tool standard**. `.mdc` format is Cursor-specific; Copilot Instructions is GitHub-specific.

This is a potential opportunity: if the AI coding assistant community can agree on a common format, rule files can be reused across tools. This direction is worth continuous attention.

---

## Related Open Source Projects

| Project | Description | Stars |
|---------|-------------|-------|
| [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) | Largest Cursor rule community collection | 50k+ |
| [continuedev/continue](https://github.com/continuedev/continue) | Open-source AI coding assistant, supports multiple LLMs | 20k+ |
| [getcursor/cursor](https://cursor.sh) | Cursor editor official site | — |
| [microsoft/vscode](https://github.com/microsoft/vscode) | VS Code, Copilot's host environment | 160k+ |

---

## Further Reading

- [References](./references) — Research background supporting rule design
- [Evolution](./evolution) — Future directions of rule engineering
