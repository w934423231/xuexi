// pages/dingdanye/dingdanye.js
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    shuju:[],
    dingdanshuju:[],
    uid:0
  },
   dingdanye(e){
    let that=this
    for (var key in this.data.shuju) {
      let shuju='shuju['+ key + '].check'
      that.setData({
        [shuju]:false
      })
    }
    that.setData({
      index:e.currentTarget.dataset.index+1
    })
    let  num='shuju['+e.currentTarget.dataset.index+'].check'
    this.setData({
      [num]:true
    })
    that.getdingdan()
  },
  getdingdan(){
    var that=this
    requst.postRequest(url.dingdanxiangqing,{ 
      index:that.data.index,
      uid:that.data.uid
    }).then(function(res) {
          that.setData({
            dingdanshuju:res.data
          })
        }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    this.setData({
      shuju:JSON.parse(options.shuju)
    })
    var getstorage=wx.getStorageSync('data')
    if(getstorage!==''){
      that.setData({
        uid:getstorage.uid
      })
    }
    for (var key in this.data.shuju) {
     if(this.data.shuju[key].check==true){
       that.setData({
         index:that.data.shuju[key].index,
       })  
       that.getdingdan()
     }
    }
   
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