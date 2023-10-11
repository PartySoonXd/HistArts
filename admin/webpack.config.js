const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin  = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
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
        filename: 'build/bundle.js',
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
            filename: "build/styles.css",
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
        // new TerserPlugin({
        //     terserOptions: {
        //         keep_classnames: true,
        //         keep_fnames: true,
        //     },
        // })
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
    devServer: {
        port: 8800,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': 'http://192.168.1.33:3001'
        }
    },
    // devtool: 'eval-cheap-module-source-map',
    mode: "development",
    devtool: 'source-map'
};
