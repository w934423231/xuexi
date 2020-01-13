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
  db.query(`select * from orders join address join userlogin on orders.addressid=address.addid and orders.userid=userlogin.useid
  `,function(err,data){
    if(err){
      res.send({
        status:300,
        title:'查询失败'
      })
    }else{
      res.send({
        status:200,
        title:'查询成功',
        data:data
      })
    }
  })
})

router.post('/updata',function(req,res){
  console.log(req.body)
    db.query(`update orders set status='${req.body.status}'`,function(err){
      if(err){
        res.send({
          status:300,
          title:'更改失败'
        })
      }else{
        res.send({
          status:200,
          title:'更改成功'
        })
      }
    })

})








//把路由暴露出去，供其他页面加载
module.exports=router