import {
  getToken,
  setToken,
  getRoles,
  setRoles
} from '../utils/token'

const user = {
  state: {
    uname: getToken(),
    unum: 0,
    roles: getRoles()
  },
  actions: {
    logins ({
      commit
    }, fromData) {
      return new Promise((resolve, reject) => {
        commit('changeunames', 'admin')
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
    appdnums ({
      commit
    }) {
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
