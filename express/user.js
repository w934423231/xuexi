const express = require("express");
const bodypaser = require("body-parser");
var util = require("util");
const router = express.Router();
const mysql = require("mysql");
const fs = require("fs");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lietu"
});

router.use(
  bodypaser.urlencoded({
    extended: false
  })
);

router.use(bodypaser.json());

router.post('/userlogin',function(req,res){
    console.log(req.body)
    res.send({
        status: 200,
        token: 'mytoken',
        data: {username: 'lietu'},
        roles:'admin'
    })
})

module.exports = router;