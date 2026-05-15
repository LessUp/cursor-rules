---
title: 编写规则
description: 掌握 .mdc 文件格式，编写精准有效的 Cursor 规则
---

# 编写规则

## .mdc 文件格式

每个 `.mdc` 规则文件由两部分组成：**Frontmatter**（元数据头）和**规则正文**。

```markdown
---
description: 规则的简短描述（用于目录展示和 AI 上下文摘要）
globs: **/*.py, tests/**/*.py
alwaysApply: false
---

# 规则标题

## 章节一

- 具体约定 1
- 具体约定 2

## 章节二

...
```

## Frontmatter 字段详解

### `description`（必填）

规则的简短描述，用于：
- 目录站点的规则卡片展示
- Cursor 在选择是否注入规则时的参考摘要

```yaml
description: 使用 Flask 和 SQLite 的现代 Python 最佳实践
```

::: tip 建议
description 应简洁直接，20-50 字为宜。包含技术栈名称，便于搜索和筛选。
:::

### `globs`（推荐）

控制规则应用范围的文件路径模式，支持 glob 语法：

```yaml
# 单个模式
globs: **/*.py

# 多个模式（逗号分隔）
globs: **/*.py, tests/**/*.py, scripts/**/*.py

# 前端规则示例
globs: **/*.tsx, **/*.ts, src/**/*.js

# 配置文件规则
globs: docker-compose*.yml, Dockerfile*
```

**不设置 `globs` 时**，规则为全局规则，对所有文件类型生效。全局规则适合通用的编码哲学，但应谨慎使用以避免 context 浪费。

### `alwaysApply`（可选）

当设为 `true` 时，无论当前文件是否匹配 `globs`，规则都会注入。默认为 `false`。

```yaml
alwaysApply: true
```

::: warning 注意
`alwaysApply: true` 会始终占用 context 窗口，谨慎用于大型规则文件。
:::

## 规则正文写作指南

### 结构原则

规则正文应采用 Markdown 格式，使用标题组织，要点精简：

```markdown
# 技术栈名称 最佳实践

## 项目结构
- 约定 1
- 约定 2

## 代码风格
- 约定 3

## 错误处理
- 约定 4
```

### 写作原则

**1. 每条规则聚焦一个关注点**

不要把所有约定堆进一个文件。`typescript.mdc` 只写 TypeScript 通用约定；`react.mdc` 只写 React 特有约定。

**2. 用指令语气，不用描述语气**

```markdown
# ✅ 指令语气（好）
- 使用 `const` 声明不变的值，使用 `let` 声明可变的值

# ❌ 描述语气（差）
- `const` 用于不变的值，`let` 用于可变的值
```

**3. 具体胜过抽象**

```markdown
# ✅ 具体（好）
- 使用 `Optional[Type]` 而不是 `Type | None`

# ❌ 抽象（差）
- 正确使用类型注解
```

**4. 控制规则长度**

规则文件越长，占用的 context 越多。建议：
- 单个规则文件不超过 100 行
- 每个章节不超过 8 条要点
- 如果内容过多，考虑拆分为多个规则文件

## 完整示例：Go 语言规则

```markdown
---
description: Go 后端服务的最佳实践和代码规范
globs: **/*.go, *_test.go
---

# Go 最佳实践

## 项目结构
- 遵循标准 Go 项目布局（cmd/, internal/, pkg/）
- 将 main 包保持简洁，业务逻辑放在 internal/
- 使用 Go modules 管理依赖

## 错误处理
- 永远不要忽略 error 返回值
- 使用 `fmt.Errorf("context: %w", err)` 包装错误
- 自定义错误类型实现 `error` 接口

## 并发
- 使用 goroutine 时确保有对应的退出机制
- channel 关闭由发送方负责
- 使用 `sync.WaitGroup` 等待 goroutine 完成
```

## 在本库基础上定制

你可以基于本库的规则进行定制：

1. 从目录复制规则内容
2. 在本地修改以适应项目特定约定
3. 将修改后的规则保存到项目的 `.cursor/rules/` 目录

如果你的定制对其他团队有通用价值，欢迎通过 [GitHub Issues](https://github.com/LessUp/cursor-rules/issues) 反馈或提交 PR。

## 参考

- [Frontmatter 字段完整参考](/reference/frontmatter)
- [规则分类说明](/reference/categories)
- [MDC 规范](/architecture/mdc-spec)
