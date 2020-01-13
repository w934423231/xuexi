const http=[
  {
    url:"https://api.jxjia.net",
    url2:'http://localhost:8000'
  }
]
export const typelist = http[0].url2 +'/wechat/shopdata/selectlist'
export const shopdata= http[0].url2+'/wechat/shopdata/select'
export const coudandata=http[0].url2+'/wechat/shopdata/coudan'
export const userregister=http[0].url2+'/wechat/user/register'
export const userlogin=http[0].url2+'/wechat/user/login'
export const insertaddress=http[0].url2+'/wechat/address/insert'
export const selectaddress=http[0].url2+'/wechat/address/select'
export const insertorders=http[0].url2+'/wechat/order/insertorders'
export const insertordershop=http[0].url2+'/wechat/order/insertordershop'
export const selectorder=http[0].url2+'/wechat/order/select'