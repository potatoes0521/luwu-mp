// eslint-disable-next-line import/no-commonjs
const path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
  alias: {
    '@services': path.resolve(__dirname, '..', 'src/services'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@containers': path.resolve(__dirname, '..', 'src/containers'),
    '@utils': path.resolve(__dirname, '..', 'src/utils'),
    '@css': path.resolve(__dirname, '..', 'src/assets/css'),
    '@js': path.resolve(__dirname, '..', 'src/assets/js'),
    '@img': path.resolve(__dirname, '..', 'src/assets/img'),
    '@store': path.resolve(__dirname, '..', 'src/store'),
    '@actions': path.resolve(__dirname, '..', 'src/store/actions'),
    '@config': path.resolve(__dirname, '..', 'src/config'),
  },
}
