---
title: System Architecture Overview
description: The layered architecture behind Cursor Rules.
---

# System Architecture Overview

Cursor Rules separates the system into source rules, validation and generation scripts, and the public VitePress site. This keeps the root-level `.mdc` files as the source of truth while allowing the site to function as an explanatory surface.

## Layers

1. Root-level `.mdc` rules
2. Validation and catalog generation scripts
3. VitePress pages, catalog runtime, and GitHub Pages deployment
