const { resolve } = require('path')
module.exports = {
    stories: ['../stories/**/*.stories.tsx'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: async config => ({
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.(ts|tsx)$/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: {
                                configFile: resolve(__dirname, '..', 'tsconfig.stories.json'),
                            }
                        },
                        {
                            loader: require.resolve('react-docgen-typescript-loader'),
                        },
                    ],
                },
            ],
        },
        resolve: {
            ...config.resolve,
            extensions: [
                ...config.resolve.extensions,
                '.ts',
                '.tsx',
            ],
        },
    }),
}
