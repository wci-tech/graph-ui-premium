export default {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      headerPattern: /^(CUI-\d{4}):\s(feat|fix|docs|style|refactor|test|chore):\s(.+)$/,
      headerCorrespondence: ['ticket', 'type', 'subject'],
    },
  },

  rules: {
    'header-max-length': [2, 'always', 120],
    'type-empty': [0],
    'subject-empty': [0],
    // optional hardening
    'subject-full-stop': [2, 'never', '.'],
  },
};
