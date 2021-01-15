const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    devServer: {
        contentBase: './public'
    },
    optimization: {
        // 消除未引用的代码（这里并不会在打包后的代码中移除，只是移除了 webpack 文件对它的引用关系）
        usedExports: true,
        // 该配置用于压缩代码，通过usedExports和minimize这两个组合功能，就可以达成在打包后的代码中完全消除未引用代码的目的
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                        },
                    },
                ],
            },
            {
                test: /.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'saltire-ex',
            template: './src/index.html',
            filename: 'index.html',
        }),
    ]
}