module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    "sourceType": "module",
    "project": "tsconfig.json",
    "warnOnUnsupportedTypeScriptVersion": false
  },
  plugins: [
    "prettier",
    "@typescript-eslint", 
    'react-hooks'
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
    'react-hooks/exhaustive-deps': 'error', // For checking hook dependencies
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
  },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.js'],
};
