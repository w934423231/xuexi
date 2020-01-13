//index.js
//获取应用实例
const app = getApp()
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: false,
    classnamn:false,
    idx: 0,
    cateList: [],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    titlel: [
      '全场自营',
      '假一赔百',
      '线下体验',
      '到家安装',
      '正品大牌'
    ],
    fenleibiao: [
      {
      imgsrc: '../../img/12.png',
      title:'123'  
      },
      {
        imgsrc:'../../img/12.png',
         title:'123'
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
     {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      }
    ],
    newpeoper:[
      'background:red',
      'background:green',
      'background:blue',
      'background:yellow'
    ],
    shenqian:[
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      },
      {
        imgsrc:'../../img/12.png',
        title:"123"
      }
    ],
     status:[
      {
        img:'../../img/12.png',
        name:'成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '省出一辆捷达'
      },
      {
        img: '../../img/12.png',
        name: '省出一辆飞度'
      }
    ],
    msg:[
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      }
    ],
    happiness: [
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      }
    ],
    everyday: [
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      },
      {
        img: '../../img/12.png',
        name: '成才小程序'
      }
    ],
    brand:[
      {
        img: '../../img/12.png',
      },
      {
        img: '../../img/12.png',
      },
      {
        img: '../../img/12.png',
      },
      {
        img: '../../img/12.png',
      },
      {
        img: '../../img/12.png',
      },
      {
        img: '../../img/12.png',
      }
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    classnam:'catelist'
  },
  getboxlegt() {
    let that=this
    console.log(url.fatCategoryList)
    requst.getRequest(url.fatCategoryList).then(
      function (res) {
      // success
      that.setData({
        cateList: res.data,
      })
    })
  },
  catechange(e) {
    this.setData({
      idx: e.target.dataset.idx,
    }) 
   wx.navigateTo({
     url: '/pages/callback/callback?cateid=' + JSON.stringify(this.data.cateList[this.data.idx])
    })
  },
  scroll(e) {
    if (e.detail.scrollTop > 270) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
// onLoad:function (options) {
//   let opt = JSON.parse(options)
//   wx.setNavigationBarTitle({
//     title: opt.name
//   })
//   this.get()
// },
onLoad:function(){
  this.getboxlegt()
}
})