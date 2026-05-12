import { defineConfig } from 'vitepress'

const rawBase = process.env.VITEPRESS_BASE
const base = rawBase
  ? rawBase.startsWith('/')
    ? rawBase.endsWith('/') ? rawBase : `${rawBase}/`
    : `/${rawBase}/`
  : '/'

export default defineConfig({
  base,
  title: 'Cursor Rules',
  description: 'Archive-grade Cursor .mdc 规则库',
  lang: 'zh-CN',

  srcExclude: ['superpowers/**'],

  themeConfig: {
    nav: [
      { text: '规则库', link: '/' },
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
})
