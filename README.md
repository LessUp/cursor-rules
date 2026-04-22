<div align="center">

# cursor-rules

**A curated collection of code review and coding standard rules tailored for [Cursor](https://cursor.sh/) editor**

[English](#english) | [中文](#chinese)

[![CI](https://img.shields.io/github/actions/workflow/status/LessUp/cursor-rules/validate.yml?style=flat-square&logo=github-actions&logoColor=white)](https://github.com/LessUp/cursor-rules/actions)
[![GitHub stars](https://img.shields.io/github/stars/LessUp/cursor-rules?style=flat-square&logo=github)](https://github.com/LessUp/cursor-rules/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/LessUp/cursor-rules?style=flat-square&logo=github)](https://github.com/LessUp/cursor-rules/network/members)
[![License](https://img.shields.io/github/license/LessUp/cursor-rules?style=flat-square)](LICENSE)
[![Rules](https://img.shields.io/badge/rules-26-blue?style=flat-square)](#-supported-tech-stack)

Help developers and teams unify code style and improve code quality for more efficient collaborative development.

If you find this project helpful, please give us a ⭐️ Star — it's our biggest motivation to keep maintaining!

</div>

---

<a name="english"></a>

## 📖 Table of Contents

- [Key Features](#-key-features)
- [Supported Tech Stack](#-supported-tech-stack)
- [Quick Start](#-quick-start)
- [Rule File Format](#-rule-file-format)
- [Best Practices](#-best-practices)
- [Validation](#-validation)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## ✨ Key Features

| | Feature | Description |
| :---: | :--- | :--- |
| ✍️ | **Unified Standards** | Follows industry-recognized best practices to ensure consistent team code style |
| 🚀 | **Ready to Use** | Simple configuration to enable rules in Cursor editor |
| 💡 | **Smart Review** | Leverages Cursor's AI capabilities for real-time code improvement suggestions |
| 🧩 | **Highly Extensible** | Easily customize or add new rules to meet team-specific needs |

## 🛠️ Supported Tech Stack

### Programming Languages

| Tech | Rule File |
| :--- | :--- |
| Python | [`python.mdc`](python.mdc) |
| Java | [`java.mdc`](java.mdc) |
| Go | [`go.mdc`](go.mdc) |
| C# / .NET | [`csharp-dotnet.mdc`](csharp-dotnet.mdc) |
| Ruby | [`ruby.mdc`](ruby.mdc) |
| PHP | [`php.mdc`](php.mdc) |
| C++ | [`cpp.mdc`](cpp.mdc) |
| TypeScript | [`typescript.mdc`](typescript.mdc) |

### Backend Frameworks

| Tech | Rule File |
| :--- | :--- |
| Node.js / Express | [`node-express.mdc`](node-express.mdc) |
| Spring | [`spring.mdc`](spring.mdc) |
| FastAPI | [`fastapi.mdc`](fastapi.mdc) |

### Frontend Frameworks

| Tech | Rule File |
| :--- | :--- |
| React | [`react.mdc`](react.mdc) |
| Vue | [`vue.mdc`](vue.mdc) |
| Svelte | [`svelte.mdc`](svelte.mdc) |
| Next.js | [`nextjs.mdc`](nextjs.mdc) |
| Tailwind CSS | [`tailwind.mdc`](tailwind.mdc) |
| Medusa | [`medusa.mdc`](medusa.mdc) |

### Mobile Development

| Tech | Rule File |
| :--- | :--- |
| Android | [`android.mdc`](android.mdc) |
| iOS | [`ios.mdc`](ios.mdc) |
| WeChat Mini Program | [`wechat-miniprogram.mdc`](wechat-miniprogram.mdc) |
| NativeScript | [`nativescript.mdc`](nativescript.mdc) |

### Infrastructure & Engineering

| Tech | Rule File |
| :--- | :--- |
| Database Design | [`database.mdc`](database.mdc) |
| Docker | [`docker.mdc`](docker.mdc) |

### General Standards

| Tech | Rule File |
| :--- | :--- |
| Clean Code | [`clean-code.mdc`](clean-code.mdc) |
| Code Quality | [`codequality.mdc`](codequality.mdc) |
| Git Flow | [`gitflow.mdc`](gitflow.mdc) |

## 🚀 Quick Start

> **Compatibility Note:** These rules are compatible with Cursor version 0.40.0 and above.

### Method 1: Copy Directly to Project (Recommended)

```bash
# 1. Create rules directory in project root
mkdir -p .cursor/rules

# 2. Copy required rule files (e.g., Python + Clean Code)
cp path/to/cursor-rules/python.mdc .cursor/rules/
cp path/to/cursor-rules/clean-code.mdc .cursor/rules/

# Cursor will automatically recognize and apply these rules ✅
```

### Method 2: Git Submodule (Easy Updates)

```bash
# 1. Navigate to your project root
cd your-project

# 2. Add this repo as a submodule
git submodule add https://github.com/LessUp/cursor-rules.git .cursor/cursor-rules

# 3. Create rules directory and symlink required rule files
mkdir -p .cursor/rules
cd .cursor/rules
ln -s ../cursor-rules/python.mdc python.mdc
ln -s ../cursor-rules/clean-code.mdc clean-code.mdc

# 4. Return to project root and commit
# Update later by running:
git submodule update --remote
```

### Method 3: Import via Cursor Settings

1. Open Cursor editor
2. Go to **Settings** → **Cursor Settings** → **Rules**
3. Click **Add Rule** → **Import**
4. Select the `.mdc` file from your local filesystem, OR:
   - Click **Add Rule** manually and paste the `.mdc` file content into the rule editor
   - Set a name for the rule (e.g., "Python Best Practices")
   - Configure glob patterns if not already included in the file
   - Click **Save**

## 📄 Rule File Format

Each `.mdc` file consists of two parts:

```markdown
---
description: Brief description of the rule set purpose
globs: **/*.py, src/**/*.py          # Applicable file types
---

# Rule Body: Specific coding standards and best practices
```

- **`globs` not empty** → Rule only applies to matching file types (e.g., `**/*.py` only affects Python files).
- **`globs` empty** → Rule applies globally as a general standard.
- The validator accepts two `globs` formats:
  - Unquoted comma-separated string: `**/*.py, src/**/*.py`
  - Quoted comma-separated string: `"**/*.c,**/*.cpp,Makefile"`

### Example Rule File

Here's what [`python.mdc`](python.mdc) looks like:

```markdown
---
description: Python best practices and patterns for modern software development
using Flask and SQLite
globs: **/*.py, src/**/*.py, tests/**/*.py
---

# Python Best Practices

## Project Structure
- Use `src/your_package_name/` src layout
- Put tests in `tests/` parallel to `src/`
- Store configs in `config/` or environment variables

## Code Style
- Follow Black code formatting
- Use isort for import sorting
- Maximum line length of 88 characters (Black default)
```

## 🎯 Best Practices

### Choosing Rules
- Start with **Clean Code** and **Code Quality** rules for any project
- Add language-specific rules for your tech stack
- Add framework-specific rules as needed

### Combining Rules
- Rules work best when combined logically (e.g., Python + Flask for Flask projects)
- Avoid conflicting rules (e.g., don't combine two different style guides for the same language)
- General rules (empty globs) apply to all files; be mindful of overlap

### Customization
- Fork this repository to customize rules for your team
- Modify `.mdc` files to add your team-specific conventions
- Keep a consistent style across all your custom rules

## ✅ Validation

The repo includes a zero-dependency validator to check `.mdc` rule files structure.

```bash
# Method 1: Using npm (recommended)
npm test
# or
npm run validate

# Method 2: Direct Node execution
node scripts/validate-rules.mjs
```

Validate specific files:

```bash
npm test -- python.mdc medusa.mdc
# or
node scripts/validate-rules.mjs python.mdc medusa.mdc
```

The validator checks:
- File starts with `---` frontmatter and ends correctly
- Contains `description` and `globs`
- `description` is not empty
- Non-empty `globs` parses as valid comma-separated entries
- Body exists after frontmatter
- Body contains at least one H1 heading

The validator also gives non-blocking warnings:
- Content before first H1
- Multiple H1 headings in same file
- Unknown frontmatter fields

## ❓ FAQ

**Q: Where should I place the `.mdc` files?**

A: Place them in `.cursor/rules/` at your project root. Cursor will automatically detect and load them.

**Q: Can I use multiple rules for the same file type?**

A: Yes. All matching rules will be applied. You can combine general rules (e.g., Clean Code) with language-specific ones.

**Q: How do I override a specific rule?**

A: Create a custom `.mdc` file with your preferences. When multiple rules conflict, Cursor uses the most specific match.

**Q: Do I need to restart Cursor after adding rules?**

A: No, Cursor detects changes automatically. You may need to reload the window (Cmd/Ctrl + Shift + P → "Developer: Reload Window") in rare cases.

**Q: Can I contribute new rules?**

A: Absolutely! Please see the [Contributing](#-contributing) section below.

**Q: How are these rules different from Cursor's built-in rules?**

A: These rules are community-maintained, more comprehensive, and tailored for specific tech stacks beyond Cursor's defaults.

**Q: Which Cursor version do I need?**

A: Version 0.40.0 or above is recommended for best compatibility.

## 🤝 Contributing

Before submitting a Pull Request, run the validator to ensure new or modified rule files comply with repo conventions.

We welcome community contributions!

### How to Contribute

- **Submit Issues**: Found a problem or have a new idea? Tell us in [Issues](https://github.com/LessUp/cursor-rules/issues).
- **Submit Pull Requests**:
  1. Fork this repository
  2. Create feature branch: `git checkout -b feature/AmazingFeature`
  3. Commit changes: `git commit -m 'Add some AmazingFeature'`
  4. Push branch: `git push origin feature/AmazingFeature`
  5. Open a Pull Request

### Rule Writing Guidelines

When contributing new rules, follow this template:

```markdown
---
description: Brief description of the rule set purpose
globs: **/*.ext, src/**/*.ext
---

# Technology Name Best Practices

## Section Title
- Specific, actionable guidance (avoid vague descriptions)
- Recommend specific tools, libraries, and commands
- Provide code examples and configuration references
```

## 📜 License

This project is licensed under [MIT](LICENSE) — free to use, modify, and distribute.

## ❤️ Acknowledgments

Thanks to all developers who contributed to this project!

---

<a name="chinese"></a>

## 📖 目录

- [核心优势](#-核心优势)
- [支持的技术栈](#-支持的技术栈)
- [快速开始](#-快速开始)
- [规则文件说明](#-规则文件说明)
- [最佳实践](#-最佳实践)
- [验证规则文件](#-验证规则文件)
- [常见问题](#-常见问题)
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

> **兼容性说明：** 这些规则兼容 Cursor 0.40.0 及以上版本。

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
# 1. 进入你的项目根目录
cd your-project

# 2. 将本仓库作为子模块添加到项目中
git submodule add https://github.com/LessUp/cursor-rules.git .cursor/cursor-rules

# 3. 创建规则目录并软链接所需的规则文件
mkdir -p .cursor/rules
cd .cursor/rules
ln -s ../cursor-rules/python.mdc python.mdc
ln -s ../cursor-rules/clean-code.mdc clean-code.mdc

# 4. 返回项目根目录并提交
# 后续同步更新
git submodule update --remote
```

### 方式三：通过 Cursor 设置导入

1. 打开 Cursor 编辑器
2. 进入 **Settings** → **Cursor Settings** → **Rules**
3. 点击 **Add Rule** → **Import**
4. 从本地文件系统选择 `.mdc` 文件，或者：
   - 点击 **Add Rule** 手动添加，并将 `.mdc` 文件内容粘贴到规则编辑器中
   - 为规则设置名称（例如"Python 最佳实践"）
   - 如未在文件中包含，请配置 glob 匹配模式
   - 点击 **Save** 保存

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
- 当前 validator 接受两种 `globs` 写法：
  - 不带整体引号的逗号分隔字符串：`**/*.py, src/**/*.py`
  - 带整体引号的逗号分隔字符串：`"**/*.c,**/*.cpp,Makefile"`

### 规则文件示例

以下是 [`python.mdc`](python.mdc) 的内容示例：

```markdown
---
description: 使用 Flask 和 SQLite 的现代软件开发的 Python 最佳实践和模式
globs: **/*.py, src/**/*.py, tests/**/*.py
---

# Python 最佳实践

## 项目结构
- 使用 `src/your_package_name/` 的 src 布局
- 将测试放在与 `src/` 并行的 `tests/` 目录中
- 将配置保存在 `config/` 中或作为环境变量

## 代码风格
- 遵循 Black 代码格式化
- 使用 isort 进行导入排序
- 最大行长为 88 个字符 (Black 默认)
```

## 🎯 最佳实践

### 选择规则
- 任何项目都建议先添加 **Clean Code** 和 **Code Quality** 规则
- 根据你的技术栈添加对应语言的规则
- 根据需要添加框架特定的规则

### 组合使用规则
- 合理组合规则效果更佳（例如 Flask 项目同时使用 Python + Flask 规则）
- 避免规则冲突（例如不要为同一种语言组合两种不同的风格指南）
- 通用规则（globs 为空）适用于所有文件，注意避免重叠

### 自定义规则
- Fork 本仓库以定制适合你团队的规则
- 修改 `.mdc` 文件添加团队特定的约定
- 所有自定义规则保持风格一致

## ✅ 验证规则文件

仓库内置了一个零依赖的 validator，用于检查根目录下 `.mdc` 规则文件的基本结构是否正确。

```bash
# 方式一：使用 npm（推荐）
npm test
# 或
npm run validate

# 方式二：直接使用 Node
node scripts/validate-rules.mjs
```

也可以只校验指定文件：

```bash
npm test -- python.mdc medusa.mdc
# 或
node scripts/validate-rules.mjs python.mdc medusa.mdc
```

validator 默认会检查：
- 文件是否以 `---` frontmatter 开始并正确结束
- 是否包含 `description` 和 `globs`
- `description` 是否为空
- 非空 `globs` 是否能解析为有效的逗号分隔条目
- frontmatter 后是否存在正文
- 正文中是否至少包含一个 H1 标题

validator 还会给出非阻塞 warning，例如：
- 首个 H1 之前出现正文内容
- 同一文件中存在多个 H1
- 出现未知 frontmatter 字段

## ❓ 常见问题

**Q: 应该将 `.mdc` 文件放在哪里？**

A: 放在项目根目录的 `.cursor/rules/` 文件夹中。Cursor 会自动检测并加载这些规则。

**Q: 可以针对同一种文件类型使用多个规则吗？**

A: 可以。所有匹配的规则都会被应用。你可以将通用规则（如 Clean Code）与语言特定规则组合使用。

**Q: 如何覆盖特定规则？**

A: 创建包含你偏好的自定义 `.mdc` 文件。当多个规则冲突时，Cursor 会使用最具体的匹配。

**Q: 添加规则后需要重启 Cursor 吗？**

A: 不需要，Cursor 会自动检测更改。极少数情况下可能需要重新加载窗口（Cmd/Ctrl + Shift + P → "Developer: Reload Window"）。

**Q: 可以贡献新规则吗？**

A: 当然可以！请参阅下方的[贡献指南](#-贡献指南)部分。

**Q: 这些规则与 Cursor 内置规则有何不同？**

A: 这些规则由社区维护，更加全面，并针对特定技术栈进行了优化，超越了 Cursor 的默认规则。

**Q: 需要什么版本的 Cursor？**

A: 建议使用 0.40.0 及以上版本以获得最佳兼容性。

## 🤝 贡献指南

在提交 Pull Request 前，建议先运行一次 validator，确保新增或修改的规则文件符合仓库约定。

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

**Like this project? Give us a [⭐️ Star](https://github.com/LessUp/cursor-rules/stargazers)!**

</div>
