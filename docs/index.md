---
layout: home
---

<script setup>
import { withBase } from 'vitepress'
import {
  heroStats,
  philosophyCards,
  pathways,
  resourceGroups,
} from './.vitepress/theme/content/site-content'

const toPortalHref = (href) => href.startsWith('/') ? withBase(href) : href
</script>

<div class="home-container">
  <section id="home-hero" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Portal 首页</p>
        <h1>先讲理念、再给路径、再配资源，最后才进入规则目录。</h1>
        <p class="subtitle">
          这是一个以中文使用场景为先的 Cursor Rules 门户：帮助团队理解为什么要用规则、该从哪条采用路径开始，以及接下来该看哪些材料。
        </p>
      </div>
      <div class="hero-actions">
        <VPButton text="进入采用路径" href="/pathways/" />
        <VPButton text="查看资源总览" href="/resources/" theme="alt" />
        <a class="vp-button alt" href="#catalog">直接浏览规则目录</a>
      </div>
    </div>
    <div class="home-stats" id="home-stats">
      <span v-for="stat in heroStats" :key="stat.label">
        <strong
          :id="stat.label === '规则' ? 'stat-rules' : stat.label === '路径' ? 'stat-categories' : 'stat-global'"
        >{{ stat.value }}</strong>
        {{ stat.label }}
      </span>
    </div>
  </section>

  <section id="home-philosophy" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">为什么是门户而不是清单</p>
        <h2>先统一规则观，再开始接入。</h2>
      </div>
    </div>
    <div class="feature-map">
      <article v-for="card in philosophyCards" :key="card.title" class="feature-card">
        <div class="feature-card-title">{{ card.icon }} {{ card.title }}</div>
        <div class="feature-card-desc">{{ card.body }}</div>
      </article>
    </div>
  </section>

  <section id="home-path-map" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">采用路径图</p>
        <h2>按团队成熟度选择起点，而不是被完整目录淹没。</h2>
      </div>
      <a class="feature-tag" href="./pathways/">查看完整采用路径页</a>
    </div>
    <div class="feature-map">
      <article v-for="pathway in pathways" :key="pathway.title" class="feature-card">
        <div class="feature-card-title">{{ pathway.kicker }}</div>
        <div class="feature-card-desc">{{ pathway.summary }}</div>
        <div class="feature-tags">
          <a :href="toPortalHref(pathway.href)" class="feature-tag">{{ pathway.cta }}</a>
          <span v-for="outcome in pathway.outcomes" :key="outcome" class="feature-tag">{{ outcome }}</span>
        </div>
      </article>
    </div>
  </section>

  <section id="home-resource-atlas" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">资源地图</p>
        <h2>把仓库文档、策展入口与维护触点放在同一个资源图谱里。</h2>
      </div>
      <a class="feature-tag" href="./resources/">进入资源总览</a>
    </div>
    <div class="feature-map">
      <article v-for="group in resourceGroups" :key="group.title" class="feature-card">
        <div class="feature-card-title">{{ group.title }}</div>
        <div class="feature-card-desc">{{ group.summary }}</div>
        <div class="feature-tags">
          <a :href="toPortalHref(group.href)" class="feature-tag">{{ group.cta }}</a>
          <span v-for="item in group.items" :key="item" class="feature-tag">{{ item }}</span>
        </div>
      </article>
    </div>
    <div class="feature-tags">
      <a href="./openspec/architecture.html" class="feature-tag">架构</a>
      <a href="./openspec/ai-tooling.html" class="feature-tag">AI 工具</a>
      <a href="./openspec/workflow.html" class="feature-tag">工作流</a>
    </div>
  </section>

  <div id="catalog" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">规则目录</p>
        <h2>已经理解理念、选好路径、拿到资源后，再按主题筛选规则。</h2>
      </div>
      <div class="status-pill">结果: <span id="result-count">--</span></div>
    </div>
    <div class="feature-tags">
      <a href="?cat=language" class="feature-tag">语言</a>
      <a href="?cat=frontend" class="feature-tag">前端</a>
      <a href="?cat=backend" class="feature-tag">后端</a>
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
      <p>README 负责快速开始，门户首页负责导览，规则目录负责筛选，OpenSpec 负责项目控制文档。</p>
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
