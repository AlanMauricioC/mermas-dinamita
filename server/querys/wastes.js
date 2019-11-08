var con = require('../DB/connection')

function insertWaste(req, res) {
    con.query(`INSERT INTO wastes(idSupply, quantityWaste, typeWaste, idUser, sellByDateWastetimestamp) 
        VALUES(?, ?, ?, ?, ?)`, 
        [req.body.id, req.body.quantity, requ.body.type, req.body.idUser, req.body.sellByDate], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log('{ "wastes" :' + JSON.stringify(result) + '}')
                res.status(200).json("insert "+result.affectedRows+" waste, ID: "+ result.insertId)
            }
        }
    )
}

function getWastes(req, res) {
    qry = `SELECT idWaste, s.idSupply, sp.nameSupply, registrationDateWaste, sellByDateWastetimestamp,
    quantityWaste, typeWaste, s.idUser FROM wastes AS s INNER JOIN supplies AS sp ON s.idSupply=sp.idSupply 
    WHERE statusWaste=1 AND DATE(sellByDateWastetimestamp)>=?`
    values = [dateNow()]
	con.query(qry, values, function (err, result) {
		if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }
        else {
            res.status(200).json(JSON.parse('{ "wastes" :' + JSON.stringify(result) + '}'))
        }		
	})
}

function updateWaste(req, res) {
    con.query("UPDATE wastes SET quantityWaste=?, typeWaste=?, idUser=? WHERE idWaste=?",
        [req.body.quantity, req.body.type, req.body.idUser, req.body.id], 
        function(err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("update "+result.affectedRows+" waste, ID: "+ req.body.id)
                res.status(200).json("update "+result.affectedRows+" waste, ID: "+ req.body.id)
            }
        }
    )
}

function deleteWaste(req, res) {
    con.query("UPDATE wastes SET statusWaste=0 WHERE idWaste=?", 
        [req.body.id], 
        function(err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("delete "+result.affectedRows+" waste, ID: "+ req.body.id)
                res.status(200).json("delete "+result.affectedRows+" waste, ID: "+ req.body.id)
            }
        }
    )
}

function dateNow() {
	let date = new Date()
	let today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
	return today
}

module.exports = {
    insertWaste,
    getWastes,
    updateWaste,
    deleteWaste
}