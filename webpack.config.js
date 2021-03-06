const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const devserver = require('./webpack/devserver');
const js = require('./webpack/js');
const pug = require('./webpack/pug');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATH = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    entry: {
      'index': PATH.source + '/index.js'
    },

    output: {
      path: PATH.build,
      filename: 'js/[name].js'
    },

    resolve: {
      alias: {
        media: path.resolve(__dirname, 'source/media'),
      }
    },

    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({
        filename: 'main.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/main/main.pug'
      }),
      new HtmlWebpackPlugin({
        filename: '1_inner.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/1_inner/1_inner.pug'
      }),
      new HtmlWebpackPlugin({
        filename: '2_inner.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/2_inner/2_inner.pug'
      }),
      new HtmlWebpackPlugin({
        filename: '3_inner.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/3_inner/3_inner.pug'
      }),
      new HtmlWebpackPlugin({
        filename: '4_inner.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/4_inner/4_inner.pug'
      }),
      new HtmlWebpackPlugin({
        filename: '4_b_inner.html',
        chunks: ['index', 'common'],
        template: PATH.source + '/pages/4_b_inner/4_b_inner.pug'
      }),
      // new CopyWebpackPlugin([{
        // from: './locales/**/*',
        // to: './js/'
      // }]),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  js(),
  pug(),
  images(),
  fonts()
]);

module.exports = function (env) {
  if (env === 'development') {
    return merge([
      common,
      devserver(),
      sass(),
      css()
    ]);
  }
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      uglifyJS()
    ]);
  }
};