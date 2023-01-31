const fs = require('fs')
const path = require('path')

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
)

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: [
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    '@typescript-eslint',
    'jest',
    'testing-library',
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    semi: ['error', 'never'],
    'class-methods-use-this': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'consistent-return': 0,
    'import/no-dynamic-require': 0,
    'import/no-default-export': 'error',
    'import/no-cycle': 'warn',
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 'error',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-curly-newline': 'off',
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'max-len': 0,
    'react-hooks/exhaustive-deps': 1,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 'warn',
    'no-shadow': 0,
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
    'no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': 0,
    'default-case': 1,
    'react/jsx-fragments': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'React default is automatically imported by webpack.',
          },
          {
            name: '@heroicons/react/outline',
            message:
              'Named imports from @heroicons/react/outline is prohibited. Import icons directly (e.g. @heroicons/react/outline/ChatIcon).',
          },
          {
            name: '@heroicons/react/solid',
            message:
              'Named imports from @heroicons/react/solid is prohibited. Import icons directly (e.g. @heroicons/react/solid/ChatIcon).',
          },
        ],
        patterns: [
          {
            group: ['**/dist/*'],
            message: 'Importing from dist directories are not allowed.',
          },
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
          'object',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'packages/*',
            group: 'internal',
          },
          {
            pattern: 'packages/*/**',
            group: 'internal',
          },
          {
            pattern: '@tribeplatform/**',
            group: 'internal',
          },
          {
            pattern: 'components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'containers/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'hooks/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'const/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: 'icons/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'arrow-body-style': 'off',
    'react/jsx-key': ['error'],
  },
  ignorePatterns: [
    '**/dist/**',
    '**/node_modules/**',
    '**/bin/**',
    '**/stack/**',
    '**/tribe-graphql.generated.ts',
    'jest.config.ts',
  ],
  overrides: [
    {
      files: ['**/*.test.*', './utils/test/**/*'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-formatting/recommended',
        'plugin:testing-library/react',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 0,
        'testing-library/no-unnecessary-act': 'error',
        'testing-library/no-await-sync-events': 'error',
        'testing-library/no-wait-for-multiple-assertions': 'error',
        'testing-library/prefer-user-event': 'error',
        'testing-library/await-async-utils': 'error',
        'testing-library/prefer-find-by': 'error',
      },
    },
    {
      files: ['**/*.config.ts'],
      rules: {
        'import/no-default-export': 0,
      },
    },
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'import/no-default-export': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
  settings: {
    'import/ignore': ['node_modules'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
}
