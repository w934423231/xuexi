// pages/zuche/zuche.js
var querst=require('../../utils/request')
var gurl=require('../../utils/url')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    yonghu:'',
    pwd:'',
    pwd1:""
  },
  yonghu(e){
    this.setData({
      yonghu:e.detail.value
    })
  },
  pwd(e){
      this.setData({
        pwd: e.detail.value
      })
    
  },
  pwd1(e){
    if (e.detail.value !== this.data.pwd && this.data.pwd !== '' ){
      wx.showToast({
        title: "两次密码不相同",
        icon: "success",
        duration: 1500
      });
    } else if (this.data.pwd !== '' || this.data.pwd1 !== '' && e.detail.value == this.data.pwd){
      wx.showToast({
        title: "两次密码相同",
        icon: "success",
        duration: 1500
      });
      this.setData({
        pwd1:e.detail.value
      })
    }
  },
user(e){
    let that=this
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
        user:e.detail.value
      })
    }
  },
  zuche() {
    let that=this
   if(this.data.yonghu!==''&&this.data.user!==''&&this.data.pwd!==''&&this.data.pwd1!==''){
     querst.postRequest(gurl.zhucehao,{
        yonghu:that.data.yonghu,
        user:that.data.user,
        pwd:that.data.pwd,
        pics:'http://localhost:8000/category/upload/156031861714712.png'
     }).then((res) => {
          if(res.data.stutas==200){
            wx.navigateBack({
              delta:1
            })
            wx.showToast({
              title:res.data.message,
              icon: "success",
              duration: 1500
            });
          }else{
              wx.showToast({
                title:res.data.message,
                icon: "success",
                duration: 1500
              });
          }
        })
   }else{
    wx.showToast({
      title: "请仔细填写数据",
      icon: "success",
      duration: 1500
    });
   }
      
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
