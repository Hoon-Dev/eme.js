const Path = require("path");

const version = process.env.npm_package_version;

module.exports = {
  entry: {
    eme: Path.resolve(__dirname, "../src/index.ts")
  },
  output: {
    filename: `[name].${version}.js`,
    path: Path.resolve(__dirname, "../release"),
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
      optionalChaining: false,
      templateLiteral: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  }
}