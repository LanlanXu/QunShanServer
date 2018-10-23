var config = require('../config/index');
var UsersModel = require('../model/user');


exports.login = function (req, res) {
    UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
        if (!err) {
            if (!docs.length) {
                config.result.success = false;
                config.result.msg = '该手机号还未注册';
                res.json(config.result);
            } else {
                config.result.data = docs;
                config.result.msg = '登录成功';
                res.json(config.result);
            }

        }
    })
};

exports.register = function (req, res) {
    UsersModel.find({ phone: new RegExp(req.body.phone) }, function (err, docs) {
        if (!err) {
            if (!docs.length) {
                var user = new UsersModel({
                    phone: req.body.phone,
                    password: req.body.password
                });
                user.save(function (err, doc) {
                    config.result.msg = '注册成功，请登录';
                    res.json(config.result);
                });
            } else {
                config.result.success = false;
                config.result.msg = '该手机号已注册，请直接登录';
                res.json(config.result);
            }
        }
    });
};