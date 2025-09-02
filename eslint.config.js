import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { "allowShortCircuit": true, "allowTernary": true }
      ],
      "curly": ["error", "all"],
      "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": false }],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/semi": ["error", "never"],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
      "@stylistic/semi-spacing": "error",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "never", prev: ["case", "default"], next: "*" }
      ],
      "@stylistic/space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }],
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/type-annotation-spacing": "error",

      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/arrow-spacing": ["error"],
      "@stylistic/member-delimiter-style": ["error", {

        "multiline": {
          "delimiter": "semi",
          "requireLast": true
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false
        },
        "multilineDetection": "brackets"
      }]
    }
  },
])
