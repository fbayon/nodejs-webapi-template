/// <reference path="../../typings/main.d.ts" />
//DATA MODULE
var config = { moduleURL: "/data/" };

exports.Config = function() {
    return config;
}

exports.Bootstrap = function(app) {
    app.get('/data', function(req, res) {
        var obj = {};
        obj.cc = "data";
        res.send(JSON.stringify(obj));
    });
}
