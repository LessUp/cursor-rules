# cursor-rules - 为 Cursor 定制的代码审查规则集

![GitHub stars](https://img.shields.io/github/stars/LessUp/cursor-rules?style=social)
![GitHub forks](https://img.shields.io/github/forks/LessUp/cursor-rules?style=social)
![License](https://img.shields.io/github/license/LessUp/cursor-rules)

**中文**

---

`cursor-rules` 是一个为 [Cursor](https://cursor.sh/) 编辑器量身打造的代码审查与编码规范规则集。我们旨在帮助开发者和团队统一代码风格、提升代码质量，从而更高效地进行协作开发。

如果您觉得这个项目对您有帮助，请给我们一个 ⭐️ Star，这是我们持续维护的最大动力！

## ✨ 核心优势

- **✍️ 统一规范**：遵循业界广泛认可的最佳实践，确保团队代码风格一致。
- **🚀 开箱即用**：只需简单配置，即可在您的 Cursor 编辑器中启用。
- **💡 智能审查**：利用 Cursor 的 AI 能力，实时获得代码改进建议。
- **🧩 高度可扩展**：轻松定制或添加新规则，以满足您团队的个性化需求。

## 🛠️ 支持的技术栈

我们目前支持以下语言和框架的规则集：

| 分类 | 技术栈 | 对应文件 |
| :--- | :--- | :--- |
| **编程语言** | Python, Java, Go, C#, Ruby, PHP, C++, TypeScript | `python.mdc`, `java.mdc`, `go.mdc`, `csharp-dotnet.mdc`, `ruby.mdc`, `php.mdc`, `cpp.mdc`, `typescript.mdc` |
| **后端框架** | Node.js/Express, Spring, FastAPI | `node-express.mdc`, `spring.mdc`, `fastapi.mdc` |
| **前端框架** | React, Vue, Svelte, Next.js, Tailwind CSS, Medusa | `react.mdc`, `vue.mdc`, `svelte.mdc`, `nextjs.mdc`, `tailwind.mdc`, `medusa.mdc` |
| **移动端** | Android, iOS, 微信小程序, NativeScript | `android.mdc`, `ios.mdc`, `wechat-miniprogram.mdc`, `nativescript.mdc` |
| **数据库** | Prisma, Supabase, 通用数据库设计 | `database.mdc` |
| **DevOps** | Docker | `docker.mdc` |
| **通用规范** | 整洁代码, 代码质量, Git Flow | `clean-code.mdc`, `codequality.mdc`, `gitflow.mdc` |

## 🚀 使用指南

### 方式一：直接复制到项目（推荐）

1. 在您的项目根目录下创建 `.cursor/rules/` 目录。
2. 将您需要的 `.mdc` 文件复制到该目录中。
3. Cursor 会自动识别并应用这些规则。

```bash
# 示例：将 Python 和 Clean Code 规则复制到项目中
mkdir -p .cursor/rules
cp python.mdc clean-code.mdc .cursor/rules/
```

### 方式二：通过 Cursor 设置导入

1. 打开 Cursor 编辑器。
2. 进入 `Settings` > `Cursor Settings` > `Rules`。
3. 点击 `Add Rule`，将 `.mdc` 文件的内容粘贴到规则编辑器中。

### 规则文件说明

每个 `.mdc` 文件包含两部分：

- **Frontmatter**（`---` 之间的内容）：定义规则的描述和适用的文件类型（`globs`）。
- **规则正文**：具体的编码规范和最佳实践指南。

当 `globs` 不为空时，规则仅在匹配的文件类型上生效；当 `globs` 为空时，规则作为通用规范全局生效。

## 📜 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 🤝 贡献指南

我们非常欢迎社区的贡献！您可以通过以下方式参与项目：

- **提交 Issue**：发现问题或有新想法？请在 [Issues](https://github.com/LessUp/cursor-rules/issues) 中告诉我们。
- **提交 Pull Request**：
  1.  Fork 本仓库。
  2.  创建您的特性分支 (`git checkout -b feature/AmazingFeature`)。
  3.  提交您的更改 (`git commit -m 'Add some AmazingFeature'`)。
  4.  推送到分支 (`git push origin feature/AmazingFeature`)。
  5.  打开一个 Pull Request。

### 编写新规则的规范

如果您想贡献新的规则文件，请遵循以下格式：

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

## ❤️ 致谢

感谢所有为这个项目做出贡献的开发者！

---

**喜欢这个项目吗？请给我们一个 [⭐️ Star](https://github.com/LessUp/cursor-rules/stargazers)！**
