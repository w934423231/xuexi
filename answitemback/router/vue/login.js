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
router.post('/userlogin', function (req, res) {
    console.log(req.body)
    db.query(`select * from vuelogin where user='${req.body.vname}'`, function (err, data) {
        if (err) {
            res.send()
            console.log(err.message)
        } else {
            if (data.length == 0) {
                res.send({
                    status: 300,
                    title: '手机号未注册'
                })
            } else {
                // console.log(data,req.body.pwd)
                if (data[0].pwd == req.body.vpw) {
                    res.send({
                        status: 200,
                        roues: data[0].jurisdiction,
                        title: '登录成功'
                    })
                } else {
                    res.send({
                        status: 300,
                        title: '账号或密码错误'
                    })
                }
            }
        }
    })
    // db.query()
})










//把路由暴露出去，供其他页面加载
module.exports = router