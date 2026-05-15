---
title: 参考手册
description: cursor-rules 的 Frontmatter 字段、分类体系和规则格式速查
---

# 参考手册

本节提供 `cursor-rules` 的完整技术参考，适合在编写规则时查阅。

## 本节内容

<div class="doc-nav-cards">
  <a class="doc-nav-card" href="/reference/frontmatter">
    <div class="doc-nav-card-title">Frontmatter 字段参考</div>
    <div class="doc-nav-card-desc">所有 frontmatter 字段的完整定义、取值约束和示例</div>
  </a>
  <a class="doc-nav-card" href="/reference/categories">
    <div class="doc-nav-card-title">规则分类参考</div>
    <div class="doc-nav-card-desc">8 个规则分类的说明、覆盖范围和使用指南</div>
  </a>
</div>

## 快速查阅

### 最小合规规则

```markdown
---
description: 一句话描述规则内容（必填）
globs: **/*.py
---

# 规则标题（必须）

## 核心约定

- 约定一
- 约定二
```

### Frontmatter 字段速查

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `description` | ✅ 是 | 字符串 | 规则简短描述 |
| `globs` | 推荐 | 逗号分隔字符串 | 文件匹配模式 |
| `category` | 可选 | 枚举字符串 | 规则分类键 |

### 分类键速查

| 键 | 中文 | 典型规则 |
|----|------|---------|
| `general` | 通用 | clean-code, codequality |
| `language` | 语言 | python, typescript, go |
| `backend` | 后端 | fastapi, node-express |
| `frontend` | 前端 | react, vue, nextjs |
| `mobile` | 移动端 | android, ios |
| `engineering` | 工程 | docker, database |
| `other` | 其他 | 未分类规则 |

### 验证错误码

| 错误码 | 级别 | 原因 |
|--------|------|------|
| `E001` | ERROR | 缺少 frontmatter 块 |
| `E002` | ERROR | YAML 语法错误 |
| `E003` | ERROR | 未知的 frontmatter 字段 |
| `E004` | ERROR | 缺少 `description` 字段 |
| `E005` | ERROR | `description` 值为空 |
| `E006` | ERROR | 正文缺少 H1 标题 |
| `W001` | WARN | `globs` 字段为空 |

## 验证命令

```bash
# 完整验证（推荐）
npm test

# 仅规则验证
node scripts/validate-rules.mjs

# 重新生成目录
npm run build:catalog
```
