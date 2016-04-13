/// <reference path="../../typings/main.d.ts" />
//LOGIN MODULE
var config = { moduleURL: "/auth" };
exports.Config = function() {
    return config;
}

exports.Bootstrap = function(app) {
    app.all(config.moduleURL + '/*', function(req, res, next) {
      if(req.url.indexOf("/auth/login/")===0){
           next();
      }else{
           console.log(req.query.token);
      
        app.services.auth.GetUser(req.query.token,
            function(user) {
                req.user = user;
                next();
            },
            function(error) {
                res.send(error);
            }
        );
      }
    });

    app.get(config.moduleURL + '/login/:user/:pass', function(req, res) {
        var obj = {};
        obj.module = "LOGIN";
        obj.user = req.params.user;
        obj.pass = req.params.pass;
        app.services.auth.Login(obj.user, obj.pass, function(data) {
            obj.id = data.id;
            obj.token = data.token;
            res.send(JSON.stringify(obj));
        }, function(err) {
            res.send(err);
        })
    });
}