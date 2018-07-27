var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL || "mongodb://$user:$pass@$host:$port/mac2corp";
var dbName = "mac2corp";
var serverport = process.env.PORT || 8080;

var HTML = 
    '<html>'
    +'<style>'
    +'body{text-align: center;}'
    +'input{height: 25px;}'
    +'input[type="submit"]{margin-left: 10px; border-radius: 15px;}'
    +'</style>'
    +'<body>'
    +'<form action="mac" method="post">'
    +'MAC: <input type="text" name="mac">'
    +'<input type="submit" value="查询">'
    +'</form>'
    +'</body>'
    +'</html>';

app.get('/', function (req, res) {
    res.append('Content-Type', 'text/html;charset=utf-8');
    res.end(HTML);
})

app.post('/mac', urlencodedParser, function (req, res) {
    var mac = req.body.mac;
    mac = mac.trim();
    mac = mac.replace(/-*:*/g, '');
    mac = mac.toUpperCase();
    mac = mac.substring(0, 6);
    console.log(mac);
    var whereStr = {"company_id": mac};  // 查询条件
    var start = new Date();
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        db.db(dbName).collection("oui").find(whereStr, { _id: 0}).toArray(function(err, result) {
            if (err) throw err;
            res.append('Timeuse', new Date()-start);
            res.json(JSON.stringify(result));
        });
        db.close();
    });

})

var server = app.listen(serverport, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
