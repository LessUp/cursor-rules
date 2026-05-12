# Architecture

## Core assets

### 1. Root `*.mdc`

仓库的唯一核心产物。文件名和路径本身就是对外契约，因此保持扁平结构，不移动到子目录。

### 2. Validation and catalog pipeline

- `scripts/validate-rules.mjs` 校验 `.mdc` 结构。
- `scripts/lib/rule-catalog.mjs` 把规则元信息规范化为统一目录项。
- `scripts/build-rule-catalog.mjs` 生成 `docs/.vitepress/public/assets/rules.json` 和规则 Markdown 页面。

### 3. Static Pages surface

- `docs/.vitepress/` 提供 VitePress 文档站点配置和主题。
- `docs/.vitepress/theme/components/RuleCatalog.vue` 负责规则目录的展示和交互。

## Data flow

```text
.mdc source files
    │
    ├── validate-rules.mjs
    │
    └── rule-catalog.mjs
            │
            └── build-rule-catalog.mjs
                    │
                    ├── docs/.vitepress/public/assets/rules.json
                    │
                    └── docs/zh/rules/*.md + docs/en/rules/*.md
                                │
                                └── VitePress 构建生成静态站点
```

## Design constraints

1. README 不维护规则清单，只做入口。
2. Pages 不维护手写规则数据，只消费生成产物。
3. OpenSpec 文档只记录边界、流程和决策，不重复 README 文案。
