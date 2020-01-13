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

router.post('/select',function(req,res){
  console.log(req)
  db.query(`select * from orders where userid =${req.body.uid}`,function(err,data){
    if(err){
      res.send({
        status:300,
        title:'数据查询失败'
      })
    }else{
      res.send({
        status:200,
        title:'数据查询成功',
        data:data
      })
    }
  })
})
router.post('/insertorders',function(req,res){
  console.log(req.body)

  db.query(`insert into orders values(0,${req.body.addressid},${req.body.ordersize},'${req.body.shoplist}','${req.body.orderprice}',${req.body.userid},${req.body.status},'${req.body.stores}')`,function(err){
    if(err){
      console.log(err)
      res.send({
        status:300,
        title:'添加失败',
        res:err.message
      })
    }else{
      res.send({
        status:200,
        title:'添加成功'
      })
    }
  })
})

router.post('/insertordershop',function(req,res){
  db.query(`insert into ordershaop values(0,'${req.body.shopname}',${req.body.shopnum},${req.body.shopprice},'${req.body.orderid}')`,function(err){
    if(err){
      console.log(err)
      res.send({
        status:300,
        title:'添加失败',
        res:err.message
      })
    }else{
      res.send({
        status:200,
        title:'添加成功'
      })
    }
  })
  console.log(req.body)
})







//把路由暴露出去，供其他页面加载
module.exports=router