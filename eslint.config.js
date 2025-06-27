import configJS from '@maikovskii-danil/eslint-config-js';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist', 'eslint.config.js']),
  {
    files: ['**/*.{js,ts,vue}'],
    extends: [
      configJS.configs.core,
      configJS.configs.linterOptionsDefault,
      configJS.configs.languageOptionsDefault,
      tseslint.configs.recommended,
    ],
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    files: ['**/*.vue'],
    extends: [pluginVue.configs['flat/recommended']],
    rules: {
      'no-useless-assignment': 0,
      'vue/singleline-html-element-content-newline': 0,
      'vue/html-self-closing': 0,
    },
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
]);
