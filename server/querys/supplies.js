var con = require('../DB/connection');

function insertSupply(req, res){
    con.query("INSERT INTO supplies (idUnit, idUser, maxQuantitySupply, minQuantitySupply, nameSupply, statusSupply) VALUES (?, ?, ?, ?, ?, ?)", [req.body.idUnit, req.body.idUser, req.body.max, req.body.min, req.body.name, req.body.status], function (err, result, fields) {
        if (err) throw err;
        res.send("insert "+result.affectedRows+" supply, ID: "+ result.insertId).status(200);
    });   
};

function getSupplies(req, res){
	con.query("SELECT idSupply, idUnit, nameUnit, maxQuantitySupply, minQuantitySupply, ((maxQuantitySupply-minQuantitySupply)/2) AS optimal, nameSupply FROM supplies WHERE statusSupply=1", null, function (err, result, fields) {
		if (err) throw err;
		res.json(JSON.parse('{ "supplies" :' + JSON.stringify(result) + '}')).status(200);
	});
};

module.exports = {
    insertSupply,
    getSupplies
};