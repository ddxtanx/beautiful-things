const path = require('path');
const webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: '[name].[hash].js',
  }),

  /**
  * HtmlWebpackPlugin will make sure out JavaScript files are being called
  * from within our index.html
  */
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './public/index.template.html'),
    filename: path.join(__dirname, './public/index.html'),
    inject: 'body',
  })
];
if(process.env.build==="production"){
  plugins = plugins.concat([
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
  new webpack.optimize.AggressiveMergingPlugin()
])}
module.exports = {
  entry: {
    app: path.join(__dirname, './src/'),
    vendor: ['react', 'react-dom', 'react-router'],
  },
  cache: true,
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, './public/dist/'),
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