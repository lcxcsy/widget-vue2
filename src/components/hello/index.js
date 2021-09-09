/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 14:22:09
 * @LastEditTime: 2021-09-09 14:47:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\components\hello\index.js
 */
import HelloWorld from './src/index'

const install = function (Vue) {
  Vue.component(HelloWorld.name, HelloWorld)
}

export default { install }
