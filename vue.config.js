const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件自动引入使用绝对路径
      patterns: [
        path.join(__dirname, './src/assets/styles/mixins.less'),
        path.join(__dirname, './src/assets/styles/variables.less')
      ]
    },
    chainWebpack: (config) => {
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap((options) => Object.assign(options, { limit: 10000 }))
    }
  }
})
