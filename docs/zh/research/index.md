---
title: 研究与参考
description: 将 Cursor Rules 放入更广阔的规则工程语境——相关工作、学术引用与演进思考
---

# 研究与参考

本章节将 Cursor Rules 放入更广阔的规则工程语境：与同类方案的比较、支撑设计的研究文献、以及未来的演进方向。

## 内容概览

### [相关工作](./related-work)

AI 编码助手的"规则注入"机制在各工具间实现方式各有差异。我们对比了主流方案：

| 方案 | 文件格式 | 精准作用域 | 团队共享 |
|------|---------|-----------|---------|
| **cursor-rules**（.mdc） | `.mdc` | ✅ glob 匹配 | ✅ Git 提交 |
| `.cursorrules`（单文件） | 无结构纯文本 | ❌ 全局生效 | ✅ Git 提交 |
| GitHub Copilot Instructions | `.github/copilot-instructions.md` | ❌ 全局生效 | ✅ Git 提交 |

### [参考文献](./references)

收录与 AI 编码规则工程设计相关的研究论文、技术报告和行业调查，为规则工程的合理性提供学术背书。

涵盖领域：
- Prompt 工程基础（Few-Shot Learning, Chain-of-Thought）
- AI 辅助编码（Copilot 研究, Codex 论文）
- 软件工程与 AI 对齐（RLHF, Prompt Injection）

### [演进思考](./evolution)

讨论从规则库到治理体系的未来路线：

- **短期**：更完善的验证机制、规则有效性度量
- **中期**：跨工具兼容性、社区贡献机制
- **长期**：规则工程的标准化、AI 行为的可预测性

## 阅读建议

| 读者类型 | 建议路径 |
|---------|---------|
| 面试官 / 架构评审 | 相关工作 → 参考文献 |
| 准备接入的团队 | 相关工作 → 演进思考 |
| 学术研究者 | 参考文献 → 相关工作 |
| 项目维护者 | 演进思考 → 相关工作 |

## 引用本项目

如果您在研究或项目中引用 Cursor Rules，请使用以下格式：

**BibTeX**:
```bibtex
@misc{cursor-rules,
  author = {LessUp},
  title = {Cursor Rules: A Curated .mdc Rule Library for AI-Assisted Coding},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/LessUp/cursor-rules}
}
```

**APA**:
> LessUp. (2025). *Cursor Rules: A Curated .mdc Rule Library for AI-Assisted Coding*. GitHub. https://github.com/LessUp/cursor-rules
