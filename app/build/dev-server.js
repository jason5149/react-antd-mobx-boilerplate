const webpack = require('webpack')
const config = require('../project.config')

const { outputDir, proxy } = config

module.exports = {
	plugins:   [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		hot:                true,
		port:               8080,
		open:               true,
		proxy,
		inline:             true,
		compress:           true,
		contentBase:        outputDir,
		historyApiFallback: true,
	},
	devtool: '#source-map',
}
