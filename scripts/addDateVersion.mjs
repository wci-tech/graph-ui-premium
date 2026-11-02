import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const date = new Date();
const stamp =
  date.getFullYear().toString() +
  String(date.getMonth() + 1).padStart(2, '0') +
  String(date.getDate()).padStart(2, '0');

// Remove existing date stamps if present
const baseVersion = pkg.version.replace(/-\d{8}$/, '');
const nextVersion = `${baseVersion}-${stamp}`;

if (pkg.version !== nextVersion) {
  pkg.version = nextVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('✔ Version updated:', pkg.version);
} else {
  console.log('✔ Version already up to date:', pkg.version);
}
