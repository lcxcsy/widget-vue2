/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 10:46:48
 * @LastEditTime: 2021-11-08 11:28:41
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
// import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCompositionAPI)

// 连接websocket
// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: SocketIO(process.env.VUE_APP_WS, {
//     query: {
//       name: 'Client',
//       userId: Math.random()
//     }
//   })
// }))

components.map(({ install }) => {
  install(Vue)
})

const initApp = function () {
  new Vue(
    {
    // WebSocket 连接
    // sockets: {
    //   connect: function () {
    //     console.log('socket connected')
    //   }
    // },
      router,
      render: h => h(App)
    }).$mount('#app')
}

initApp()
