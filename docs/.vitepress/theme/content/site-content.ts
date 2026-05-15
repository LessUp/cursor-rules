export const homeHero = {
  eyebrow: '工程级 Cursor 规则库',
  title: '把 AI 编码约束变成可维护的工程资产。',
  subtitle:
    '26 条经过实践验证的 .mdc 规则，覆盖 Python、TypeScript、Go、React 等主流技术栈。从哲学理念到架构设计，为严苛的工程团队提供完整的 AI 编码规范体系。',
  actions: [
    { component: 'VPButton', label: '采用路径', href: '/pathways/' },
    { component: 'VPButton', label: '架构文档', href: '/architecture/', theme: 'alt' },
    { component: 'a', label: '浏览规则目录', href: '#catalog', theme: 'alt' },
  ],
};

export const heroStats = [
  { label: '规则', value: '26' },
  { label: '分类', value: '6' },
  { label: '代码行', value: '1,721' },
];

export const philosophySection = {
  eyebrow: '为什么是门户而不是清单',
  title: '先统一规则观，再开始接入。',
};

export const philosophyCards = [
  {
    icon: '🧭',
    title: '不是 prompts 杂货铺',
    body: '规则库强调长期可维护、可复制和可审视的工程约束。',
  },
  {
    icon: '🗂️',
    title: '首页先做导览再做检索',
    body: '入口页先解释仓库哲学、采用顺序与资源地图，让团队知道何时进入目录筛选。',
  },
  {
    icon: '🧱',
    title: '根目录 .mdc 才是产品',
    body: 'GitHub Pages、OpenSpec 与脚本只是围绕规则库提供发现、采用和维护体验。',
  },
];

export const pathwaysSection = {
  eyebrow: '采用路径图',
  title: '按团队成熟度选择起点，而不是被完整目录淹没。',
  linkLabel: '查看完整采用路径页',
  linkHref: '/pathways/',
};

export const pathways = [
  {
    kicker: '路径一 · 新团队起步',
    title: '先建立共识，再挑第一批规则',
    summary: '适合第一次引入 Cursor Rules 的团队：先读理念，再看路径页，最后从目录里选最小可用集合。',
    href: '/pathways/',
    cta: '查看起步路径',
    catalogHref: '/?cat=general#catalog',
    catalogLabel: '查看通用规则',
    outcomes: ['理解规则定位', '挑选首批规则'],
    steps: ['先读首页理念区块', '确认第一批规则范围', '再进入目录复制接入'],
  },
  {
    kicker: '路径二 · 迁移现有约束',
    title: '把已有约定迁到可审视的规则库',
    summary: '适合已经有 prompts、checklists 或团队口头约定的团队，把分散经验迁移成可维护的规则资产。',
    href: '/pathways/',
    cta: '查看迁移路径',
    catalogHref: '/?cat=engineering#catalog',
    catalogLabel: '查看工程类规则',
    outcomes: ['梳理现有约束', '沉淀仓库契约'],
    steps: ['盘点现有 prompts 与 checklists', '映射到目录分类', '把公共约束沉淀回规则库'],
  },
  {
    kicker: '路径三 · 维护与扩展',
    title: '为长期维护建立策展与治理节奏',
    summary: '适合已经采用规则的维护者，围绕 Pages、OpenSpec 与生成脚本建立持续更新流程。',
    href: '/pathways/',
    cta: '查看维护路径',
    catalogHref: '/?cat=engineering#catalog',
    catalogLabel: '查看维护相关规则',
    outcomes: ['同步站点内容', '控制规则漂移'],
    steps: ['用 OpenSpec 记录边界', '用脚本重建目录与 sitemap', '定期复核首页与规则一致性'],
  },
];

export const pathwaysPage = {
  eyebrow: '采用路径总览',
  title: '把“为什么使用规则”翻译成可执行的采用顺序。',
  intro:
    '这页承接首页的路径图，把不同团队阶段需要先看什么、再做什么、最后回到目录选哪些规则串成公开路径。',
  catalogLabel: '直接返回规则目录',
  catalogHref: '/?cat=general#catalog',
};

export const resourcesSection = {
  eyebrow: '资源地图',
  title: '把仓库文档、策展入口与维护触点放在同一个资源图谱里。',
  linkLabel: '进入资源总览',
  linkHref: '/resources/',
  linksLabel: 'OpenSpec 快速入口',
  links: [
    { label: '架构', href: './openspec/architecture.html' },
    { label: 'AI 工具', href: './openspec/ai-tooling.html' },
    { label: '工作流', href: './openspec/workflow.html' },
  ],
};

export const resourceGroups = [
  {
    title: '仓库入口',
    summary: '给第一次来到站点的访客一个最短路径：仓库、README 与规则目录各做什么。',
    href: 'https://github.com/LessUp/cursor-rules#readme',
    cta: '查看入口资源',
    items: ['GitHub 仓库', 'README', '规则目录'],
  },
  {
    title: '项目控制文档',
    summary: '架构、AI tooling 与工作流说明集中在 OpenSpec，避免 README 变成内部操作手册。',
    href: './openspec/architecture.html',
    cta: '打开 OpenSpec',
    items: ['架构', 'AI 工具', '工作流'],
  },
  {
    title: '采用辅助材料',
    summary: '把路径页、分类筛选和复制入口组织成一组资源，方便团队按阶段推进采用。',
    href: '/pathways/',
    cta: '查看采用材料',
    items: ['采用路径', '分类筛选', '复制接入'],
  },
  {
    title: '维护者触点',
    summary: '为贡献者保留脚本、生成物与策展边界，确保站点内容和根目录规则同步。',
    href: './openspec/workflow.html',
    cta: '查看维护资源',
    items: ['build:catalog', 'rules.json 生成物', '仓库契约'],
  },
];

export const resourcesPage = {
  eyebrow: '资源总览',
  title: '把公开入口、OpenSpec 文档和维护触点放在同一张资源地图上。',
  intro:
    '资源页不重复 README，而是把采用过程中真正要跳转的入口组织起来，让访客知道哪里是公开导览，哪里是项目控制文档。',
  catalogLabel: '返回规则目录',
  catalogHref: '/?cat=engineering#catalog',
};

export const catalogSection = {
  eyebrow: '规则目录',
  title: '已经理解理念、选好路径、拿到资源后，再按主题筛选规则。',
  resultLabel: '结果',
  stats: [
    { id: 'stat-rules', label: '规则', value: '--' },
    { id: 'stat-categories', label: '分类', value: '--' },
    { id: 'stat-global', label: '全局规则', value: '--' },
  ],
  quickFilters: [
    { href: '?cat=language', label: '语言' },
    { href: '?cat=frontend', label: '前端' },
    { href: '?cat=backend', label: '后端' },
  ],
  searchPlaceholder: '搜索规则、描述或文件名',
  footer: 'README 负责快速开始，门户首页负责导览，规则目录负责筛选，OpenSpec 负责项目控制文档。',
  emptyState: {
    title: '没有匹配的规则',
    subtitle: '试试清空关键词，或者切换到其他分类。',
  },
  shortcuts: [
    { key: '/', label: '搜索' },
    { key: 'Esc', label: '清空' },
    { key: '1-8', label: '切换分类' },
  ],
};

export const docsSection = {
  eyebrow: '技术文档',
  title: '从快速上手到架构深度——系统掌握规则工程体系。',
  items: [
    {
      title: '指南',
      badge: 'Guide',
      icon: 'pathways',
      href: '/guide/',
      summary: '从"为什么需要规则"到"如何编写 .mdc 文件"，提供完整的入门与进阶路径。',
      tags: ['快速开始', '编写规则', '最佳实践'],
    },
    {
      title: '架构',
      badge: 'Architecture',
      icon: 'engineering',
      href: '/architecture/',
      summary: '深入解析构建流水线、目录系统与 MDC 规范——附系统架构图与数据流图。',
      tags: ['系统架构', 'Mermaid 图示', '设计决策'],
    },
    {
      title: '参考手册',
      badge: 'Reference',
      icon: 'languages',
      href: '/reference/',
      summary: '完整的 Frontmatter 字段说明、规则分类体系与规范速查表。',
      tags: ['Frontmatter', '分类速查', '字段参考'],
    },
    {
      title: '进阶',
      badge: 'Advanced',
      icon: 'philosophy',
      href: '/advanced/',
      summary: '相关工作比较、学术引用与演进思考——为深度研究者准备的知识层。',
      tags: ['相关工作', '学术引用', '演进路线'],
    },
  ],
};
