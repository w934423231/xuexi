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


router.get('/select',function(req,res){
  db.query(`select * from answeritemshop left  join answeritemtype on answeritemshop.shoptype=answeritemtype.typeid`,(err,data)=>{
    if(err){
      console.log(err)
    }else{
      res.send(data)
    }
  })
})
router.post('/insert',function(req,res){
  console.log(req.body)
  db.query(`insert into answeritemshop values(0,'${req.body.name}',${req.body.region},'${req.body.price}',${req.body.stock},'${req.body.pics}')`,(err)=>{
    if(err){
      console.log(err.message)
      res.send({
        status:200,
        title:'加入商品失败'
      })
    }
    res.send({
      status:200,
      title:'加入商品成功'
    })
  }) 
})

router.post('/updata',function(req,res){
  console.log(req.body)
  db.query(`update answeritemshop set shopname='${req.body.shopname}',shoptype=${req.body.shoptype},shopprice='${req.body.shopprice}',shoptory =${req.body.shoptory},shoppics ='${req.body.shoppics}'  where shopid=${req.body.shopid}`,(err)=>{
    if(err){
      console.log(err.message)
      res.send({
        status:300,
        title:'更新商品失败'
      })
    }
    res.send({
      status:200,
      title:'更新商品成功'
    })
  }) 
})

router.post('/delete', function (req, res) {
  console.log(req.body, req.query)
  console.log(req.body.shopid)
 db.query(`delete from answeritemshop where shopid=${req.body.shopid}`,(err)=>{
  if(err){
      res.send({
          status:300,
          title:'删除失败'
      })
  }
  res.send({
      status:200,
      title:'删除成功'
  })
 })
})





//把路由暴露出去，供其他页面加载
module.exports=router