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

const resourceIcons = {
  resources: withBase('/icons/resources.svg'),
  pathways: withBase('/icons/pathways.svg'),
  engineering: withBase('/icons/engineering.svg'),
}

const getResourceIcon = (title) => {
  if (title.includes('项目控制') || title.includes('维护者')) return resourceIcons.engineering
  if (title.includes('采用')) return resourceIcons.pathways
  return resourceIcons.resources
}
</script>

<div class="home-container">
  <section class="panel portal-hero">
    <div class="section-heading">
      <div class="portal-section-title">
        <img class="portal-icon" :src="resourceIcons.resources" alt="" />
        <div>
        <p class="eyebrow">{{ resourcesPage.eyebrow }}</p>
        <h1>{{ resourcesPage.title }}</h1>
        <p class="subtitle">{{ resourcesPage.intro }}</p>
        </div>
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
      <article v-for="group in resourceGroups" :key="group.title" class="feature-card resource-group">
        <div class="portal-card-heading">
          <img class="portal-icon" :src="getResourceIcon(group.title)" alt="" />
          <div class="feature-card-title">{{ group.title }}</div>
        </div>
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
