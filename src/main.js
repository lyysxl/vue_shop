import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 引入全局样式表
import './assets/css/global.css'
import request from './api/request'
Vue.config.productionTip = false
Vue.prototype.$http = request

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
