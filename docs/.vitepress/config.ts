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
  description: 'Archive-grade Cursor .mdc rule library',

  srcExclude: ['superpowers/**'],

  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'Cursor Rules',
      description: 'Archive-grade Cursor .mdc 规则库',
      themeConfig: {
        nav: [
          { text: '规则库', link: '/zh/' },
          { text: '项目文档', link: '/zh/openspec/architecture', activeMatch: '/zh/openspec/' },
          { text: 'GitHub', link: 'https://github.com/LessUp/cursor-rules' },
        ],
        sidebar: {
          '/zh/openspec/': [
            {
              text: '项目文档',
              items: [
                { text: '架构', link: '/zh/openspec/architecture' },
                { text: 'AI 工具', link: '/zh/openspec/ai-tooling' },
                { text: '项目定位', link: '/zh/openspec/project-positioning' },
                { text: '工作流', link: '/zh/openspec/workflow' },
              ],
            },
          ],
          '/zh/rules/': [
            {
              text: '规则详情',
              items: [
                { text: '\u2190 \u8fd4\u56de\u89c4\u5219\u5e93', link: '/zh/' },
              ],
            },
          ],
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Cursor Rules',
      description: 'Archive-grade Cursor .mdc rule library',
      themeConfig: {
        nav: [
          { text: 'Rules', link: '/en/' },
          { text: 'Project Docs', link: '/en/openspec/architecture', activeMatch: '/en/openspec/' },
          { text: 'GitHub', link: 'https://github.com/LessUp/cursor-rules' },
        ],
        sidebar: {
          '/en/openspec/': [
            {
              text: 'Project Docs',
              items: [
                { text: 'Architecture', link: '/en/openspec/architecture' },
                { text: 'AI Tooling', link: '/en/openspec/ai-tooling' },
                { text: 'Project Positioning', link: '/en/openspec/project-positioning' },
                { text: 'Workflow', link: '/en/openspec/workflow' },
              ],
            },
          ],
          '/en/rules/': [
            {
              text: 'Rule Details',
              items: [
                { text: '\u2190 Back to Rules', link: '/en/' },
              ],
            },
          ],
        },
      },
    },
  },

  themeConfig: {
    outline: [2, 3],
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/LessUp/cursor-rules' },
    ],
  },
})
