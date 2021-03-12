module.exports = {
  extends: ['airbnb-typescript-prettier'],
  ignorePatterns: ['.eslintrc.js'],
  // Rules can be here to override the preset of eslint from airbnb, if they are too strict.
  rules: {
    camelcase: 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // We override and only check for ts files
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // Avoids throwing an error when setting props to {}
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    // Should we keep the warning for consoles ?
    'no-console': 'off',
    
    'react/no-array-index-key': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/destructuring-assignment': 0,
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 0,
    'react/require-default-props': 'off',
    // 'react/prop-types': 0, -> this is an example
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
      },
    },
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['warn'],
      },
    },
  ],
};
