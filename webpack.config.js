var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
  context: APP_DIR,
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel',
        query: {
          presets: ['es2017', 'react']
        }
      }
    ]
  },
  devServer: {
      historyApiFallback: true
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;