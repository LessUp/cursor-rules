export const homeHero = {
  eyebrow: '高级技术白皮书 / 架构展示站 / 项目学院',
  title: '把 Cursor 规则库呈现为可验证、可采用、可维护的工程知识体系。',
  subtitle:
    '26 条经过实践验证的 `.mdc` 规则不只是提示词集合，而是一套可审视的规则工程方法论。站点围绕项目导读、学院化解释、架构拆解、研究背书与动态目录五条主线组织，让严苛面试官和高级开发者都能快速判断它的设计密度。',
  actions: [
    { component: 'VPButton', label: '进入项目导读', href: '/zh/guides/reading-map' },
    { component: 'VPButton', label: '查看系统架构', href: '/zh/architecture/', theme: 'alt' },
    { component: 'a', label: '浏览规则目录', href: '#catalog', theme: 'alt' },
  ],
}

export const heroStats = [
  { label: '规则', value: '26' },
  { label: '分类', value: '6' },
  { label: '代码行', value: '1,721' },
]

export const thesisSection = {
  eyebrow: '项目论题',
  title: '这不是“给 AI 一些提示词”，而是把规则变成工程资产的策展系统。',
}

export const thesisCards = [
  {
    icon: 'engineering',
    title: '规则文件是产品本体',
    body: '仓库根目录的 `.mdc` 文件是对外契约；GitHub Pages、OpenSpec 与生成脚本只负责解释、证明和传播这组工程规则。',
  },
  {
    icon: 'philosophy',
    title: '规则库必须可审视',
    body: '每条规则都有明确 frontmatter、分类与可复用语义，让团队能像审查代码一样审查 AI 协作约束。',
  },
  {
    icon: 'languages',
    title: '采用路径比规则堆叠更重要',
    body: '站点先讲“为什么、何时、如何采用”，再引导读者进入动态目录，避免仓库沦为无序的提示词大卖场。',
  },
]

export const curriculumSection = {
  eyebrow: '学院路径',
  title: '让访客沿着“导读 → 学院 → 架构 → 研究”逐层进入，而不是被导航项淹没。',
  linkLabel: '进入项目导读',
  linkHref: '/zh/guides/reading-map',
}

export const curriculumTracks = [
  {
    kicker: 'Guide',
    title: '项目导读',
    href: '/zh/guides/reading-map',
    summary: '回答”先看什么、后看什么、为什么这套规则值得采用”。',
    bullets: ['定位', '采用顺序', '阅读地图'],
  },
  {
    kicker: 'Academy',
    title: '规则学院',
    href: '/zh/academy/rule-philosophy',
    summary: '把规则方法论、策展模式与常见误区讲清楚，解释库为何能长期维护。',
    bullets: ['哲学', '模式', '反模式'],
  },
  {
    kicker: 'Architecture',
    title: '系统架构',
    href: '/zh/architecture/',
    summary: '展开规则来源、验证脚本、目录生成与展示层之间的数据链路。',
    bullets: ['数据流', '生成物', '契约'],
  },
  {
    kicker: 'Research',
    title: '研究与背书',
    href: '/zh/research/',
    summary: '用相关开源项目、引用文献与演进思考支撑项目说服力。',
    bullets: ['相关工作', '参考文献', '演进路线'],
  },
]

export const architectureSection = {
  eyebrow: '架构实验室',
  title: '把产物层、生成层与展示层拆开，展示这个仓库如何保持低漂移和高可信。',
}

export const architectureHighlights = [
  {
    icon: 'engineering',
    title: 'Source of Truth',
    summary: '根目录 `.mdc` 文件是唯一事实来源，避免文档副本与规则内容分叉。',
    details: ['根目录规则文件', 'frontmatter 校验', '公共分类体系'],
  },
  {
    icon: 'pathways',
    title: 'Build Pipeline',
    summary: 'Node 脚本负责解析、归类、生成 JSON 与规则页壳，把站点变成规则的可视化投影。',
    details: ['validate-rules', 'build-rule-catalog', 'VitePress build'],
  },
  {
    icon: 'resources',
    title: 'Display Surfaces',
    summary: '首页、学院、架构页和动态目录分工明确：一个负责论证，一个负责采用，一个负责检索。',
    details: ['知识链路', '规则目录', 'OpenSpec 入口'],
  },
]

export const researchSection = {
  eyebrow: '研究与参考',
  title: '把项目放进更广的规则工程语境：比较、引用、演进都要能被公开讨论。',
  linkLabel: '进入研究章节',
  linkHref: '/zh/research/',
}

export const researchHighlights = [
  {
    icon: 'philosophy',
    title: '相关工作',
    href: '/zh/research/related-work',
    summary: '将 Cursor Rules 与 Awesome Prompt、Copilot Instructions、Claude Code 技能体系等实践放在同一视野下比较。',
  },
  {
    icon: 'languages',
    title: '参考文献',
    href: '/zh/research/references',
    summary: '通过 HCI、software architecture、developer productivity 领域的论文与文章增强论证密度。',
  },
  {
    icon: 'pathways',
    title: '演进思考',
    href: '/zh/research/evolution',
    summary: '讨论从规则库到治理体系的未来路线：更少漂移、更强验证、更好的采用体验。',
  },
]

export const pathwaysSection = {
  eyebrow: '采用路径图',
  title: '按团队成熟度选择起点，而不是被完整目录淹没。',
  linkLabel: '查看完整采用路径页',
  linkHref: '/pathways/',
}

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
]

export const pathwaysPage = {
  eyebrow: '采用路径总览',
  title: '把“为什么使用规则”翻译成可执行的采用顺序。',
  intro:
    '这页承接首页的路径图，把不同团队阶段需要先看什么、再做什么、最后回到目录选哪些规则串成公开路径。',
  catalogLabel: '直接返回规则目录',
  catalogHref: '/?cat=general#catalog',
}

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
}

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
]

export const resourcesPage = {
  eyebrow: '资源总览',
  title: '把公开入口、OpenSpec 文档和维护触点放在同一张资源地图上。',
  intro:
    '资源页不重复 README，而是把采用过程中真正要跳转的入口组织起来，让访客知道哪里是公开导览，哪里是项目控制文档。',
  catalogLabel: '返回规则目录',
  catalogHref: '/?cat=engineering#catalog',
}

export const catalogSection = {
  eyebrow: '规则目录',
  title: '完成导读、学院与架构阅读后，再进入可执行规则目录。',
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
  footer: '首页负责论证项目定位，学院负责建立共识，架构页负责解释系统，目录页负责完成筛选与复制接入。',
  emptyState: {
    title: '没有匹配的规则',
    subtitle: '试试清空关键词，或者切换到其他分类。',
  },
  shortcuts: [
    { key: '/', label: '搜索' },
    { key: 'Esc', label: '清空' },
    { key: '1-8', label: '切换分类' },
  ],
}

export const docsSection = {
  eyebrow: '技术文档',
  title: '从项目导读到白皮书研究，形成完整的知识链。',
  items: [
    {
      title: '项目导读',
      badge: 'Guide',
      icon: 'pathways',
      href: '/zh/guides/reading-map',
      summary: '解释项目定位、阅读顺序与采用路径，帮助团队在进入目录前建立共识。',
      tags: ['导读', '阅读地图', '采用'],
    },
    {
      title: '规则学院',
      badge: 'Academy',
      icon: 'philosophy',
      href: '/zh/academy/rule-philosophy',
      summary: '系统讲解规则设计哲学、策展模式与协作边界，强调长期可维护性。',
      tags: ['方法论', '模式', '边界'],
    },
    {
      title: '架构实验室',
      badge: 'Architecture',
      icon: 'engineering',
      href: '/zh/architecture/',
      summary: '拆解验证脚本、目录生成、数据契约与展示层，让站点具备架构展示价值。',
      tags: ['架构', '数据流', '设计决策'],
    },
    {
      title: '研究与参考',
      badge: 'Research',
      icon: 'languages',
      href: '/zh/research/',
      summary: '通过相关工作、参考文献与演进思考，为规则库建立学术感与行业语境。',
      tags: ['相关工作', '文献', '演进'],
    },
  ],
}
