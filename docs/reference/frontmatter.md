---
title: Frontmatter 字段参考
description: .mdc 文件 frontmatter 字段的完整定义与取值约束
---

# Frontmatter 字段参考

## 字段总览

| 字段 | 必填 | 类型 | 默认值 | 说明 |
|------|------|------|--------|------|
| `description` | ✅ 是 | string | 无 | 规则的简短描述 |
| `globs` | 推荐 | string | 空（全局生效） | 文件匹配模式列表 |
| `category` | 可选 | enum | 自动推断 | 规则分类键 |

---

## `description`

**类型**：`string`  
**必填**：是

规则的简短描述，用于：

1. 规则目录站点的卡片展示
2. Cursor 上下文摘要（AI 参考此字段决定是否注入规则）

### 取值规则

- 纯文本字符串，不支持 Markdown 格式
- 不能为空字符串
- 推荐长度：20-80 字符
- 推荐包含技术栈名称，便于搜索

### 示例

```yaml
# ✅ 好的描述
description: 使用 Flask 和 SQLite 的现代 Python 最佳实践

# ✅ 好的描述
description: React 18 Hooks 和函数式组件最佳实践

# ❌ 太简短，缺少上下文
description: Python 规则

# ❌ 空字符串（验证 E005 报错）
description: ""
```

### 验证规则

| 错误码 | 触发条件 |
|--------|---------|
| `E004` | `description` 键不存在 |
| `E005` | `description` 值为空字符串 |

---

## `globs`

**类型**：逗号分隔的 glob 模式字符串  
**必填**：否（推荐设置）

控制规则的应用范围。只有当用户编辑的文件路径匹配任意一个 glob 模式时，规则才会被 Cursor 注入。

### 取值规则

- 多个模式用英文逗号 `,` 分隔
- 支持标准 glob 语法（`*`、`**`、`?`、`{a,b}`）
- 空值或缺失时，规则对所有文件生效（全局规则）

### Glob 语法速查

| 模式 | 匹配示例 |
|------|---------|
| `**/*.py` | `src/main.py`、`tests/test_api.py` |
| `src/**/*.ts` | `src/utils/helper.ts`（不匹配 `tests/`） |
| `*.{ts,tsx}` | 根目录的 `app.ts`、`component.tsx` |
| `**/*_test.go` | `pkg/api/handler_test.go` |
| `Dockerfile*` | `Dockerfile`、`Dockerfile.prod` |
| `docker-compose*.yml` | `docker-compose.yml`、`docker-compose.dev.yml` |

### 单模式示例

```yaml
globs: **/*.py
```

### 多模式示例

```yaml
# 逗号分隔
globs: **/*.py, tests/**/*.py, scripts/**/*.py

# 覆盖前端常见文件类型
globs: **/*.ts, **/*.tsx, **/*.js, **/*.jsx
```

### 全局规则（无 globs）

```yaml
---
description: 通用代码质量准则（适用于所有文件类型）
---
```

::: warning 谨慎使用全局规则
全局规则会在编辑任何文件时注入上下文，会持续消耗 AI 上下文窗口。建议只在规则内容极其简短（< 20 行）且确实适用于所有文件类型时使用。
:::

### 验证规则

| 错误码 | 触发条件 |
|--------|---------|
| `W001` | `globs` 字段存在但值为空（警告，非错误） |

---

## `category`

**类型**：预定义枚举字符串  
**必填**：否

规则的分类，用于本规则库的目录组织和前端筛选功能。

### 有效取值

| 值 | 中文标签 | 适用规则示例 |
|----|---------|------------|
| `general` | 通用 | `clean-code`、`codequality`、`gitflow` |
| `language` | 语言 | `python`、`typescript`、`go`、`java` |
| `backend` | 后端 | `fastapi`、`node-express`、`spring` |
| `frontend` | 前端 | `react`、`vue`、`nextjs`、`tailwind` |
| `mobile` | 移动端 | `android`、`ios`、`wechat-miniprogram` |
| `engineering` | 工程 | `docker`、`database` |
| `other` | 其他 | 未归入以上类别的规则 |

### 自动推断逻辑

若未指定 `category`，系统根据规则文件名（slug）在 `DEFAULT_CATEGORY_MAP` 中查找对应分类；若未找到，则归入 `other`。

新增规则时，**推荐显式声明 `category`**，避免依赖自动推断：

```yaml
---
description: Rust 系统编程最佳实践
globs: **/*.rs
category: language
---
```

### 验证规则

| 错误码 | 触发条件 |
|--------|---------|
| `E003` | `category` 值不在有效枚举列表中 |

---

## 不允许的字段

以下字段不在允许列表中，验证器将报告 `E003 Unknown frontmatter key` 错误：

```yaml
# ❌ 这些字段会导致验证失败
tags: [python, testing]
version: "2.0"
author: username
created: 2024-01-01
```

这是有意为之的约束，确保 frontmatter 结构的一致性和可预测性。如有新字段需求，需要修改验证器的 `ALLOWED_KEYS` 集合，并在本文档中记录。

---

## 参考

- [MDC 规范](/architecture/mdc-spec)——完整的文件格式规范
- [规则分类参考](/reference/categories)——分类体系的详细说明
- [编写规则指南](/guide/writing-rules)——规则正文的写作技巧
