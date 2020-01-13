import { asyncRouter, myRouter } from '../router'
function filtersAsyncRouter (myRouter, roles) {
  const accessdRouters = myRouter.filter(route => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = filtersAsyncRouter(route.children, roles)
      }
      return true
    } else {
      return false
    }
  })
  return accessdRouters
}
function hasPermission (route, roles) {
  console.log(route, roles)
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.indexOf(role) > 0)
  } else {
    return true
  }
}
const permission = {
  state: {
    routers: asyncRouter,
    addRouter: []
  },
  actions: {
    GenerateRoutes ({commit}, data) {
      console.log(1)
      return new Promise((resolve, reject) => {
        console.log('vuex actions', data)
        const roles = data.admin
        // eslint-disable-next-line no-unused-vars
        let accessdRouters
        if (roles.indexOf('admin') >= 0) {
          accessdRouters = myRouter
        } else {
          accessdRouters = filtersAsyncRouter(myRouter, roles)
        }
        // console.log(accessdRouters)
        commit('SET_ROUTERS', accessdRouters)
        resolve({status: 200})
      })
    }
  },
  mutations: {
    SET_ROUTERS (state, routers) {
      state.addRouter = routers
      state.route = asyncRouter.concat(routers)
    }
  }
}
export default permission
