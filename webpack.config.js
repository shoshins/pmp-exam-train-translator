const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { version } = require('./package.json');

module.exports = {
    mode: 'production',
    entry: {
        'content': './src/js/content.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    cache: true,
    devtool: 'eval-cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                         { from: './manifest.json' },
                         { from: './src/images' },
                         { from: './src/views' },
                         { from: './src/js/jquery.3.5.1.js', to: "jquery.js" }
                     ]
        })
    ]
};
