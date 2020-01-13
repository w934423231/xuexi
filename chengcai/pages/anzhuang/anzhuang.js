// pages/anzhuang/anzhuang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuju:[{
        img: "/img/12.png",
        names: "待付款",
        check:true
      },
      {
        img: "/img/12.png",
        names: "待发货",
        check:false
      },
      {
        img: "/img/12.png",
        names: "待收货",
        check:false
      },
      {
        img: "/img/12.png",
        names: "已完成",
        check:false
      },
      {
        img: "/img/12.png",
        names: "退货退款",
        check:false
      }]
  },
   dingdanye(e){
    let that=this
    for (var key in this.data.shuju) {
      let shuju='shuju['+ key + '].check'
      that.setData({
        [shuju]:false
      })
    }
    let  num='shuju['+e.currentTarget.dataset.index+'].check'
    this.setData({
      [num]:true
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