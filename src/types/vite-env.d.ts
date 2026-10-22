/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STORYBOOK_APP_ENV?: 'dev' | 'qa' | 'uat' | 'prod';
  readonly VITE_APP_ENV?: 'dev' | 'qa' | 'uat' | 'prod';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
