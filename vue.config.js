const { name } = require('./package');
const port = 9001;

module.exports = {
  publicPath: `http://localhost:${port}`,
  devServer: {
    hot: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    output: {
      library: `${name}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
}
