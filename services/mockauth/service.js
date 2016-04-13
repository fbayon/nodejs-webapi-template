/// <reference path="../../typings/main.d.ts" />
//MOCKAUTH SERVICE
var config = { "as": "auth" };
var randomstring = require("randomstring");

var currentuser;
exports.Config = function() {
    return config;
}

exports.Bootstrap = function(app) {
}

exports.Login = function(user, pass, onSuccess, onError) {
    currentuser = randomstring.generate(5);
    onSuccess({ id: 99, token: currentuser });
}

exports.GetUser = function(token, onSuccess, onError) {
    if (currentuser === undefined || token === undefined) {
        onError("invalid user");
        return;
    }
    if (token == currentuser) {
        onSuccess({ id: 99, token: currentuser });
    } else {
        onError("invalid user");
    }
}