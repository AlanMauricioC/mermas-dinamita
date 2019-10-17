var con = require('../DB/connection');

function insertWaste(req, res) {
	con.query("INSERT INTO wastes(idSupply, quantityWaste, idUser, sellByDateWastetimestamp) VALUES(?, ?, ?, ?)", [req.body.id, req.body.quantity, req.body.idUser, req.body.sellByDate], function (err, result, fields) {
		if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            console.log('{ "wastes" :' + JSON.stringify(result) + '}');
            res.json("insert "+result.affectedRows+" waste, ID: "+ result.insertId).status(200);
        }
    });   
};

function getWastes(req, res) {
    qry = "SELECT idWaste, s.idSupply, sp.nameSupply, registrationDateWaste, sellByDateWastetimestamp, quantityWaste, s.idUser FROM wastes AS s INNER JOIN supplies AS sp ON s.idSupply=sp.idSupply WHERE statusWaste=1 AND DATE(sellByDateWastetimestamp)>=?";
    values = [dateNow()];

	con.query(qry, values, function (err, result, fields) {
		if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            res.json(JSON.parse('{ "wastes" :' + JSON.stringify(result) + '}')).status(200);
        }		
	});
};

function updateWaste(req, res) {
	con.query("UPDATE wastes SET quantityWaste=?, idUser=?, sellByDateWastetimestamp=? WHERE idWaste=?", [req.body.quantity, req.body.idUser, req.body.sellByDate, req.body.id], function(err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            console.log("update "+result.affectedRows+" waste, ID: "+ req.body.id);
            res.json("update "+result.affectedRows+" waste, ID: "+ req.body.id).status(200);
        }
    });
};

function deleteWaste(req, res) {
    con.query("UPDATE wastes SET statusWaste=0 WHERE idWaste=?", [req.body.id], function(err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            console.log("delete "+result.affectedRows+" waste, ID: "+ req.body.id);
            res.json("delete "+result.affectedRows+" waste, ID: "+ req.body.id).status(200);
        }
    });
};

function dateNow() {
	let date = new Date();
	let today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();

	return today;
};

module.exports = {
    insertWaste,
    getWastes,
    updateWaste,
    deleteWaste
};