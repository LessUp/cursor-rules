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
    ['script', { src: `${base}assets/catalog.js`, defer: '' }],
  ],

  srcExclude: ['superpowers/**'],

  vite: {
    plugins: [llmstxt()]
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '采用路径', link: '/pathways/' },
      { text: '资源', link: '/resources/' },
      { text: '项目文档', link: '/openspec/architecture', activeMatch: '/openspec/' },
      { text: 'GitHub', link: 'https://github.com/LessUp/cursor-rules' },
    ],
    sidebar: {
      '/openspec/': [
        {
          text: '项目文档',
          items: [
            { text: '架构', link: '/openspec/architecture' },
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
