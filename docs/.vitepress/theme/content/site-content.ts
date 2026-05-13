export const homeHero = {
  eyebrow: 'Portal 首页',
  title: '先讲理念、再给路径、再配资源，最后才进入规则目录。',
  subtitle:
    '这是一个以中文使用场景为先的 Cursor Rules 门户：帮助团队理解为什么要用规则、该从哪条采用路径开始，以及接下来该看哪些材料。',
  actions: [
    { component: 'VPButton', label: '进入采用路径', href: '/pathways/' },
    { component: 'VPButton', label: '查看资源总览', href: '/resources/', theme: 'alt' },
    { component: 'a', label: '直接浏览规则目录', href: '#catalog', theme: 'alt' },
  ],
};

export const heroStats = [
  { label: '规则', value: '--' },
  { label: '路径', value: '3' },
  { label: '资源分组', value: '4' },
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
    outcomes: ['理解规则定位', '挑选首批规则'],
  },
  {
    kicker: '路径二 · 迁移现有约束',
    title: '把已有约定迁到可审视的规则库',
    summary: '适合已经有 prompts、checklists 或团队口头约定的团队，把分散经验迁移成可维护的规则资产。',
    href: '/pathways/',
    cta: '查看迁移路径',
    outcomes: ['梳理现有约束', '沉淀仓库契约'],
  },
  {
    kicker: '路径三 · 维护与扩展',
    title: '为长期维护建立策展与治理节奏',
    summary: '适合已经采用规则的维护者，围绕 Pages、OpenSpec 与生成脚本建立持续更新流程。',
    href: '/pathways/',
    cta: '查看维护路径',
    outcomes: ['同步站点内容', '控制规则漂移'],
  },
];

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
    href: '/resources/',
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
    href: '/resources/',
    cta: '查看采用材料',
    items: ['采用路径', '分类筛选', '复制接入'],
  },
  {
    title: '维护者触点',
    summary: '为贡献者保留脚本、生成物与策展边界，确保站点内容和根目录规则同步。',
    href: '/resources/',
    cta: '查看维护资源',
    items: ['build:catalog', 'rules.json 生成物', '仓库契约'],
  },
];

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
