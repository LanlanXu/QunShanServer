var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var api = require('./controller/index');
var ControlTable = require('./controltable/index').ControlTable;

function resolve(dir) {
    return path.join(__dirname, dir)
}
app.use(express.static(resolve('../webapp')));

/** 接口统一注册 */
for (var item in ControlTable) {
    for (var key in ControlTable[item]) {
        var temp = ControlTable[item][key];
        app[temp.type](temp.url, jsonParser, api[item][key]);
    }
}

/** 连接数据库 */
mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log(err, '数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(3000);
    }
});