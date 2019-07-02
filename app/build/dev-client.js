const os = require('os');
const webpack = require('webpack');
const Happypack = require('happypack');
const Webpackbar = require('webpackbar');
const MinCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react'],
    bundle: './src/main.js'
  },
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.(jpe?p|png|gif|JPE?G|PNG|GIF)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|eot|TTF|WOFF|EOT)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify('dev')
    }),
    new MinCssExtractPlugin({
      filename: 'css/style.css',
      chunkFilename: 'css/[id].css'
    }),
    new Webpackbar(),
    new Happypack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: Happypack.ThreadPool({
        size: os.cpus().length
      })
    })
  ]
};
