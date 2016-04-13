/// <reference path="../../typings/main.d.ts" />
//MOCKAUTH SERVICE
var config = { "as": "auth" };

exports.Config = function() {
    return config;
}

exports.Bootstrap = function(app) {
}

exports.Login = function(user, pass, onSuccess, onError) {
   onSuccess({id:99});
}