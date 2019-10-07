var con = require('../DB/connection');

function getUnits (req, res){
    con.query("select * from units", null, function (err, result, fields) {
        if(err) throw err;
        res.json(JSON.parse('{ "units" : ' + JSON.stringify(result) + '}')).status(200);
    });    
};

module.exports = {
    getUnits
};