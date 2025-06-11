import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/node_modules',
    '**/dist',
    '**/build',
    '**/coverage',
    '**/.husky',
    '**/package.json',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/.prettierrc',
    '**/.prettierignore',
    '**/.gitignore',
    '**/webpack.config.ts',
    '**/public',
  ]),
  {
    extends: compat.extends('eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'),
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },

    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
    },
  },
]);
