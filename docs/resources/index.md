---
title: 资源
description: 浏览仓库入口、OpenSpec 文档和维护触点的公共资源地图。
---

<script setup>
import { withBase } from 'vitepress'
import {
  resourceGroups,
  resourcesPage,
  resourcesSection,
} from '../.vitepress/theme/content/site-content'

const toPortalHref = (href) => {
  if (href.startsWith('/')) return withBase(href)
  if (href.startsWith('./')) return withBase(`/${href.slice(2)}`)
  return href
}
</script>

<div class="home-container">
  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">{{ resourcesPage.eyebrow }}</p>
        <h1>{{ resourcesPage.title }}</h1>
        <p class="subtitle">{{ resourcesPage.intro }}</p>
      </div>
      <a class="feature-tag" :href="toPortalHref(resourcesPage.catalogHref)">{{ resourcesPage.catalogLabel }}</a>
    </div>
    <div class="feature-tags">
      <span class="feature-tag">OpenSpec</span>
      <span class="feature-tag">公开导览</span>
      <span class="feature-tag">项目控制文档</span>
      <span class="feature-tag">维护者触点</span>
    </div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">资源分组</p>
        <h2>OpenSpec 负责项目控制文档，资源页负责把它们和公开入口串起来。</h2>
      </div>
    </div>
    <div class="feature-map">
      <article v-for="group in resourceGroups" :key="group.title" class="feature-card">
        <div class="feature-card-title">{{ group.title }}</div>
        <p class="feature-card-desc">{{ group.summary }}</p>
        <div class="feature-tags">
          <a :href="toPortalHref(group.href)" class="feature-tag">{{ group.cta }}</a>
          <span v-for="item in group.items" :key="item" class="feature-tag">{{ item }}</span>
        </div>
      </article>
    </div>
  </section>

  <section class="panel">
    <div class="section-heading">
      <div>
        <p class="eyebrow">OpenSpec 快速入口</p>
        <h2>把 Architecture、AI Tooling 与 Workflow 这三份关键文档直接暴露给访客。</h2>
      </div>
    </div>
    <div class="feature-tags">
      <a
        v-for="link in resourcesSection.links"
        :key="link.href"
        :href="toPortalHref(link.href)"
        class="feature-tag"
      >{{ link.label }}</a>
    </div>
  </section>
</div>
