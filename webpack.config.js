const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const distDir = path.resolve(__dirname, "dist");
const clientDir = path.resolve(__dirname, "src");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: [path.resolve(clientDir, "index.jsx")],
  output: {
    filename: "bundle.js",
    path: distDir,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-jsx",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      fs: false,
      path: false,
      util: false,
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(clientDir, "public", "index.html"),
      filename: "./index.html",
    }),
    new Dotenv({ systemvars: true }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  devServer: {
    contentBase: distDir,
    host: "0.0.0.0",
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};
