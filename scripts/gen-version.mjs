// Generates src/generated/version.ts from package.json so the published CLI
// never reads the filesystem at startup. package.json stays the single
// source of truth for the version number.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { version } = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const outDir = join(root, 'src', 'generated');

mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, 'version.ts'),
  `// GENERATED FILE - do not edit. Run \`npm run gen:version\`.\nexport const VERSION = '${version}';\n`,
  'utf8',
);
