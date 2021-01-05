const path = require('path');
const fs = require('fs');
const nodeBuiltins = require('builtin-modules');

const lambdaDir = './src';

const externals = ['aws-sdk'].concat(nodeBuiltins).reduce((externals, moduleName) => {
    externals[moduleName] = moduleName;
    return externals;
}, {});

module.exports = {
    entry: ['./src/handler.ts'],
    externals,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: { onlyCompileBundledFiles: true },
                },
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        path: path.join(__dirname, 'dist', lambdaDir),
        libraryTarget: 'commonjs',
        filename: '[name]/handler.js',
    },
    target: 'node',
    optimization: {
        minimize: false,
    },
    devtool: 'inline-cheap-module-source-map',
};
