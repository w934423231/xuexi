const express = require("express");
const bodypaser = require("body-parser");
var util = require("util");
const router = express.Router();
 //在处理模块中引入第三方解析模块
// var multipartMiddleware = multiparty();
const mysql = require("mysql");
const fs = require("fs");
// app.use(mutipart({uploadDir:'./puublic/files'}))
var sql = "";
//链接mysqk数据库
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "answeritem"
});


router.use(
  bodypaser.urlencoded({
    extended: false
  })
);




router.use(bodypaser.json());

//微信小程序类型数据获取
router.get('/selectlist', function (req, res) {
  db.query('select * from answeritemtype',(err,data)=>{
      if(err){
          console.log(err.message)
      }
      res.send(data)
  })
})

//微信小程序类型小程序商品数据获取
router.post('/select',function(req,res){
  console.log(req.body,req.query)
  db.query(`select * from answeritemshop where shoptype=${req.body.typeid}`,function(err,data){
      if(err){
          res.send({status:300,
            title:err.message})
      }
      res.send({status:200,data:data})
  })
})

router.post('/coudan',function(req,res){
  db.query(`select * from answeritemshop where shopprice <= ${req.body.shoppingchajia}`,(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.send(data)
    }
  })
})








//把路由暴露出去，供其他页面加载
module.exports=router