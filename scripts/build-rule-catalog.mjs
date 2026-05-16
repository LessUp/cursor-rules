import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { buildCatalog } from './lib/rule-processor.mjs';
import { validateCatalog } from './lib/schema.mjs';
import { CATEGORIES } from './lib/categories.mjs';
import { parseFrontmatter } from './lib/frontmatter.mjs';

const rootDir = process.cwd();
const publicAssetsDir = path.join(rootDir, 'docs/public/assets');
const rulesOutputPath = path.join(publicAssetsDir, 'rules.json');
const categoriesOutputPath = path.join(publicAssetsDir, 'categories.json');
const sitemapPath = path.join(rootDir, 'docs/public/sitemap.xml');
const baseUrl = 'https://lessup.github.io/cursor-rules/';
const localizedRuleTargets = [
  {
    locale: 'zh',
    dir: path.join(rootDir, 'docs/zh/rules'),
    routePrefix: 'zh/rules',
    intro: (fileName) => `> 来源规则：\`${fileName}\`\n\n`,
  },
  {
    locale: 'en',
    dir: path.join(rootDir, 'docs/en/rules'),
    routePrefix: 'en/rules',
    intro: (fileName) => `> Source rule: \`${fileName}\`\n\n`,
  },
];
const staticPages = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: 'zh/', changefreq: 'weekly', priority: '1.0' },
  { path: 'en/', changefreq: 'weekly', priority: '0.9' },
  { path: 'zh/guides/reading-map', changefreq: 'monthly', priority: '0.9' },
  { path: 'zh/academy/rule-philosophy', changefreq: 'monthly', priority: '0.8' },
  { path: 'zh/architecture/system-overview', changefreq: 'monthly', priority: '0.8' },
  { path: 'zh/research/related-work', changefreq: 'monthly', priority: '0.7' },
  { path: 'en/guides/reading-map', changefreq: 'monthly', priority: '0.7' },
  { path: 'en/architecture/system-overview', changefreq: 'monthly', priority: '0.7' },
  { path: 'en/research/related-work', changefreq: 'monthly', priority: '0.6' },
  { path: 'pathways/', changefreq: 'monthly', priority: '0.7' },
  { path: 'resources/', changefreq: 'monthly', priority: '0.7' },
  { path: 'openspec/architecture.html', changefreq: 'monthly', priority: '0.6' },
  { path: 'openspec/ai-tooling.html', changefreq: 'monthly', priority: '0.6' },
  { path: 'openspec/workflow.html', changefreq: 'monthly', priority: '0.6' },
  { path: 'openspec/project-positioning.html', changefreq: 'monthly', priority: '0.5' },
];

const catalog = await buildCatalog(rootDir);

// 验证数据契约
const validationErrors = validateCatalog(catalog);
if (validationErrors.length > 0) {
  console.error('Catalog validation failed:');
  validationErrors.forEach((error) => console.error(error));
  process.exitCode = 1;
  // 仍然继续生成文件，但标记为失败
}

await fs.mkdir(path.dirname(rulesOutputPath), { recursive: true });
await fs.writeFile(rulesOutputPath, `${JSON.stringify(catalog, null, 2)}\n`);

console.log(`Wrote ${path.relative(rootDir, rulesOutputPath)} (${catalog.length} rules)`);

// 生成分类数据供前端使用
await fs.writeFile(categoriesOutputPath, `${JSON.stringify(CATEGORIES, null, 2)}\n`);
console.log(`Wrote ${path.relative(rootDir, categoriesOutputPath)}`);

// 生成规则 Markdown 页面供 VitePress locale 索引
await fs.rm(path.join(rootDir, 'docs/rules'), { recursive: true, force: true });
await Promise.all(
  localizedRuleTargets.map(({ dir }) => fs.mkdir(dir, { recursive: true })),
);

for (const rule of catalog) {
  const filePath = path.join(rootDir, rule.fileName);
  const content = await fs.readFile(filePath, 'utf8');
  const parsed = parseFrontmatter(content, filePath, { allowedKeys: new Set() });
  const body = parsed.body || '';

  const safeTitle = rule.title.replace(/"/g, '\\"');
  const safeDesc = rule.description.replace(/"/g, '\\"');

  const pageFrontmatter = `---
title: "${safeTitle}"
description: "${safeDesc}"
---

`;

  await Promise.all(
    localizedRuleTargets.map(({ dir, intro }) => {
      const pagePath = path.join(dir, `${rule.slug}.md`);
      return fs.writeFile(pagePath, pageFrontmatter + intro(rule.fileName) + body);
    }),
  );
}

console.log(`Wrote ${catalog.length} localized rule pages to docs/zh/rules/ and docs/en/rules/`);

// Generate sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
${localizedRuleTargets.flatMap(({ routePrefix }) =>
  catalog.map(rule => `  <url>
    <loc>${baseUrl}${routePrefix}/${rule.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`),
).join('\n')}
</urlset>
`;

await fs.writeFile(sitemapPath, sitemap);
console.log(`Wrote ${path.relative(rootDir, sitemapPath)}`);
