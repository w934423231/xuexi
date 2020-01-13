// pages/callback/callback.js
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      productlist:[
     
    ],
    idx:0,
  focus: false,
    inputValue: ''
  },
  bindButtonTap: function () {
  this.setData({
    focus: true
  })
},
 catechange(e) {
      wx.navigateTo({
        url: '/pages/xiangqing/xiangqing?cateid=' + JSON.stringify(e.currentTarget.dataset.index)
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this
    requst.postRequest(url.shopdata,{
      catename: JSON.parse(options.cateid).catename
    }).then(
     function(res) {
      that.setData({
        productlist:res.data
      })
     }
    )
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