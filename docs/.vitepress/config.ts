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
  description: 'Technical whitepaper and architecture showcase for the Cursor Rules library',

  mermaid: {
    theme: 'base',
    themeVariables: {
      primaryColor: '#3476f6',
      primaryTextColor: '#162033',
      primaryBorderColor: '#3476f6',
      lineColor: '#71809d',
      secondaryColor: '#f4f8ff',
      tertiaryColor: '#e7efff',
      fontSize: '14px',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    },
  },

  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Cursor Rules - Technical Whitepaper' }],
    ['meta', { property: 'og:description', content: 'Archive-grade Cursor .mdc rule library' }],
    ['meta', { property: 'og:image', content: `${base}og-image.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['script', { src: `${base}assets/catalog.js`, defer: '' }],
    ['meta', { name: 'theme-color', content: '#3476f6' }],
  ],

  srcExclude: [
    'superpowers/**',
  ],

  ignoreDeadLinks: [
    // 旧目录中的链接指向已迁移的新路径
    '/architecture/index',
    '/architecture/design-decisions',
    '/architecture/mdc-spec',
    '/architecture/catalog-system',
    '../architecture/system-overview',
  ],

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
          { text: '系统架构', link: '/zh/architecture/', activeMatch: '/zh/architecture/' },
          { text: '研究参考', link: '/zh/research/', activeMatch: '/zh/research/' },
        ],
        sidebar: {
          '/zh/guides/': [
            {
              text: '项目导读',
              items: [
                { text: '阅读地图', link: '/zh/guides/reading-map' },
                { text: '快速开始', link: '/zh/guides/getting-started' },
                { text: '为什么需要规则', link: '/zh/guides/why-rules' },
                { text: '编写规则', link: '/zh/guides/writing-rules' },
              ],
            },
            {
              text: '参考手册',
              items: [
                { text: 'Frontmatter 字段', link: '/zh/guides/frontmatter-ref' },
                { text: '规则分类', link: '/zh/guides/categories-ref' },
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
                { text: '架构总览', link: '/zh/architecture/' },
                { text: '数据流架构', link: '/zh/architecture/data-flow' },
              ],
            },
          ],
          '/zh/research/': [
            {
              text: '研究与参考',
              items: [
                { text: '研究索引', link: '/zh/research/' },
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
          { text: 'Academy', link: '/en/academy/rule-philosophy', activeMatch: '/en/academy/' },
          { text: 'Architecture', link: '/en/architecture/', activeMatch: '/en/architecture/' },
          { text: 'Research', link: '/en/research/', activeMatch: '/en/research/' },
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
          '/en/academy/': [
            {
              text: 'Academy',
              items: [
                { text: 'Rule Philosophy', link: '/en/academy/rule-philosophy' },
              ],
            },
          ],
          '/en/architecture/': [
            {
              text: 'Architecture',
              items: [
                { text: 'System Overview', link: '/en/architecture/' },
                { text: 'Data Flow', link: '/en/architecture/data-flow' },
              ],
            },
          ],
          '/en/research/': [
            {
              text: 'Research',
              items: [
                { text: 'Research Index', link: '/en/research/' },
                { text: 'Related Work', link: '/en/research/related-work' },
                { text: 'References', link: '/en/research/references' },
                { text: 'Evolution', link: '/en/research/evolution' },
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
      message: 'Root-level rules as product, engineering discipline throughout.',
      copyright: 'MIT License © LessUp',
    },
  },

  vite: {
    plugins: [llmstxt()],
  },
}))
