const {merge} = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
  output: {
    publicPath: "/"
  },
  devServer: {
      port: 8800,
      historyApiFallback: true,
      hot: true,
      proxy: {
          '/api': {
            target: 'http://localhost:3001',
          },
        },
  },

  mode: "development",
  devtool: 'inline-source-map'
})