/**
 * Cursor Rules Gallery - 静态站点
 *
 * @description 单文件模块化结构，清晰的模块边界
 * 模块：State, I18n, Data, Render, Events, Init
 */

// ============================================================================
// State Module - 状态管理
// ============================================================================

const State = {
  language: 'zh',
  query: '',
  category: 'all',
  rules: [],
  categories: {},
  copyMessage: '',
  expandedSlug: null,

  /**
   * 更新状态
   * @param {Object} updates - 状态更新
   */
  update(updates) {
    Object.assign(this, updates);
  },

  /**
   * 同步到 URL
   */
  syncUrl() {
    const params = new URLSearchParams();

    if (this.query) params.set('q', this.query);
    if (this.category !== 'all') params.set('cat', this.category);
    if (this.language !== 'zh') params.set('lang', this.language);

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, '', newUrl);
  },

  /**
   * 从 URL 恢复状态
   */
  restoreFromUrl() {
    const params = new URLSearchParams(window.location.search);

    this.query = params.get('q') ?? '';
    this.category = params.get('cat') ?? 'all';
    this.language = params.get('lang') ?? 'zh';
  },
};

// ============================================================================
// I18n Module - 国际化
// ============================================================================

const I18n = {
  TEXT_BASE: {
    zh: {
      badge: 'Archive-grade Cursor .mdc 规则库',
      title: '用生成式目录浏览、筛选并采用 Cursor Rules',
      description:
        '规则文件仍然保持在仓库根目录,GitHub Pages 只负责发现、筛选、理解与复制采用路径。',
      browseRepo: '查看 GitHub 仓库',
      readme: '阅读 README',
      totalRules: '规则总数',
      categories: '分类数',
      globalRules: '全局规则',
      filtersTitle: '按主题筛选',
      filtersDescription: '搜索规则标题、描述或文件名;使用分类按钮快速收窄范围。',
      searchPlaceholder: '搜索规则、描述或文件名',
      results: '结果',
      emptyTitle: '没有匹配的规则',
      emptyDescription: '试试清空关键词,或者切换到其他分类。',
      installSnippet: '复制接入命令',
      openOnGithub: '在 GitHub 中打开',
      fileLabel: '文件',
      globLabel: '适用范围',
      globalLabel: '全局规则',
      footer:
        'README 负责快速开始;GitHub Pages 负责规则目录;OpenSpec 文档负责项目控制与交接。',
    },
    en: {
      badge: 'Archive-grade Cursor .mdc library',
      title: 'Browse, filter, and adopt Cursor Rules from a generated catalog',
      description:
        'Rule files stay at the repository root; GitHub Pages focuses on discovery, filtering, understanding, and adoption.',
      browseRepo: 'Open GitHub repo',
      readme: 'Read README',
      totalRules: 'Rules',
      categories: 'Categories',
      globalRules: 'Global',
      filtersTitle: 'Filter by topic',
      filtersDescription: 'Search rule titles, descriptions, or filenames and narrow by category.',
      searchPlaceholder: 'Search rules, descriptions, or filenames',
      results: 'Results',
      emptyTitle: 'No matching rules',
      emptyDescription: 'Clear the search query or switch to another category.',
      installSnippet: 'Copy install command',
      openOnGithub: 'Open on GitHub',
      fileLabel: 'File',
      globLabel: 'Scope',
      globalLabel: 'Global rule',
      footer:
        'README is the quick-start entry, GitHub Pages is the rule catalog, and OpenSpec docs hold project control guidance.',
    },
  },

  /**
   * 获取当前语言的文本
   * @returns {Object} 文本对象
   */
  texts() {
    return this.TEXT_BASE[State.language];
  },

  /**
   * 构建分类标签映射
   * @returns {Object} 分类键到标签的映射
   */
  buildCategoriesMap() {
    const map = { all: State.language === 'zh' ? '全部' : 'All' };
    for (const [key, value] of Object.entries(State.categories)) {
      map[key] = value.label[State.language];
    }
    return map;
  },
};

// ============================================================================
// Data Module - 数据加载和处理
// ============================================================================

const Data = {
  /**
   * 加载规则数据
   */
  async loadRules() {
    const response = await fetch('./assets/rules.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load rules: ${response.status}`);
    }
    State.rules = await response.json();
  },

  /**
   * 加载分类数据
   */
  async loadCategories() {
    const response = await fetch('./assets/categories.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load categories: ${response.status}`);
    }
    State.categories = await response.json();
  },

  /**
   * 获取分类排序
   * @returns {string[]} 排序后的分类键数组
   */
  buildCategoryOrder() {
    const categoryOrderMap = { all: 0 };
    for (const [key, value] of Object.entries(State.categories)) {
      categoryOrderMap[key] = value.order;
    }

    if (State.rules.length === 0) {
      return Object.keys(categoryOrderMap);
    }

    // 从规则中收集所有分类
    const categorySet = new Set(State.rules.map((rule) => rule.category));
    categorySet.add('all');

    // 按预定义顺序排序
    return [...categorySet].sort((a, b) => {
      const orderA = categoryOrderMap[a] ?? 99;
      const orderB = categoryOrderMap[b] ?? 99;
      return orderA - orderB;
    });
  },

  /**
   * 获取分类计数
   * @returns {Map} 分类到数量的映射
   */
  categoryCounts() {
    const categoryOrder = this.buildCategoryOrder();
    const counts = new Map(categoryOrder.map((category) => [category, 0]));
    counts.set('all', State.rules.length);

    for (const rule of State.rules) {
      counts.set(rule.category, (counts.get(rule.category) ?? 0) + 1);
    }

    return counts;
  },

  /**
   * 获取全局规则数量
   * @returns {number} 全局规则数量
   */
  globalRuleCount() {
    return State.rules.filter((rule) => rule.globs.length === 0).length;
  },

  /**
   * 获取过滤后的规则
   * @returns {Object[]} 过滤后的规则数组
   */
  filteredRules() {
    return State.rules.filter((rule) => {
      const matchesCategory =
        State.category === 'all' || rule.category === State.category;
      const haystack = `${rule.title} ${rule.description} ${rule.fileName}`.toLowerCase();
      const matchesQuery = haystack.includes(State.query.toLowerCase());

      return matchesCategory && matchesQuery;
    });
  },
};

// ============================================================================
// Render Module - 渲染逻辑
// ============================================================================

const Render = {
  /**
   * 转义 HTML
   * @param {string} value - 原始值
   * @returns {string} 转义后的值
   */
  escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  },

  /**
   * 获取分类标签
   * @param {string} category - 分类键
   * @returns {string} 分类标签
   */
  categoryLabel(category) {
    return I18n.buildCategoriesMap()[category] ?? category;
  },

  /**
   * 渲染统计卡片
   * @param {string} label - 标签
   * @param {number} value - 值
   * @returns {string} HTML 字符串
   */
  stat(label, value) {
    return `
      <div class="stat-card">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${this.escapeHtml(label)}</span>
      </div>
    `;
  },

  /**
   * 渲染 Hero 区域
   */
  renderHero() {
    const labels = I18n.texts();
    const hero = document.querySelector('#hero');

    hero.innerHTML = `
      <header class="hero-shell">
        <div class="hero-topbar">
          <a class="brand" href="https://github.com/LessUp/cursor-rules" target="_blank" rel="noopener">
            <span class="brand-mark">◆</span>
            <span class="brand-text">Cursor Rules</span>
          </a>
          <div class="lang-toggle" role="group" aria-label="language switcher">
            <button class="lang-button ${State.language === 'zh' ? 'active' : ''}" data-lang="zh">中文</button>
            <button class="lang-button ${State.language === 'en' ? 'active' : ''}" data-lang="en">EN</button>
          </div>
        </div>
        <div class="hero-card">
          <p class="eyebrow">${this.escapeHtml(labels.badge)}</p>
          <h1>${this.escapeHtml(labels.title)}</h1>
          <p class="subtitle">${this.escapeHtml(labels.description)}</p>
          <div class="hero-actions">
            <a class="primary-link" href="https://github.com/LessUp/cursor-rules" target="_blank" rel="noopener">${this.escapeHtml(labels.browseRepo)}</a>
            <a class="secondary-link" href="https://github.com/LessUp/cursor-rules#readme" target="_blank" rel="noopener">${this.escapeHtml(labels.readme)}</a>
          </div>
          <div class="stats-grid">
            ${this.stat(labels.totalRules, State.rules.length)}
            ${this.stat(labels.categories, Data.buildCategoryOrder().length - 1)}
            ${this.stat(labels.globalRules, Data.globalRuleCount())}
          </div>
        </div>
      </header>
      <div class="shortcut-hint" id="shortcut-hint">
        <span class="shortcut-key">/</span> 搜索
        <span class="shortcut-key">Esc</span> 清空
        <span class="shortcut-key">1-8</span> 切换分类
      </div>
    `;
  },

  /**
   * 渲染筛选器区域
   */
  renderFilters() {
    const labels = I18n.texts();
    const counts = Data.categoryCounts();
    const categoryOrder = Data.buildCategoryOrder();
    const filters = document.querySelector('#filters');

    filters.innerHTML = `
      <section class="panel">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${this.escapeHtml(labels.filtersTitle)}</p>
            <h2>${this.escapeHtml(labels.filtersDescription)}</h2>
          </div>
          <div class="status-pill">${this.escapeHtml(labels.results)}: ${Data.filteredRules().length}</div>
        </div>
        <div class="toolbar">
          <div class="search-wrapper">
            <input
              id="search-input"
              class="search-input"
              type="search"
              value="${this.escapeHtml(State.query)}"
              placeholder="${this.escapeHtml(labels.searchPlaceholder)}"
              aria-label="${this.escapeHtml(labels.searchPlaceholder)}"
            >
            <button
              id="search-clear"
              class="search-clear ${State.query ? 'visible' : ''}"
              type="button"
              aria-label="Clear search"
            >×</button>
          </div>
          <div class="chip-row">
            ${categoryOrder.map((category) => `
              <button
                class="chip-button ${State.category === category ? 'active' : ''}"
                data-category="${category}"
                type="button"
              >
                ${this.escapeHtml(this.categoryLabel(category))} <span>${counts.get(category) ?? 0}</span>
              </button>
            `).join('')}
          </div>
        </div>
        ${State.copyMessage ? `<p class="copy-status">${this.escapeHtml(State.copyMessage)}</p>` : ''}
      </section>
    `;
  },

  /**
   * 渲染骨架屏
   * @param {number} count - 骨架屏数量
   * @returns {string} HTML 字符串
   */
  renderSkeletons(count = 6) {
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
  },

  /**
   * 渲染加载状态
   */
  renderLoading() {
    const grid = document.querySelector('#rule-grid');
    grid.innerHTML = `
      <section class="grid-shell">
        <div class="grid">
          ${this.renderSkeletons(6)}
        </div>
      </section>
    `;
  },

  /**
   * 渲染单个规则卡片
   * @param {Object} rule - 规则对象
   * @returns {string} HTML 字符串
   */
  renderRule(rule) {
    const labels = I18n.texts();
    const isExpanded = State.expandedSlug === rule.slug;
    const globs = rule.globs.length
      ? rule.globs.map((glob) => `<code>${this.escapeHtml(glob)}</code>`).join('')
      : `<span class="scope-global">${this.escapeHtml(labels.globalLabel)}</span>`;

    return `
      <article class="rule-card ${isExpanded ? 'expanded' : ''}" data-slug="${this.escapeHtml(rule.slug)}">
        <div class="rule-card-head">
          <div>
            <p class="eyebrow">${this.escapeHtml(this.categoryLabel(rule.category))}</p>
            <h3>${this.escapeHtml(rule.title)}</h3>
          </div>
          <span class="file-pill">${this.escapeHtml(rule.fileName)}</span>
        </div>
        <p class="rule-description rule-truncated">${this.escapeHtml(rule.description)}</p>
        <div class="rule-full-content">
          <dl class="rule-meta">
            <div>
              <dt>${this.escapeHtml(labels.fileLabel)}</dt>
              <dd><code>${this.escapeHtml(rule.fileName)}</code></dd>
            </div>
            <div>
              <dt>${this.escapeHtml(labels.globLabel)}</dt>
              <dd class="scope-list">${globs}</dd>
            </div>
          </dl>
        </div>
        <p class="expand-hint">${isExpanded ? '点击收起' : '点击展开详情'}</p>
        <div class="rule-actions" onclick="event.stopPropagation()">
          <button class="secondary-link button-reset" type="button" data-copy-file="${this.escapeHtml(rule.fileName)}">${this.escapeHtml(labels.installSnippet)}</button>
          <button class="secondary-link button-reset" type="button" data-copy-content="${this.escapeHtml(rule.fileName)}">复制规则内容</button>
          <a class="secondary-link" href="https://github.com/LessUp/cursor-rules/blob/master/${encodeURIComponent(rule.fileName)}" target="_blank" rel="noopener">${this.escapeHtml(labels.openOnGithub)}</a>
        </div>
      </article>
    `;
  },

  /**
   * 渲染规则网格
   */
  renderGrid() {
    const labels = I18n.texts();
    const rules = Data.filteredRules();
    const grid = document.querySelector('#rule-grid');

    if (!rules.length) {
      grid.innerHTML = `
        <section class="panel empty-state">
          <h2>${this.escapeHtml(labels.emptyTitle)}</h2>
          <p class="subtitle">${this.escapeHtml(labels.emptyDescription)}</p>
        </section>
      `;
      return;
    }

    grid.innerHTML = `
      <section class="grid-shell">
        <div class="grid">
          ${rules.map((rule) => this.renderRule(rule)).join('')}
        </div>
        <footer class="catalog-footer">
          <p>${this.escapeHtml(labels.footer)}</p>
        </footer>
      </section>
    `;
  },

  /**
   * 渲染全部
   */
  render() {
    this.renderHero();
    this.renderFilters();
    this.renderGrid();
  },
};

// ============================================================================
// Events Module - 事件处理
// ============================================================================

const Events = {
  RAW_BASE_URL: 'https://raw.githubusercontent.com/LessUp/cursor-rules/master/',

  /**
   * 防抖函数
   * @param {Function} fn - 要防抖的函数
   * @param {number} delay - 延迟毫秒数
   * @returns {Function} 防抖后的函数
   */
  debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * 复制文本
   * @param {string} value - 要复制的文本
   */
  async copyText(value) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  },

  /**
   * 生成安装命令
   * @param {string} fileName - 文件名
   * @returns {string} 安装命令
   */
  installCommand(fileName) {
    return `mkdir -p .cursor/rules\ncp path/to/cursor-rules/${fileName} .cursor/rules/`;
  },

  /**
   * 复制规则内容
   * @param {string} fileName - 文件名
   * @returns {Promise<boolean>} 是否成功
   */
  async copyRuleContent(fileName) {
    try {
      const response = await fetch(this.RAW_BASE_URL + fileName);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const content = await response.text();
      await this.copyText(content);
      return true;
    } catch (error) {
      console.error('Failed to copy rule content:', error);
      return false;
    }
  },

  /**
   * 设置点击事件
   */
  setupClickEvents() {
    document.addEventListener('click', async (event) => {
      // 语言切换
      const langButton = event.target.closest('[data-lang]');
      if (langButton) {
        State.language = langButton.dataset.lang;
        State.copyMessage = '';
        State.syncUrl();
        Render.render();
        return;
      }

      // 分类切换
      const categoryButton = event.target.closest('[data-category]');
      if (categoryButton) {
        State.category = categoryButton.dataset.category;
        State.copyMessage = '';
        State.syncUrl();
        Render.render();
        return;
      }

      // 复制安装命令
      const copyButton = event.target.closest('[data-copy-file]');
      if (copyButton) {
        const fileName = copyButton.dataset.copyFile;
        await this.copyText(this.installCommand(fileName));
        State.copyMessage = `${fileName} copied`;
        Render.renderFilters();
        return;
      }

      // 复制规则内容
      const copyContentButton = event.target.closest('[data-copy-content]');
      if (copyContentButton) {
        const fileName = copyContentButton.dataset.copyContent;
        const success = await this.copyRuleContent(fileName);
        if (success) {
          State.copyMessage = `规则内容已复制: ${fileName}`;
        } else {
          State.copyMessage = `复制失败，请稍后重试`;
        }
        Render.renderFilters();
        return;
      }

      // 清空搜索
      const clearButton = event.target.closest('#search-clear');
      if (clearButton) {
        State.query = '';
        State.syncUrl();
        Render.renderFilters();
        Render.renderGrid();
        return;
      }

      // 卡片展开/收起
      const ruleCard = event.target.closest('.rule-card');
      if (ruleCard && !event.target.closest('.rule-actions')) {
        const slug = ruleCard.dataset.slug;
        State.expandedSlug = State.expandedSlug === slug ? null : slug;
        Render.renderGrid();
        return;
      }
    });
  },

  /**
   * 设置输入事件
   */
  setupInputEvents() {
    const debouncedSearch = this.debounce(() => {
      State.syncUrl();
      Render.renderFilters();
      Render.renderGrid();
    }, 300);

    document.addEventListener('input', (event) => {
      if (event.target.id === 'search-input') {
        State.query = event.target.value;
        debouncedSearch();
      }
    });
  },

  /**
   * 设置键盘快捷键
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      // 在输入框中时忽略（除了 Escape）
      if (event.target.tagName === 'INPUT' && event.key !== 'Escape') {
        return;
      }

      // / 聚焦搜索
      if (event.key === '/') {
        event.preventDefault();
        const input = document.querySelector('#search-input');
        if (input) input.focus();
        return;
      }

      // Escape 清空搜索
      if (event.key === 'Escape') {
        State.query = '';
        State.expandedSlug = null;
        const input = document.querySelector('#search-input');
        if (input) input.value = '';
        State.syncUrl();
        Render.render();
        return;
      }

      // 1-8 切换分类
      const num = parseInt(event.key, 10);
      if (num >= 1 && num <= 8) {
        const categoryOrder = Data.buildCategoryOrder();
        const category = categoryOrder[num - 1];
        if (category) {
          State.category = category;
          State.syncUrl();
          Render.render();
        }
      }
    });

    // 首次访问显示快捷键提示
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
  },
};

// ============================================================================
// Init Module - 初始化
// ============================================================================

const Init = {
  /**
   * 初始化应用
   */
  async run() {
    State.restoreFromUrl();
    Render.renderLoading();

    await Promise.all([Data.loadRules(), Data.loadCategories()]);

    Render.render();
    Events.setupClickEvents();
    Events.setupInputEvents();
    Events.setupKeyboardShortcuts();
  },

  /**
   * 显示错误
   * @param {Error} error - 错误对象
   */
  showError(error) {
    document.querySelector('#app').innerHTML = `
      <section class="panel empty-state">
        <h1>Failed to load catalog</h1>
        <p class="subtitle">${Render.escapeHtml(error.message)}</p>
      </section>
    `;
  },
};

// 启动应用
Init.run().catch((error) => Init.showError(error));
