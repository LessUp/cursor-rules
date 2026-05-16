export const homeHero = {
  eyebrow: 'Technical Whitepaper / Architecture Showcase / Project Academy',
  title: 'Present Cursor Rules as a reviewable, adoptable, and maintainable engineering knowledge system.',
  subtitle:
    'The 26 curated `.mdc` rules are framed here as a governed rule library rather than a loose prompt collection. The site guides readers through thesis, curriculum, architecture, research, and then the live catalog.',
  actions: [
    { component: 'VPButton', label: 'Start with the reading map', href: '/en/guides/reading-map' },
    { component: 'VPButton', label: 'Inspect the architecture', href: '/en/architecture/system-overview', theme: 'alt' },
    { component: 'a', label: 'Browse the rule catalog', href: '#catalog', theme: 'alt' },
  ],
}

export const heroStats = [
  { label: 'Rules', value: '26' },
  { label: 'Categories', value: '6' },
  { label: 'LOC', value: '1,721' },
]

export const thesisSection = {
  eyebrow: 'Project Thesis',
  title: 'This is not a bag of prompts; it is a curated rule system for AI-assisted engineering.',
}

export const thesisCards = [
  {
    icon: 'engineering',
    title: 'Root-level rules are the product',
    body: 'The public contract stays with the `.mdc` files at the repository root. The site and scripts exist to explain and project that source of truth.',
  },
  {
    icon: 'philosophy',
    title: 'Rules must be reviewable',
    body: 'Frontmatter, categorization, and markdown structure make the library inspectable instead of magical.',
  },
  {
    icon: 'languages',
    title: 'Adoption needs a reading path',
    body: 'Readers need guided entry points before a catalog becomes useful. That is why the site teaches first and filters second.',
  },
]

export const curriculumSection = {
  eyebrow: 'Learning Path',
  title: 'Guide readers through orientation, academy, architecture, and research before they choose rules.',
  linkLabel: 'Open the reading map',
  linkHref: '/en/guides/reading-map',
}

export const curriculumTracks = [
  {
    kicker: 'Guide',
    title: 'Reading Map',
    href: '/en/guides/reading-map',
    summary: 'Understand what the project is, who it is for, and how to read the site.',
    bullets: ['positioning', 'flow', 'adoption'],
  },
  {
    kicker: 'Academy',
    title: 'Rule Philosophy',
    href: '/en/academy/rule-philosophy',
    summary: 'Explain why a curated rule library is different from a prompt bundle.',
    bullets: ['philosophy', 'reviewability', 'governance'],
  },
  {
    kicker: 'Architecture',
    title: 'System Overview',
    href: '/en/architecture/system-overview',
    summary: 'Trace the path from root `.mdc` files to generated catalog artifacts and Pages output.',
    bullets: ['source of truth', 'pipeline', 'surfaces'],
  },
  {
    kicker: 'Research',
    title: 'Related Work',
    href: '/en/research/related-work',
    summary: 'Place Cursor Rules in context against prompt collections, repo instruction files, and skills.',
    bullets: ['comparisons', 'references', 'evolution'],
  },
]

export const architectureSection = {
  eyebrow: 'Architecture Lab',
  title: 'Separate the source rules, generation pipeline, and presentation layer to keep drift low and trust high.',
}

export const architectureHighlights = [
  {
    icon: 'engineering',
    title: 'Source Rules',
    summary: 'Root `.mdc` files define the real public surface.',
    details: ['root files', 'frontmatter', 'catalog data'],
  },
  {
    icon: 'pathways',
    title: 'Build Pipeline',
    summary: 'Validation and catalog generation scripts convert curated rules into runtime assets and localized shells.',
    details: ['validation', 'json output', 'rule pages'],
  },
  {
    icon: 'resources',
    title: 'Reading Surfaces',
    summary: 'Homepage, academy, architecture, and research each serve a distinct explanatory role.',
    details: ['homepage', 'academy', 'research'],
  },
]

export const researchSection = {
  eyebrow: 'Research Layer',
  title: 'Tie the project to adjacent open-source practice, references, and future evolution.',
  linkLabel: 'Open the research section',
  linkHref: '/en/research/related-work',
}

export const researchHighlights = [
  {
    icon: 'philosophy',
    title: 'Related Work',
    href: '/en/research/related-work',
    summary: 'Compare against prompt collections, repo instruction files, and workflow/skill systems.',
  },
  {
    icon: 'languages',
    title: 'References',
    href: '/en/research/references',
    summary: 'Anchor the design in software architecture and developer-experience literature.',
  },
  {
    icon: 'pathways',
    title: 'Evolution',
    href: '/en/research/evolution',
    summary: 'Show how the rule library could evolve into a stronger governance and adoption system.',
  },
]

export const catalogSection = {
  eyebrow: 'Rule Catalog',
  title: 'Once the thesis and architecture are clear, enter the live rule catalog.',
  resultLabel: 'Results',
  stats: [
    { id: 'stat-rules', label: 'Rules', value: '--' },
    { id: 'stat-categories', label: 'Categories', value: '--' },
    { id: 'stat-global', label: 'Global', value: '--' },
  ],
  quickFilters: [
    { href: '?cat=language', label: 'Languages' },
    { href: '?cat=frontend', label: 'Frontend' },
    { href: '?cat=backend', label: 'Backend' },
  ],
  searchPlaceholder: 'Search rules, descriptions, or file names',
  footer: 'The homepage argues for the library, the docs explain it, and the catalog turns that understanding into adoption.',
  emptyState: {
    title: 'No matching rules',
    subtitle: 'Try another keyword or switch categories.',
  },
  shortcuts: [
    { key: '/', label: 'search' },
    { key: 'Esc', label: 'clear' },
    { key: '1-8', label: 'categories' },
  ],
}
