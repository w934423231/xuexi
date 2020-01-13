import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import socketio from 'vue-socket.io'
// eslint-disable-next-line new-cap
Vue.use(new socketio({
  debug: true,
  connection: 'http://localhost:8000'
}))
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
