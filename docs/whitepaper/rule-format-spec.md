---
title: .mdc 格式规范
---

# .mdc 格式规范

本文档定义 Cursor Rules 使用的 `.mdc` 文件格式规范。

## 文件结构

每个 `.mdc` 文件由两部分组成：

```markdown
---
description: 规则描述
globs: **/*.ts, **/*.tsx
---

# 规则标题

规则内容...
```

### Frontmatter

YAML 格式的元数据，位于文件开头，用 `---` 包围：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `description` | string | ✅ | 规则的简短描述，用于目录展示 |
| `globs` | string \| string[] | ❌ | 文件匹配模式，定义规则适用范围 |

### Content

Markdown 格式的规则内容，支持：

- 标题（h1-h6）
- 列表（有序、无序）
- 代码块（带语法高亮）
- 表格
- 链接和图片

## Globs 语法

使用 [minimatch](https://github.com/isaacs/minimatch) 兼容的 glob 模式：

### 基本模式

| 模式 | 说明 | 示例 |
|------|------|------|
| `*` | 匹配任意字符（不含路径分隔符） | `*.ts` |
| `**` | 匹配任意层级目录 | `**/*.ts` |
| `?` | 匹配单个字符 | `file?.ts` |
| `[...]` | 字符集合 | `*.[jt]s` |

### 常见用法

```yaml
# 单一模式
globs: **/*.py

# 多个模式
globs: **/*.ts, **/*.tsx

# 数组形式
globs:
  - **/*.ts
  - **/*.tsx
  - src/**/*.js

# 无限制（全局规则）
globs:
```

## 命名规范

### 文件名

- 使用小写字母
- 使用连字符分隔单词
- 与规则主题相关
- 示例：`clean-code.mdc`、`node-express.mdc`

### 规则标题

```markdown
# [语言/框架] 编程指南
```

示例：
- `# Python 编程指南`
- `# React 最佳实践`
- `# Dockerfile 编写规范`

## 内容结构

推荐的规则内容结构：

```markdown
# [主题] 编程指南

## 项目结构
...

## 命名约定
...

## 代码风格
...

## 类型定义
...

## 错误处理
...

## 测试规范
...

## 安全考虑
...

## 性能优化
...

## 文档规范
...
```

## 示例

### 语言规则

```markdown
---
description: Python 最佳实践，包括命名规范、类型提示和项目结构
globs: **/*.py, src/**/*.py, tests/**/*.py
---

# Python 编程指南

## 命名约定

- 使用 snake_case 命名函数和变量
- 使用 PascalCase 命名类
- 常量使用全大写 SNAKE_CASE

## 类型提示

\`\`\`python
def calculate_total(items: list[dict]) -> float:
    ...
\`\`\`
```

### 框架规则

```markdown
---
description: React 组件最佳实践和模式
globs: **/*.tsx, **/*.jsx, components/**/*
---

# React 组件指南

## 组件结构

\`\`\`tsx
interface ButtonProps {
  label: string
  onClick: () => void
}

export function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>
}
\`\`\`
```

### 全局规则

```markdown
---
description: 通用代码质量指南
globs:
---

# 代码质量指南

## 原则

1. DRY - 不重复
2. KISS - 保持简单
3. YAGNI - 不过度设计
```

## 校验规则

构建时会自动校验：

1. **frontmatter 格式**：必须是有效 YAML
2. **description 存在**：不能为空
3. **globs 语法**：必须是有效 glob 模式
4. **文件名唯一**：不能有重复的规则名

## 版本控制

- 规则文件应纳入 Git 版本控制
- 使用语义化版本号更新 `package.json`
- 重大变更应在 README 中记录
