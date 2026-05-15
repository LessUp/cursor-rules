import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import llmstxt from 'vitepress-plugin-llms'

const rawBase = process.env.VITEPRESS_BASE
const base = rawBase
  ? rawBase.startsWith('/')
    ? rawBase.endsWith('/') ? rawBase : `${rawBase}/`
    : `/${rawBase}/`
  : '/'

export default withMermaid(defineConfig({
  base,
  title: 'Cursor Rules',
  description: '面向 AI 时代的工程级 Cursor .mdc 规则库——架构展示站与技术白皮书',
  lang: 'zh-CN',

  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Cursor Rules - 技术白皮书' }],
    ['meta', { property: 'og:description', content: 'Archive-grade Cursor .mdc 规则库' }],
    ['meta', { property: 'og:image', content: `${base}og-image.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['script', { src: `${base}assets/catalog.js`, defer: '' }],
    ['meta', { name: 'theme-color', content: '#3476f6' }],
  ],

  srcExclude: ['superpowers/**'],

  vite: {
    plugins: [llmstxt()]
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '架构', link: '/architecture/', activeMatch: '/architecture/' },
      { text: '参考手册', link: '/reference/', activeMatch: '/reference/' },
      { text: '技术白皮书', link: '/advanced/', activeMatch: '/advanced/' },
      { text: 'OpenSpec', link: '/openspec/architecture', activeMatch: '/openspec/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '为什么需要规则', link: '/guide/why-rules' },
            { text: '编写规则', link: '/guide/writing-rules' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: '架构',
          items: [
            { text: '系统概览', link: '/architecture/' },
            { text: '目录构建系统', link: '/architecture/catalog-system' },
            { text: 'MDC 规范', link: '/architecture/mdc-spec' },
            { text: '设计决策', link: '/architecture/design-decisions' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '参考手册',
          items: [
            { text: '概览', link: '/reference/' },
            { text: '规则分类', link: '/reference/categories' },
            { text: 'Frontmatter 字段', link: '/reference/frontmatter' },
          ],
        },
      ],
      '/advanced/': [
        {
          text: '技术白皮书',
          items: [
            { text: '概览', link: '/advanced/' },
            { text: '相关工作', link: '/advanced/related-work' },
            { text: '学术参考', link: '/advanced/academic-references' },
            { text: '演进思考', link: '/advanced/evolution' },
          ],
        },
      ],
      '/openspec/': [
        {
          text: 'OpenSpec',
          items: [
            { text: '架构', link: '/openspec/architecture' },
            { text: '数据流架构', link: '/openspec/data-flow' },
            { text: 'Glob 重叠矩阵', link: '/openspec/glob-overlap-matrix' },
            { text: '规则覆盖矩阵', link: '/openspec/coverage-matrix' },
            { text: 'AI 工具', link: '/openspec/ai-tooling' },
            { text: '项目定位', link: '/openspec/project-positioning' },
            { text: '工作流', link: '/openspec/workflow' },
          ],
        },
      ],
      '/rules/': [
        {
          text: '规则详情',
          items: [
            { text: '← 返回规则库', link: '/' },
          ],
        },
      ],
      '/pathways/': [
        {
          text: '采用路径',
          items: [
            { text: '路径总览', link: '/pathways/' },
          ],
        },
      ],
      '/resources/': [
        {
          text: '资源',
          items: [
            { text: '资源地图', link: '/resources/' },
          ],
        },
      ],
    },
    outline: [2, 3],
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LessUp/cursor-rules' },
    ],
    footer: {
      message: '以根目录 .mdc 文件为产品，以工程约束为哲学',
      copyright: 'MIT License © LessUp',
    },
  },
}))
