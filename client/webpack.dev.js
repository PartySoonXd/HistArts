const {merge} = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
    output: {
        publicPath: "/"
    },
    devServer: {
        host: "0.0.0.0",
        port: 8088,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': 'http://0.0.0.0:3001'
        }
    },
    mode: "development",
    devtool: 'inline-source-map'
})