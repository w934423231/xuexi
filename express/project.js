const express = require("express");
const bodypaser = require("body-parser");
var util = require("util");
const router = express.Router();
const mysql = require("mysql");
const fs = require("fs");
var sql = "";
//链接mysqk数据库
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "answeritem"
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","*");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
const categoryRouter=require("./category")
const userRouter=require("./user")
app.use("/category",categoryRouter)
app.use('/user',userRouter)
app.listen(8000)











