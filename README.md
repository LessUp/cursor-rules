<div align="center">

# cursor-rules

**Archive-grade Cursor `.mdc` rule library for teams that want stable, reusable AI coding guidance**

[GitHub Pages](https://lessup.github.io/cursor-rules/) · [OpenSpec Docs](docs/openspec/) · [MIT License](LICENSE)

</div>

---

## 为什么存在 / Why this repo exists

`cursor-rules` 的目标不是做一个“什么都放一点”的提示词仓库，而是提供一组**可以直接复制到 `.cursor/rules/` 的高质量 `.mdc` 规则文件**，并围绕这些规则建立一套低漂移的目录、校验和项目控制文档。

This repository is intentionally small in scope:

- Root-level `.mdc` files are the product.
- GitHub Pages is the catalog and adoption surface.
- OpenSpec docs define project boundaries, workflow, and AI-tooling policy.
- Validation stays lightweight and static-site friendly.

## 快速开始 / Quick start

```bash
mkdir -p .cursor/rules
cp path/to/cursor-rules/clean-code.mdc .cursor/rules/
cp path/to/cursor-rules/python.mdc .cursor/rules/
```

然后在你的项目里让 Cursor 读取这些规则文件即可。

Then validate this repository locally when you change or curate rules:

```bash
npm test
npm run build:catalog
```

## 如何选规则 / How to choose rules

从这三个层面组合即可：

| Layer | Examples | Use it for |
| --- | --- | --- |
| General | `clean-code.mdc`, `codequality.mdc`, `gitflow.mdc` | 所有项目的通用约束 |
| Language / Framework | `python.mdc`, `react.mdc`, `spring.mdc` | 语言或框架级实践 |
| Engineering | `database.mdc`, `docker.mdc` | 跨项目工程主题 |

完整可筛选目录请直接使用 GitHub Pages：

- **Catalog / 规则目录**: <https://lessup.github.io/cursor-rules/>

## 仓库结构 / Repository contract

```text
.
├── *.mdc                     # Public rule files
├── scripts/                  # Validation and catalog generation
├── docs/index.html           # GitHub Pages shell
├── docs/assets/rules.json    # Generated rule catalog
└── docs/openspec/            # Project control documents
```

请注意两条核心约束：

1. **不要移动根目录 `.mdc` 文件**。这是对外路径契约。
2. **不要手改 `docs/assets/rules.json`**。它是由脚本生成的目录产物。

## 项目文档 / Project docs

- [Project Positioning](docs/openspec/project-positioning.md)
- [Architecture](docs/openspec/architecture.md)
- [Workflow](docs/openspec/workflow.md)
- [AI Tooling](docs/openspec/ai-tooling.md)

这些文档用于维护、收尾与交接；README 只保留对外入口所需的信息。

## 验证 / Validation

仓库当前提供两条核心命令：

```bash
npm test
npm run build:catalog
```

它们分别负责：

- 校验所有 `.mdc` 文件结构
- 运行 Node 测试，确保规则目录生成与 Pages shell 约束未回归
- 重新生成 GitHub Pages 使用的 `docs/assets/rules.json`

## 适用场景 / Intended use

这个仓库适合：

- 团队维护一组共享的 Cursor 规则
- 把规则集合做成一个稳定、可浏览、可复制采用的静态目录
- 在多个 AI coding 工具之间共享同一套仓库级协作约束

这个仓库**不**打算变成：

- 通用 prompts 大杂烩
- 带复杂构建链的前端项目
- 大型 CI/CD 实验场

## License

MIT
