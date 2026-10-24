// import js from '@eslint/js';
// import tsParser from '@typescript-eslint/parser';
// import prettierConfig from 'eslint-config-prettier';
// import importPlugin from 'eslint-plugin-import';
// import simpleImportSort from 'eslint-plugin-simple-import-sort';
// import globals from 'globals';
// import path from 'node:path';
// import tseslint from 'typescript-eslint';
// import reactPlugin from 'eslint-plugin-react';
// const projectTsConfig = path.resolve(process.cwd(), 'tsconfig.json');

// export default [
//   /* --------------------------------------------------
//    * Global ignores (flat-config replacement for .eslintignore)
//    * -------------------------------------------------- */
//   {
//     ignores: [
//       'build/**',
//       'dist/**',
//       'coverage/**',
//       'node_modules/**',

//       // tooling / infra
//       '**/*.config.js',
//       '**/*.config.cjs',
//       '**/*.config.mjs',
//       '**/*.config.ts',
//       '.husky/**',
//       '.storybook/**',
//       '.changeset/**',
//       'scripts/**',

//       // generated
//       '**/*.d.ts',
//     ],
//   },

//   /* --------------------------------------------------
//    * Base JS rules
//    * -------------------------------------------------- */
//   js.configs.recommended,

//   // Disable ESLint formatting rules that conflict with Prettier
//   prettierConfig,

//   /* --------------------------------------------------
//    * TypeScript — SYNTAX ONLY (NO type info)
//    * Applies to ALL TS files by default
//    * -------------------------------------------------- */
//   {
//     files: ['**/*.ts', '**/*.tsx'],
//     languageOptions: {
//       parser: tsParser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tseslint.plugin,
//       react: reactPlugin,
//     },
//     rules: {
//       ...tseslint.configs.recommended.rules,
//       'no-undef': 'off',
//       'no-unused-vars': 'off',
//       'react/no-unknown-property': [
//         'error',
//         {
//           ignore: ['css'], // for Emotion if needed
//         },
//       ],
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
//       ],
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//   },

//   /* --------------------------------------------------
//    * Tests — explicitly NO typed rules
//    * -------------------------------------------------- */
//   {
//     files: ['tests/**/*.ts', '**/*.test.ts'],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         project: projectTsConfig,
//         tsconfigRootDir: process.cwd(),
//       },
//     },
//     rules: {
//       '@typescript-eslint/await-thenable': 'off',
//       '@typescript-eslint/no-misused-promises': 'off',
//       '@typescript-eslint/require-await': 'off',
//     },
//   },

//   {
//     files: ['cypress/**/*.ts', 'cypress/**/*.tsx', '**/*.cy.ts', '**/*.cy.tsx'],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         ...globals.mocha,
//         ...globals.cypress,
//       },
//     },
//     rules: {
//       'no-undef': 'off',
//     },
//   },

//   /* --------------------------------------------------
//    * Source code — ENABLE typed rules (SRC ONLY)
//    * -------------------------------------------------- */
//   {
//     files: ['src/**/*.ts', 'src/**/*.tsx'],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         project: projectTsConfig,
//         tsconfigRootDir: process.cwd(),
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//     },
//     plugins: {
//       '@typescript-eslint': tseslint.plugin,
//       'simple-import-sort': simpleImportSort,
//       import: importPlugin,
//     },
//     settings: {
//       'import/resolver': {
//         typescript: {
//           project: projectTsConfig,
//         },
//         node: {
//           extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         },
//       },
//     },
//     rules: {
//       /* Typed correctness rules */
//       ...tseslint.configs.strictTypeChecked.rules,
//       ...tseslint.configs.stylisticTypeChecked.rules,

//       /* Style / safety */
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/consistent-type-imports': [
//         'error',
//         { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
//       ],

//       /* Import sorting */
//       'simple-import-sort/imports': [
//         'error',
//         {
//           groups: [
//             // 1. React first
//             ['^react'],

//             // 2. External packages
//             ['^@?\\w'],

//             // 3. Internal aliases
//             ['^@/'],

//             // 4. Parent imports
//             ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

//             // 5. Same-folder imports
//             ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

//             // 6. Styles
//             ['^.+\\.?(css|scss|sass)$'],
//           ],
//         },
//       ],

//       /* Import ordering */
//       'simple-import-sort/exports': 'error',

//       /* Import resolution */
//       'import/no-unresolved': 'error',
//       'import/no-duplicates': 'error',

//       /* Type checking */
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
//       ],
//     },
//   },
// ];

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
const projectTsConfig = path.resolve(process.cwd(), 'tsconfig.json');

export default [
  /* --------------------------------------------------
   * Global ignores (flat-config replacement for .eslintignore)
   * -------------------------------------------------- */
  {
    ignores: [
      'build/**',
      'dist/**',
      'coverage/**',
      'node_modules/**',

      // tooling / infra
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
      '.husky/**',
      '.storybook/**',
      '.changeset/**',
      'scripts/**',

      // generated
      '**/*.d.ts',
    ],
  },

  /* --------------------------------------------------
   * Base JS rules
   * -------------------------------------------------- */
  js.configs.recommended,

  // Disable ESLint formatting rules that conflict with Prettier
  prettierConfig,

  /* --------------------------------------------------
   * TypeScript — SYNTAX ONLY (NO type info)
   * Applies to ALL TS files by default
   * -------------------------------------------------- */
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['css'], // for Emotion if needed
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  /* --------------------------------------------------
   * Tests — explicitly NO typed rules
   * -------------------------------------------------- */
  {
    files: ['tests/**/*.ts', '**/*.test.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: projectTsConfig,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
    },
  },

  {
    files: ['cypress/**/*.ts', 'cypress/**/*.tsx', '**/*.cy.ts', '**/*.cy.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.cypress,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },

  /* --------------------------------------------------
   * Source code — ENABLE typed rules (SRC ONLY)
   * -------------------------------------------------- */
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: projectTsConfig,
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: projectTsConfig,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      /* Typed correctness rules */
      ...tseslint.configs.strictTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,

      /* Style / safety */
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      /* Import sorting */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. React first
            ['^react'],

            // 2. External packages
            ['^@?\\w'],

            // 3. Internal aliases
            ['^@/'],

            // 4. Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],

            // 5. Same-folder imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

            // 6. Styles
            ['^.+\\.?(css|scss|sass)$'],
          ],
        },
      ],

      /* Import ordering */
      'simple-import-sort/exports': 'error',

      /* Import resolution */
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',

      /* Type checking */
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];
