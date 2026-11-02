import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const version = pkg.version.replace(/-\d{8}$/, '');

const date = new Date();
const stamp =
  date.getFullYear().toString() +
  String(date.getMonth() + 1).padStart(2, '0') +
  String(date.getDate()).padStart(2, '0');

const tag = `v${version}-${stamp}`;

try {
  // Create tag locally
  execSync(`git tag ${tag}`, { stdio: 'inherit' });
  console.log(`✔ Created tag ${tag}`);

  // Push ONLY this tag
  execSync(`git push origin ${tag}`, { stdio: 'inherit' });
  console.log(`✔ Pushed tag ${tag}`);
} catch (err) {
  console.error(`❌ Failed to create or push tag ${tag}`);
  process.exit(1);
}
