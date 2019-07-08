const path = require('path')
const pkg = require('./package.json')

const ENV = process.env.APP_ENV || 'dev'
const options = {
  pro: {
    assetsRoot:       path.resolve(__dirname, './dist/PRO', pkg.version),
    // assetsPublicPath: `https://m.hellobike.com/${ pkg.name }/PRO/${ pkg.version }/`,
    assetsPublicPath: '/',
  },
  uat: {
    assetsRoot:       path.resolve(__dirname, './dist/UAT', pkg.version),
    // assetsPublicPath: `https://m.hellobike.com/${ pkg.name }/UAT/${ pkg.version }/`,
    assetsPublicPath: '/',
  },
  fat: {
    assetsRoot:       path.resolve(__dirname, './dist/FAT', pkg.version),
    // assetsPublicPath: `https://m.hellobike.com/${ pkg.name }/FAT/${ pkg.version }/`,
    assetsPublicPath: '/',
  },
  dev: {
    assetsRoot:       path.resolve(__dirname, './dist/DEV', pkg.version),
    assetsPublicPath: '/',
  },
}

const config = options[ENV] || options.dev

if (process.env.APP_ENV !== 'dev') {
  process.env.NODE_ENV = 'production'
}

module.exports = {
  outputDir:     config.assetsRoot,
  publicPath:    config.assetsPublicPath,
  devClientPort: 8080,
  proxy:         {
    '/api': {
      target:       'http://47.111.84.218:10000',
      changeOrigin: true,
      pathRewrite:  {
        '^/api': '',
      },
    },
  },
  apiHost: {
    dev: '',
    fat: '',
    uat: '',
    pro: '',
  },
  alias: {
    '@':           path.resolve('src'),
    '@api':        path.resolve('src', 'api'),
    '@assets':     path.resolve('src', 'assets'),
    '@components': path.resolve('src', 'components'),
    '@models':     path.resolve('src', 'models'),
    '@pages':      path.resolve('src', 'pages'),
    '@routes':     path.resolve('src', 'routes'),
    '@styles':     path.resolve('src', 'styles'),
    '@utils':      path.resolve('src', 'utils'),
  },
}
