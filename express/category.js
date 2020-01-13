const express = require("express");
const bodypaser = require("body-parser");
var util = require("util");
const router = express.Router();
var multiparty = require("multiparty"); //在处理模块中引入第三方解析模块
// var multipartMiddleware = multiparty();
const mysql = require("mysql");
const fs = require("fs");
// app.use(mutipart({uploadDir:'./puublic/files'}))
var sql = "";
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
router.get("/categoryList", function (req, res) {
  db.query(
    "select * from category left join subcategory on cateid=cid",
    function (err, data) {
      if (!err) {
        res.send(data);
      }
    }
  );
});






router.get("/shopshuju", function (req, res) {
  db.query("select * from product", function (err, data) {
    if (!err) {
      res.send(data);
    }
  });
});





router.post("/select", function (req, res) {
  console.log(req.body);
  var num = (req.body.curPage - 1) * req.body.pagesize;
  db.query(
    `select * from product where showName like '%${
      req.body.pname
    }%' ORDER BY pid limit ${num},${req.body.pagesize}`,
    function (err, data) {
      if (!err) {
        db.query(
          `select * from product where showName like '%${req.body.pname}%'`,
          function (err, shuju) {
            if (!err) {
              res.send({
                length: shuju.length,
                data: data
              });
              console.log({
                length: shuju.length,
                data: data
              });
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
  console.log(
    `select * from product where showName='${req.body.pname}'  limit ${num},${
      req.body.pagesize
    }`
  );
});

router.post("/shangpin", function (req, res) {
  var num = (req.body.curPage - 1) * req.body.pagesize;
  db.query(
    `select * from orderList left join login on uid=lid ORDER BY pid limit ${num},${req.body.pagesize};`,
    function (err, data) {
      if (!err) {
        db.query(`select * from orderList left join login on uid=lid`, function (err, shuju) {
          if (!err) {
            var resdata = []
            for (const key in data) {
              resdata.push({
                "oid": data[key].oid,
                "pname": data[key].pname,
                "pid": data[key].pname,
                "otime": data[key].otime,
                "uid": data[key].uid,
                "ostatus": data[key].ostatus,
                "onum": data[key].onum,
                "oprice": data[key].oprice,
                "sprice": data[key].sprice,
                "pics": data[key].pics,
                "lid": data[key].lid,
                "lyonghu": data[key].lyonghu,
                "luser": data[key].luser,
                "lpics": data[key].lpics
              })
            }
            res.send({
              length: shuju.length,
              data: resdata
            });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
  console.log(
    `select * from product ORDER BY pid limit ${num},${req.body.pagesize};`
  );
});


router.post("/fenye", function (req, res) {
  var num = (req.body.curPage - 1) * req.body.pagesize;
  db.query(
    `select * from product ORDER BY pid limit ${num},${req.body.pagesize};`,
    function (err, data) {
      if (!err) {
        db.query(`select * from product`, function (err, shuju) {
          if (!err) {
            res.send({
              length: shuju.length,
              data: data
            });
            console.log({
              length: shuju.length,
              data: data
            });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
  console.log(
    `select * from product ORDER BY pid limit ${num},${req.body.pagesize};`
  );
});



router.post("/shopdata", function (req, res) {
  var sql = `select * from product where cateid='${req.body.catename}'`;
  db.query(sql, function (err, data) {
    if (err) {
      res.send(err.message);
    } else {
      res.send(data);
    }
  });
});

router.get('/user', function (req, res) {
  db.query(`select * from login`, function (err, data) {
    console.log(data)
    var shuju = []
    for (const key in data) {
      shuju.push({
        lid: data[key].lid,
        lyonghu: data[key].lyonghu,
        luser: data[key].luser,
        lpics: data[key].lpics
      })
    }
    res.send(shuju)
  })
})

router.post('/usernum', function (req, res) {
  db.query(`select * from orderList where uid=${req.body.lid}`, function (err, data) {
    res.send({
      'length': data.length
    })
  })
})

router.post("/shopxiangqingdata", function (req, res) {
  var sql = `select * from product where pid='${req.body.pid}'`;
  console.log(req.body.pid);
  db.query(sql, function (err, data) {
    if (err) {
      res.send(err.message);
    } else {
      router.post("/shopxiangqingdata", function (req, res) {
        var sql = `select * from product where pid='${req.body.pid}'`;
        console.log(req.body.pid);
        db.query(sql, function (err, data) {
          if (err) {
            res.send(err.message);
          } else {
            res.send(data);
          }
        });
      });
      res.send(data);
    }
  });
});

router.post("/dingdanshuju", function (req, res) {
  var num = (req.body.curPage - 1) * req.body.pagesize;
  db.query(
    `select * from product ORDER BY pid limit ${num},${req.body.pagesize};`,
    function (err, data) {
      if (!err) {
        db.query(`select * from product`, function (err, shuju) {
          if (!err) {
            res.send({
              length: shuju.length,
              data: data
            });
            console.log({
              length: shuju.length,
              data: data
            });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
  console.log(
    `select * from product ORDER BY pid limit ${num},${req.body.pagesize};`
  );
});

router.post("/status", function (req, res) {
  console.log(req.body)
  db.query(`update orderList set ostatus=${req.body.ostatus} where oid='${req.body.oid}'`, function (err) {
    console.log(`update orderList set ostatus=${req.body.ostatus} where oid='${req.body.oid}'`)
    if (err) {
      console.log(err.message);
    } else {
      res.send({
        stutas: "200",
        message: 'ok'
      })
    }
  });
});

router.post('/dingdanxiangqing', function (req, res) {
  db.query(`select * from orderList where ostatus=${req.body.index} and uid=${req.body.uid}`, function (err, data) {
    if (err) {
      console.log(err.message)
    } else {
      res.send(data)
    }
  })
})



router.post('/login', function (req, res) {
  db.query(`select * from login where luser=${req.body.user}`, function (err, data) {
    if (err) {
      console.log(err.message)
    } else {
      if (data[0].lpwd == req.body.pwd) {
        res.send({
          stutas: 200,
          uid: data[0].lid,
          yonghu: data[0].lyonghu,
          user: data[0].luser,
          pics: data[0].lpics,
          message: '登录成功'
        })
      } else {
        res.send({
          stutas: 300,
          message: '登录失败'
        })
      }
    }
  })
})



router.post('/zuche', function (req, res) {
  db.query(`select * from login where luser='${req.body.user}'`, function (err, data) {
    if (data.length == 0) {
      db.query(`insert into login values(0,'${req.body.yonghu}','${req.body.user}','${req.body.pwd}','${req.body.pics}')`, function (err) {
        if (!err) {
          res.send({
            stutas: '200',
            message: '注册成功'
          })
        }
      })
    } else {
      res.send({
        stutas: '300',
        message: "此手机号已经注册"
      })
    }
  })
})


router.post("/dingdanshuju", function (req, res) {
  console.log(req.body)
  db.query(
    `insert into orderList (oid,pname,pid,otime,uid,ostatus,onum,oprice,sprice,pics) values 
   (0,'${req.body.pname}','${req.body.pid}','${req.body.otime}','${
      req.body.uid
    }','${req.body.ostatus}','${req.body.onum}','${req.body.oprice}','${
      req.body.sprice
    }','${
      req.body.pics
    }')`,
    function (err) {
      if (err) {
        console.log(err.message);
      } else {
        res.send('123')
      }
    }
  );
});





router.post("/shujutiaozheng", function (req, res) {
  console.log(req.body);
  switch (req.body.tiaozheng) {
    case "appendchild":
      sql =
        "insert into subcategory values(0," +
        "'" +
        req.body.name +
        "'" +
        "," +
        req.body.id +
        ");";
      break;
    case "append":
      sql = "insert into category values(0," + "'" + req.body.name + "');";
      break;
    case "renamechild":
      sql =
        "update subcategory set subname=" +
        "'" +
        req.body.subname +
        "'" +
        " where subid =" +
        req.body.subid +
        ";";
      break;
    case "rename":
      sql =
        "update category set catename =" +
        "'" +
        req.body.catename +
        "'" +
        " where cateid =" +
        req.body.cateid +
        ";";
      break;
    case "removechild":
      sql = "delete from subcategory where subid =" + req.body.subid + ";";
      break;
    case "shoptianjia":
      sql = `insert into product (pid,showName,price,store,cateid,subcateid,pics) values (0,'${
        req.body.showName
      }',${req.body.price},${req.body.store},'${req.body.cateid}','${
        req.body.subcateid
      }','${req.body.path}')`;
      break;
    case "shopupdata":
      sql = `update product set showName ='${req.body.showName}',price =${
        req.body.price
      },store =${req.body.store},cateid ='${req.body.cateid}',subcateid ='${
        req.body.subcateid
      }',pics ='${req.body.pics}' where pid=${req.body.pid}`;
      break;
    case "removeshopdata":
      sql = `delete from product where pid =${req.body.pid};`;
      break;
    case "remove":
      sql = "delete from category where cateid=" + req.body.cateid + ";";
      var sql1 = "delete from subcategory where cid=" + req.body.cateid + ";";
      db.query(sql1, function (err) {
        if (err) {
          res.send(err.message);
        }
      });
      break;
  }
  console.log(sql);
  db.query(sql, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send({
        status: 200,
        ok: true
      });
    }
  });
});



router.get("/fatCategoryList", function (req, res) {
  db.query("select * from category ", function (err, data) {
    if (!err) {
      res.send(data);
    }
  });
});


//  获取子类型列表
router.get("/subCategoryList", function (req, res) {
  console.log(req.query.id);
  let id = req.query.id;
  db.query("select * from subcategory where cid=" + id, function (err, data) {
    if (!err) {
      res.send(data);
    }
  });
});


router.post("/upload", function (req, res) {
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
        } else {
          console.log("rename ok");
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



router.get("/upload/*", function (req, res) {
  var decode_url = decodeURI(req.url);
  var str = decode_url.split("/");
  let file_path = __dirname + "/public/files/" + str[str.length - 1];
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
});

module.exports = router;
