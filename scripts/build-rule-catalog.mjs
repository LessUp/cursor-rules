import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { buildCatalog } from './lib/rule-catalog.mjs';

const rootDir = process.cwd();
const outputPath = path.join(rootDir, 'docs/assets/rules.json');
const catalog = await buildCatalog(rootDir);

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

console.log(`Wrote ${path.relative(rootDir, outputPath)} (${catalog.length} rules)`);
