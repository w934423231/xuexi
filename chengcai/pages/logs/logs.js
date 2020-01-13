//logs.js
var url = require("../../utils/url");
var requst = require("../../utils/request.js");
Page({
  data: {
    boxleft:[],
    boxright:[],
    idx:''
  },
  onLoad(options) {
    this.getboxlegt()
  },
  getboxlegt() {
    let that=this
    requst.getRequest(url.fatCategoryList).then(
      function (res) {
            // success
            that.setData({
              boxleft:res.data,
              idx: res.data[0].catename
            })
            that.getboxright()
          }
    )
  },
  getboxright(){
    let that=this
    requst.postRequest(url.shopdata,{
      catename:this.data.idx
    }).then(
      function(res){
              that.setData({
                boxright:res.data
              })
            }
    )
  },  
    catechange(e) {
    console.log(e)
    this.setData({
      idx: e.target.dataset.idx,
    })
    this.getboxright()
  },
})
