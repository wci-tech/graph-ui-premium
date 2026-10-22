import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],

    server: {
      deps: {
        inline: ['@wci-tech/core-ui', 'swiper'],
      },
    },

    include: ['test/**/*.test.ts', 'test/**/*.test.tsx'],

    exclude: [
      'node_modules',
      'build',
      'dist',
      'coverage',
      'src/**/*.d.ts',
      'src/**/*.cy.ts',
      'src/**/*.cy.tsx',
      'src/**/*.stories.tsx',
      'src/**/index.ts',
      'src/**/index.tsx',
      'src/**/*.types.ts',
      'src/**/*.styles.ts',
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],

      include: ['src/**/*.ts'],

      exclude: [
        'src/**/*.tsx',
        'src/**/*.d.ts',
        'src/**/*.cy.ts',
        'src/**/*.cy.tsx',
        'src/**/*.stories.tsx',
        'src/**/index.ts',
        'src/**/index.tsx',
        'src/**/*.types.ts',
        'src/**/*.styles.ts',
        'src/**/*.constants.ts',
      ],

      thresholds: {
        lines: 95,
        functions: 95,
        statements: 95,
        branches: 95,
      },
    },
  },
});
