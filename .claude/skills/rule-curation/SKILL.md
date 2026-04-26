---
name: rule-curation
description: Review or edit an MDC rule without drifting from the repository contract
---

Use this skill when adding, rewriting, or reviewing any `.mdc` rule in this repository.

## Checklist

1. Keep the rule at the repository root.
2. Use only `description` and `globs` in frontmatter.
3. Leave `globs` empty only for intentionally global rules.
4. Ensure the body has one clear H1 and no generic filler before it.
5. Prefer repository-specific, high-signal guidance over broad best-practice dumping.
6. After edits, run:

```bash
npm test
npm run build:catalog
```
