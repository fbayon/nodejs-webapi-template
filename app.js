/// <reference path="typings/main.d.ts" />
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var loader = require("./loader.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var framework = require("./framework/database.js");

app.database = {
    host: "dbtest.com",
    user: "root",
    password: "root",
    connectionPool: 10,
    db: "test",
    driver: "mysql"
};

framework.Create(app.database);

loader.LoadServices(app);

loader.LoadModules(app);

Object.keys(app.modules).forEach(function(key) {
    console.log("module " + key + " has loaded on " + app.modules[key].Config().moduleURL);
});

Object.keys(app.services).forEach(function(key) {
    console.log("service " + key + " has loaded");
});

app.listen(3000, function() {
    console.log("Server running on http://localhost:3000");
});