/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 13:47:55
 * @LastEditTime: 2021-09-09 13:47:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\router.config.js
 */
export default [
  {
    path: '/',
    redirect: '/hello'
  }, {
    name: 'Hello',
    path: '/hello',
    component: 'Hello'
  }
]
