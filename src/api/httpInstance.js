/*
 * @Author: 刘晨曦
 * @Date: 2021-09-09 14:58:54
 * @LastEditTime: 2021-09-09 15:30:08
 * @LastEditors: Please set LastEditors
 * @Description: Axios的封装
 * @FilePath: \widget-vue2\src\api\httpInstance.js
 */
import axios from 'axios'
import { Message } from 'element-ui'

const REQUEST_SUCCESS = 0

const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: VUE_APP_CONTEXT
})

// 响应拦截器
http.interceptors.response.use(function (response) {
  // 请求多语言的json文件
  if (/.*\.json$/.test(response.config.url)) {
    return response
  }

  // 对错误进行统一处理
  if (response.data.code !== REQUEST_SUCCESS) {
    if (!response.config.noMsg && response.data.msg) {
      Message.error(response.data.msg)
    }
    return Promise.reject(response)
  } else if (
    response.data.code === REQUEST_SUCCESS &&
    response.config.successNotify &&
    response.config.successMsg
  ) {
    // 弹出成功提示
    Message.success(response.config.successMsg)
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.msg,
    data: response.data.data
  })
}, function (error) {
  switch (error.response.status) {
    case 401:
      Message.error('暂无权限访问，请先登录!')
      break
    case 403:
      Message.error('登录过期，请重新登录!')
      break
    case 404:
      Message.error('访问资源不存在!')
      break
    case 500:
      Message.error('服务器内部错误!')
      break
    default:
      if (Object.prototype.toString.call(error.response.data) === '[object Object]') {
        Message.error(error.response.data)
      }
  }
  return Promise.reject(error)
})

// 请求拦截器
http.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.params = { ...config.params, _t: Date.now() }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
