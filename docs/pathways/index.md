---
title: 采用路径
description: 按团队阶段浏览 Cursor Rules 的采用路径，并返回规则目录继续筛选。
---

<script setup>
import { withBase } from 'vitepress'
import { pathways, pathwaysPage } from '../.vitepress/theme/content/site-content'

const toPortalHref = (href) => {
  if (href.startsWith('/')) return withBase(href)
  if (href.startsWith('./')) return withBase(`/${href.slice(2)}`)
  return href
}

const getPathwayIcon = (title) => {
  if (title.includes('共识')) return 'languages'
  if (title.includes('迁')) return 'engineering'
  return 'pathways'
}
</script>

<div class="home-container">
  <section class="panel portal-hero">
    <div class="section-heading">
      <div class="portal-section-title">
        <span class="portal-icon"><SvgIcon name="pathways" /></span>
        <div>
        <p class="eyebrow">{{ pathwaysPage.eyebrow }}</p>
        <h1>{{ pathwaysPage.title }}</h1>
        <p class="subtitle">{{ pathwaysPage.intro }}</p>
        </div>
      </div>
      <a class="feature-tag" :href="toPortalHref(pathwaysPage.catalogHref)">{{ pathwaysPage.catalogLabel }}</a>
    </div>
    <div class="feature-tags">
      <span class="feature-tag">建议顺序</span>
      <span class="feature-tag">先理念</span>
      <span class="feature-tag">再路径</span>
      <span class="feature-tag">最后回到目录筛选</span>
    </div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">三条公开采用路径</p>
        <h2>每条路径都在最后回到规则目录，而不是停留在说明页。</h2>
      </div>
    </div>
    <div class="feature-map pathway-grid">
      <article v-for="pathway in pathways" :key="pathway.title" class="feature-card">
        <div class="portal-card-heading">
          <span class="portal-icon"><SvgIcon :name="getPathwayIcon(pathway.title)" /></span>
          <div>
            <div class="feature-card-title">{{ pathway.title }}</div>
            <div class="portal-card-subtitle">{{ pathway.kicker }}</div>
          </div>
        </div>
        <p class="feature-card-desc">{{ pathway.summary }}</p>
        <div class="feature-tags">
          <a :href="toPortalHref(pathway.catalogHref)" class="feature-tag">{{ pathway.catalogLabel }}</a>
          <span v-for="step in pathway.steps" :key="step" class="feature-tag">{{ step }}</span>
          <span v-for="outcome in pathway.outcomes" :key="outcome" class="feature-tag">{{ outcome }}</span>
        </div>
      </article>
    </div>
  </section>
</div>
