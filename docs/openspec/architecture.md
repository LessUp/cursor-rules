# Architecture

## Core assets

### 1. Root `*.mdc`

仓库的唯一核心产物。文件名和路径本身就是对外契约，因此保持扁平结构，不移动到子目录。

### 2. Validation and catalog pipeline

- `scripts/validate-rules.mjs` 校验 `.mdc` 结构。
- `scripts/lib/rule-catalog.mjs` 把规则元信息规范化为统一目录项。
- `scripts/build-rule-catalog.mjs` 生成 `docs/assets/rules.json`。

### 3. Static Pages surface

- `docs/index.html` 提供空壳信息架构。
- `docs/assets/site.js` 负责加载和渲染规则目录。
- `docs/assets/site.css` 负责统一视觉样式。

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
                    └── docs/assets/rules.json
                                │
                                └── docs/index.html + site.js
```

## Design constraints

1. README 不维护规则清单，只做入口。
2. Pages 不维护手写规则数据，只消费生成产物。
3. OpenSpec 文档只记录边界、流程和决策，不重复 README 文案。
