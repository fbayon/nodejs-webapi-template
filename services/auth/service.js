/// <reference path="../../typings/main.d.ts" />
//AUTH SERVICE
var database;

exports.Bootstrap = function(app) {
    this.database = app.database;
}

exports.Login = function(user, pass, onSuccess, onError) {
    this.database.Query("SELECT * from users where user='" + user + "' AND pass='" + pass + "'", function(rows) {
        var o;
        o = rows;
        if (rows.length == 1) {
            onSuccess(rows[0]);
        } else {
            onError("Error");
        }
    }, function(err) {
        onError(err);
    });
}