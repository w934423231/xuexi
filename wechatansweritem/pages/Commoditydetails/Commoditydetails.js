// pages/Commoditydetails/Commoditydetails.js
var url = require("../../utils/requsturl");
var requst = require("../../utils/requstmethod");
let app =  getApp();

  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopnstork:null,
    navdata: [],
    shopdata: [],
    Shopping: [],
    coudandata: [],
    shoppingboxfalg: false,
    shopingmenban: false,
    coudandatamenban: false,
    coudan: false,
    indexnum: 0,
    shoppingprice: 0,
    shoppingnum: 0,
    shoppingchajia: 0,
    shoppingactiveprice: 0,
    price: 20
  },
  catchtouchmove() {
    return false
  },
  numjia(e) {
    let shopdatanum = `shopdata[${e.currentTarget.dataset.index}].shopnum`
    // console.log(shopdatanum)
    let that = this
    let newshopdata = this.data.shopdata[e.currentTarget.dataset.index].shopnum
    let newnavdata = this.data.navdata[this.data.indexnum].num
    let newnavnum = `navdata[${this.data.indexnum}].num`
    // if (newshopdata == 0 && newnavdata == 0) {
    //   return false;
    // } else {
    this.setData({
      [shopdatanum]: newshopdata - 1
    })
    this.setData({
      [newnavnum]: newnavdata - 1
    })
    // }
    this.shoppingshjjusycn()
    this.getshoppingnum()
    this.sliptshopping()
  },
  jiesuan(){
    wx.navigateTo({
      url: '/pages/settlement/settlement'
    })
    app.globalData.shopshuju={
      shaopdata:this.data.Shopping,
      shopdatanum:this.data.shoppingnum,
      shopdataprice:this.data.shoppingprice,
      stores:this.data.shopnstork
    }
    
  },
  navclick(e) {
    this.setData({
      indexnum: e.currentTarget.dataset.index
    })
    this.select()
  },
  sliptshopping() {
    let that = this
    if (this.data.Shopping !== []) {
      for (const key in this.data.Shopping) {
        if (this.data.Shopping[key].shopnum == 0) {
          let Shoppingshuju = that.data.Shopping
          Shoppingshuju.splice(key, 1)
          that.setData({
            Shopping: Shoppingshuju
          })
        }
      }
    }
  },


  shoppingshjjusycn() {
    console.log(1)
    let that = this
    for (const key in that.data.shopdata) {
      for (const kes in that.data.Shopping) {
        if (that.data.shopdata[key].shopid == that.data.Shopping[kes].shopid) {
          let newshopping = `shopdata[${key}].shopnum`

          that.setData({
            [newshopping]: that.data.Shopping[kes].shopnum
          })
        }
      }
    }
  },


  shoppingjia(e) {
    let that = this
    let shopdatanum = `Shopping[${e.currentTarget.dataset.index}].shopnum`
    that.setData({
      [shopdatanum]: this.data.Shopping[e.currentTarget.dataset.index].shopnum + 1
    })
    for (const kes in this.data.navdata) {
      if (that.data.Shopping[e.currentTarget.dataset.index].shoptype == that.data.navdata[kes].typeid) {
        let navdatanum = `navdata[${kes}].num`
        that.setData({
          [navdatanum]: this.data.navdata[kes].num + 1
        })

      }
    }
    this.getshoppingnum()
    this.shoppingshjjusycn()
  },
  shoppingjian(e) {
    let shopdatanum = `Shopping[${e.currentTarget.dataset.index}].shopnum`
    let that = this
    that.setData({
      [shopdatanum]: this.data.Shopping[e.currentTarget.dataset.index].shopnum - 1
    })

    for (const kes in this.data.navdata) {
      if (that.data.Shopping[e.currentTarget.dataset.index].shoptype == that.data.navdata[kes].typeid) {
        let navdatanum = `navdata[${kes}].num`
        that.setData({
          [navdatanum]: this.data.navdata[kes].num - 1
        })

      }
    }
    this.getshoppingnum()
    this.shoppingshjjusycn()
    this.sliptshopping()
    
  },
  numjian(e) {
    let that = this
    let num=0
    let shopdatanum = `shopdata[${e.currentTarget.dataset.index}].shopnum`

    let newshopdata = this.data.shopdata[e.currentTarget.dataset.index].shopnum
    let newnavdata = this.data.navdata[this.data.indexnum].num

    let newnavnum = `navdata[${this.data.indexnum}].num`
    this.setData({
      [shopdatanum]: newshopdata + 1
    })
    this.setData({
      [newnavnum]: newnavdata + 1
    })
    if (that.data.Shopping.length!==0) {
      for (const key in this.data.Shopping) {
        if (this.data.Shopping[key].shopid == this.data.shopdata[e.currentTarget.dataset.index].shopid) {
          let shoppingdata = `Shopping[${key}].shopnum`
          that.setData({
            [shoppingdata]: that.data.shopdata[e.currentTarget.dataset.index].shopnum
          })
        } else {
          if (num === that.data.Shopping.length - 1) {
            that.setData({
              Shopping: that.data.Shopping.concat(this.data.shopdata[e.currentTarget.dataset.index])
            });
          }
          num++;
        }
      }
    } else {
      console.log(2)
      that.setData({
        Shopping: this.data.Shopping.concat(this.data.shopdata[e.currentTarget.dataset.index])
      });
    }
    // if (this.data.Shopping.indexOf(this.data.shopdata[e.currentTarget.dataset.index]) == -1) {
    //   this.setData({
    //     Shopping: this.data.Shopping.concat(this.data.shopdata[e.currentTarget.dataset.index])
    //   });
    // }
    that.shoppingshjjusycn()
    that.getshoppingnum()
  },
  shoppingclick(e) {
    // console.log(this.data.shoppingboxfalg)
    this.setData({
      shoppingboxfalg: true,
      shopingmenban: true,
      coudandatamenban: false
    })
  },
  getshoppingnum() {
    let that = this
    console.log('lietu')
    if (this.data.Shopping !== []) {
      that.setData({
        shoppingnum: 0,
        shoppingprice: 0
      })
      for (const key in that.data.Shopping) {
        that.setData({
          shoppingnum: that.data.shoppingnum + that.data.Shopping[key].shopnum,
          shoppingprice: that.data.shoppingprice + Number((that.data.Shopping[key].shopnum * that.data.Shopping[key].shopprice).toFixed(2))
        })
      }
    }
    this.coudanactive([{ price: 55, prices: 6 }, { price: 65, prices: 10 }])
  },
  coudanactive(argument) {
    let that = this
    for (const key in argument) {
      if (key == 0 && this.data.shoppingprice < argument[key].price) {
        that.setData({
          shoppingchajia: Number(argument[key].price - this.data.shoppingprice).toFixed(2),
          shoppingactiveprice: argument[key].prices,
          coudan: true
        })
      } else if (key > 0 && key < argument.length && this.data.shoppingprice > argument[key - 1].price && this.data.shoppingprice < argument[key].price) {

        that.setData({
          shoppingchajia: Number(argument[key].price - this.data.shoppingprice).toFixed(2),
          shoppingactiveprice: argument[key].prices,
          coudan: true
        })
      } else if (that.data.shoppingprice == 0 || this.data.shoppingprice > argument[argument.length - 1].price) {
        that.setData({
          coudan: false
        })
      }
    }
  },
  coudandataclick() {
    this.setData({
      shoppingboxfalg: true,
      shopingmenban: false,
      coudandatamenban: true
    })
    let that = this
    requst.postRequest(url.coudandata, {
      shoppingchajia: this.data.shoppingchajia
    }).then((res) => {
      if (res.data != '') {
        for (const key in res.data) {
          res.data[key].shopnum = 0
          console.log(res.data)
          for (const kes in this.data.Shopping) {
            if (res.data[key].shopid == this.data.Shopping[kes].shopid) {
              res.data[key].shopnum = this.data.Shopping[kes].shopnum
            }
          }
          if (key == res.data.length - 1) {
            that.setData({
              coudandata: res.data
            })
          }
        }
      }
      if (res.data == '') {
        that.setData({
          coudandata: res.data
        })
      }
    })
  },
  clearshopping() {
    let that = this
    this.setData({
      Shopping: [],
      coudan: false
    })
    for (const keys in this.data.navdata) {
      let clears = `navdata[${keys}].num`
      that.setData({
        [clears]: 0
      })
    }
    for (const key in this.data.shopdata) {
      let clear = `shopdata[${key}].shopnum`
      that.setData({
        [clear]: 0,
      })
    }
  },
  shoppingboxcloss(e) {
    if (this.data.shopingmenban == false && this.data.coudandatamenban == true) {
      this.setData({
        shopingmenban: true,
        coudandatamenban: false,
        shoppingboxfalg: true
      })
    } else if (this.data.shopingmenban == true && this.data.coudandatamenban == false) {
      this.setData({
        shopingmenban: false,
        coudandatamenban: false,
        shoppingboxfalg: false
      })
    }
  },
  coudanjia(e) {
    let num = 0
    let that = this
    for (const key in this.data.Shopping) {
      if (this.data.Shopping[key].shopid == this.data.coudandata[e.currentTarget.dataset.index].shopid) {
        let coudandatanum = `coudandata[${e.currentTarget.dataset.index}].shopnum`
        let Shoppingdatanum = `Shopping[${key}].shopnum`
        this.setData({
          [coudandatanum]: this.data.coudandata[e.currentTarget.dataset.index].shopnum + 1,
          [Shoppingdatanum]: this.data.coudandata[e.currentTarget.dataset.index].shopnum + 1
        });
      } else {
        if (num === this.data.Shopping.length - 1) {
          let coudandatanum = `coudandata[${e.currentTarget.dataset.index}].shopnum`
          this.setData({
            [coudandatanum]: this.data.coudandata[e.currentTarget.dataset.index].shopnum + 1,
            Shopping: this.data.Shopping.concat(this.data.coudandata[e.currentTarget.dataset.index])
          });
        }
        num++;
      }
    }
    for (const key in this.data.shopdata) {
      if (that.data.shopdata[key].shopid === that.data.coudandata[e.currentTarget.dataset.index].shopid) {
        let shopdatanum = `shopdata[${key}].shopnum`
        console.log(that.data.shopdata[key].shopid === that.data.coudandata[e.currentTarget.dataset.index].shopid)
        that.setData({
          [shopdatanum]: this.data.shopdata[key].shopnum + 1
        })
        // console.log(1)
      }
    }
    for (const kes in this.data.navdata) {
      if (that.data.navdata[kes].typeid == that.data.coudandata[e.currentTarget.dataset.index].shoptype) {
        let navdatanum = `navdata[${kes}].num`
        that.setData({
          [navdatanum]: this.data.navdata[kes].num + 1
        })

      }
    }

    this.getshoppingnum()

    // if (this.data.Shopping.indexOf(this.data.coudandata[e.currentTarget.dataset.index]) == -1) {
    //   let coudandatanum = `coudandata[${e.currentTarget.dataset.index}].shopnum`
    //   this.setData({
    //     // [coudandatanum]: this.data.coudandata[e.currentTarget.dataset.index].shopnum + 1,
    //     Shopping: this.data.Shopping.concat(this.data.coudandata[e.currentTarget.dataset.index])
    //   });
    // }
  },
  select() {
    let that = this
    // console.log()
    requst.postRequest(url.shopdata, { 'typeid': that.data.navdata[that.data.indexnum].typeid }).then((res) => {
      if (res.data.data != '') {
        for (const key in res.data.data) {
          res.data.data[key].shopnum = 0
          for (const kes in that.data.Shopping) {
            if (that.data.Shopping[kes].shopid == res.data.data[key].shopid) {
              res.data.data[key].shopnum = that.data.Shopping[kes].shopnum
            }
          }
          if (key == res.data.data.length - 1) {
            this.setData({
              shopdata: res.data.data
            })
          }
        }
      }
      if (res.data.data == '') {
        this.setData({
          shopdata: res.data.data
        })
      }

      console.log(res.data.data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopnstork:options.id
    })
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
    requst.getRequest(url.typelist).then((res) => {
      for (const key in res.data) {
        res.data[key].num = 0
        console.log(res.data)
        if (key == res.data.length - 1) {
          this.setData({
            navdata: res.data
          })
        }
      }
      this.select()
    })

    // this.setData({
    //   shopdata:res.data
    // })
    wx.setNavigationBarTitle({
      title: '菜单',
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
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