import { execSync } from 'child_process';
import fs from 'fs';

const pkgPath = './package.json';
const originalPkg = fs.readFileSync(pkgPath, 'utf8');
const pkg = JSON.parse(originalPkg);

const baseVersion = pkg.version.split('-test')[0];
const dummyVersion = `${baseVersion}-test-${Date.now()}`;

console.log(`<---- Publishing dummy version: ${dummyVersion} ---->`);

try {
  // Step 1: bump version (no git tag)
  execSync(`yarn version --new-version ${dummyVersion} --no-git-tag-version`, {
    stdio: 'inherit',
  });

  // ✅ Yarn v1 publish (uses npm under the hood)
  execSync(`yarn publish --non-interactive --access restricted`, {
    stdio: 'inherit',
  });

  console.log('✅ Dummy publish completed');
} finally {
  fs.writeFileSync(pkgPath, originalPkg);
  console.log('✔ package.json restored to base version');
}

console.log('<---- Dummy publish completed (delete manually later) ---->');
