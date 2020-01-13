import { getToken, setToken, getRoles, setRoles } from '../utils/auto'

const app = {
  state: {
    uname: getToken(),
    unum: 0,
    roles: getRoles()
  },
  actions: {
    login ({commit}, fromData) {
      return new Promise((resolve, reject) => {
        commit('changeuname', 'admin')
        setRoles('admin')
        let reg = {
          status: 200,
          data: {
            token: 'lietubaba'
          }
        }
        resolve(reg)
      })
    },
    appdnum ({commit}) {
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
