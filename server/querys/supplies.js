var con = require('../DB/connection')

function insertSupply(req, res) {
    con.query(`INSERT INTO supplies (idUnit, idUser, maxQuantitySupply, minQuantitySupply, nameSupply) VALUES (?, ?, ?, ?, ?)`, 
        [req.body.idUnit, req.body.idUser, req.body.max, req.body.min, req.body.name], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("insert "+result.affectedRows+" supply, ID: "+ result.insertId)
                res.status(200).json("insert "+result.affectedRows+" supply, ID: "+ result.insertId)
            }
        }
    )  
}

function getSupplies(req, res) {
    var qry = `SELECT idSupply AS id, nameSupply As name, minQuantitySupply AS min, 
    (minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2) AS avg, maxQuantitySupply AS max, 
    quantitySupply AS quantity, nameUnit AS unit, s.idUnit FROM supplies AS s INNER JOIN units AS u 
    ON s.idUnit=u.idUnit WHERE statusSupply=1`
    var values = []
    if(req.body.search) {
        qry = qry + " AND nameSupply LIKE ?"
        values = ["%"+req.body.search+"%"]
    }
    else if(req.body.state) {
        switch(req.body.state) {
            case "warning":
                qry = qry + ` AND quantitySupply>=minQuantitySupply AND 
                        quantitySupply<=(minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2)`
                break
            case "ok":
                qry = qry + ` AND quantitySupply<=maxQuantitySupply AND 
                        quantitySupply>=(minQuantitySupply+(maxQuantitySupply-minQuantitySupply)/2)`
                break
            case "error":
                qry = qry + ` AND quantitySupply<minQuantitySupply OR quantitySupply>maxQuantitySupply`
                break
        }
        values = [req.body.state]
    }
	con.query(qry, values, function (err, result) {
		if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }
        else
            res.status(200).json(JSON.parse('{ "supplies" :' + JSON.stringify(result) + '}'))
	})
}

function updateSupply(req, res) {
    con.query(`UPDATE supplies SET nameSupply=?, minQuantitySupply=?, 
        maxQuantitySupply=?, idUnit=? WHERE idSupply=?`, 
        [req.body.name, req.body.min, req.body.max, req.body.idUnit, req.body.id], 
        function(err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("update "+result.affectedRows+" supply, ID: "+ req.body.id)
                res.status(200).json("update "+result.affectedRows+" supply, ID: "+ req.body.id)
            }
        }
    )
}

function deleteSupply(req, res) {
    con.query("UPDATE supplies SET statusSupply=0 WHERE idSupply=?", 
        [req.body.id], 
        function(err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("delete "+result.affectedRows+" supply, ID: "+ req.body.id);
                res.status(200).json("delete "+result.affectedRows+" supply, ID: "+ req.body.id)
            }
        }
    )
}

module.exports = {
    insertSupply,
    getSupplies,
    updateSupply,
    deleteSupply
}