import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { buildCatalog } from './lib/rule-catalog.mjs';

const rootDir = process.cwd();
const outputPath = path.join(rootDir, 'docs/assets/rules.json');
const sitemapPath = path.join(rootDir, 'docs/sitemap.xml');
const baseUrl = 'https://lessup.github.io/cursor-rules/';

const catalog = await buildCatalog(rootDir);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

console.log(`Wrote ${path.relative(rootDir, outputPath)} (${catalog.length} rules)`);

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

