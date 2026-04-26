# Workflow

## Branch policy

- 优先使用短生命周期分支。
- 避免长期未合并的分支堆积。
- 当有明确计划文件时，应先基于计划推进，再扩大改动范围。

## Review policy

以下改动默认要先经过 `/review`：

- `.mdc` 规则内容变化
- GitHub Pages 信息架构变化
- AI 协作指令变化
- workflow 与版本锚定变化

以下改动可以在本地验证后直接推进：

- 文案润色
- OpenSpec 文档内部措辞调整
- 纯展示性、无行为变化的静态样式微调

## Completion checklist

每次准备收尾时至少执行：

```bash
npm test
npm run build:catalog
```

并确认：

1. `.mdc` 校验通过。
2. 目录生成测试与 Pages shell 测试通过。
3. `docs/assets/rules.json` 已按当前规则内容重建。
