import type { Options } from 'tsup';

const config: Options = {
  entry: ['src/index.ts'],
  outDir: 'build',
  bundle: true,
  format: ['esm', 'cjs'],
  dts: {
    entry: 'src/index.ts',
    compilerOptions: {
      removeComments: true,
      stripInternal: true,
    },
  },
  sourcemap: false,
  treeshake: true,
  splitting: true,
  clean: true,
  minify: true,
  target: 'es2020',
  skipNodeModulesBundle: true,
  tsconfig: 'tsconfig.build.json',
  loader: {
    '.svg': 'dataurl',
  },
  esbuildOptions(options) {
    options.drop = ['debugger', 'console'];
  },
};

export default config;
