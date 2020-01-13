const getters = {
  getnum: state => state.app.unum,
  getname: state => state.app.uname,
  getusernum: state => state.user.unum,
  getusername: state => state.user.uname,
  addRouter: state => state.permission.addRouter
}
export default getters
