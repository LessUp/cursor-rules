# GitHub Pages 渐进优化实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保持现有架构稳定的前提下，从视觉体验、功能增强、性能与 SEO 三个方向渐进式优化 GitHub Pages。

**Architecture:** 纯 CSS/JS 增强，无框架引入。CSS 负责动画和视觉优化，JS 负责 URL 同步、键盘快捷键、卡片交互和复制功能。构建脚本扩展生成 sitemap。

**Tech Stack:** Vanilla JS, CSS, Node.js 构建脚本

---

## Task 1: CSS 卡片入场动画

**Files:**
- Modify: `docs/assets/site.css`

- [ ] **Step 1: 添加卡片入场动画 keyframes**

在 `docs/assets/site.css` 文件末尾添加：

```css
/* Card entrance animation */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rule-card {
  animation: fade-in-up 0.4s ease-out backwards;
}

/* Staggered animation for grid children */
.rule-card:nth-child(1) { animation-delay: 0.05s; }
.rule-card:nth-child(2) { animation-delay: 0.1s; }
.rule-card:nth-child(3) { animation-delay: 0.15s; }
.rule-card:nth-child(4) { animation-delay: 0.2s; }
.rule-card:nth-child(5) { animation-delay: 0.25s; }
.rule-card:nth-child(6) { animation-delay: 0.3s; }
.rule-card:nth-child(7) { animation-delay: 0.35s; }
.rule-card:nth-child(8) { animation-delay: 0.4s; }
.rule-card:nth-child(n+9) { animation-delay: 0.45s; }

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .rule-card {
    animation: none;
  }
}
```

- [ ] **Step 2: 验证动画效果**

打开 `docs/index.html` 在浏览器中预览，确认卡片入场动画流畅。

---

## Task 2: 暗色模式过渡优化

**Files:**
- Modify: `docs/assets/site.css`

- [ ] **Step 1: 添加过渡效果**

在 `docs/assets/site.css` 的 `:root` 选择器中添加 transition：

```css
:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-muted: #eef2ff;
  --text: #0f172a;
  --text-soft: #475569;
  --border: #dbe4ff;
  --accent: #4f46e5;
  --accent-soft: #e0e7ff;
  --accent-strong: #312e81;
  --success: #059669;
  --shadow: 0 18px 45px rgb(15 23 42 / 0.08);
  --radius-xl: 24px;
  --radius-lg: 18px;
  --radius-md: 14px;
}

/* Add after :root definition */
body,
.hero-shell,
.panel,
.grid-shell,
.rule-card,
.stat-card {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}
```

- [ ] **Step 2: 优化暗色模式对比度**

更新 `@media (prefers-color-scheme: dark)` 中的 `:root` 变量：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --surface: #1e293b;
    --surface-muted: #334155;
    --text: #f1f5f9;
    --text-soft: #94a3b8;
    --border: #475569;
    --accent: #818cf8;
    --accent-soft: #312e81;
    --accent-strong: #c7d2fe;
    --shadow: 0 18px 45px rgb(0 0 0 / 0.3);
  }
}
```

主要改动：`--border` 从 `#334155` 改为 `#475569` 提高对比度。

---

## Task 3: 骨架屏加载状态

**Files:**
- Modify: `docs/assets/site.css`
- Modify: `docs/assets/site.js`

- [ ] **Step 1: 添加骨架屏样式**

在 `docs/assets/site.css` 的 `.loading-skeleton` 后添加：

```css
/* Skeleton card styles */
.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 280px;
  padding: 22px;
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
}

.skeleton-line {
  border-radius: 8px;
  background: linear-gradient(90deg, var(--surface-muted) 25%, var(--surface) 50%, var(--surface-muted) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-line.short { width: 40%; height: 12px; }
.skeleton-line.medium { width: 70%; height: 14px; }
.skeleton-line.long { width: 100%; height: 14px; }
.skeleton-line.pill { width: 80px; height: 32px; border-radius: 999px; }
```

- [ ] **Step 2: 添加骨架屏渲染函数**

在 `docs/assets/site.js` 的 `renderGrid` 函数前添加：

```javascript
function renderSkeletons(count = 6) {
  return Array.from({ length: count }, () => `
    <article class="skeleton-card">
      <div class="skeleton-line short"></div>
      <div class="skeleton-line medium"></div>
      <div class="skeleton-line long"></div>
      <div class="skeleton-line long"></div>
      <div style="display: flex; gap: 8px; margin-top: auto;">
        <div class="skeleton-line pill"></div>
        <div class="skeleton-line pill"></div>
      </div>
    </article>
  `).join('');
}

function renderLoading() {
  const grid = document.querySelector('#rule-grid');
  grid.innerHTML = `
    <section class="grid-shell">
      <div class="grid">
        ${renderSkeletons(6)}
      </div>
    </section>
  `;
}
```

- [ ] **Step 3: 在 init 函数中使用骨架屏**

修改 `init` 函数：

```javascript
async function init() {
  renderLoading();
  await loadRules();
  render();
}
```

---

## Task 4: 搜索清除按钮和 debounce

**Files:**
- Modify: `docs/assets/site.css`
- Modify: `docs/assets/site.js`

- [ ] **Step 1: 添加清除按钮样式**

在 `docs/assets/site.css` 的 `.search-input` 后添加：

```css
.search-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  min-height: 50px;
  padding: 0 44px 0 18px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: #fff;
  font: inherit;
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: var(--surface-muted);
  color: var(--text-soft);
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 1;
}

.search-clear.visible {
  display: flex;
}

.search-clear:hover {
  background: var(--accent-soft);
  color: var(--accent);
}
```

- [ ] **Step 2: 添加 debounce 工具函数**

在 `docs/assets/site.js` 顶部添加：

```javascript
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
```

- [ ] **Step 3: 更新 renderFilters 添加清除按钮**

修改 `renderFilters` 函数中的搜索输入部分：

```javascript
function renderFilters() {
  const labels = t();
  const counts = categoryCounts();
  const filters = document.querySelector('#filters');

  filters.innerHTML = `
    <section class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${escapeHtml(labels.filtersTitle)}</p>
          <h2>${escapeHtml(labels.filtersDescription)}</h2>
        </div>
        <div class="status-pill">${escapeHtml(labels.results)}: ${filteredRules().length}</div>
      </div>
      <div class="toolbar">
        <div class="search-wrapper">
          <input
            id="search-input"
            class="search-input"
            type="search"
            value="${escapeHtml(state.query)}"
            placeholder="${escapeHtml(labels.searchPlaceholder)}"
            aria-label="${escapeHtml(labels.searchPlaceholder)}"
          >
          <button
            id="search-clear"
            class="search-clear ${state.query ? 'visible' : ''}"
            type="button"
            aria-label="Clear search"
          >×</button>
        </div>
        <div class="chip-row">
          ${CATEGORY_ORDER.map((category) => `
            <button
              class="chip-button ${state.category === category ? 'active' : ''}"
              data-category="${category}"
              type="button"
            >
              ${escapeHtml(categoryLabel(category))} <span>${counts.get(category) ?? 0}</span>
            </button>
          `).join('')}
        </div>
      </div>
      ${state.copyMessage ? `<p class="copy-status">${escapeHtml(state.copyMessage)}</p>` : ''}
    </section>
  `;
}
```

- [ ] **Step 4: 更新事件监听添加清除和 debounce**

在 `document.addEventListener('input', ...)` 处修改：

```javascript
const debouncedSearch = debounce((value) => {
  state.query = value;
  syncUrl();
  renderFilters();
  renderGrid();
}, 150);

document.addEventListener('input', (event) => {
  if (event.target.id === 'search-input') {
    const clearBtn = document.querySelector('#search-clear');
    if (clearBtn) {
      clearBtn.classList.toggle('visible', event.target.value.length > 0);
    }
    debouncedSearch(event.target.value);
  }
});

document.addEventListener('click', (event) => {
  // ... existing click handlers ...

  // Add clear button handler
  if (event.target.id === 'search-clear') {
    state.query = '';
    const input = document.querySelector('#search-input');
    if (input) input.value = '';
    syncUrl();
    renderFilters();
    renderGrid();
  }
});
```

---

## Task 5: URL 状态同步

**Files:**
- Modify: `docs/assets/site.js`

- [ ] **Step 1: 添加 URL 同步函数**

在 `docs/assets/site.js` 的 state 定义后添加：

```javascript
function syncUrl() {
  const params = new URLSearchParams();

  if (state.query) params.set('q', state.query);
  if (state.category !== 'all') params.set('cat', state.category);
  if (state.language !== 'zh') params.set('lang', state.language);

  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.replaceState({}, '', newUrl);
}

function restoreFromUrl() {
  const params = new URLSearchParams(window.location.search);

  state.query = params.get('q') ?? '';
  state.category = params.get('cat') ?? 'all';
  state.language = params.get('lang') ?? 'zh';
}
```

- [ ] **Step 2: 在状态变更时调用 syncUrl**

在语言切换和分类切换的 click handler 中添加 `syncUrl()` 调用：

```javascript
document.addEventListener('click', async (event) => {
  const langButton = event.target.closest('[data-lang]');
  if (langButton) {
    state.language = langButton.dataset.lang;
    state.copyMessage = '';
    syncUrl();
    render();
    return;
  }

  const categoryButton = event.target.closest('[data-category]');
  if (categoryButton) {
    state.category = categoryButton.dataset.category;
    state.copyMessage = '';
    syncUrl();
    render();
    return;
  }

  // ... rest of handlers
});
```

- [ ] **Step 3: 在 init 中恢复 URL 状态**

修改 `init` 函数：

```javascript
async function init() {
  restoreFromUrl();
  renderLoading();
  await loadRules();
  render();
}
```

---

## Task 6: 卡片展开/收起功能

**Files:**
- Modify: `docs/assets/site.css`
- Modify: `docs/assets/site.js`

- [ ] **Step 1: 添加卡片展开样式**

在 `docs/assets/site.css` 中添加：

```css
/* Card expand/collapse */
.rule-card {
  cursor: pointer;
}

.rule-card.expanded {
  grid-column: span 2;
}

.rule-card .rule-full-content {
  display: none;
}

.rule-card.expanded .rule-full-content {
  display: block;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.rule-card .rule-truncated {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rule-card.expanded .rule-truncated {
  display: block;
  -webkit-line-clamp: unset;
}

.expand-hint {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 8px;
}

@media (max-width: 720px) {
  .rule-card.expanded {
    grid-column: span 1;
  }
}
```

- [ ] **Step 2: 添加展开状态到 state**

修改 state 对象：

```javascript
const state = {
  language: 'zh',
  query: '',
  category: 'all',
  rules: [],
  copyMessage: '',
  expandedSlug: null,
};
```

- [ ] **Step 3: 更新 renderRule 函数**

```javascript
function renderRule(rule) {
  const labels = t();
  const isExpanded = state.expandedSlug === rule.slug;
  const globs = rule.globs.length
    ? rule.globs.map((glob) => `<code>${escapeHtml(glob)}</code>`).join('')
    : `<span class="scope-global">${escapeHtml(labels.globalLabel)}</span>`;

  return `
    <article class="rule-card ${isExpanded ? 'expanded' : ''}" data-slug="${escapeHtml(rule.slug)}">
      <div class="rule-card-head">
        <div>
          <p class="eyebrow">${escapeHtml(categoryLabel(rule.category))}</p>
          <h3>${escapeHtml(rule.title)}</h3>
        </div>
        <span class="file-pill">${escapeHtml(rule.fileName)}</span>
      </div>
      <p class="rule-description rule-truncated">${escapeHtml(rule.description)}</p>
      <div class="rule-full-content">
        <dl class="rule-meta">
          <div>
            <dt>${escapeHtml(labels.fileLabel)}</dt>
            <dd><code>${escapeHtml(rule.fileName)}</code></dd>
          </div>
          <div>
            <dt>${escapeHtml(labels.globLabel)}</dt>
            <dd class="scope-list">${globs}</dd>
          </div>
        </dl>
      </div>
      <p class="expand-hint">${isExpanded ? '点击收起' : '点击展开详情'}</p>
      <div class="rule-actions" onclick="event.stopPropagation()">
        <button class="secondary-link button-reset" type="button" data-copy-file="${escapeHtml(rule.fileName)}">${escapeHtml(labels.installSnippet)}</button>
        <button class="secondary-link button-reset" type="button" data-copy-content="${escapeHtml(rule.fileName)}">复制规则内容</button>
        <a class="secondary-link" href="https://github.com/LessUp/cursor-rules/blob/master/${encodeURIComponent(rule.fileName)}" target="_blank" rel="noopener">${escapeHtml(labels.openOnGithub)}</a>
      </div>
    </article>
  `;
}
```

- [ ] **Step 4: 添加卡片点击展开处理**

在 click handler 中添加：

```javascript
document.addEventListener('click', async (event) => {
  // ... existing handlers ...

  // Card expand/collapse
  const ruleCard = event.target.closest('.rule-card');
  if (ruleCard && !event.target.closest('.rule-actions')) {
    const slug = ruleCard.dataset.slug;
    state.expandedSlug = state.expandedSlug === slug ? null : slug;
    renderGrid();
    return;
  }

  // ... rest of handlers
});
```

---

## Task 7: 复制规则内容功能

**Files:**
- Modify: `docs/assets/site.js`

- [ ] **Step 1: 添加复制内容函数**

在 `copyText` 函数后添加：

```javascript
const RAW_BASE_URL = 'https://raw.githubusercontent.com/LessUp/cursor-rules/master/';

async function copyRuleContent(fileName) {
  try {
    const response = await fetch(RAW_BASE_URL + fileName);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const content = await response.text();
    await copyText(content);
    return true;
  } catch (error) {
    console.error('Failed to copy rule content:', error);
    return false;
  }
}
```

- [ ] **Step 2: 添加复制内容按钮处理**

在 click handler 中添加：

```javascript
document.addEventListener('click', async (event) => {
  // ... existing handlers ...

  const copyContentButton = event.target.closest('[data-copy-content]');
  if (copyContentButton) {
    const fileName = copyContentButton.dataset.copyContent;
    const success = await copyRuleContent(fileName);
    if (success) {
      state.copyMessage = `规则内容已复制: ${fileName}`;
    } else {
      state.copyMessage = `复制失败，请稍后重试`;
    }
    renderFilters();
  }

  // ... rest of handlers
});
```

---

## Task 8: 键盘快捷键

**Files:**
- Modify: `docs/assets/site.css`
- Modify: `docs/assets/site.js`

- [ ] **Step 1: 添加快捷键提示样式**

在 `docs/assets/site.css` 中添加：

```css
/* Keyboard shortcut hint */
.shortcut-hint {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  font-size: 0.85rem;
  color: var(--text-soft);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  pointer-events: none;
  z-index: 100;
}

.shortcut-hint.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.shortcut-key {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--surface-muted);
  font-family: monospace;
  font-weight: 600;
  margin: 0 2px;
}
```

- [ ] **Step 2: 添加快捷键提示 HTML**

在 `renderHero` 函数末尾添加快捷键提示元素：

```javascript
function renderHero() {
  // ... existing code ...

  hero.innerHTML = `
    <header class="hero-shell">
      <!-- ... existing content ... -->
    </header>
    <div class="shortcut-hint" id="shortcut-hint">
      <span class="shortcut-key">/</span> 搜索
      <span class="shortcut-key">Esc</span> 清空
      <span class="shortcut-key">1-8</span> 切换分类
    </div>
  `;
}
```

- [ ] **Step 3: 添加键盘事件监听**

在 `init` 函数末尾添加：

```javascript
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (event) => {
    // Ignore if typing in input
    if (event.target.tagName === 'INPUT' && event.key !== 'Escape') {
      return;
    }

    // / to focus search
    if (event.key === '/') {
      event.preventDefault();
      const input = document.querySelector('#search-input');
      if (input) input.focus();
      return;
    }

    // Escape to clear search
    if (event.key === 'Escape') {
      state.query = '';
      state.expandedSlug = null;
      const input = document.querySelector('#search-input');
      if (input) input.value = '';
      syncUrl();
      render();
      return;
    }

    // 1-8 to switch category
    const num = parseInt(event.key, 10);
    if (num >= 1 && num <= 8) {
      const category = CATEGORY_ORDER[num - 1];
      if (category) {
        state.category = category;
        syncUrl();
        render();
      }
    }
  });

  // Show shortcut hint on first visit
  const hasSeenHint = sessionStorage.getItem('seen-shortcut-hint');
  if (!hasSeenHint) {
    const hint = document.querySelector('#shortcut-hint');
    if (hint) {
      hint.classList.add('visible');
      setTimeout(() => {
        hint.classList.remove('visible');
      }, 5000);
      sessionStorage.setItem('seen-shortcut-hint', 'true');
    }
  }
}
```

- [ ] **Step 4: 在 init 中调用快捷键设置**

```javascript
async function init() {
  restoreFromUrl();
  renderLoading();
  await loadRules();
  render();
  setupKeyboardShortcuts();
}
```

---

## Task 9: SEO 和预加载优化

**Files:**
- Modify: `docs/index.html`
- Modify: `scripts/build-rule-catalog.mjs`

- [ ] **Step 1: 完善 HTML meta 标签**

在 `docs/index.html` 的 `<head>` 中添加：

```html
<!-- SEO -->
<meta name="robots" content="index, follow">

<!-- Preconnect for raw content -->
<link rel="preconnect" href="https://raw.githubusercontent.com" crossorigin>
```

- [ ] **Step 2: 添加 sitemap 生成函数**

在 `scripts/build-rule-catalog.mjs` 中修改：

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { buildCatalog } from './lib/rule-catalog.mjs';

const rootDir = process.cwd();
const outputPath = path.join(rootDir, 'docs/assets/rules.json');
const sitemapPath = path.join(rootDir, 'docs/sitemap.xml');
const baseUrl = 'https://lessup.github.io/cursor-rules/';

const catalog = await buildCatalog(rootDir);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

console.log(`Wrote ${path.relative(rootDir, outputPath)} (${catalog.length} rules)`);

// Generate sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${catalog.map(rule => `  <url>
    <loc>${baseUrl}?q=${encodeURIComponent(rule.title)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>
`;

await fs.writeFile(sitemapPath, sitemap);
console.log(`Wrote ${path.relative(rootDir, sitemapPath)}`);
```

---

## Task 10: 验证和提交

**Files:**
- 无新文件

- [ ] **Step 1: 运行测试**

```bash
npm test
```

预期：所有测试通过。

- [ ] **Step 2: 重新构建目录**

```bash
npm run build:catalog
```

预期：生成 `docs/assets/rules.json` 和 `docs/sitemap.xml`。

- [ ] **Step 3: 提交所有改动**

```bash
git add docs/assets/site.css docs/assets/site.js docs/index.html docs/sitemap.xml scripts/build-rule-catalog.mjs
git commit -m "$(cat <<'EOF'
feat: enhance GitHub Pages with animations, URL sync, and keyboard shortcuts

- Add staggered card entrance animations with reduced-motion support
- Optimize dark mode transitions and contrast
- Add skeleton loading state
- Add search clear button with debounce
- Add URL state sync for query, category, and language
- Add card expand/collapse functionality
- Add copy rule content button
- Add keyboard shortcuts (/, Esc, 1-8)
- Add SEO meta tags and sitemap generation
EOF
)"
```

---

## 验收清单

- [ ] 卡片入场动画流畅，尊重 reduced-motion 设置
- [ ] URL 状态同步正常，分享链接可还原状态
- [ ] 键盘快捷键正常工作
- [ ] 复制规则内容功能正常
- [ ] 暗色模式过渡自然
- [ ] 骨架屏加载体验流畅
- [ ] `npm test` 通过
- [ ] `npm run build:catalog` 通过
