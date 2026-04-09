// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astroPlugin from 'eslint-plugin-astro';

export default [
  // Base JS rules
  eslint.configs.recommended,

  // TypeScript rules for .ts and .tsx files
  ...tseslint.configs.recommended,

  // Astro rules for .astro files
  ...astroPlugin.configs.recommended,

  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'public/admin/**',
    ],
  },

  // Project-specific overrides
  {
    rules: {
      // Allow unused vars prefixed with _ (common pattern for intentionally unused params)
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Allow explicit any in limited cases (tighten later as codebase matures)
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
