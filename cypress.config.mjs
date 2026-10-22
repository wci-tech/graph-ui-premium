import path from 'node:path';
import { defineConfig } from 'cypress';
import { defineConfig as defineViteConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  component: {
    specPattern: 'cypress/components/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: defineViteConfig({
        plugins: [react()],
        resolve: {
          alias: {
            '@': path.resolve(process.cwd(), './src'),
          },
        },
      }),
    },
  },
});
