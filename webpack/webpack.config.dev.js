const Path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  ...require("./webpack.config"),
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: Path.resolve(__dirname, "../src/index.html")
    })
  ],
  devServer: {
    port: 8080,
    liveReload: true,
    client: {
      overlay: true
    },
    static: [
      {
        directory: Path.join(__dirname, "../release")
      }
    ]
  }
}