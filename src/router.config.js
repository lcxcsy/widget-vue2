/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 13:47:55
 * @LastEditTime: 2021-10-20 10:50:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\router.config.js
 */
export default [
  {
    path: '/',
    redirect: '/home'
  },
  // 首页
  {
    name: 'Home',
    path: '/home',
    component: 'home/index'
  }
]
