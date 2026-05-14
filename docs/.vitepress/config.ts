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
  description: 'Archive-grade Cursor .mdc 规则库',
  lang: 'zh-CN',

  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Cursor Rules - 技术白皮书' }],
    ['meta', { property: 'og:description', content: 'Archive-grade Cursor .mdc 规则库' }],
    ['meta', { property: 'og:image', content: `${base}og-image.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['script', { src: `${base}assets/catalog.js`, defer: '' }],
  ],

  srcExclude: ['superpowers/**'],

  vite: {
    plugins: [llmstxt()]
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '技术白皮书', link: '/whitepaper/', activeMatch: '/whitepaper/' },
      { text: '采用路径', link: '/pathways/' },
      { text: '项目文档', link: '/openspec/architecture', activeMatch: '/openspec/' },
      { text: 'GitHub', link: 'https://github.com/LessUp/cursor-rules' },
    ],
    sidebar: {
      '/whitepaper/': [
        {
          text: '技术白皮书',
          items: [
            { text: '概述', link: '/whitepaper/' },
            { text: '设计原则', link: '/whitepaper/design-principles' },
            { text: '实现架构', link: '/whitepaper/implementation' },
            { text: '.mdc 格式规范', link: '/whitepaper/rule-format-spec' },
          ],
        },
      ],
      '/openspec/': [
        {
          text: '项目文档',
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
    },
    outline: [2, 3],
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LessUp/cursor-rules' },
    ],
  },
}))
