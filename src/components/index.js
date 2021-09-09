/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 14:32:47
 * @LastEditTime: 2021-09-09 14:34:24
 * @LastEditors: Please set LastEditors
 * @Description: 注册所有的子组件
 * @FilePath: \widget-vue2\src\components\index.js
 */
const r = require.context('./', true, /.index.js$/)
const components = []
r.keys().map(item => {
  if (item === './index.js') {
    return
  }
  components.push(r(item).default)
})
export default components
