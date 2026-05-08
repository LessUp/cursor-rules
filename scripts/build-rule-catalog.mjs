import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { buildCatalog } from './lib/rule-processor.mjs';
import { validateCatalog } from './lib/schema.mjs';
import { CATEGORIES } from './lib/categories.mjs';

const rootDir = process.cwd();
const rulesOutputPath = path.join(rootDir, 'docs/assets/rules.json');
const categoriesOutputPath = path.join(rootDir, 'docs/assets/categories.json');
const sitemapPath = path.join(rootDir, 'docs/sitemap.xml');
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

// Generate sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${catalog.map(rule => `  <url>
    <loc>${baseUrl}?q=${encodeURIComponent(rule.title)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>
`;

await fs.writeFile(sitemapPath, sitemap);
console.log(`Wrote ${path.relative(rootDir, sitemapPath)}`);
