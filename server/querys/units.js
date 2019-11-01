const con = require('../DB/connection')

function getUnits (req, res){
    con.query("SELECT idUnit AS id, nameUnit AS name FROM units WHERE statusUnit=1", function (err, result) {
        if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }else
            res.status(200).json({ units : result })
    })
}

function insertUnit(req, res) {
    con.query(`INSERT INTO units(nameUnit) VALUES(?)`, [req.body.name],  function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log('{ "units" :' + JSON.stringify(result) + '}')
                res.status(200).json("insert "+result.affectedRows+" unit, ID: "+ result.insertId)
            }
        }
    )
}

function updateUnit(req, res) {
    con.query(`UPDATE units SET nameUnit=? WHERE idUnit=?`, [req.body.name, req.body.id],  function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("update "+result.affectedRows+" unit, ID: "+ req.body.id)
                res.status(200).json("update "+result.affectedRows+" unit, ID: "+ req.body.id)
            }
        }
    )
}

function deleteUnit(req, res) {
    con.query(`UPDATE units SET statusUnit=0 WHERE idUnit=?`, [req.body.id],  function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }
            else {
                console.log("delete "+result.affectedRows+" unit, ID: "+ req.body.id)
                res.status(200).json("delete "+result.affectedRows+" unit, ID: "+ req.body.id)
            }
        }
    )
}

module.exports = {
    getUnits,
    insertUnit,
    updateUnit,
    deleteUnit
}