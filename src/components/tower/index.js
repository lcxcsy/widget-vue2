/*
 * @Author: your name
 * @Date: 2021-09-09 20:17:22
 * @LastEditTime: 2021-09-10 11:57:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\components\tower\index.js
 */
import CustomTower from './src/index'

const install = function (Vue) {
  Vue.component(CustomTower.name, CustomTower)
}

export default { install }
