const http=[
  {
    url:"https://api.jxjia.net",
    url2:'http://localhost:8000'
  }
]
const productList = http[0].url2 +'/product/productJump'
const zhucehao=http[0].url2+'/category/zuche'
const login=http[0].url2+'/category/login'
const shopxiangqingdata=http[0].url2+'/category/shopxiangqingdata'
const fatCategoryList=http[0].url2+'/category/CategoryList'
const shopdata=http[0].url2+'/category/shopdata'
const dingdanxiangqing=http[0].url2+'/category/dingdanxiangqing'
const dingdanshuju=http[0].url2+'/category/dingdanshuju'
module.exports={
  productList: productList,
  zhucehao:zhucehao,
  login:login,
  shopxiangqingdata:shopxiangqingdata,
  fatCategoryList:fatCategoryList,
  shopdata:shopdata,
  dingdanxiangqing:dingdanxiangqing,
  dingdanshuju:dingdanshuju,
  shopdata:shopdata
}