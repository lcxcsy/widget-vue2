/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 11:25:38
 * @LastEditTime: 2021-10-20 10:46:39
 * @LastEditors: Please set LastEditors
 * @Description: VUE的配置
 * @FilePath: \widget-vue2\vue.config.js
 */
const path = require('path')

module.exports = {
  publicPath: './',
  assetsDir: process.env.VUE_APP_ASSETS,
  // 生产环境下关闭SourceMap
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
      .set('public', path.join(__dirname, 'public'))
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/styles/index.scss';` // 全局样式
      }
    }
  },
  // 用于生产模式下前后端联调
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
