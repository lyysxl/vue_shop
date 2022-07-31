import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入全局样式表
import './assets/css/global.css'
import request from './api/request'
import * as api from './api'
Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$api = window.api = api
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
