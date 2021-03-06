var path = require('path')
function resolve(dir) {
  console.log(__dirname)
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('base', resolve('src/base'))
      .set('api', resolve('src/api'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [resolve('src/common/stylus/variable'), resolve('src/common/stylus/mixin')]
    }
  }
}
