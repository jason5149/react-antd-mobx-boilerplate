const Merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const base = require('./build/base')
const devClient = require('./build/dev-client')
const devServer = require('./build/dev-server')
const dev = require('./build/dev')
const fat = require('./build/fat')
const uat = require('./build/fat')
const pro = require('./build/pro')

const env = process.env.APP_ENV
const mode = process.env.NODE_ENV

const smp = new SpeedMeasurePlugin()

module.exports = () => {
  let result

  switch (env) {
    case 'dev':
      result =
        mode === 'development'
          ? Merge(base, devClient, devServer)
          : Merge(base, dev)
      break
    case 'fat':
      result = Merge(base, fat)
      break
    case 'uat':
      result = Merge(base, uat)
      break
    case 'pro':
      result = Merge(base, pro)
      break
    default:
      break
  }

  return smp.wrap(result)
}
