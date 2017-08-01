const path = require('path');
const webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
const plugins = (process.env.build==="production")?([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    warnings: false,
    parallel:true,
    sourceMap: false
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
]):[];
module.exports = {
  entry: './src/index.js',
  cache: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, "app"),
        path.resolve(__dirname, "server")
      ],
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loaders:['style-loader', 'css-loader']
    }]
  },
  plugins
};