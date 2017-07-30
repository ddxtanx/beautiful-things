const path = require('path');
const webpack = require('webpack');
const plugins = (process.env.build==="production")?([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      warnings: false,
      parallel:true
    })
  ]):[];
module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
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
        path.resolve(__dirname, "server"),
        path.resolve(__dirname, "cache")
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loaders:['style-loader', 'css-loader']
    }]
  },
  plugins
};