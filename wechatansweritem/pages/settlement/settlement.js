// pages/settlement/settlement.js
var url = require("../../utils/requsturl");
var requst = require("../../utils/requstmethod");
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: null,
    shopshuju: null
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
  tioazuan() {
    wx.navigateTo({
      url: '/pages/site/site'
    })
  },
  submit() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否前去支付',
      success(res) {
        if (res.confirm) {
          console.log('确定支付')
          that.insertshuju(1)

        } else if (res.cancel) {
          wx.showModal({
            title: '提示',
            content: '取消支付并且添加到未支付订单内',
            success(res) {
              if (res.confirm) {
                that.insertshuju(2)
              } else if (res.cancel) {
                return false
              }
            }
          })
        }
      }
    })

  },
  insertshuju(status) {
    let that = this
    var timestamp = Date.parse(new Date()) / 1000
    let index = null
    for (const key in this.data.address) {
      if (that.data.address[key].cheack = true) {
        index = key
        requst.postRequest(url.insertorders, {
          addressid:that.data.address[index].addid,
          ordersize: that.data.shopshuju.shopdatanum,
          orderprice: that.data.shopshuju.shopdataprice,
          shoplist: timestamp,
          userid: wx.getStorageSync('userlogin').userid,
          stores:that.data.shopshuju.stores,
          status: status
        }).then(res => {
          console.log(res.data.status == 200)
          if (res.data.status == 200) {
            for (const kes in that.data.shopshuju.shaopdata) {
              requst.postRequest(url.insertordershop, {
                shopname: that.data.shopshuju.shaopdata[key].shopname,
                shopnum: that.data.shopshuju.shaopdata[key].shopnum,
                shopprice: that.data.shopshuju.shaopdata[key].shopprice * that.data.shopshuju.shaopdata[key].shopnum,
                orderid: timestamp
              }).then(dat => {
                console.log(that.data.shopshuju.shaopdata.length- 1)
                if (kes == that.data.shopshuju.shaopdata.length- 1) {
                  wx.switchTab({
                    url: '../order/order'
                  });
                }
              })
            }
          }
        })
      }

    }
  },
  onShow: function () {
    let that = this
    that.setData({
      shopshuju: app.globalData.shopshuju
    })
    requst.postRequest(url.selectaddress, {
      uid: wx.getStorageSync('userlogin').userid
    }).then((res) => {
      console.log(res.data.status)
      if (res.data.status == 200) {
        for (const key in res.data.data) {
          res.data.data[key].cheack = false;
        }
        res.data.data[0].cheack = true
        app.globalData.address = res.data.data
        that.setData({
          address: res.data.data
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