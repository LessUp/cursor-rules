/**
 * Cursor Rules Catalog - Vanilla JavaScript
 * 实现: 数据加载、搜索、筛选、渲染、复制、键盘快捷键
 */

(function() {
  'use strict';

  // === 配置 ===
  const REPO_URL = 'https://github.com/LessUp/cursor-rules';
  const RAW_URL = 'https://raw.githubusercontent.com/LessUp/cursor-rules/master';
  const SITE_BASE = resolveBase();

  // === 文本 ===
  const TEXTS = {
    installSnippet: '复制接入命令',
    copyContent: '复制规则内容',
    openOnGithub: '在 GitHub 中打开',
    globalLabel: '全局规则',
    fileLabel: '文件',
    globLabel: '适用范围',
    expandHint: '点击展开详情',
    collapseHint: '点击收起',
    copiedInstall: '已复制接入命令',
    copiedRule: '规则内容已复制',
    copyFailed: '复制失败，请稍后重试',
  };

  // === 状态 ===
  let rules = [];
  let categories = {};
  let query = '';
  let activeCategory = 'all';
  let expandedSlug = null;
  let categoryOrder = [];

  // === DOM 元素 ===
  let searchInput, searchClear, chipRow, resultCount, copyStatus;
  let skeletonGrid, ruleGrid, ruleCards, emptyState;
  let statRules, statCategories, statGlobal;
  let catalogSection;
  let loadPromise = null;
  let hasLoadedData = false;
  let activeShell = null;
  let globalEventsBound = false;
  let shellObserverStarted = false;
  const boundNodes = new WeakSet();

  // === 初始化 ===
  function init() {
    refreshDomRefs();
    ensureCatalogRuntime();
    startShellObserver();
  }

  function refreshDomRefs() {
    searchInput = document.getElementById('search-input');
    searchClear = document.getElementById('search-clear');
    chipRow = document.getElementById('chip-row');
    resultCount = document.getElementById('result-count');
    copyStatus = document.getElementById('copy-status');
    skeletonGrid = document.getElementById('skeleton-grid');
    ruleGrid = document.getElementById('rule-grid');
    ruleCards = document.getElementById('rule-cards');
    emptyState = document.getElementById('empty-state');
    statRules = document.getElementById('stat-rules');
    statCategories = document.getElementById('stat-categories');
    statGlobal = document.getElementById('stat-global');
    catalogSection = document.getElementById('catalog');
  }

  function ensureCatalogRuntime() {
    refreshDomRefs();

    if (!hasCatalogShell()) {
      activeShell = null;
      return;
    }

    bindCatalogTriggers();

    const nextShell = catalogSection || ruleCards;
    if (activeShell === nextShell) return;

    activeShell = nextShell;
    restoreStateFromUrl();
    bindEvents();

    if (hasLoadedData) {
      renderLoadedShell();
      return;
    }

    loadData();
  }

  function hasCatalogShell() {
    return Boolean(searchInput && ruleCards);
  }

  function restoreStateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    query = params.get('q') || '';
    activeCategory = params.get('cat') || 'all';

    if (searchInput) searchInput.value = query;
    if (searchClear) searchClear.style.display = query ? 'flex' : 'none';
  }

  // === 数据加载 ===
  async function loadData() {
    if (loadPromise) return loadPromise;

    loadPromise = (async () => {
      try {
        const base = getBase();
        const [rulesRes, catsRes] = await Promise.all([
          fetch(`${base}assets/rules.json`, { cache: 'no-store' }),
          fetch(`${base}assets/categories.json`, { cache: 'no-store' }),
        ]);

        if (rulesRes.ok) rules = await rulesRes.json();
        if (catsRes.ok) categories = await catsRes.json();

        hasLoadedData = true;
        renderLoadedShell();
      } catch (e) {
        loadPromise = null;
        console.error('Failed to load data:', e);
      } finally {
        if (skeletonGrid) skeletonGrid.style.display = 'none';
      }
    })();

    return loadPromise;
  }

  function renderLoadedShell() {
    if (!hasCatalogShell()) return;

    computeCategoryOrder();
    updateStats();
    renderChips();
    render();
    if (skeletonGrid) skeletonGrid.style.display = 'none';
  }

  function normalizeBase(base) {
    if (!base || base === '/') return '/';
    return base.endsWith('/') ? base : `${base}/`;
  }

  function resolveBase() {
    const scriptSrc = document.currentScript?.src;
    if (scriptSrc) {
      return normalizeBase(new URL('../', new URL(scriptSrc, window.location.href)).pathname);
    }
    return '/';
  }

  function getBase() {
    return SITE_BASE;
  }

  // === 分类顺序 ===
  function computeCategoryOrder() {
    const orderMap = { all: 0 };
    for (const [key, value] of Object.entries(categories)) {
      orderMap[key] = value.order;
    }
    const set = new Set(rules.map(r => r.category));
    set.add('all');
    categoryOrder = [...set].sort((a, b) => (orderMap[a] ?? 99) - (orderMap[b] ?? 99));
  }

  // === 统计更新 ===
  function updateStats() {
    const globalCount = rules.filter(r => !r.globs || r.globs.length === 0).length;
    if (statRules) statRules.textContent = rules.length;
    if (statCategories) statCategories.textContent = categoryOrder.length - 1;
    if (statGlobal) statGlobal.textContent = globalCount;
  }

  // === 分类按钮渲染 ===
  function renderChips() {
    if (!chipRow) return;

    const counts = getCategoryCounts();
    chipRow.innerHTML = '';

    categoryOrder.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.className = 'chip-button' + (cat === activeCategory ? ' active' : '');
      btn.dataset.category = cat;
      btn.innerHTML = `${categoryLabel(cat)} <span>${counts[cat] || 0}</span>`;
      btn.addEventListener('click', () => setCategory(cat));
      chipRow.appendChild(btn);
    });
  }

  function getCategoryCounts() {
    const counts = { all: rules.length };
    for (const rule of rules) {
      counts[rule.category] = (counts[rule.category] || 0) + 1;
    }
    return counts;
  }

  function categoryLabel(cat) {
    if (cat === 'all') return '全部';
    return categories[cat]?.label || cat;
  }

  // === 搜索和筛选 ===
  function getFilteredRules() {
    const q = query.toLowerCase();
    return rules.filter(rule => {
      const matchesCategory = activeCategory === 'all' || rule.category === activeCategory;
      const haystack = `${rule.title} ${rule.description} ${rule.fileName}`.toLowerCase();
      const matchesQuery = haystack.includes(q);
      return matchesCategory && matchesQuery;
    });
  }

  function setCategory(cat) {
    activeCategory = cat;
    expandedSlug = null;
    renderChips();
    render();
    syncUrl();
    hideCopyStatus();
  }

  function setSearch(val) {
    query = val;
    expandedSlug = null;
    render();
    syncUrl();
    hideCopyStatus();

    // 更新清除按钮显示
    if (searchClear) searchClear.style.display = val ? 'flex' : 'none';
  }

  function clearSearch() {
    query = '';
    expandedSlug = null;
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    render();
    syncUrl();
    hideCopyStatus();
  }

  // === URL 同步 ===
  function syncUrl() {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (activeCategory !== 'all') params.set('cat', activeCategory);
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  // === 渲染 ===
  function render() {
    const filtered = getFilteredRules();

    // 更新结果计数
    if (resultCount) resultCount.textContent = filtered.length;

    // 显示/隐藏空状态
    if (emptyState) emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
    if (ruleGrid) ruleGrid.style.display = filtered.length === 0 ? 'none' : 'block';

    // 渲染规则卡片
    if (ruleCards) {
      ruleCards.innerHTML = filtered.map(rule => renderRuleCard(rule)).join('');

      // 绑定卡片事件
      ruleCards.querySelectorAll('.rule-card').forEach(card => {
        const slug = card.dataset.slug;

        // 点击展开/收起
        card.addEventListener('click', () => toggleExpand(slug));

        // 复制按钮
        card.querySelector('.btn-install')?.addEventListener('click', (e) => {
          e.stopPropagation();
          copyInstall(card.dataset.filename);
        });

        card.querySelector('.btn-content')?.addEventListener('click', (e) => {
          e.stopPropagation();
          copyContent(card.dataset.filename);
        });
      });
    }
  }

  function renderRuleCard(rule) {
    const isExpanded = expandedSlug === rule.slug;
    const globs = rule.globs || [];

    return `
      <article class="rule-card${isExpanded ? ' expanded' : ''}" data-slug="${rule.slug}" data-filename="${rule.fileName}">
        <div class="rule-card-head">
          <div>
            <p class="eyebrow">${categoryLabel(rule.category)}</p>
            <h3>${escapeHtml(rule.title)}</h3>
          </div>
          <span class="file-pill">${escapeHtml(rule.fileName)}</span>
        </div>
        <p class="rule-description rule-truncated">${escapeHtml(rule.description)}</p>
        <div class="rule-full-content">
          <dl class="rule-meta">
            <div>
              <dt>${TEXTS.fileLabel}</dt>
              <dd><code>${escapeHtml(rule.fileName)}</code></dd>
            </div>
            <div>
              <dt>${TEXTS.globLabel}</dt>
              <dd class="scope-list">
                ${globs.length > 0
                  ? globs.map(g => `<code>${escapeHtml(g)}</code>`).join('')
                  : `<span class="scope-global">${TEXTS.globalLabel}</span>`
                }
              </dd>
            </div>
          </dl>
        </div>
        <p class="expand-hint">${isExpanded ? TEXTS.collapseHint : TEXTS.expandHint}</p>
        <div class="rule-actions">
          <button class="secondary-link button-reset btn-install">${TEXTS.installSnippet}</button>
          <button class="secondary-link button-reset btn-content">${TEXTS.copyContent}</button>
          <a class="secondary-link" href="${REPO_URL}/blob/master/${encodeURIComponent(rule.fileName)}" target="_blank" rel="noopener">${TEXTS.openOnGithub}</a>
        </div>
      </article>
    `;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function toggleExpand(slug) {
    expandedSlug = expandedSlug === slug ? null : slug;
    render();
  }

  // === 复制功能 ===
  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:absolute;left:-9999px;';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  async function copyInstall(fileName) {
    try {
      const cmd = `mkdir -p .cursor/rules\ncp path/to/cursor-rules/${fileName} .cursor/rules/`;
      await copyText(cmd);
      showCopyStatus(`${TEXTS.copiedInstall}: ${fileName}`);
    } catch (e) {
      showCopyStatus(TEXTS.copyFailed);
    }
  }

  async function copyContent(fileName) {
    try {
      const res = await fetch(`${RAW_URL}/${fileName}`);
      if (!res.ok) throw new Error(res.status);
      const content = await res.text();
      await copyText(content);
      showCopyStatus(`${TEXTS.copiedRule}: ${fileName}`);
    } catch (e) {
      showCopyStatus(TEXTS.copyFailed);
    }
  }

  function showCopyStatus(msg) {
    if (copyStatus) {
      copyStatus.textContent = msg;
      copyStatus.style.display = 'block';
      setTimeout(hideCopyStatus, 2000);
    }
  }

  function hideCopyStatus() {
    if (copyStatus) copyStatus.style.display = 'none';
  }

  // === 事件绑定 ===
  function bindEvents() {
    if (searchInput && !boundNodes.has(searchInput)) {
      searchInput.addEventListener('input', (e) => {
        setSearch(e.target.value);
      });
      boundNodes.add(searchInput);
    }

    if (searchClear && !boundNodes.has(searchClear)) {
      searchClear.addEventListener('click', clearSearch);
      boundNodes.add(searchClear);
    }

    if (!globalEventsBound) {
      document.addEventListener('keydown', onKeydown);
      globalEventsBound = true;
    }

    bindCatalogTriggers();
  }

  function bindCatalogTriggers() {
    const triggers = document.querySelectorAll?.('[data-catalog-trigger]') ?? [];
    triggers.forEach((trigger) => {
      if (boundNodes.has(trigger)) return;
      trigger.addEventListener('click', onCatalogTriggerClick);
      boundNodes.add(trigger);
    });
  }

  function onCatalogTriggerClick(e) {
    const href = e.currentTarget?.getAttribute('href');
    if (!href) return;

    const targetUrl = new URL(href, window.location.href);
    const currentUrl = new URL(window.location.href);
    const isSamePage = targetUrl.pathname === currentUrl.pathname;
    const targetsCatalog = targetUrl.hash === '#catalog'
      || targetUrl.searchParams.has('cat')
      || targetUrl.searchParams.has('q');

    if (!isSamePage || !targetsCatalog) return;

    e.preventDefault();
    applyCatalogTrigger(targetUrl, e.currentTarget);
  }

  function applyCatalogTrigger(targetUrl, trigger) {
    if (targetUrl.searchParams.has('q')) {
      query = targetUrl.searchParams.get('q') || '';
      if (searchInput) searchInput.value = query;
      if (searchClear) searchClear.style.display = query ? 'flex' : 'none';
    }

    const nextCategory = targetUrl.searchParams.get('cat') || trigger?.dataset?.catalogCategory;
    if (nextCategory) activeCategory = nextCategory;

    expandedSlug = null;
    renderChips();
    render();
    syncUrl();
    hideCopyStatus();
    focusCatalog();
  }

  function focusCatalog() {
    catalogSection?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    if (!searchInput?.focus) return;
    try {
      searchInput.focus({ preventScroll: true });
    } catch {
      searchInput.focus();
    }
  }

  function onKeydown(e) {
    if (!hasCatalogShell()) return;

    // 如果在输入框内，只响应 Escape
    if (e.target.tagName === 'INPUT' && e.key !== 'Escape') return;

    // `/` 聚焦搜索
    if (e.key === '/') {
      e.preventDefault();
      searchInput?.focus();
      return;
    }

    // `Escape` 清空
    if (e.key === 'Escape') {
      clearSearch();
      expandedSlug = null;
      render();
      return;
    }

    // `1-8` 切换分类
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 8) {
      const cat = categoryOrder[num - 1];
      if (cat) setCategory(cat);
    }
  }

  function startShellObserver() {
    if (shellObserverStarted || typeof MutationObserver !== 'function') return;

    const observerTarget = document.body || document.documentElement;
    if (!observerTarget) return;

    shellObserverStarted = true;
    const observer = new MutationObserver(() => {
      ensureCatalogRuntime();
    });
    observer.observe(observerTarget, { childList: true, subtree: true });
  }

  // === 启动 ===
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
