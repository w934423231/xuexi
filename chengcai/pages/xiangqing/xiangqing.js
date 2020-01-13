// pages/index/xiangqing/xiangqing.js
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    keynum: '',
    shuju: '',
    num: 1,
    footer: [{
      img: "../../img/12.png"
    },
    {
      img: "../../img/12.png"
    },
    {
      img: "../../img/12.png"
    }
    ],
    foo: [{
      name: '购物车'
    },
    {
      name: '购买'
    }
    ],
    imgUrls: [],
    indicatorDots: true,
    autoplay: false,
    interval: 0,
    duration: 0,
    menban: '',
    attributes: [
      {
        "attributes": [{
          "check": false,
          "index": 1,
          "value": "黑色"
        }, {
          "check": false,
          "index": 2,
          "value": "白色"
        }, {
          "check": false,
          "index": 3,
          "value": "孔雀蓝"
        }, {
          "check": false,
          "index": 4,
          "value": "烟灰紫"
        }, {
          "check": true,
          "index": 5,
          "value": "金色"
        }, {
          "check": false,
          "index": 6,
          "value": "粉色"
        }],
        "index": 1,
        "name": "可选"
      }, {
        "attributes": [{
          "check": true,
          "index": 1,
          "value": "小号"
        }, {
          "check": false,
          "index": 2,
          "value": "大号"
        }],
        "index": 2,
        "name": "可选*"
      }],
    mapping: [{
      "id": "1120136077490196480",
      "key": "1:1,2:1",
      "pic": "https://tximg.jxjia.net/pic/20190422/70bd918e-3216-49f2-9750-dc2fadbdd7ae.jpg",
      "price": 118.0,
      "sell": true,
      "stock": 99,
      "sysName": "北欧铁艺 时尚简易绿植花架 黑色 小号"
    }, {
      "id": "1120136077502779392",
      "key": "1:1,2:2",
      "pic": "https://tximg.jxjia.net/pic/20190422/5a525bc8-2bd9-43fb-9760-6bdc61dfbfe1.jpg",
      "price": 142.0,
      "sell": true,
      "stock": 99,
      "sysName": "北欧铁艺 时尚简易绿植花架 黑色 大号"
    }, {
      "id": "1120136077519556608",
      "key": "1:2,2:1",
      "pic": "https://tximg.jxjia.net/pic/20190422/437a78da-0fcb-4004-b9f6-09948c72bcd9.jpg",
      "price": 118.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约盆栽绿植花架 白色 小号"
    }, {
      "id": "1120136077532139520",
      "key": "1:2,2:2",
      "pic": "https://tximg.jxjia.net/pic/20190422/d9a3bc06-6f0a-422e-b4ee-fe46371ea998.jpg",
      "price": 142.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约盆栽绿植花架 白色 大号"
    }, {
      "id": "1120136077544722432",
      "key": "1:3,2:1",
      "pic": "https://tximg.jxjia.net/pic/20190422/1e16137d-3ec8-4106-9be3-ee6867ea0137.jpg",
      "price": 130.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约时尚绿植花架 孔雀蓝 小号"
    }, {
      "id": "1120136077553111040",
      "key": "1:3,2:2",
      "pic": "https://tximg.jxjia.net/pic/20190422/81c621ea-2fa2-461a-b4f1-d66b2fe336a0.jpg",
      "price": 154.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约时尚绿植花架 孔雀蓝 大号 TOY88-0723 "
    }, {
      "id": "1120136077561499648",
      "key": "1:4,2:1",
      "pic": "https://tximg.jxjia.net/pic/20190422/a9909a4c-7a97-465e-9322-1a20932e20a0.jpg",
      "price": 130.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约绿植花架烟灰紫 小号"
    }, {
      "id": "1120136077565693952",
      "key": "1:4,2:2",
      "pic": "https://tximg.jxjia.net/pic/20190422/1ac710da-65c5-4b7b-9c6c-700db10d8784.jpg",
      "price": 154.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约时尚绿植花架 烟灰紫 大号"
    }, {
      "id": "1120136077574082560",
      "key": "1:5,2:1",
      "pic": "https://tximg.jxjia.net/pic/20190422/d3d0b446-a697-427e-bb48-19e4f8fce0de.jpg",
      "price": 130.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约绿植盆栽花架 金色 小号"
    }, {
      "id": "1120136077582471168",
      "key": "1:5,2:2",
      "pic": "https://tximg.jxjia.net/pic/20190422/1c409623-ef0e-4c6a-85db-fa7c39f746c2.jpg",
      "price": 154.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约绿植花架 金色 大号"
    }, {
      "id": "1120136077586665472",
      "key": "1:6,2:1",
      "pic": "https://tximg.jxjia.net/pic/20190422/7675f750-9845-437e-8ad4-1a19ebd662cd.jpg",
      "price": 130.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简易盆栽绿植花架 粉色 小号"
    }, {
      "id": "1120136077595054080",
      "key": "1:6,2:2",
      "pic": "https://tximg.jxjia.net/pic/20190422/f19c870a-f74a-450a-a94e-5b92f4fbcbde.jpg",
      "price": 154.0,
      "sell": true,
      "stock": 100,
      "sysName": "北欧铁艺 简约时尚盆栽简易绿植花架 粉色 大号"
    }]
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  dianji(e) {
    console.log(e)
    let that = this
    for (var key in this.data.attributes[0].attributes) {
      let keys = 'attributes[0].attributes[' + key + '].check'
      that.setData({
        [keys]: false
      })
    }
    let indexs = 'attributes[0].attributes[' + e.currentTarget.dataset.index + '].check'
    this.setData({
      [indexs]: true
    })
    this.setkey()
    this.shuju()
  },
  dianji1(e) {
    console.log(e)
    let that = this
    for (var key in this.data.attributes[1].attributes) {
      let keys = 'attributes[1].attributes[' + key + '].check'
      that.setData({
        [keys]: false
      })
    }
    let indexs = 'attributes[1].attributes[' + e.currentTarget.dataset.index + '].check'
    this.setData({
      [indexs]: true
    })
    this.setkey()
    this.shuju()
  },
  shuju() {
    let that = this
    for (var i in this.data.mapping) {
      if (that.data.mapping[i].key == that.data.keynum) {
        that.setData({
          shuju: this.data.mapping[i]
        })
      }
    }
  },
  setkey() {
    let num1, num2;
    for (var key in this.data.attributes[0].attributes) {
      if (this.data.attributes[0].attributes[key].check == true) {
        num1 = this.data.attributes[0].attributes[key].index
      }
    }
    for (var key in this.data.attributes[1].attributes) {
      if (this.data.attributes[1].attributes[key].check == true) {
        num2 = this.data.attributes[1].attributes[key].index
      }
    }
    let keys = this.data.attributes[0].index + ':' + num1 + "," + this.data.attributes[1].index + ':' + num2
    this.setData({
      keynum: keys
    })
  },
  change(event) {
    var nu1 = event.detail
    this.data.imgUrls[0].num = nu1
    this.setData({
      num: event.detail
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数\
    console.log(options)
    let that = this
    requst.postRequest(url.shopxiangqingdata, {
      pid: JSON.parse(options.cateid)
    }).then(function (res) {

        that.setData({
          imgUrls: res.data
        })
        // success
        that.data.imgUrls[0].num = that.data.num
      }
    )
    this.setkey()
    this.shuju()
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  guanbi() {
    this.setData({
      menban: false
    })
  },
  open(e) {
    let that = this
    wx.getStorage({
      key: 'data',
      success: (res) => {
        if (that.data.menban == true && e.currentTarget.dataset.name == '购买' && res.errMsg == 'getStorage:ok') {
          wx.navigateTo({
            url: '/pages/dingdan/dingdan?cateid=' + JSON.stringify(that.data.imgUrls)
          })
        } else {
          that.setData({
            menban: true
          })
        }
      },
      fail: (res) => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  },
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  gouwuche() {
    wx.navigateTo({
      url: '/pages/gouwuche/gouwuche?cateid=' + JSON.stringify(this.data.imgUrls[0])
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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