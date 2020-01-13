// pages/dingdan/site/site.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:[
      {
        name:'李野',
        tel:19919910664,
        address:'北京市石景山区噢噢噢噢',
        defaul:'默认地址',
      },
      {
        name: '张飞',
        tel: 17600531655,
        address: '濮阳市飞龙区噢噢噢噢',
        defaul: '默认地址',
      }
    ],
    pitchsite:[],
    idx:0
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

  },
  back(e){
    console.log(e.currentTarget.dataset.idx)
    // wx.setStorage({
    //   key: 'pitchsite',
    //   data: 'pitchsite'
    // })
 
    let that=this
    let idx=e.currentTarget.dataset.idx;
   this.setData({
        pitchsite:that.data.site[idx]
      })
    console.log(this.data.pitchsite)
    wx.setStorageSync('pitchsite', this.data.pitchsite)
    wx.navigateBack({
      url: '../dingdan'
    })
 
  }
})