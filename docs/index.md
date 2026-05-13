---
layout: home
---

<script setup>
import { withBase } from 'vitepress'
import {
  catalogSection,
  heroStats,
  homeHero,
  pathwaysSection,
  philosophyCards,
  philosophySection,
  pathways,
  resourceGroups,
  resourcesSection,
} from './.vitepress/theme/content/site-content'

const toPortalHref = (href) => href.startsWith('/') ? withBase(href) : href
</script>

<div class="home-container">
  <section id="home-hero" class="panel">
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
          <a v-else class="vp-button alt" :href="toPortalHref(action.href)">{{ action.label }}</a>
        </template>
      </div>
    </div>
    <div class="home-stats" id="home-stats">
      <span v-for="stat in heroStats" :key="stat.label">
        <strong>{{ stat.value }}</strong>
        {{ stat.label }}
      </span>
    </div>
  </section>

  <section id="home-philosophy" class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ philosophySection.eyebrow }}</p>
        <h2>{{ philosophySection.title }}</h2>
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
        <p class="eyebrow">{{ pathwaysSection.eyebrow }}</p>
        <h2>{{ pathwaysSection.title }}</h2>
      </div>
      <a class="feature-tag" :href="toPortalHref(pathwaysSection.linkHref)">{{ pathwaysSection.linkLabel }}</a>
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
        <p class="eyebrow">{{ resourcesSection.eyebrow }}</p>
        <h2>{{ resourcesSection.title }}</h2>
      </div>
      <a class="feature-tag" :href="toPortalHref(resourcesSection.linkHref)">{{ resourcesSection.linkLabel }}</a>
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
      <span class="feature-tag">{{ resourcesSection.linksLabel }}</span>
      <a
        v-for="link in resourcesSection.links"
        :key="link.href"
        :href="toPortalHref(link.href)"
        class="feature-tag"
      >{{ link.label }}</a>
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
