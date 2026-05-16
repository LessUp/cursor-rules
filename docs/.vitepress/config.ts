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

  locales: {
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'Cursor Rules 技术白皮书',
      description: 'Archive-grade Cursor .mdc 规则库的项目导读、架构展示与技术白皮书',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '项目导读', link: '/zh/guides/reading-map', activeMatch: '/zh/guides/' },
          { text: '规则学院', link: '/zh/academy/rule-philosophy', activeMatch: '/zh/academy/' },
          { text: '系统架构', link: '/zh/architecture/system-overview', activeMatch: '/zh/architecture/' },
          { text: '技术白皮书', link: '/zh/research/related-work', activeMatch: '/zh/research/' },
          { text: '采用路径', link: '/zh/guides/reading-map', activeMatch: '/zh/guides/' },
          { text: 'OpenSpec', link: '/openspec/architecture', activeMatch: '/openspec/' },
        ],
        sidebar: {
          '/zh/guides/': [
            {
              text: '项目导读',
              items: [
                { text: '阅读地图', link: '/zh/guides/reading-map' },
              ],
            },
          ],
          '/zh/academy/': [
            {
              text: '规则学院',
              items: [
                { text: '规则哲学', link: '/zh/academy/rule-philosophy' },
              ],
            },
          ],
          '/zh/architecture/': [
            {
              text: '系统架构',
              items: [
                { text: '架构总览', link: '/zh/architecture/system-overview' },
              ],
            },
          ],
          '/zh/research/': [
            {
              text: '技术白皮书',
              items: [
                { text: '相关工作', link: '/zh/research/related-work' },
                { text: '参考文献', link: '/zh/research/references' },
                { text: '演进思考', link: '/zh/research/evolution' },
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
          '/zh/rules/': [
            {
              text: '规则详情',
              items: [
                { text: '← 返回首页', link: '/zh/' },
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
      title: 'Cursor Rules Whitepaper',
      description: 'Architecture showcase and technical whitepaper for the Cursor Rules library',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Reading Map', link: '/en/guides/reading-map', activeMatch: '/en/guides/' },
          { text: 'Architecture', link: '/en/architecture/system-overview', activeMatch: '/en/architecture/' },
          { text: 'Research', link: '/en/research/related-work', activeMatch: '/en/research/' },
          { text: 'OpenSpec', link: '/openspec/architecture', activeMatch: '/openspec/' },
        ],
        sidebar: {
          '/en/guides/': [
            {
              text: 'Guides',
              items: [
                { text: 'Reading Map', link: '/en/guides/reading-map' },
              ],
            },
          ],
          '/en/architecture/': [
            {
              text: 'Architecture',
              items: [
                { text: 'System Overview', link: '/en/architecture/system-overview' },
              ],
            },
          ],
          '/en/research/': [
            {
              text: 'Research',
              items: [
                { text: 'Related Work', link: '/en/research/related-work' },
              ],
            },
          ],
          '/en/rules/': [
            {
              text: 'Rule Pages',
              items: [
                { text: '← Back to home', link: '/en/' },
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
    footer: {
      message: '以根目录 .mdc 文件为产品，以工程约束为哲学',
      copyright: 'MIT License © LessUp',
    },
  },

  vite: {
    plugins: [llmstxt()],
  },
}))
