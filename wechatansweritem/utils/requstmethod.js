const getRequest = (url,data)=>{
  let promise = new Promise((resolve, reject) => {
    wx:wx.showLoading({
      title: 'loading',
    })
    let setdata=""
    if(data){
      setdata=data
    }
    wx:wx.request({
      url: url+setdata,
      header: {},
      method: 'GET',
      success: function(res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function(err) {
        reject(err)
      },
    })
  })
  return promise
}
const postRequest = (url,data) => {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data:data,
      header: {
        'content-type':"application/x-www-form-urlencoded"
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function (err) {
        reject(err)
      },
    })
  })
  return promise
}
module.exports={
  getRequest: getRequest,
  postRequest: postRequest
}