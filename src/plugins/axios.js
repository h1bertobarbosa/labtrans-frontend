import Vue from 'vue'
import axios from 'axios'
const login = JSON.parse(sessionStorage.getItem('login'))
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
if (login.token) {
  axios.defaults.headers['Authorization'] = 'Bearer ' + login.token
}
Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: 'http://0.0.0.0:3333/'
    })
  }
})
