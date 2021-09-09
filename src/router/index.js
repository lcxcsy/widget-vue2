/*
 * @Author: your name
 * @Date: 2021-09-09 11:25:06
 * @LastEditTime: 2021-09-09 14:37:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

import routerConfig from '@/router.config.js'

Vue.use(Router)

const createRoute = (router) => {
  return router.reduce((preRouters, curRouter) => {
    preRouters.push(processRouteObj(curRouter))
    return preRouters
  }, [])
}

const processRouteObj = ({ component, children, ...args }) => {
  return Object.assign({
    component: () => import(`@/pages/${component}`),
    children: children ? createRoute(children) : []
  }, args)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: createRoute(routerConfig)
})