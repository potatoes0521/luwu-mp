// eslint-disable-next-line import/no-commonjs
const path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {},
  h5: {},
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
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
    '@assets': path.resolve(__dirname, '..', 'src/assets'),
  },
}
