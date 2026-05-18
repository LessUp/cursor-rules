---
title: 快速开始
description: 5 分钟内将 Cursor Rules 接入你的项目
---

# 快速开始

本文介绍将规则从本库接入 Cursor 项目的最短路径。

## 前置条件

- [Cursor](https://cursor.sh) 编辑器（任意版本）
- 一个本地代码项目

## 第一步：创建规则目录

在你的项目根目录下创建 `.cursor/rules/` 文件夹：

```bash
mkdir -p .cursor/rules
```

## 第二步：选择并复制规则

访问本站 [规则目录](/) 页面，通过技术栈筛选找到适合你项目的规则，点击规则卡片上的"复制"按钮，将规则内容复制到剪贴板。

常用规则速查：

| 技术栈 | 规则文件 | 推荐场景 |
|--------|---------|---------|
| Python | `python.mdc` | Flask、FastAPI、数据科学项目 |
| TypeScript | `typescript.mdc` | Node.js、前端通用 |
| React | `react.mdc` | React + Hooks 项目 |
| Next.js | `nextjs.mdc` | Next.js App Router 项目 |
| Go | `go.mdc` | Go 后端服务 |
| Docker | `docker.mdc` | 容器化项目 |

## 第三步：创建规则文件

将复制的内容粘贴到 `.cursor/rules/` 目录下，以 `.mdc` 为扩展名保存：

```bash
# 示例：Python 项目
touch .cursor/rules/python.mdc
# 粘贴规则内容后保存
```

一个典型的 `.mdc` 文件结构如下：

```markdown
---
description: Python 最佳实践
globs: **/*.py, tests/**/*.py
---

# Python 最佳实践

## 项目结构
- 使用 src 布局
...
```

## 第四步：在 Cursor 中验证

1. 打开 Cursor，进入你的项目
2. 按 `Cmd+Shift+P`（macOS）或 `Ctrl+Shift+P`（Windows/Linux）
3. 搜索 `Cursor: Open Rules`，可以看到已加载的规则列表
4. 向 AI 发起一次编码请求，观察 AI 是否遵循规则中的约定

## 常见问题

**规则没有生效怎么办？**

检查以下几点：

- 规则文件扩展名必须是 `.mdc`（不是 `.md`）
- 文件路径必须是 `.cursor/rules/` 目录（不是 `.cursorrules`）
- `globs` 字段的路径模式是否覆盖了你当前编辑的文件

**可以同时使用多条规则吗？**

可以。Cursor 会合并所有匹配当前文件的规则一起注入。建议按技术层分别维护规则文件，例如 `typescript.mdc` + `react.mdc` 同时使用。

**规则文件应该提交到 Git 吗？**

**强烈建议提交**。`.cursor/rules/` 目录的规则是团队共识的一部分，提交后所有团队成员在使用 Cursor 时都会自动加载相同的约束，确保一致性。

## 下一步

- [为什么需要规则](./why-rules)——了解规则设计的哲学背景
- [编写规则](./writing-rules)——学习如何定制和创建自己的规则
- [架构文档](/zh/architecture/)——了解本规则库的工程化架构
