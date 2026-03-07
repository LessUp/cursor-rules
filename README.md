<div align="center">

# cursor-rules

**为 [Cursor](https://cursor.sh/) 编辑器量身打造的代码审查与编码规范规则集**

[![GitHub stars](https://img.shields.io/github/stars/LessUp/cursor-rules?style=flat-square&logo=github)](https://github.com/LessUp/cursor-rules/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/LessUp/cursor-rules?style=flat-square&logo=github)](https://github.com/LessUp/cursor-rules/network/members)
[![License](https://img.shields.io/github/license/LessUp/cursor-rules?style=flat-square)](LICENSE)
[![Rules](https://img.shields.io/badge/rules-28-blue?style=flat-square)](#-支持的技术栈)

帮助开发者和团队统一代码风格、提升代码质量，从而更高效地进行协作开发。

如果您觉得这个项目有帮助，请给我们一个 ⭐️ Star，这是我们持续维护的最大动力！

</div>

---

## 📖 目录

- [核心优势](#-核心优势)
- [支持的技术栈](#-支持的技术栈)
- [快速开始](#-快速开始)
- [规则文件说明](#-规则文件说明)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)
- [致谢](#-致谢)

## ✨ 核心优势

| | 特性 | 说明 |
| :---: | :--- | :--- |
| ✍️ | **统一规范** | 遵循业界广泛认可的最佳实践，确保团队代码风格一致 |
| 🚀 | **开箱即用** | 只需简单配置，即可在 Cursor 编辑器中启用 |
| 💡 | **智能审查** | 结合 Cursor 的 AI 能力，实时获得代码改进建议 |
| 🧩 | **高度可扩展** | 轻松定制或添加新规则，满足团队个性化需求 |

## 🛠️ 支持的技术栈

### 编程语言

| 技术 | 规则文件 |
| :--- | :--- |
| Python | [`python.mdc`](python.mdc) |
| Java | [`java.mdc`](java.mdc) |
| Go | [`go.mdc`](go.mdc) |
| C# / .NET | [`csharp-dotnet.mdc`](csharp-dotnet.mdc) |
| Ruby | [`ruby.mdc`](ruby.mdc) |
| PHP | [`php.mdc`](php.mdc) |
| C++ | [`cpp.mdc`](cpp.mdc) |
| TypeScript | [`typescript.mdc`](typescript.mdc) |

### 后端框架

| 技术 | 规则文件 |
| :--- | :--- |
| Node.js / Express | [`node-express.mdc`](node-express.mdc) |
| Spring | [`spring.mdc`](spring.mdc) |
| FastAPI | [`fastapi.mdc`](fastapi.mdc) |

### 前端框架

| 技术 | 规则文件 |
| :--- | :--- |
| React | [`react.mdc`](react.mdc) |
| Vue | [`vue.mdc`](vue.mdc) |
| Svelte | [`svelte.mdc`](svelte.mdc) |
| Next.js | [`nextjs.mdc`](nextjs.mdc) |
| Tailwind CSS | [`tailwind.mdc`](tailwind.mdc) |
| Medusa | [`medusa.mdc`](medusa.mdc) |

### 移动端

| 技术 | 规则文件 |
| :--- | :--- |
| Android | [`android.mdc`](android.mdc) |
| iOS | [`ios.mdc`](ios.mdc) |
| 微信小程序 | [`wechat-miniprogram.mdc`](wechat-miniprogram.mdc) |
| NativeScript | [`nativescript.mdc`](nativescript.mdc) |

### 基础设施与工程化

| 技术 | 规则文件 |
| :--- | :--- |
| 数据库设计 | [`database.mdc`](database.mdc) |
| Docker | [`docker.mdc`](docker.mdc) |

### 通用规范

| 技术 | 规则文件 |
| :--- | :--- |
| 整洁代码 | [`clean-code.mdc`](clean-code.mdc) |
| 代码质量 | [`codequality.mdc`](codequality.mdc) |
| Git Flow | [`gitflow.mdc`](gitflow.mdc) |

## 🚀 快速开始

### 方式一：直接复制到项目（推荐）

```bash
# 1. 在项目根目录下创建规则目录
mkdir -p .cursor/rules

# 2. 复制所需的规则文件（以 Python + Clean Code 为例）
cp path/to/cursor-rules/python.mdc .cursor/rules/
cp path/to/cursor-rules/clean-code.mdc .cursor/rules/

# Cursor 会自动识别并应用这些规则 ✅
```

### 方式二：Git Submodule（便于同步更新）

```bash
# 1. 将本仓库作为子模块添加到项目中
git submodule add https://github.com/LessUp/cursor-rules.git .cursor/cursor-rules

# 2. 将所需规则软链接到 rules 目录
mkdir -p .cursor/rules
ln -s ../cursor-rules/python.mdc .cursor/rules/python.mdc

# 后续同步更新
git submodule update --remote
```

### 方式三：通过 Cursor 设置导入

1. 打开 Cursor 编辑器。
2. 进入 **Settings** → **Cursor Settings** → **Rules**。
3. 点击 **Add Rule**，将 `.mdc` 文件的内容粘贴到规则编辑器中。

## 📄 规则文件说明

每个 `.mdc` 文件由两部分组成：

```markdown
---
description: 规则集用途的简短描述
globs: **/*.py, src/**/*.py          # 适用的文件类型
---

# 规则正文：具体的编码规范和最佳实践
```

- **`globs` 不为空** → 规则仅在匹配的文件类型上生效（如 `**/*.py` 只对 Python 文件生效）。
- **`globs` 为空** → 规则作为通用规范全局生效。

## 🤝 贡献指南

我们非常欢迎社区的贡献！

### 参与方式

- **提交 Issue**：发现问题或有新想法？请在 [Issues](https://github.com/LessUp/cursor-rules/issues) 中告诉我们。
- **提交 Pull Request**：
  1. Fork 本仓库
  2. 创建特性分支：`git checkout -b feature/AmazingFeature`
  3. 提交更改：`git commit -m 'Add some AmazingFeature'`
  4. 推送分支：`git push origin feature/AmazingFeature`
  5. 打开一个 Pull Request

### 编写新规则的规范

贡献新规则时，请遵循以下模板：

```markdown
---
description: 简短描述该规则集的用途
globs: **/*.ext, src/**/*.ext
---

# 技术名称 最佳实践

## 章节标题
- 具体、可操作的指导（避免空泛的描述）
- 推荐具体的工具、库和命令
- 提供代码示例和配置参考
```

## 📜 许可证

本项目采用 [MIT](LICENSE) 许可证 — 可自由使用、修改和分发。

## ❤️ 致谢

感谢所有为这个项目做出贡献的开发者！

---

<div align="center">

**喜欢这个项目吗？请给我们一个 [⭐️ Star](https://github.com/LessUp/cursor-rules/stargazers)！**

</div>
