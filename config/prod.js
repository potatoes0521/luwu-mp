// eslint-disable-next-line import/no-commonjs
const path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  weapp: {},
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
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
    '@lib': path.resolve(__dirname, '..', 'src/lib'),
    '@constant': path.resolve(__dirname, '..', 'src/constant'),
    '@store': path.resolve(__dirname, '..', 'src/store'),
    '@shared': path.resolve(__dirname, '..', 'src/shared'),
    '@@cdn': path.resolve(__dirname, '..', 'src/constant/cdn_assets.js')
  },
}
