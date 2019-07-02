const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
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
        test: /\.(ttf|oft|woff|eot|svg|TTF|OTF|WOFF|EOT|SVG)$/,
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache:         true,
        parallel:      true,
        terserOptions: {
          ecma:   6,
          mangle: true,
          output: {
            comments: false,
          },
        },
        sourceMap: false,
      }),
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
