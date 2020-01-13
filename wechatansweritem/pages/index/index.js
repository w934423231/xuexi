let app = getApp();

var amapFile = require('../../utils/amap-wx')
var myAmapFun = new amapFile.AMapWX({ key: 'bd4fe80927eba022e299c09c5d862612' });


Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      {
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg'
      },
      {
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg'
      },
      {
        url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg'
      }
    ]
  },
  indexaddress:null,
  diancansystem() {
    wx.navigateTo({
      url: '/pages/Nearbystore/Nearbystore'
    })
  },
  dingwei(){
    wx.showLoading({
      title: '加载中',
    })    
    let that=this
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        that.setData({
          indexaddress:data
        })
        wx.hideLoading()
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.loggintoken()
    wx.showLoading({
      title: '数据加载中',
    })    
    let that=this
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        console.log(data)
        that.setData({
          indexaddress:data
        })
        wx.hideLoading()
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
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