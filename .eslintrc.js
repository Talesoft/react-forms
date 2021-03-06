module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules:  {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        'react/display-name': 'off',
        'react/prop-types': 'off', // TypeScript does this for us
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};