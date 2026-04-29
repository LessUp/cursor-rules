# Contributing to cursor-rules

感谢你考虑为 cursor-rules 做出贡献！/ Thanks for considering contributing to cursor-rules!

---

## 如何新增规则 / How to Add a New Rule

### 步骤 / Steps

1. 在仓库根目录创建 `your-rule.mdc` 文件
   Create `your-rule.mdc` at the repository root

2. 添加 frontmatter（必须包含 `description` 和 `globs`）
   Add frontmatter with required `description` and `globs` fields

3. 确保正文有且仅有一个 H1 标题
   Ensure the body has exactly one H1 heading

4. 运行验证命令
   Run validation commands:

```bash
npm test
npm run build:catalog
```

---

## Frontmatter 规范 / Frontmatter Specification

```yaml
---
description: 规则的简要描述 / Brief description of the rule
globs:
  - "**/*.py"
  - "src/**/*"
---
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `description` | ✅ | 规则描述，将显示在 Git Pages 目录中 |
| `globs` | ✅ | 适用文件模式列表，全局规则请留空 |

### 全局规则示例 / Global Rule Example

```yaml
---
description: 适用于所有项目的通用代码质量规则
globs: []
---
```

---

## 验证流程 / Validation Process

```bash
# 校验所有 .mdc 文件结构
npm test

# 重新生成 rules.json 目录
npm run build:catalog
```

**预期结果 / Expected Output**:
- `Checked 26+ files: 0 errors, 0 warnings`
- `Wrote docs/assets/rules.json (N rules)`

---

## PR 审核标准 / PR Review Criteria

我们会对每个 PR 进行以下检查：

| 标准 | 说明 |
|------|------|
| ✅ 实际指导意义 | 规则内容应提供具体、可操作的建议 |
| ✅ 不重复现有规则 | 新规则应填补现有覆盖空白 |
| ✅ 符合仓库契约 | 根目录放置、不手改 rules.json |
| ✅ 测试通过 | `npm test` 无错误 |
| ✅ 目录已重建 | `npm run build:catalog` 成功执行 |

---

## 仓库契约 / Repository Contract

请务必遵守以下核心约束：

1. **不要移动根目录 `.mdc` 文件** — 文件路径是对外契约
2. **不要手改 `docs/assets/rules.json`** — 它由脚本自动生成
3. **保持规则简洁高信噪比** — 避免 generic filler

---

## 本地开发 / Local Development

```bash
# 安装依赖（本项目无外部依赖，仅需 Node.js 22+）
# No external dependencies, requires Node.js 22+

# 运行测试
npm test

# 构建目录
npm run build:catalog

# 本地预览 Git Pages
# 可使用任意静态文件服务器，如：
npx serve docs/
```

---

## 获取帮助 / Getting Help

- 📖 阅读 [OpenSpec 文档](docs/openspec/) 了解项目架构
- 🐛 发现问题请 [提交 Issue](https://github.com/LessUp/cursor-rules/issues)
- 💬 讨论规则改进欢迎在 Issue 中交流
