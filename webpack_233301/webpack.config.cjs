const path = require('path')
const { argv } = require('process')

module.exports = (env, args) => {
    const { mode } = argv;
    const isProduction = mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            filename: isProduction ? '[name].[contenthash].js' : 'main.js',
            path: path.resolve(__dirname, 'build')
        }
    }
}