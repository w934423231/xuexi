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


router.get('/select', function (req, res) {
    db.query('select * from answeritemtype',(err,data)=>{
        if(err){
            console.log(err.message)
        }
        res.send(data)
    })
})

router.post('/append', function (req, res) {
    console.log(req.body)
    db.query(`select * from answeritemtype where typename='${req.body.name}'`, function (err, data) {
        console.log(data.length)
        console.log(err)
        if (err) {
            console.log(err.message)
            res.send(err);
        } else {
            if (data.length === 0) {
                db.query(`insert into answeritemtype values (0,'${req.body.name}')`, function (err) {
                    if (err) {
                        console.log(err.message)
                    }
                    res.send({
                        status:200,
                        title:'添加成功'
                    })
                })
            } else {
                console.log('重复了')
                res.send({
                    status:300,
                    title:'这个商品类型已经存在'
                })
            }
        }
    })
})


router.post('/update', function (req, res) {
    db.query(`select * from answeritemtype where typename='${req.body.typename}'`, function (err, data) {
        if (err) {
            console.log(err.message)
            res.send(err);
        } else {
            if (data.length === 0) {
                db.query(`update answeritemtype set typename='${req.body.typename}' where typeid=${req.body.typeid};`,function(err){
                    if(err){
                        console.log(err.message)
                    }
                    res.send({
                        status:200,
                        title:'编辑成功'
                    })
                })
            } else {
                res.send({
                    status:300,
                    title:'这个商品类型已经存在'
                })
            }
        }
    })
   
})

router.post('/delete', function (req, res) {
    console.log(req.body, req.query)
   db.query(`delete from answeritemtype where typeid=${req.body.typeid}`,(err)=>{
    if(err){
        console.log(err.message)
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
module.exports = router