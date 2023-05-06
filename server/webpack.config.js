const path = require('path');
//const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  devtool: 'inline-source-map',
  //plugins: [
  //  new webpack.LoaderOptionsPlugin({
  //    // test: /\.xxx$/, // may apply this only for some modules
  //    options: {
  //      webpack: (config, options) => {
  //        config.plugins.push(
  //          new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
  //            resource.request = resource.request.replace(/^node:/, "");
  //          })
  //        );
  //        config.plugins.push(
  //          new webpack.NormalModuleReplacementPlugin(/^node:buffer/, (resource) => {
  //            resource.request = resource.request.replace(/^node:buffer/, "");
  //          })
  //        );
  //        return config;
  //      }
  //    }
  //  })
  //],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};