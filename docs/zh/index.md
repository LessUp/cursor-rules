---
layout: home
---

<script setup>
import { withBase } from 'vitepress'
import {
  architectureHighlights,
  architectureSection,
  catalogSection,
  curriculumSection,
  curriculumTracks,
  heroStats,
  homeHero,
  researchHighlights,
  researchSection,
  thesisCards,
  thesisSection,
} from '../.vitepress/theme/content/site-content'

const toPortalHref = (href) => href.startsWith('/') ? withBase(href) : href
</script>

<div class="home-container whitepaper-home">
  <section id="home-hero" class="panel portal-hero">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ homeHero.eyebrow }}</p>
        <h1>{{ homeHero.title }}</h1>
        <p class="subtitle">{{ homeHero.subtitle }}</p>
      </div>
      <div class="hero-actions">
        <template v-for="action in homeHero.actions" :key="action.label">
          <VPButton
            v-if="action.component === 'VPButton'"
            :text="action.label"
            :href="toPortalHref(action.href)"
            :theme="action.theme"
          />
          <a
            v-else
            class="vp-button alt"
            :href="toPortalHref(action.href)"
            :data-catalog-trigger="action.href === '#catalog' ? '' : null"
          >{{ action.label }}</a>
        </template>
      </div>
    </div>
    <div class="home-stats evidence-strip" id="home-stats">
      <span v-for="stat in heroStats" :key="stat.label">
        <strong>{{ stat.value }}</strong>
        {{ stat.label }}
      </span>
    </div>
  </section>

  <section id="home-thesis" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ thesisSection.eyebrow }}</p>
        <h2>{{ thesisSection.title }}</h2>
      </div>
    </div>
    <div class="feature-map thesis-grid">
      <article v-for="card in thesisCards" :key="card.title" class="feature-card signal-card">
        <div class="portal-card-heading">
          <span class="portal-icon"><SvgIcon :name="card.icon" /></span>
          <div class="feature-card-title">{{ card.title }}</div>
        </div>
        <p class="feature-card-desc">{{ card.body }}</p>
      </article>
    </div>
  </section>

  <section id="home-curriculum" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ curriculumSection.eyebrow }}</p>
        <h2>{{ curriculumSection.title }}</h2>
      </div>
      <a class="feature-tag" :href="toPortalHref(curriculumSection.linkHref)">{{ curriculumSection.linkLabel }}</a>
    </div>
    <div class="feature-map curriculum-grid">
      <article v-for="track in curriculumTracks" :key="track.title" class="feature-card curriculum-card">
        <div class="portal-card-heading">
          <span class="portal-icon"><SvgIcon name="pathways" /></span>
          <div>
            <div class="feature-card-title">{{ track.title }}</div>
            <div class="portal-card-subtitle">{{ track.kicker }}</div>
          </div>
        </div>
        <p class="feature-card-desc">{{ track.summary }}</p>
        <div class="feature-tags">
          <a :href="toPortalHref(track.href)" class="feature-tag">进入章节</a>
          <span v-for="bullet in track.bullets" :key="bullet" class="feature-tag">{{ bullet }}</span>
        </div>
      </article>
    </div>
  </section>

  <section id="home-architecture-lab" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ architectureSection.eyebrow }}</p>
        <h2>{{ architectureSection.title }}</h2>
      </div>
    </div>
    <div class="feature-map architecture-grid">
      <article v-for="card in architectureHighlights" :key="card.title" class="feature-card architecture-card">
        <div class="portal-card-heading">
          <span class="portal-icon"><SvgIcon :name="card.icon" /></span>
          <div class="feature-card-title">{{ card.title }}</div>
        </div>
        <p class="feature-card-desc">{{ card.summary }}</p>
        <div class="feature-tags">
          <span v-for="detail in card.details" :key="detail" class="feature-tag">{{ detail }}</span>
        </div>
      </article>
      <article class="feature-card diagram-frame">
        <p class="eyebrow">Pipeline Snapshot</p>
        <div class="feature-card-title">`.mdc` → 校验 → 目录生成 → Pages 展示</div>
        <p class="feature-card-desc">
          单一事实源来自仓库根目录规则文件。验证脚本与 catalog 生成脚本把结构化产物输送到 GitHub Pages，再由文档站承担解释、导读与检索。
        </p>
        <div class="diagram-steps">
          <span class="feature-tag">root *.mdc</span>
          <span class="feature-tag">validate-rules</span>
          <span class="feature-tag">rules.json</span>
          <span class="feature-tag">localized rule pages</span>
          <span class="feature-tag">VitePress</span>
        </div>
      </article>
    </div>
  </section>

  <section id="home-research" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ researchSection.eyebrow }}</p>
        <h2>{{ researchSection.title }}</h2>
      </div>
      <a class="feature-tag" :href="toPortalHref(researchSection.linkHref)">{{ researchSection.linkLabel }}</a>
    </div>
    <div class="feature-map">
      <article v-for="item in researchHighlights" :key="item.title" class="feature-card citation-card">
        <div class="portal-card-heading">
          <span class="portal-icon"><SvgIcon :name="item.icon" /></span>
          <div class="feature-card-title">{{ item.title }}</div>
        </div>
        <p class="feature-card-desc">{{ item.summary }}</p>
        <div class="feature-tags">
          <a :href="toPortalHref(item.href)" class="feature-tag">展开阅读</a>
        </div>
      </article>
    </div>
  </section>

  <div id="catalog" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ catalogSection.eyebrow }}</p>
        <h2>{{ catalogSection.title }}</h2>
      </div>
      <div class="status-pill">{{ catalogSection.resultLabel }}: <span id="result-count">--</span></div>
    </div>
    <div id="catalog-stats" class="home-stats catalog-stats">
      <span v-for="stat in catalogSection.stats" :key="stat.id">
        <strong :id="stat.id">{{ stat.value }}</strong>
        {{ stat.label }}
      </span>
    </div>
    <div class="feature-tags">
      <a
        v-for="filter in catalogSection.quickFilters"
        :key="filter.href"
        :href="filter.href"
        data-catalog-trigger
        :data-catalog-category="filter.href.replace('?cat=', '')"
        class="feature-tag"
      >{{ filter.label }}</a>
    </div>
    <div class="toolbar">
      <div class="search-wrapper">
        <input
          id="search-input"
          class="search-input"
          type="search"
          :placeholder="catalogSection.searchPlaceholder"
        />
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
      <p>{{ catalogSection.footer }}</p>
    </footer>
  </div>

  <div id="empty-state" class="panel empty-state" style="display: none;">
    <h2>{{ catalogSection.emptyState.title }}</h2>
    <p class="subtitle">{{ catalogSection.emptyState.subtitle }}</p>
  </div>

  <div class="shortcut-hint">
    <template v-for="shortcut in catalogSection.shortcuts" :key="shortcut.key">
      <span class="shortcut-key">{{ shortcut.key }}</span> {{ shortcut.label }}
    </template>
  </div>
</div>
