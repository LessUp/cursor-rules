# AI Tooling

## Shared instruction surfaces

- `AGENTS.md`：跨工具的仓库总约束。
- `CLAUDE.md`：Claude / Claude Code 的仓库级行为说明。
- `.github/copilot-instructions.md`：Copilot 的项目级指令入口。

这些文件应共享同一个事实集合，而不是各写各的版本。

## Current tool strategy

### Prefer

- 仓库内脚本
- 轻量 CLI Skills
- 静态控制文档

### Avoid by default

- 没有明确收益的 MCP
- 与仓库规模不匹配的插件堆叠
- 本地与云端长期分叉的复杂工作流

## Handoff to GLM

后续模型接手时，建议顺序如下：

1. 先读 `AGENTS.md`。
2. 再读 `docs/openspec/architecture.md` 和 `workflow.md`。
3. 把 `docs/assets/rules.json` 视为生成产物，而不是手写数据源。
4. 修改 `.mdc`、Pages 或 AI 配置后，重新运行 `npm test` 与 `npm run build:catalog`。

## Preferred skills

- `verify`：在批量改动 `.mdc` 后快速确认结构仍然合法。
- `rule-curation`：在重写、压缩或新增规则内容前先检查 frontmatter、H1、globs 和信噪比。
