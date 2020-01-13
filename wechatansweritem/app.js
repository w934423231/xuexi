
App({
  onLaunch: function () {

  },
  onShow(options) {
      // this.loggintoken()
  },
  globalData: {
    userInfo: null,
    address:null,
    shopshuju:null
  },
  loggintoken:function(){
    let value=wx.getStorageSync('userlogin')
    if(!value){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  }
})