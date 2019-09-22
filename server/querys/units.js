var con = require('../DB/connection');

function getUnits (req, res){
    con.query("select * from units", null, function (data, error) {
        if(error) throw error;
        res.json(JSON.parse('{ "units" : ' + JSON.stringify(data) + '}')).status(200);
    });    
};

module.exports = {
    getUnits
};