---
name: verify
description: Validate all MDC rule files in the repository
---

TRIGGER when: 批量修改多个 .mdc 文件后，或需要快速确认仓库规则结构合法性时。

Run `npm test` to validate all `.mdc` files. Reports any frontmatter or structure issues.
