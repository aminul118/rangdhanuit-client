const js = require('@eslint/js');
const nextPlugin = require('@next/eslint-plugin-next');
const reactPlugin = require('eslint-plugin-react');
const hooksPlugin = require('eslint-plugin-react-hooks');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      next: nextPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@next/next/no-img-element': 'error',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];
