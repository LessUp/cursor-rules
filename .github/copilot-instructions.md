# Copilot Instructions

- This repository is a curated Cursor `.mdc` rule library, not a generic app scaffold.
- Root-level `.mdc` files are the primary product and must stay at the repository root.
- `docs/assets/rules.json` is generated from source rules; regenerate it instead of editing it by hand.
- Keep README public-facing and use `docs/openspec/` for project-control documentation.
- Prefer static HTML/CSS/JS and small Node scripts over frameworks.
- After changing rules, scripts, Pages, or AI config, run:

```bash
npm test
npm run build:catalog
```
