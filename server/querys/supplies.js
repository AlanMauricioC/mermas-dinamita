var con = require('../DB/connection');

function insertSupply(req, res) {
    con.query("INSERT INTO supplies (idUnit, idUser, maxQuantitySupply, minQuantitySupply, nameSupply, quantitySupply) VALUES (?, ?, ?, ?, ?, ?)", [req.body.idUnit, req.body.idUser, req.body.max, req.body.min, req.body.name, req.body.quantity], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            console.log("insert "+result.affectedRows+" supply, ID: "+ result.insertId);
            res.json("insert "+result.affectedRows+" supply, ID: "+ result.insertId).status(200);
        }
    });   
};

function getSupplies(req, res) {
    if(req.body.search) {
        qry = "SELECT idSupply AS id, nameSupply As name, minQuantitySupply AS min, (minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2) AS avg, maxQuantitySupply AS max, quantitySupply AS quantity, nameUnit AS unit, s.idUnit FROM supplies AS s INNER JOIN units AS u ON s.idUnit=u.idUnit WHERE statusSupply=1 AND nameSupply LIKE ?";
        values = ["%"+req.body.search+"%"];
    }
    else if(req.body.state) {
        switch(req.body.state) {
            case "warning":
                qry = "SELECT idSupply AS id, nameSupply As name, minQuantitySupply AS min, (minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2) AS avg, maxQuantitySupply AS max, quantitySupply AS quantity, nameUnit AS unit, s.idUnit FROM supplies AS s INNER JOIN units AS u ON s.idUnit=u.idUnit WHERE statusSupply=1 AND quantitySupply>=minQuantitySupply AND quantitySupply<=(minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2)";
                break;
            case "ok":
                qry = "SELECT idSupply AS id, nameSupply As name, minQuantitySupply AS min, (minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2) AS avg, maxQuantitySupply AS max, quantitySupply AS quantity, nameUnit AS unit, s.idUnit FROM supplies AS s INNER JOIN units AS u ON s.idUnit=u.idUnit WHERE statusSupply=1 AND quantitySupply<=maxQuantitySupply AND quantitySupply>=(minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2)";
                break;
            case "error":
                qry = "SELECT idSupply AS id, nameSupply As name, minQuantitySupply AS min, (minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2) AS avg, maxQuantitySupply AS max, quantitySupply AS quantity, nameUnit AS unit, s.idUnit FROM supplies AS s INNER JOIN units AS u ON s.idUnit=u.idUnit WHERE statusSupply=1 AND quantitySupply<minQuantitySupply OR quantitySupply>maxQuantitySupply";
                break;
        }
        values = [req.body.state];
    } 
    else {
        qry = "SELECT idSupply AS id, nameSupply As name, minQuantitySupply AS min, (minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2) AS avg, maxQuantitySupply AS max, quantitySupply AS quantity, nameUnit AS unit, s.idUnit FROM supplies AS s INNER JOIN units AS u ON s.idUnit=u.idUnit WHERE statusSupply=1";
        values = [];
    }

	con.query(qry, values, function (err, result, fields) {
		if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            res.json(JSON.parse('{ "supplies" :' + JSON.stringify(result) + '}')).status(200);
        }
	});
};

function updateSupply(req, res) {
    con.query("UPDATE supplies SET nameSupply=?, quantitySupply=?, minQuantitySupply=?, maxQuantitySupply=?, idUnit=? WHERE idSupply=?", [req.body.name, req.body.quantity, req.body.min, req.body.max, req.body.idUnit, req.body.id], function(err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            console.log("update "+result.affectedRows+" supply, ID: "+ req.body.id);
            res.json("update "+result.affectedRows+" supply, ID: "+ req.body.id).status(200);
        }
    });
}

function deleteSupply(req, res) {
    con.query("UPDATE supplies SET statusSupply=0 WHERE idSupply=?", [req.body.id], function(err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }
        else {
            console.log("delete "+result.affectedRows+" supply, ID: "+ req.body.id);
            res.json("delete "+result.affectedRows+" supply, ID: "+ req.body.id).status(200);
        }
    });
};

module.exports = {
    insertSupply,
    getSupplies,
    updateSupply,
    deleteSupply
};