module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    indent: ['error', 2, { ignoredNodes: ['PropertyDefinition'] }],
    quotes: ['error', 'single'],
    'key-spacing': 'warn',
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
    'no-useless-escape': 0,
    'no-undef': 0,
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'off',
  }
}
