// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gdfe: [
      {
        imag: "/img/12.png",
        name: "我的测量",
        url:'celiang'
      },
      {
        imag: "/img/12.png",
        name: "我的安装",
        url:'anzhuang'
      },
      {
        imag: "/img/12.png",
        name: "我的方案",
        url:'fangan'
      },
      {
        imag: "/img/12.png",
        name: "我的劵",
        url:'wodequan'
      },
      {
        imag: "/img/12.png",
        name: "我的收藏",
        url:'shouchang'
      },
      {
        imag: "/img/12.png",
        name: "我的奖金",
        url:'jiangjin'
      },
      {
        imag: "/img/12.png",
        name: "领劵中心",
        url:'zhongxin'
      }
    ],
    catekk: [
      {
        img: "/img/12.png",
        names: "待付款",
        check:false,
        index:1
      },
      {
        img: "/img/12.png",
        names: "待发货",
        check:false,
        index:2
      },
      {
        img: "/img/12.png",
        names: "待收货",
        check:false,
        index:3
      },
      {
        img: "/img/12.png",
        names: "已完成",
        check:false,
        index:4
      },
      {
        img: "/img/12.png",
        names: "退货退款",
        check:false,
        index:5
      }
    ],
    gong: [
      {
        imag: "/img/12.png",
        name: "我的地址",
        url:'site'
      },
      {
        imag: "/img/12.png",
        name: "服务管家",
        url:'guanjia'
      },
      {
        imag: "/img/12.png",
        name: "关于我们",
        url:'women'
      },
      {
        imag: "/img/12.png",
        name: "设置",
        url:'shezhi'
      }
     ],
     login:[]
  },
  tuichu(){
    let that=this
    let remove=wx.removeStorageSync('data')
    console.log(remove)
    that.getstorge(that)
        wx.showToast({
          title:'退出成功',
          icon: "success",
          duration: 1500
        });
  },
  login(){
    wx.navigateTo({
      url:'/pages/login/login'
    })
  },
  dingdanye(e){
    let that=this
    for (var key in this.data.catekk) {
      let shuju= 'catekk['+ key + '].check'
      that.setData({
        [shuju]:false
      })
    }
    let  num='catekk['+e.currentTarget.dataset.index+'].check'
    this.setData({
      [num]:true
    })
    wx.navigateTo({
      url:'/pages/dingdanye/dingdanye?shuju='+JSON.stringify(this.data.catekk)
    })
  },
  fuwuye(e){
    let url1=this.data.gdfe[e.currentTarget.dataset.index].url
    wx.navigateTo({
      url:'/pages/'+url1+'/'+url1
    })
  },
   dingdan(e){
    let url1=this.data.gong[e.currentTarget.dataset.index].url
    wx.navigateTo({
      url:'/pages/'+url1+'/'+url1
    })
  },
  getstorge(that){
    var getstorge=wx.getStorageSync('data');
    that.setData({
         login:getstorge
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
    let that=this
    this.getstorge(that)
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