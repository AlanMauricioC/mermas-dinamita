const mysql = require('mysql');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "vivallWastesInventory"
});

var con = (function () {

    function _query(query, params, callback) {
        pool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }
            console.log("Connected!");
            connection.query(query, params, (err, rows) => {
                connection.release();
                if (!err) {
                    callback(rows, err);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', (err) => {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = con;