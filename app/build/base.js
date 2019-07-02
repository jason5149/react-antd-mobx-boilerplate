const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = require('../project.config')

const mode = process.env.NODE_ENV
const env = process.env.APP_ENV
const { outputDir, publicPath, alias } = config

const output = {
  path: outputDir,
  publicPath,
}

const rules = [
  {
    test:    /\.(js|jsx)$/,
    use:     ['babel-loader', 'eslint-loader'],
    include: [
      path.resolve('src'),
      path.resolve('node_modules', 'react-utils-components'),
    ],
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use:  [
      'style-loader',
      {
        loader:  MiniExtractPlugin.loader,
        options: {
          hmr: mode === 'development',
        },
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  },
]

const resolve = {
  extensions: ['.js', '.jsx', '.json'],
  alias,
}

const optimization = {
  runtimeChunk: 'single',
  minimizer:    [
    new OptimizeCssAssetsPlugin({
      cssProcessor:        require('cssnano'),
      cssProcessorOptions: {
        safe: true,
      },
    }),
  ],
  splitChunks: {
    cacheGroups: {
      vendor: {
        name:     'vendor',
        test:     /node_modules/,
        chunks:   'initial',
        priority: 10,
        enforce:  true,
      },
      common: {
        name:               'common',
        chunks:             'initial',
        minChunks:          2,
        maxInitialRequests: 5,
        minSize:            0,
      },
    },
  },
}

const performance = {
  hints: false,
}

const plugins = [
  new webpack.NamedChunksPlugin(),
  new HtmlWebpackPlugin({
    filename: `${ outputDir }/index.html`,
    template: path.resolve('public', 'index.ejs'),
    env,
  }),
]

module.exports = {
  mode,
  output,
  module: {
    rules,
  },
  resolve,
  optimization,
  performance,
  plugins,
}
