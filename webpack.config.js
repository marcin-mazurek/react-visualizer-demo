'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));

var DEBUG = !argv.release;

var GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

var config = {
  output: {
    path: './build/',
    publicPath: './',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? '#inline-source-map' : false,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!!less-loader'
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          stage: 0
        }
      }
    ]
  }
};

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

var appConfig = _.merge({}, config, {
  entry: './src/app.js',
  output: {
    filename: 'app.js'
  },
  plugins: config.plugins.concat([
      new webpack.DefinePlugin(_.merge(GLOBALS, {'__SERVER__': false}))
    ].concat(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  )
});

module.exports = [appConfig];
