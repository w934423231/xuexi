import Router from '../router/index'
import { getRoles } from '../utils/token'
import store from '../store'
const whiteList = ['/register', '/']
var flag = true
Router.beforeEach((to, from, next) => {
  // ${//to and from are Route Object,next() must be called to resolve the hook}
  if (getRoles() && getRoles() !== null) {
    if (flag) {
      flag = false
      store.dispatch('GenerateRoutes', { admin: 'admin' }).then(res => {
        Router.addRoutes(store.getters.addRouter)
        next({...to, replace: true})
        console.log(Router)
        console.log(1)
      })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/')
    }
  }
})
