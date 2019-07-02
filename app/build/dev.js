const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react'],
    bundle: './src/main.js',
  },
  output: {
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(jpe?p|png|gif|JPE?G|PNG|GIF)$/,
        use:  [
          {
            loader:  'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            loader:  'file-loader',
            options: {
              name:       'img/[name].[ext]',
              publicPath: '/',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|eot|TTF|WOFF|EOT)$/,
        use:  [
          {
            loader:  'file-loader',
            options: {
              name:       'font/[name].[ext]',
              publicPath: '/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_ENV: JSON.stringify('dev'),
    }),
    new CleanWebpackPlugin({
      verbose:                       true,
      cleanOnceBeforceBuildPatterns: ['dist'],
    }),
    new MinCssExtractPlugin({
      filename:      'css/style.css',
      chunkFilename: 'css/[id].css',
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          beautify: true,
          comments: false,
        },
        compress: {
          // warnings: false,
          drop_console:  true,
          collapse_vars: false,
          reduce_vars:   false,
        },
      },
    }),
  ],
}
