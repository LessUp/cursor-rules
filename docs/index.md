---
layout: home
---

<div class="home-container">

<div class="home-header">
  <div class="home-header-left">
    <div class="home-logo">CR</div>
    <div>
      <span class="home-title">Cursor Rules</span>
      <span class="home-subtitle">Archive-grade .mdc 规则库</span>
    </div>
  </div>
  <div class="home-nav">
    <a href="./openspec/architecture">项目文档</a>
    <a href="https://lessup.github.io/cursor-rules/llms.txt">LLM 文档</a>
    <a href="https://github.com/LessUp/cursor-rules">GitHub</a>
  </div>
</div>

<div class="home-intro-row">
  <div class="home-intro">
    <h1>用生成式目录浏览、筛选并采用 Cursor Rules</h1>
    <p class="subtitle">根目录 .mdc 是产品本体，GitHub Pages 提供发现、筛选、理解与复制采用的体验。</p>
    <div class="hero-actions">
      <a class="vp-button brand" href="https://github.com/LessUp/cursor-rules" target="_blank" rel="noopener">查看 GitHub 仓库</a>
      <a class="vp-button alt" href="https://github.com/LessUp/cursor-rules#readme" target="_blank" rel="noopener">阅读 README</a>
    </div>
  </div>
  <div class="home-stats" id="home-stats">
    <span><strong id="stat-rules">--</strong> 规则</span>
    <span><strong id="stat-categories">--</strong> 分类</span>
    <span><strong id="stat-global">--</strong> 全局</span>
  </div>
</div>

<div id="home-philosophy" class="panel">
  <h2>站点理念</h2>
  <p>这里先锁定公共站点的理念区块，后续再补充完整内容。</p>
</div>

<div id="home-path-map" class="panel">
  <h2>采用路径图</h2>
  <p>采用路径页将按顺序引导团队理解规则、选择规则并完成接入。</p>
</div>

<div id="home-resource-atlas" class="panel">
  <h2>资源总览</h2>
  <p>资源页将整理仓库文档、外部参考和维护入口。</p>
</div>

## 核心能力

<div class="feature-map">
  <div class="feature-card">
    <div class="feature-card-title">📊 按技术栈筛选</div>
    <div class="feature-card-desc">按语言、前端、后端、移动端或工程主题快速定位规则。</div>
    <div class="feature-tags">
      <a href="?cat=language" class="feature-tag">语言</a>
      <a href="?cat=frontend" class="feature-tag">前端</a>
      <a href="?cat=backend" class="feature-tag">后端</a>
    </div>
  </div>

  <div class="feature-card">
    <div class="feature-card-title">📋 快速采用规则</div>
    <div class="feature-card-desc">支持复制接入命令与规则全文，减少手工复制粘贴成本。</div>
    <div class="feature-tags">
      <a href="#catalog" class="feature-tag">规则目录</a>
      <a href="https://github.com/LessUp/cursor-rules#readme" class="feature-tag">README</a>
      <a href="https://github.com/LessUp/cursor-rules" class="feature-tag">GitHub</a>
    </div>
  </div>

  <div class="feature-card">
    <div class="feature-card-title">📖 项目控制文档</div>
    <div class="feature-card-desc">将架构、工作流与 AI tooling 约束集中在 OpenSpec 里维护。</div>
    <div class="feature-tags">
      <a href="./openspec/architecture" class="feature-tag">架构</a>
      <a href="./openspec/ai-tooling" class="feature-tag">AI 工具</a>
      <a href="./openspec/workflow" class="feature-tag">工作流</a>
    </div>
  </div>
</div>

<div class="quick-start">
  <div class="quick-start-title">快速接入</div>
  <div class="quick-start-content">
    <div class="command-block">
      <code>mkdir -p .cursor/rules && cp path/to/cursor-rules/*.mdc .cursor/rules/</code>
    </div>
    将需要的 .mdc 文件复制到项目 .cursor/rules/ 后即可生效。
  </div>
</div>

<div id="catalog" class="panel">
  <div class="section-heading">
    <div>
      <p class="eyebrow">按主题筛选</p>
      <h2>搜索规则标题、描述或文件名，并通过分类按钮快速缩小范围。</h2>
    </div>
    <div class="status-pill">结果: <span id="result-count">--</span></div>
  </div>
  <div class="toolbar">
    <div class="search-wrapper">
      <input id="search-input" class="search-input" type="search" placeholder="搜索规则、描述或文件名" />
      <button id="search-clear" class="search-clear" style="display: none;">×</button>
    </div>
    <div class="chip-row" id="chip-row"></div>
  </div>
  <p id="copy-status" class="copy-status" style="display: none;"></p>
</div>

<div id="skeleton-grid" class="grid">
  <div class="skeleton-card"><div class="skeleton-line short"></div><div class="skeleton-line medium"></div><div class="skeleton-line long"></div><div class="skeleton-line long"></div></div>
  <div class="skeleton-card"><div class="skeleton-line short"></div><div class="skeleton-line medium"></div><div class="skeleton-line long"></div><div class="skeleton-line long"></div></div>
  <div class="skeleton-card"><div class="skeleton-line short"></div><div class="skeleton-line medium"></div><div class="skeleton-line long"></div><div class="skeleton-line long"></div></div>
  <div class="skeleton-card"><div class="skeleton-line short"></div><div class="skeleton-line medium"></div><div class="skeleton-line long"></div><div class="skeleton-line long"></div></div>
  <div class="skeleton-card"><div class="skeleton-line short"></div><div class="skeleton-line medium"></div><div class="skeleton-line long"></div><div class="skeleton-line long"></div></div>
  <div class="skeleton-card"><div class="skeleton-line short"></div><div class="skeleton-line medium"></div><div class="skeleton-line long"></div><div class="skeleton-line long"></div></div>
</div>

<div id="rule-grid" class="grid-shell" style="display: none;">
  <div id="rule-cards" class="grid"></div>
  <footer class="catalog-footer">
    <p>README 负责快速开始，GitHub Pages 负责规则目录，OpenSpec 负责项目控制文档。</p>
  </footer>
</div>

<div id="empty-state" class="panel empty-state" style="display: none;">
  <h2>没有匹配的规则</h2>
  <p class="subtitle">试试清空关键词，或者切换到其他分类。</p>
</div>

<div class="shortcut-hint">
  <span class="shortcut-key">/</span> 搜索
  <span class="shortcut-key">Esc</span> 清空
  <span class="shortcut-key">1-8</span> 切换分类
</div>

</div>
