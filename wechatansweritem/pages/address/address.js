var url = require("../../utils/requsturl");
var requst = require("../../utils/requstmethod");
Page({
  data: {
    name: null,
    iphone: null,
    sex: null,
    address: null,
    detailedaddress: null,
    index: 0,
    array: ['男生', '女生'],
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      addressshuju: this.data.array[e.detail.value]
    })
  },
  addressname(e) {
    this.setData({
      name:e.detail.value
    })
  },
  address(e) {
    let that=this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address:res.address
        })
      },
      fail: function(err) {
        console.log(err)
      }
    })
  },
  detailedaddress(e) {
    this.setData({
      detailedaddress:e.detail.value
    })
  },
  submit() {
    if(this.data.name!==null&&this.data.iphone!==null&&this.data.sex!==null&&this.data.address!==null){
      let that=this
      requst.postRequest(url.insertaddress,{
        uid:wx.getStorageSync('userlogin').userid,
        name:that.data.name,
        iphone:that.data.iphone,
        sex:that.data.sex,
        address:that.data.address+that.data.detailedaddress
      }).then((res)=>{
        if(res.data.status==200){
          wx.showToast({
            title:res.data.title,
            duration: 2000,
            icon: 'success'
          });
          wx.navigateBack({
            delta: 1
          }); 
        }else{
          wx.showToast({
            title:res.data.title,
            duration: 2000,
            icon: 'success'
          });
        }
      })
    }else{
      wx.showToast({
        title: '请仔细填写数据',
        duration: 2000,
        icon: 'none'
      });
    }
  },
  addressiphone(e) {
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(e.detail.value))) {

      wx.showToast({

        title: '手机号码有误',

        duration: 2000,

        icon: 'none'

      });

    } else {
      wx.showToast({

        title: '手机号码正确',

        duration: 2000,

        icon: 'none'

      });
      this.setData({
        iphone:e.detail.value
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  onReady: function () {
    // 页面渲染完成
  },

  onShow: function () {
    // 页面显示
  
    this.setData({
     sex: this.data.array[this.data.index]
    })
  },

  onHide: function () {
    // 页面隐藏
  },

  onUnload: function () {
    // 页面关闭
  },

})