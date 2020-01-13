// pages/my/my.js
let app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlogin: {
      // username: 'lietu',
      // userpics: '../image/index/userlogin.png'
    }
  },
  login(){
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  usermessage() {
    wx.navigateTo({
      url: '/pages/usermassage/usermassage'
    })
  },
  Couponmanagement() {
    wx.navigateTo({
      url: '/pages/Couponmanagement/Couponmanagement'
    })
  },
  DistributionAM() {
    wx.navigateTo({
      url: '/pages/DistributionAM/DistributionAM'
    })
  },
  InstructionsforUse() {
    wx.navigateTo({
      url: '/pages/InstructionsforUse/InstructionsforUse'
    })
  },
  removelogin(){
    wx.removeStorageSync('userlogin')
    this.getStorage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getStorage(){
    var value=wx.getStorageSync('userlogin')
    this.setData({
      userlogin:value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.loggintoken()
    this.getStorage()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})