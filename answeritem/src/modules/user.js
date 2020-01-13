import {
  getToken,
  setToken,
  getRoles,
  setRoles
} from '../ulit/auto'
import { userLogin } from '../ulit/methods'
const user = {
  state: {
    uname: getToken(),
    unum: 0,
    roles: getRoles()
  },
  actions: {
    logins ({ commit }, fromData) {
      // let that = this
      return new Promise((resolve, reject) => {
        userLogin(fromData).then((result) => {
          console.log(result)
          setToken(result.token)
          setRoles(result.roles)
          resolve(result)
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    appdnums ({ commit }) {
      commit('changeunums')
    }
  },
  mutations: {
    changeunames (state, usename) {
      setToken(usename)
      state.uname = usename
    },
    changeunums (state) {
      state.unum++
      console.log(this.state.app.unum)
    }
  }
}
export default user
