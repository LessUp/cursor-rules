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

// 生成规则 Markdown 页面供 VitePress 索引
const zhRulesDir = path.join(rootDir, 'docs/zh/rules');
const enRulesDir = path.join(rootDir, 'docs/en/rules');
await fs.mkdir(zhRulesDir, { recursive: true });
await fs.mkdir(enRulesDir, { recursive: true });

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

  const zhPagePath = path.join(zhRulesDir, `${rule.slug}.md`);
  const enPagePath = path.join(enRulesDir, `${rule.slug}.md`);

  await fs.writeFile(zhPagePath, pageFrontmatter + body);
  await fs.writeFile(enPagePath, pageFrontmatter + body);
}

console.log(`Wrote ${catalog.length} rule pages to docs/zh/rules/ and docs/en/rules/`);

// Generate sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}zh/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}en/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${catalog.map(rule => `  <url>
    <loc>${baseUrl}zh/rules/${rule.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}en/rules/${rule.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>
`;

await fs.writeFile(sitemapPath, sitemap);
console.log(`Wrote ${path.relative(rootDir, sitemapPath)}`);
