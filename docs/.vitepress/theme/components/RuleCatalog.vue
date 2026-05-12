<template>
  <div class="rule-catalog">
    <div class="home-header">
      <div class="home-header-left">
        <div class="home-logo">CR</div>
        <div>
          <span class="home-title">Cursor Rules</span>
          <span class="home-subtitle">{{ texts.badge }}</span>
        </div>
      </div>
      <div class="home-nav">
        <a :href="siteLink('/')">{{ texts.navCatalog }}</a>
        <a :href="siteLink('/openspec/architecture')">{{ texts.navDocs }}</a>
        <a :href="repoUrl" target="_blank" rel="noopener">GitHub</a>
        <a :href="switchLocaleLink">{{ texts.switchLocale }}</a>
      </div>
    </div>

    <div class="home-intro-row">
      <div class="home-intro">
        <h1>{{ texts.title }}</h1>
        <p class="subtitle">{{ texts.description }}</p>
        <div class="hero-actions">
          <a class="vp-button brand" :href="repoUrl" target="_blank" rel="noopener">{{ texts.browseRepo }}</a>
          <a class="vp-button alt" :href="readmeUrl" target="_blank" rel="noopener">{{ texts.readme }}</a>
        </div>
      </div>
      <div class="home-stats">
        <span v-for="stat in stats" :key="stat.label"><strong>{{ stat.value }}</strong> {{ stat.label }}</span>
      </div>
    </div>

    <h2 class="feature-heading">{{ texts.featureMapTitle }}</h2>
    <div class="feature-map">
      <div v-for="feature in featureCards" :key="feature.title" class="feature-card">
        <div class="feature-card-title">{{ feature.title }}</div>
        <div class="feature-card-desc">{{ feature.description }}</div>
        <div class="feature-tags">
          <a
            v-for="tag in feature.tags"
            :key="`${feature.title}-${tag.text}`"
            class="feature-tag"
            :href="tag.href"
          >
            {{ tag.text }}
          </a>
        </div>
      </div>
    </div>

    <div class="quick-start">
      <div class="quick-start-title">{{ texts.quickStartTitle }}</div>
      <div class="quick-start-content">
        <div class="command-block">
          <code>{{ installCommand }}</code>
        </div>
        {{ texts.quickStartHint }}
      </div>
    </div>

    <div id="catalog" class="panel">
      <div class="section-heading">
        <div>
          <p class="eyebrow">{{ texts.filtersTitle }}</p>
          <h2>{{ texts.filtersDescription }}</h2>
        </div>
        <div class="status-pill">{{ texts.results }}: {{ filteredRules.length }}</div>
      </div>
      <div class="toolbar">
        <div class="search-wrapper">
          <input
            ref="searchInput"
            v-model="query"
            class="search-input"
            type="search"
            :placeholder="texts.searchPlaceholder"
          />
          <button v-if="query" class="search-clear" @click="clearSearch">×</button>
        </div>
        <div class="chip-row">
          <button
            v-for="cat in categoryOrder"
            :key="cat"
            class="chip-button"
            :class="{ active: category === cat }"
            @click="setCategory(cat)"
          >
            {{ categoryLabel(cat) }} <span>{{ categoryCounts[cat] ?? 0 }}</span>
          </button>
        </div>
      </div>
      <p v-if="copyMessage" class="copy-status">{{ copyMessage }}</p>
    </div>

    <div v-if="loading" class="grid">
      <div v-for="n in 6" :key="n" class="skeleton-card">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-line long"></div>
        <div class="skeleton-line long"></div>
      </div>
    </div>

    <div v-else-if="filteredRules.length === 0" class="panel empty-state">
      <h2>{{ texts.emptyTitle }}</h2>
      <p class="subtitle">{{ texts.emptyDescription }}</p>
    </div>

    <div v-else class="grid-shell">
      <div class="grid">
        <article
          v-for="rule in filteredRules"
          :key="rule.slug"
          class="rule-card"
          :class="{ expanded: expandedSlug === rule.slug }"
          @click="toggleExpand(rule.slug)"
        >
          <div class="rule-card-head">
            <div>
              <p class="eyebrow">{{ categoryLabel(rule.category) }}</p>
              <h3>{{ rule.title }}</h3>
            </div>
            <span class="file-pill">{{ rule.fileName }}</span>
          </div>
          <p class="rule-description rule-truncated">{{ rule.description }}</p>
          <div class="rule-full-content">
            <dl class="rule-meta">
              <div>
                <dt>{{ texts.fileLabel }}</dt>
                <dd><code>{{ rule.fileName }}</code></dd>
              </div>
              <div>
                <dt>{{ texts.globLabel }}</dt>
                <dd class="scope-list">
                  <template v-if="rule.globs.length">
                    <code v-for="glob in rule.globs" :key="glob">{{ glob }}</code>
                  </template>
                  <span v-else class="scope-global">{{ texts.globalLabel }}</span>
                </dd>
              </div>
            </dl>
          </div>
          <p class="expand-hint">{{ expandedSlug === rule.slug ? (lang === 'zh' ? '点击收起' : 'Collapse') : (lang === 'zh' ? '点击展开详情' : 'Expand details') }}</p>
          <div class="rule-actions" @click.stop>
            <button class="secondary-link button-reset" @click="copyInstall(rule.fileName)">{{ texts.installSnippet }}</button>
            <button class="secondary-link button-reset" @click="copyContent(rule.fileName)">{{ lang === 'zh' ? '复制规则内容' : 'Copy rule content' }}</button>
            <a class="secondary-link" :href="githubUrl(rule.fileName)" target="_blank" rel="noopener">{{ texts.openOnGithub }}</a>
          </div>
        </article>
      </div>
      <footer class="catalog-footer">
        <p>{{ texts.footer }}</p>
      </footer>
    </div>

    <div class="shortcut-hint">
      <span class="shortcut-key">/</span> {{ lang === 'zh' ? '搜索' : 'Search' }}
      <span class="shortcut-key">Esc</span> {{ lang === 'zh' ? '清空' : 'Clear' }}
      <span class="shortcut-key">1-8</span> {{ lang === 'zh' ? '切换分类' : 'Switch category' }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'

const props = defineProps({
  lang: { type: String, default: 'zh' }
})

const { site } = useData()
const base = computed(() => site.value.base)

const loading = ref(true)
const rules = ref([])
const categories = ref({})
const query = ref('')
const category = ref('all')
const copyMessage = ref('')
const expandedSlug = ref(null)
const searchInput = ref(null)

const TEXT_BASE = {
  zh: {
    badge: 'Archive-grade Cursor .mdc 规则库',
    title: '用生成式目录浏览、筛选并采用 Cursor Rules',
    description: '根目录 .mdc 是产品本体，GitHub Pages 提供发现、筛选、理解与复制采用的体验。',
    navCatalog: '规则目录',
    navDocs: '项目文档',
    switchLocale: 'English',
    browseRepo: '查看 GitHub 仓库',
    readme: '阅读 README',
    totalRules: '规则',
    categories: '分类',
    globalRules: '全局',
    featureMapTitle: '核心能力',
    quickStartTitle: '快速接入',
    quickStartHint: '将需要的 .mdc 文件复制到项目 .cursor/rules/ 后即可生效。',
    filtersTitle: '按主题筛选',
    filtersDescription: '搜索规则标题、描述或文件名，并通过分类按钮快速缩小范围。',
    searchPlaceholder: '搜索规则、描述或文件名',
    results: '结果',
    emptyTitle: '没有匹配的规则',
    emptyDescription: '试试清空关键词，或者切换到其他分类。',
    installSnippet: '复制接入命令',
    openOnGithub: '在 GitHub 中打开',
    fileLabel: '文件',
    globLabel: '适用范围',
    globalLabel: '全局规则',
    footer: 'README 负责快速开始，GitHub Pages 负责规则目录，OpenSpec 负责项目控制文档。',
    copiedInstall: '已复制接入命令',
    copiedRule: '规则内容已复制',
    copyFailed: '复制失败，请稍后重试',
  },
  en: {
    badge: 'Archive-grade Cursor .mdc library',
    title: 'Browse, filter, and adopt Cursor Rules from a generated catalog',
    description: 'Root-level .mdc files are the product; GitHub Pages focuses on discovery, filtering, understanding, and adoption.',
    navCatalog: 'Rules',
    navDocs: 'Project docs',
    switchLocale: '简体中文',
    browseRepo: 'Open GitHub repo',
    readme: 'Read README',
    totalRules: 'Rules',
    categories: 'Categories',
    globalRules: 'Global',
    featureMapTitle: 'Core capabilities',
    quickStartTitle: 'Quick start',
    quickStartHint: 'Copy required .mdc files into .cursor/rules/ to activate them in your project.',
    filtersTitle: 'Filter by topic',
    filtersDescription: 'Search rule titles, descriptions, or filenames and narrow the scope by category.',
    searchPlaceholder: 'Search rules, descriptions, or filenames',
    results: 'Results',
    emptyTitle: 'No matching rules',
    emptyDescription: 'Clear the search query or switch to another category.',
    installSnippet: 'Copy install command',
    openOnGithub: 'Open on GitHub',
    fileLabel: 'File',
    globLabel: 'Scope',
    globalLabel: 'Global rule',
    footer: 'README is the quick-start entry, GitHub Pages is the rule catalog, and OpenSpec docs hold project control guidance.',
    copiedInstall: 'Install command copied',
    copiedRule: 'Rule content copied',
    copyFailed: 'Copy failed, please try again',
  },
}

const texts = computed(() => TEXT_BASE[props.lang] || TEXT_BASE.zh)
const localePrefix = computed(() => (props.lang === 'zh' ? '/zh' : '/en'))
const switchLocaleLink = computed(() => withBase(props.lang === 'zh' ? '/en/' : '/zh/'))
const installCommand = 'mkdir -p .cursor/rules && cp path/to/cursor-rules/*.mdc .cursor/rules/'

function siteLink(pathname) {
  return withBase(`${localePrefix.value}${pathname}`)
}

const featureCards = computed(() => {
  if (props.lang === 'zh') {
    return [
      {
        title: '按技术栈筛选',
        description: '按语言、前端、后端、移动端或工程主题快速定位规则。',
        tags: [
          { text: '语言', href: siteLink('/?cat=language') },
          { text: '前端', href: siteLink('/?cat=frontend') },
          { text: '后端', href: siteLink('/?cat=backend') },
        ],
      },
      {
        title: '快速采用规则',
        description: '支持复制接入命令与规则全文，减少手工复制粘贴成本。',
        tags: [
          { text: '规则目录', href: '#catalog' },
          { text: 'README', href: readmeUrl },
          { text: 'GitHub', href: repoUrl },
        ],
      },
      {
        title: '项目控制文档',
        description: '将架构、工作流与 AI tooling 约束集中在 OpenSpec 里维护。',
        tags: [
          { text: '架构', href: siteLink('/openspec/architecture') },
          { text: 'AI 工具', href: siteLink('/openspec/ai-tooling') },
          { text: '工作流', href: siteLink('/openspec/workflow') },
        ],
      },
    ]
  }

  return [
    {
      title: 'Filter by stack',
      description: 'Locate rules quickly by language, frontend, backend, mobile, or engineering topics.',
      tags: [
        { text: 'Language', href: siteLink('/?cat=language') },
        { text: 'Frontend', href: siteLink('/?cat=frontend') },
        { text: 'Backend', href: siteLink('/?cat=backend') },
      ],
    },
    {
      title: 'Adopt quickly',
      description: 'Copy install commands and raw rule content directly from the catalog UI.',
      tags: [
        { text: 'Catalog', href: '#catalog' },
        { text: 'README', href: readmeUrl },
        { text: 'GitHub', href: repoUrl },
      ],
    },
    {
      title: 'Project control docs',
      description: 'Keep architecture, workflow, and AI tooling contracts centralized in OpenSpec docs.',
      tags: [
        { text: 'Architecture', href: siteLink('/openspec/architecture') },
        { text: 'AI tooling', href: siteLink('/openspec/ai-tooling') },
        { text: 'Workflow', href: siteLink('/openspec/workflow') },
      ],
    },
  ]
})

async function loadData() {
  try {
    const [rulesRes, catsRes] = await Promise.all([
      fetch(`${base.value}assets/rules.json`, { cache: 'no-store' }),
      fetch(`${base.value}assets/categories.json`, { cache: 'no-store' }),
    ])
    if (rulesRes.ok) rules.value = await rulesRes.json()
    if (catsRes.ok) categories.value = await catsRes.json()
  } catch (e) {
    console.error('Failed to load data:', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)

const categoryOrder = computed(() => {
  const orderMap = { all: 0 }
  for (const [key, value] of Object.entries(categories.value)) {
    orderMap[key] = value.order
  }
  const set = new Set(rules.value.map(r => r.category))
  set.add('all')
  return [...set].sort((a, b) => (orderMap[a] ?? 99) - (orderMap[b] ?? 99))
})

const categoryCounts = computed(() => {
  const counts = { all: rules.value.length }
  for (const rule of rules.value) {
    counts[rule.category] = (counts[rule.category] ?? 0) + 1
  }
  return counts
})

const globalRuleCount = computed(() => rules.value.filter(r => r.globs.length === 0).length)

const stats = computed(() => [
  { label: texts.value.totalRules, value: rules.value.length },
  { label: texts.value.categories, value: categoryOrder.value.length - 1 },
  { label: texts.value.globalRules, value: globalRuleCount.value },
])

const filteredRules = computed(() => {
  const q = query.value.toLowerCase()
  return rules.value.filter(rule => {
    const matchesCategory = category.value === 'all' || rule.category === category.value
    const haystack = `${rule.title} ${rule.description} ${rule.fileName}`.toLowerCase()
    const matchesQuery = haystack.includes(q)
    return matchesCategory && matchesQuery
  })
})

function categoryLabel(cat) {
  if (cat === 'all') return props.lang === 'zh' ? '全部' : 'All'
  return categories.value[cat]?.label?.[props.lang] ?? cat
}

function setCategory(cat) {
  category.value = cat
  copyMessage.value = ''
}

function clearSearch() {
  query.value = ''
  copyMessage.value = ''
}

function toggleExpand(slug) {
  expandedSlug.value = expandedSlug.value === slug ? null : slug
}

function githubUrl(fileName) {
  return `https://github.com/LessUp/cursor-rules/blob/master/${encodeURIComponent(fileName)}`
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

async function copyInstall(fileName) {
  try {
    const cmd = `mkdir -p .cursor/rules\ncp path/to/cursor-rules/${fileName} .cursor/rules/`
    await copyText(cmd)
    copyMessage.value = `${texts.value.copiedInstall}: ${fileName}`
  } catch (e) {
    copyMessage.value = texts.value.copyFailed
  }
  setTimeout(() => { copyMessage.value = '' }, 2000)
}

async function copyContent(fileName) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/LessUp/cursor-rules/master/${fileName}`)
    if (!res.ok) throw new Error(res.status)
    const content = await res.text()
    await copyText(content)
    copyMessage.value = `${texts.value.copiedRule}: ${fileName}`
  } catch (e) {
    copyMessage.value = texts.value.copyFailed
  }
  setTimeout(() => { copyMessage.value = '' }, 2000)
}

function onKeydown(e) {
  if (e.target.tagName === 'INPUT' && e.key !== 'Escape') return

  if (e.key === '/') {
    e.preventDefault()
    searchInput.value?.focus()
    return
  }

  if (e.key === 'Escape') {
    query.value = ''
    expandedSlug.value = null
    copyMessage.value = ''
    return
  }

  const num = parseInt(e.key, 10)
  if (num >= 1 && num <= 8) {
    const cat = categoryOrder.value[num - 1]
    if (cat) {
      category.value = cat
      copyMessage.value = ''
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

watch([query, category], () => {
  const params = new URLSearchParams()
  if (query.value) params.set('q', query.value)
  if (category.value !== 'all') params.set('cat', category.value)
  const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
  window.history.replaceState({}, '', newUrl)
}, { immediate: false })

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  query.value = params.get('q') ?? ''
  category.value = params.get('cat') ?? 'all'
})

const repoUrl = 'https://github.com/LessUp/cursor-rules'
const readmeUrl = 'https://github.com/LessUp/cursor-rules#readme'
</script>

<style scoped>
.rule-catalog {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px 64px;
}

.home-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 28px;
  border-bottom: 1px solid var(--vp-c-divider);
  gap: 16px;
}

.home-header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.home-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 700;
  font-size: 13px;
}

.home-title {
  display: inline-block;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.home-subtitle {
  display: inline-block;
  margin-left: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.home-nav {
  display: flex;
  gap: 14px;
  font-size: 13px;
  flex-wrap: wrap;
}

.home-nav a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.15s, color 0.15s;
}

.home-nav a:hover {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.home-intro-row {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
}

.home-intro {
  flex: 1;
}

.home-intro h1 {
  margin: 0 0 14px;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.6px;
  color: var(--vp-c-text-1);
}

.subtitle {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 0;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.vp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.15s;
}

.vp-button.brand {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.vp-button.brand:hover {
  background: var(--vp-c-brand-2);
}

.vp-button.alt {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.vp-button.alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.home-stats {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.home-stats span {
  display: block;
  padding: 10px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.home-stats strong {
  color: var(--vp-c-text-1);
}

.feature-heading {
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.feature-map {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.feature-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.feature-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(52, 118, 246, 0.12);
}

.feature-card-title {
  font-weight: 600;
  font-size: 14px;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.feature-card-desc {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 10px;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.feature-tag {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
}

.feature-tag:hover {
  background: color-mix(in srgb, var(--vp-c-brand-soft), var(--vp-c-brand-1) 12%);
}

.quick-start {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 24px;
  background: var(--vp-c-bg-soft);
}

.quick-start-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.quick-start-content {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.command-block {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px 0;
}

.command-block code {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 4px;
}

.panel {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
}

.section-heading h2 {
  font-size: 15px;
  font-weight: 400;
  color: var(--vp-c-text-2);
  margin: 0;
}

.status-pill {
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.search-wrapper {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
}

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip-button {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.chip-button:hover {
  background: var(--vp-c-bg-mute);
}

.chip-button.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.chip-button span {
  opacity: 0.75;
  margin-left: 4px;
}

.copy-status {
  margin: 12px 0 0;
  color: var(--vp-c-brand-1);
  font-size: 13px;
}

.grid-shell {
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.rule-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rule-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.rule-card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.rule-card-head h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.file-pill {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 6px;
  white-space: nowrap;
  flex-shrink: 0;
}

.rule-description {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.rule-truncated {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rule-full-content {
  display: none;
}

.rule-card.expanded .rule-full-content {
  display: block;
}

.rule-card.expanded .rule-truncated {
  display: block;
  -webkit-line-clamp: unset;
}

.rule-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
}

.rule-meta dt {
  font-size: 11px;
  color: var(--vp-c-text-3);
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.rule-meta dd {
  margin: 0;
  font-size: 12px;
}

.rule-meta code {
  display: inline-block;
  background: var(--vp-c-bg-mute);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin: 2px;
}

.scope-global {
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.expand-hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 0;
}

.rule-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.secondary-link {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-brand-soft);
  background: var(--vp-c-brand-soft);
  transition: all 0.2s;
}

.secondary-link:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.button-reset {
  cursor: pointer;
  font-family: inherit;
}

.empty-state {
  text-align: center;
  padding: 40px;
}

.catalog-footer {
  text-align: center;
  padding: 24px 0 4px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.shortcut-hint {
  text-align: center;
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin-top: 24px;
}

.shortcut-key {
  display: inline-block;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  font-family: monospace;
  margin: 0 4px;
}

.skeleton-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-line {
  background: var(--vp-c-bg-mute);
  border-radius: 4px;
  height: 14px;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-line.short { width: 40%; }
.skeleton-line.medium { width: 60%; }
.skeleton-line.long { width: 100%; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (max-width: 959px) {
  .feature-map {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-intro-row {
    flex-direction: column;
    gap: 14px;
  }

  .home-stats {
    flex-direction: row;
    min-width: 0;
    flex-wrap: wrap;
  }
}

@media (max-width: 639px) {
  .rule-catalog {
    padding: 0 16px 48px;
  }

  .home-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .home-intro h1 {
    font-size: 28px;
  }

  .feature-map {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: 1fr;
  }

  .section-heading {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
