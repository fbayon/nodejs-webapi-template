/// <reference path="../../typings/main.d.ts" />
var mysql = require("mysql");
var pool = null;


function Query(query, onQuery, onError) {
    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            console.log("Error in connection database");
            onError(err);
            return;
        }

        connection.query(query, function(err, rows) {
            connection.release();
            if (err) {
                onError(err);
            } else {
                onQuery(rows);
            }
        });
    });
}

exports.Configure = function(database) {
    if (pool === null) {
        pool = mysql.createPool({
            connectionLimit: database.connectionPool,
            host: database.host,
            user: database.user,
            password: database.password,
            database: database.db,
            debug: false
        });
    }
    database.Query = Query;
}
