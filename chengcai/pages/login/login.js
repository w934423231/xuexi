// pages/login/login.js
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: "",
    pwd: ""
  },
  user(e) {
    let that = this;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (e.detail.value.length == 0) {
      wx.showToast({
        title: "输入的手机号为空",
        icon: "success",
        duration: 1500
      });
      return false;
    } else if (e.detail.valuelength < 11) {
      wx.showToast({
        title: "手机号长度有误！",
        icon: "success",
        duration: 1500
      });
      return false;
    } else if (!myreg.test(e.detail.value)) {
      wx.showToast({
        title: "手机号有误！",
        icon: "success",
        duration: 1500
      });
      return false;
    } else {
      wx.showToast({
        title: "填写正确",
        icon: "success",
        duration: 1500
      });
      that.setData({
        user: e.detail.value
      });
    }
  },
  pwd(e) {
    this.setData({
      pwd: e.detail.value
    });
  },
  login() {
    let that = this;
    requst.postRequest(url.login, {
        user: that.data.user,
        pwd: that.data.pwd
      })
      .then(res => {
        if (res.data.stutas == 200) {
          wx.setStorageSync("data", res.data);
          wx.showToast({
            title: res.data.message,
            icon: "success",
            duration: 1500
          });
          wx.navigateBack({
            delta: 1
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "success",
            duration: 1500
          });
        }
      });
  },
  zuche() {
    wx.navigateTo({
      url: "/pages/zuche/zuche"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
