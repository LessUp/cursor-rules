---
title: References
description: Research literature and technical reports supporting AI coding rule engineering design
---

# References

This page collects research papers, technical reports, and industry surveys related to `cursor-rules` design philosophy. These publications provide academic backing for the rationale of rule engineering.

---

## Part 1: Prompt Engineering Foundations

### [1] Brown et al. (2020) — Language Models are Few-Shot Learners

**Source**: *Advances in Neural Information Processing Systems 33*, OpenAI  
**Link**: [arxiv.org/abs/2005.14165](https://arxiv.org/abs/2005.14165)

The GPT-3 paper systematically demonstrated for the first time that in-context learning can significantly change model output behavior without fine-tuning. This is the theoretical foundation of "rule injection" — providing constraints in prompts to guide models to follow specific norms.

> "A few examples in the prompt can steer the model toward a desired behavior without gradient updates."

**Relation to Rule Engineering**: `.mdc` rule file injection is essentially an engineered application of in-context learning. Each AI interaction carries "few-shot examples" (rule conventions), guiding the model to generate code that conforms to project conventions.

**BibTeX**:
```bibtex
@inproceedings{brown2020language,
  title={Language models are few-shot learners},
  author={Brown, Tom and others},
  booktitle={Advances in Neural Information Processing Systems},
  volume={33},
  pages={1877--1901},
  year={2020}
}
```

---

### [2] Wei et al. (2022) — Chain-of-Thought Prompting Elicits Reasoning in Large Language Models

**Source**: *NeurIPS 2022*, Google Research  
**Link**: [arxiv.org/abs/2201.11903](https://arxiv.org/abs/2201.11903)

Research shows that providing clear reasoning steps (rather than just answer examples) to LLMs can significantly improve code generation quality.

**Relation to Rule Engineering**: The "principle + example" structure of rule content is more effective than pure "what to do" checklists. Adding "why" and "how" explanations in rule files can improve AI compliance rates.

**BibTeX**:
```bibtex
@inproceedings{wei2022chain,
  title={Chain-of-thought prompting elicits reasoning in large language models},
  author={Wei, Jason and others},
  booktitle={Advances in Neural Information Processing Systems},
  volume={35},
  pages={24824--24837},
  year={2022}
}
```

---

### [3] Liu et al. (2023) — Pre-train, Prompt, and Predict: A Systematic Survey of Prompting Methods in NLP

**Source**: *ACM Computing Surveys*, arXiv:2107.13586  
**Link**: [arxiv.org/abs/2107.13586](https://arxiv.org/abs/2107.13586)

A systematic survey of prompt engineering methods, covering hard prompt, soft prompt, instruction tuning and other technical routes.

**Relation to Rule Engineering**: `.mdc` rule files belong to the "hard prompt template" category — static, manually written instruction text. This survey provides a theoretical framework for understanding the advantages and disadvantages of this category.

---

## Part 2: AI-Assisted Coding

### [4] Copilot: GitHub Copilot Research Report (2022)

**Source**: GitHub / Microsoft Research  
**Link**: [github.blog](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity/)

GitHub's research report shows that developers using Copilot complete tasks 55% faster, but code quality and consistency decline when context is missing.

**Relation to Rule Engineering**: The report implicitly explains the importance of context quality for AI-assisted coding effectiveness. Rule files are an engineering means to systematically improve context quality.

---

### [5] Chen et al. (2021) — Evaluating Large Language Models Trained on Code (HumanEval)

**Source**: OpenAI  
**Link**: [arxiv.org/abs/2107.03374](https://arxiv.org/abs/2107.03374)

The Codex model (GitHub Copilot's foundation) paper, introducing the HumanEval benchmark. The paper analyzes the "specification following" problem in code generation — whether models can accurately understand and follow natural language specifications.

**Relation to Rule Engineering**: Rule files are a lightweight "specification" mechanism, providing project conventions to models in natural language form. HumanEval's analysis framework can be used to evaluate the effectiveness of rule compliance.

**BibTeX**:
```bibtex
@article{chen2021evaluating,
  title={Evaluating large language models trained on code},
  author={Chen, Mark and others},
  journal={arXiv preprint arXiv:2107.03374},
  year={2021}
}
```

---

### [6] Jiang et al. (2023) — Self-planning Code Generation with Large Language Models

**Source**: arXiv:2303.06689  
**Link**: [arxiv.org/abs/2303.06689](https://arxiv.org/abs/2303.06689)

Research on improving generation quality by letting LLMs plan before coding. Found that explicit structural constraints (like "design interface first, then implement details") can significantly improve code consistency.

**Relation to Rule Engineering**: Architecture conventions in rule files (like "define interfaces first", "use repository pattern") are essentially guiding the model's internal planning process.

---

## Part 3: Software Engineering & AI Alignment

### [7] Felten et al. (2023) — The Labor Market Impact of AI

**Source**: *Princeton University*, Princeton Policy Perspectives  
**Link**: [nber.org/papers/w31051](https://www.nber.org/papers/w31051)

Analysis of AI's impact on software engineering careers, finding that AI is most efficient at standardized tasks, while tasks requiring deep context understanding still need human guidance.

**Relation to Rule Engineering**: Providing precise project context (i.e., rules) to AI can convert more "context-dependent" tasks into "standardized tasks", expanding AI's effective usage scope.

---

### [8] Ouyang et al. (2022) — Training language models to follow instructions with human feedback (InstructGPT)

**Source**: *NeurIPS 2022*, OpenAI  
**Link**: [arxiv.org/abs/2203.02155](https://arxiv.org/abs/2203.02155)

RLHF (Reinforcement Learning from Human Feedback) paper, showing that human-annotated preference data can significantly improve model instruction-following quality.

**Relation to Rule Engineering**: Models trained with RLHF (ChatGPT, Claude, GPT-4) have significantly better instruction-following capabilities than base models, making the directive writing style of rule files more effective.

**BibTeX**:
```bibtex
@inproceedings{ouyang2022training,
  title={Training language models to follow instructions with human feedback},
  author={Ouyang, Long and others},
  booktitle={Advances in Neural Information Processing Systems},
  volume={35},
  pages={27730--27744},
  year={2022}
}
```

---

## Part 4: Technical Articles & Industry Insights

### [9] Simon Willison (2023) — Prompt Injection Attacks Against GPT-4

**Link**: [simonwillison.net](https://simonwillison.net/2023/Apr/14/prompt-injection/)

Discussion of prompt injection attacks — security issues where malicious input overrides system-level instructions.

**Relation to Rule Engineering**: Understanding the security boundaries of rule injection. User code comments or string literals can theoretically interfere with rule injection effectiveness, a limitation rule engineering needs to be aware of.

---

### [10] Andrej Karpathy (2015) — The Unreasonable Effectiveness of Recurrent Neural Networks

**Link**: [karpathy.github.io](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)

Although a 2015 article, its basic insight that "language models are statistical simulations of text" remains inspiring: model-generated code reflects the statistical properties of its training corpus.

**Relation to Rule Engineering**: Rule files, by introducing high-quality example text in prompts, effectively "guide" the model toward high-quality code distribution regions at inference time.

---

## Further Reading

The following resources are not directly cited but highly relevant:

- [Prompt Engineering Guide](https://www.promptingguide.ai/) — Systematic prompt engineering knowledge base
- [Anthropic's Prompt Engineering Documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Claude's official prompt engineering guide
- [OpenAI Cookbook](https://cookbook.openai.com/) — Practice-oriented LLM application examples
- [Continue.dev Documentation on Rules](https://docs.continue.dev/) — Continue.dev rule system practice documentation

---

## Export Citations

### BibTeX Format

```bibtex
@misc{cursor-rules,
  author = {LessUp},
  title = {Cursor Rules: A Curated .mdc Rule Library for AI-Assisted Coding},
  year = {2025},
  publisher = {GitHub},
  url = {https://github.com/LessUp/cursor-rules}
}

@inproceedings{brown2020language,
  title={Language models are few-shot learners},
  author={Brown, Tom and others},
  booktitle={Advances in Neural Information Processing Systems},
  volume={33},
  pages={1877--1901},
  year={2020}
}

@inproceedings{wei2022chain,
  title={Chain-of-thought prompting elicits reasoning in large language models},
  author={Wei, Jason and others},
  booktitle={Advances in Neural Information Processing Systems},
  volume={35},
  pages={24824--24837},
  year={2022}
}

@article{chen2021evaluating,
  title={Evaluating large language models trained on code},
  author={Chen, Mark and others},
  journal={arXiv preprint arXiv:2107.03374},
  year={2021}
}

@inproceedings{ouyang2022training,
  title={Training language models to follow instructions with human feedback},
  author={Ouyang, Long and others},
  booktitle={Advances in Neural Information Processing Systems},
  volume={35},
  pages={27730--27744},
  year={2022}
}
```

---

## Further Reading

- [Related Work](./related-work) — Horizontal comparison of existing tool approaches
- [Evolution](./evolution) — Future directions of rule engineering
