import { getToken, setToken, getRoles, setRoles } from '../ulit/auto'
import { userLogin } from '../ulit/methods'
const app = {
  state: {
    uname: getToken(),
    unum: 0,
    roles: getRoles()
  },
  actions: {
    login ({ commit }, fromData) {
      userLogin(fromData).then(res => {
        if (res.status === 200) {
          commit('changeuname', res.roues)
          setRoles('admin')
        }
      })
    },
    appdnum ({ commit }) {
      commit('changeunum')
    }
  },
  mutations: {
    changeuname (state, usename) {
      setToken(usename)
      state.uname = usename
    },
    changeunum (state) {
      state.unum++
      console.log(this.state.app.unum)
    }
  }
}
export default app
