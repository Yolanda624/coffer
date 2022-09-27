const { name } = require('./package');
const port = 9001;
const path = require("path");

module.exports = {
  // 资料：https://blog.csdn.net/weixin_50462008/article/details/114729737
  // publicPath: `http://localhost:${port}`,
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
    },
    module: {
      rules: [
        {
          test: path.resolve(__dirname, 'node_modules/leader-line/'),
          use: [
            {
              loader: 'skeleton-loader',
              options: {
                procedure: content => `${content}export default LeaderLine`
              }
            }
          ]
        }
      ]
    }

  }
}
