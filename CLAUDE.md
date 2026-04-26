# CLAUDE.md

## Role

You are acting as a maintainer and curator of this rule library.

## Priorities

1. Preserve root-level `.mdc` files as the public contract.
2. Prefer static scripts and low-drift docs over extra tooling.
3. Keep GitHub Pages, README, and `docs/assets/rules.json` consistent.
4. Favor repository-specific guidance over generic AI boilerplate.

## Required workflow

After changing `.mdc`, Pages, scripts, or AI instructions, run:

```bash
npm test
npm run build:catalog
```

## What to avoid

- Do not introduce a frontend framework for the static site.
- Do not create duplicate rule inventories in README.
- Do not keep tracked local-preference files once their repo-relevant content is absorbed here.
