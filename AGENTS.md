# AGENTS.md

## Repository identity

`cursor-rules` is a curated Cursor `.mdc` rule library. The root-level `.mdc` files are the product, not implementation detail.

## Non-negotiable contracts

1. Do **not** move root-level `.mdc` files into subdirectories.
2. Do **not** hand-edit `docs/assets/rules.json`; regenerate it.
3. Do **not** add frameworks, package managers, or CI jobs unless they solve a repository-specific problem.
4. Keep README public-facing and keep project-control material in `docs/openspec/`.

## Required checks

Run these after any rule, Pages, or automation change:

```bash
npm test
npm run build:catalog
```

## Editing guidance

- Prefer small, surgical changes.
- Remove generic filler from `.mdc` rules before adding new guidance.
- Keep Pages, README, OpenSpec docs, and generated catalog aligned.
- Treat this repository as a stable library intended for eventual archive, not as an experimental sandbox.
