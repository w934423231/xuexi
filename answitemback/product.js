const express=require('express')
const router=express.Router()
const app=express()
const shopdata=require('./router/vue/shopdata')
const user=require('./router/vue/user')
const updatapics=require('./router/updatapics')
const shoptype=require('./router/vue/shoptype')
const wshopdata =require('./router/wechat/shopdata')
const order=require('./router/vue/order')
const wuser=require('./router/wechat/user')
const worder=require('./router/wechat/order')
const waddress=require('./router/wechat/address')
const address=require('./router/vue/address')
const login=require('./router/vue/login')
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","*");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//vue商品数据管理
app.use('/vue/shopdata',shopdata)
//vue用户管理
app.use('/vue/user',user)
//vue订单数据管理
app.use('/vue/order',order)
//vue地址管理信息
app.use('/vue/address',address)
//vue商品类型管理
app.use('/vue/shoptype',shoptype)
//vue项目的登录
app.use('/vue/login',login)
//整个项目的图片上传与获取
app.use('/updatapics',updatapics)
//微信小程序商品数据管理
app.use('/wechat/shopdata',wshopdata)
//微信小程序地址数据管理
app.use('/wechat/address',waddress)
//微信小程序订单数据管理
app.use('/wechat/order',worder)
//微信小程序用户登录与注册
app.use('/wechat/user',wuser)





app.listen(8000)