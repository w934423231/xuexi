// pages/Nearbystore/Nearbystore.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: '2HKBZ-U6THX-FEF4F-Z2V4E-GQJ6O-M3FTA' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    pageindex: 0,
    value: '',
    Nstore: []
  },
  selectstore(e) {
    this.setData({
      pageindex: e.currentTarget.dataset.index
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  order() {
    wx.navigateTo({
      url: '/pages/Commoditydetails/Commoditydetails?id='+this.data.Nstore[this.data.pageindex].title
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
    let that = this
    that.setData({
      Nstore:[]
    })
    wx.setNavigationBarTitle({
      title: '附近门店',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });

    this.getshopdata()    
  },
  getshopdata(){
    let that=this
    wx.showLoading({
      title: '加载中',
    })
    wx.getLocation({
      success(ress) {
        qqmapsdk.search({
          keyword: '周黑鸭',  //搜索关键词
          location: ress.latitude + ',' + ress.longitude,  //设置周边搜索中心点
          success: function (res) { //搜索成功后的回调
            // console.log(res)
            for (const key in res.data) {
              if (key <= 4) {
                qqmapsdk.calculateDistance({
                  // mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
                  //from参数不填默认当前地址
                  //获取表单提交的经纬度并设置from和to参数（示例为string格式）
                  from: ress.latitude + ',' + ress.longitude, //若起点有数据则采用起点坐标，若为空默认当前地址
                  to: res.data[key].location.lat + ',' + res.data[key].location.lng, //终点坐标
                  success: function (data) {//成功后的回调
                    console.log(data)
                    res.data[key].distance = data.result.elements["0"].distance
                    that.setData({
                      Nstore: that.data.Nstore.concat(res.data[key])
                    })
                    wx.hideLoading()
                  },
                  fail: function (error) {
                    // console.error(error);
                  },
                  complete: function (res) {
                    // console.log(res);
                  }
                });
              }
            }
          },
          fail: function (res) {
            // console.log(res);
          },
          complete: function (res) {
            // console.log(res);
          }
        });
      }
    })
  },
  compare: function (property) {
    return function (a, b) {
      console.log(a[property])
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },
  seach() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    that.setData({
      Nstore:[]
    })
    qqmapsdk.search({
      keyword: that.data.value || '周黑鸭',
      region: that.data.region[0] + that.data.region[1] + that.data.region[2],
      auto_extend: 1,
      page_size: 4,
      success(res) {
        for (const key in res.data) {

          that.setData({
            Nstore: that.data.Nstore.concat(res.data[key])
          })

        }
        wx.hideLoading()
      }, fail(err) {
        console.log(err)
      }
    })
  },
  seachername(e) {
    this.setData({
      value: e.detail.value
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