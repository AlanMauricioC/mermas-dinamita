const con = require('../DB/connection');

function getUnits (req, res){
    con.query("select * from units", null, function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else
            res.json({ units : result }).status(200);
    });    
};

module.exports = {
    getUnits
};