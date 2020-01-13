// pages/dingdan/dingdan.js
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({
  data: {
    pitchsite: [],
    shuju: [],
    dingdanshuju: [],
    uid:0
  },
  /**
   * 页面的初始数据
   */

  tioazuan() {
    wx.navigateTo({
      url: '/pages/site/site'
    })
  },
  submit() {
    let that=this
    wx.showModal({
      title: '提示',
      content: '是否前去支付',
      success(res) {
        if (res.confirm) {
          console.log('确定支付')
          requst.postRequest(url.dingdanshuju,{
            pname: that.data.shuju[0].showName,
              pid: that.data.shuju[0].pid,
              otime: Date.parse(new Date()),
              uid:that.data.uid,
              ostatus:'2',
              onum: that.data.shuju[0].num,
              oprice: that.data.shuju[0].num * that.data.shuju[0].price,
              sprice: that.data.shuju[0].price,
              pics:that.data.shuju[0].pics
          })
        } else if (res.cancel) {
          wx.showModal({
            title: '提示',
            content: '取消支付并且添加到未支付订单内',
            success(res) {
              if (res.confirm) {
                requst.postRequest(url.dingdanshuju,{
                  pname: that.data.shuju[0].showName,
                    pid: that.data.shuju[0].pid,
                    otime: Date.parse(new Date()),
                    uid: that.data.uid,
                    ostatus: '1',
                    onum: that.data.shuju[0].num,
                    oprice: that.data.shuju[0].num * that.data.shuju[0].price,
                    sprice: that.data.shuju[0].price,
                    pics: that.data.shuju[0].pics
                })
              } else if (res.cancel) {
                return false
              }
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shuju: JSON.parse(options.cateid)
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function() {
    let pitchsite = wx.getStorageSync('pitchsite')
    console.log(pitchsite)
    this.setData({
      pitchsite: pitchsite
    })
    let uid=wx.getStorageSync('data')
    this.setData({
      uid:uid.uid
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})