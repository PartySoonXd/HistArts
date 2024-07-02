const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
    target: 'web',
    node: {
        __dirname: false,
    },
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'public/bundle.js',
        assetModuleFilename: 'assets/[hash][ext]',
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(ico|png|jpg|svg|webp)$/,
                type: 'asset/resource',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx|ts)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|less)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({}), 
        new MiniCssExtractPlugin({
            filename: "public/styles.css",
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: 'index.html',
            favicon: "./src/assets/images/favicon.ico",
            minify: false
        }),
        new Dotenv(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    resolve: {
        extensions: [ '.ts', '.jsx', '.css', '.less', '.js' ],
        fallback: {
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "stream": require.resolve("stream-browserify"),
            "buffer": require.resolve("buffer/"),
        }
    },
};
