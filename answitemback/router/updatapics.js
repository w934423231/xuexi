const express = require("express");
const bodypaser = require("body-parser");
var util = require("util");
var multiparty = require("multiparty")
const router = express.Router();
//在处理模块中引入第三方解析模块
const fs = require("fs");


router.post("/upload", function (req, res) {
  if (!fs.existsSync('../public')) {
    fs.mkdirSync('../public', {
      recursive: true
    }, (err) => {
      console.log(err)
    })
  }
  var form = new multiparty.Form({
    uploadDir: "./public/files/"
  });
  //上传完成后处理

  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log("parse error: " + err);
    } else {
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      var filename =
        new Date().getTime() +
        Math.round(Math.random()) +
        inputFile.originalFilename;
      var dstPath = "./public/files/" + filename;
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath, function (err) {
        if (err) {
          console.log("rename error: " + err);
        }
      });
    }

    res.writeHead(200, {
      "content-type": "text/plain;charset=utf-8"
    });
    res.end(
      JSON.stringify({
        status: 200,
        title: "ok",
        path: filename,
      })
    );
  });
});


router.get("/pics/*", function (req, res) {
  var decode_url = decodeURI(req.url);
  var str = decode_url.split("/");
  let file_path = __dirname + "/../public/" + str[str.length - 1];
  console.log(__dirname);
  fs.readFile(file_path, "binary", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      //console.log(data);
      console.log("输出文件");
      //不加这句，页面可能会乱码，图片包含中文也会乱码
      res.writeHead(200, {
        "Content-Type": "image/jpeg"
      });
      res.write(data, "binary");
      res.end();
    }
  });
  // console.log(req)
});

module.exports = router