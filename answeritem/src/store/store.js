import Vue from 'vue'
import vuex from 'vuex'
import app from '../modules/app'
import user from '../modules/user'
import getters from '../modules/getters'
import permission from '../modules/permission'
Vue.use(vuex)
const store = new vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters

})

export default store
