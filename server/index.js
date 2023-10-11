const path = require("path")

require("ignore-styles");

require("@babel/register")({
  extensions: ['.js', '.jsx', '.ts'],
  configFile: path.resolve(__dirname, "../babel.config.js")
});

require("./express.js");