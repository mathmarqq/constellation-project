module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/prettier',
        'plugin:storybook/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    plugins: ['react-hooks', 'react', '@typescript-eslint'],
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.tsx'],
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/prop-types': 'off',
        'react/function-component-definition': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'] },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        '@typescript-eslint/no-empty-function': 'off',
        'no-restricted-exports': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
    },
}
