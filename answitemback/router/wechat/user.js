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

//微信小程序用户的注册接口
router.post('/register', function (req, res) {
    db.query(`select * from userlogin where useriphone='${req.body.user}'`, function (err, data) {
        if (err) {
            // console.log(err.message)
            res.send(err);
        } else {
            if (data.length === 0) {
                db.query(`insert into userlogin values (0,'${req.body.yonghu}','${req.body.user}','${req.body.pwd}','${req.body.sex}','1563548134695userlogin.png')`, function (err) {
                    if (err) {
                        console.log(err.message)
                    }
                    res.send({
                        status: 200,
                        title: '注册成功'
                    })
                })
            } else {
                // console.log('重复了')
                res.send({
                    status: 300,
                    title: '手机号已经注册'
                })
            }
        }
    })
})

//微信小程序用户的登录接口
router.post('/login', function (req, res) {
    db.query(`select * from userlogin where useriphone='${req.body.user}'`, function (err, data) {
        if (data.length == 0) {
            res.send({
                status: 300,
                title: '手机号未注册'
            })
        } else {
            // console.log(data,req.body.pwd)
            if(data[0].userpwd==req.body.pwd){
                res.send({
                    status:200,
                    userid:data[0].useid,
                    username:data[0].username,
                    userimage:data[0].userimage,
                    title:'登录成功'
                })
            }else{
                res.send({
                    status:300,
                    title:'账号或密码错误'
                })
            }
        }
    })
})









//把路由暴露出去，供其他页面加载
module.exports = router