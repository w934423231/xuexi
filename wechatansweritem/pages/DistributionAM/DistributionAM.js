// pages/ DistributionAM/ DistributionAM.js
var url = require("../../utils/requsturl");
var requst = require("../../utils/requstmethod");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null
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
  addaddress() {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this



    wx.setNavigationBarTitle({
      title: '配送地址管理',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });


    requst.postRequest(url.selectaddress, {
      uid: wx.getStorageSync('userlogin').userid
    }).then((res) => {
      console.log(res.data.status)
      if (res.data.status == 200) {
        
        that.setData({
          address:res.data.data
        })


        wx.showToast({
          title: res.data.title,
          duration: 2000,
          icon: 'success'
        });
       
      } else {
        wx.showToast({
          title: res.data.title,
          duration: 2000,
          icon: 'none'
        });
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