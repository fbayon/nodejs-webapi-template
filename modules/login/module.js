/// <reference path="../../typings/main.d.ts" />
//LOGIN MODULE
var config = { moduleURL: "/login/", depends: ["data"] };
exports.Config = function() {
    return config;
}

exports.Bootstrap = function(app) {
    app.all(config.moduleURL + '*', function(req, res, next) {
        next();
    });

    app.get(config.moduleURL + ':user/:pass', function(req, res) {
        var obj = {};
        obj.module = "LOGIN";
        obj.user = req.params.user;
        obj.pass = req.params.pass;
        app.services.auth.Login(obj.user, obj.pass, function(data) {
            obj.id = data.id;
            res.send(JSON.stringify(obj));
        }, function(err) {
            res.send(err);
        })
    });
}