// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

const isDev = import.meta.dev

export default withNuxt({
  files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],

  rules: {
    // General
    'no-console': isDev ? 'off' : 'warn',
    'no-debugger': isDev ? 'off' : 'warn',
    'no-shadow': 'off',

    // Arrays
    'array-element-newline': ['error', 'consistent'],
    'array-bracket-newline': ['error', 'consistent'],

    // Readability
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'expression', next: 'const' },
      { blankLine: 'always', prev: 'const', next: 'expression' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
      { blankLine: 'always', prev: '*', next: 'multiline-const' },
    ],

    // Vue
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-empty-component-block': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-on-function-call': 'error',
  },
})
