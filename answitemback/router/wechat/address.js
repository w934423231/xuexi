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
  db.query(`select * from address where userid=${req.body.uid}`,function(err,data){
    if(err){
      console.log(err)
      res.send({
        status:300,
        title:'加载失败'
      })
    }else{
      res.send({
        status:200,
        title:'加载成功',
        data:data
      })
    }
  })
})
router.post('/insert',function(req,res){
  db.query(`insert into address values(0,${req.body.uid},'${req.body.address}','${req.body.iphone}','${req.body.sex}','${req.body.name}')`,function(err){
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












//把路由暴露出去，供其他页面加载
module.exports=router