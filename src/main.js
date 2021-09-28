/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 10:46:48
 * @LastEditTime: 2021-09-28 11:15:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \widget-vue2\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import components from '@/components/index'
import ElementUI from 'element-ui'
import VueCompositionAPI from '@vue/composition-api'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCompositionAPI)
components.map(({ install }) => {
  install(Vue)
})

const initApp = function () {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

initApp()
