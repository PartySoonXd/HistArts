const {merge} = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
    devServer: {
        port: 8088,
        historyApiFallback: true,
        hot: true,
        proxy: {
            '/api': 'http://localhost:3001'
        }
    },
    mode: "development",
    devtool: 'inline-source-map'
})