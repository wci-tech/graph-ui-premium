import { execSync } from 'child_process';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = pkg.version;

if (!version) {
  console.error('❌ package.json has no version');
  process.exit(1);
}

console.log(`📦 Publishing version ${version} to GitHub Packages`);

execSync(`yarn publish --new-version ${version} --access=restricted`, { stdio: 'inherit' });

console.log('✅ Publish completed');
