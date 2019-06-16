import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: 'http://0.0.0.0:3333/'
    })
  }
})
