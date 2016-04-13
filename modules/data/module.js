/// <reference path="../../typings/main.d.ts" />
//DATA MODULE
var config = { moduleURL: "/data" , depends: ["login"] };

exports.Config = function() {
    return config;
}

exports.Bootstrap = function(app) {
    app.get(app.modules.login.Config().moduleURL + config.moduleURL, function(req, res) {
        var obj = {};
        obj.cc = "data";
        obj.user= req.user;
        res.send(JSON.stringify(obj));
    });
}
