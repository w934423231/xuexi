// pages/order/order.js
var url = require("../../utils/requsturl");
var requst = require("../../utils/requstmethod");
let app = getApp()
var time = require('../../utils/utils');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderdata: [],
    status: [
      {
        title: "以支付"
      },
      {
        title: '未支付'
      },
      {
        title: '以接收'
      },
      {
        title: '未接收'
      },
      {
        title: '已评价'
      },
      {
        title: '未评价'
      }
    ]
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
    requst.postRequest(url.selectorder, {
      uid: wx.getStorageSync('userlogin').userid
    }).then(res => {
      if (res.data.status == 200) {
        for (const key in res.data.data) {
         res.data.data[key].time=time.formatTime(res.data.data[key].shoplist,'Y/M/D h:m:s')
        }
        this.setData({
          orderdata: res.data.data
        })
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
    // 显示顶部刷新图标  
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    requst.postRequest(url.selectorder, {
      uid: wx.getStorageSync('userlogin').userid
    }).then(res => {
      if (res.data.status == 200) {
        for (const key in res.data.data) {
         res.data.data[key].time=time.formatTime(res.data.data[key].shoplist,'Y/M/D h:m:s')
        }
        this.setData({
          orderdata: res.data.data
        })
        wx.hideLoading();
      }
    })
  },
  // 上拉加载
  onReachBottom: function () {
    console.log("我在上拉");
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