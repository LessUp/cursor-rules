# Copilot Instructions

---

## 中文版

### 仓库身份

这是一个精心策划的 Cursor `.mdc` 规则库，不是通用应用脚手架。

### 核心契约

1. 根目录 `.mdc` 文件是主要产品，必须保持在仓库根目录
2. `docs/assets/rules.json` 是从源规则生成的，请重新生成而非手动编辑
3. README 保持对外入口风格，项目控制文档放在 `docs/openspec/`
4. 优先使用静态 HTML/CSS/JS 和小型 Node 脚本，避免引入框架

### 必要检查

修改规则、脚本、Pages 或 AI 配置后，请运行：

```bash
npm test
npm run build:catalog
```

---

## English Version

### Repository Identity

This is a curated Cursor `.mdc` rule library, not a generic app scaffold.

### Core Contracts

1. Root-level `.mdc` files are the primary product and must stay at the repository root
2. `docs/assets/rules.json` is generated from source rules; regenerate it instead of editing by hand
3. Keep README public-facing and use `docs/openspec/` for project-control documentation
4. Prefer static HTML/CSS/JS and small Node scripts over frameworks

### Required Checks

After changing rules, scripts, Pages, or AI config, run:

```bash
npm test
npm run build:catalog
```

---

## Key Files

| 文件 | 用途 |
|------|------|
| `AGENTS.md` | 跨工具仓库总约束 |
| `CLAUDE.md` | Claude Code 行为约束 |
| `docs/openspec/` | 项目控制与交接文档 |
