const con = require('../DB/connection')

function insertRestock(req, res){
    con.query("INSERT INTO restock (idUser) VALUES (?)", 
        [req.body.idUser], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                var arr = req.body.idSupplies
                arr.forEach(function(v){
                    con.query(`INSERT INTO restocksupply (idRestock, idSupply, quantityRestockSupply, 
                        costRestockSupply, idProvider, commentaryRestockSupply) VALUES (?, ?, ?, ?, ?, ?)`,
                        [result.insertId, v.idSupply, v.quantityRestockSupply, v.costRestockSupply,
                        v.idProvider, v.commentaryRestockSupply], 
                        function (err, resul) {
                            if (err) {
                                console.log("Error" , err)
                                res.json({err}).status(500)
                            }else
                                console.log("insert "+resul.affectedRows+" restock supply")
                        }
                    )
                })
                res.status(200).json("insert "+result.affectedRows+" restock, ID: "+ result.insertId)
            }
        }
    )
}

function insertOnlyRestock(req, res){
    con.query("INSERT INTO restock (idUser) VALUES (?)", 
        [req.body.idUser], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json( { idRestock : result.insertId })
        }
    )
}

function insertRestockSupply(req, res){
    con.query(`INSERT INTO restocksupply (idRestock, idSupply, quantityRestockSupply, costRestockSupply,
        idProvider, commentaryRestockSupply) VALUES (?, ?, ?, ?, ?, ?)`, 
        [req.body.idRestock, req.body.idSupply, req.body.quantity, req.body.cost, req.body.idProvider,
        req.body.commentary], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json("insert "+result.affectedRows+" restock supply, ID: "+ result.insertId)
        }
    )
}

function updateRestockSupply(req, res){
    con.query(`UPDATE restocksupply SET quantityRestockSupply = ?, costRestockSupply = ?, 
        arrivalDateRestockSupply = ?, sellByDateRestockSupply = ?, idProvider = ?, statusRestockSupply = ?, 
        commentaryRestockSupply = ? WHERE idRestock = ? AND idSupply = ?`, 
        [req.body.quantity, req.body.cost, req.body.arrivalDate, req.body.sellByDate,req.body.idProvider, 
        req.body.status, req.body.commentary, req.body.idRestock, req.body.idSupply],
        function (err, result, fields) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                res.status(200).json("update "+result.affectedRows+" restock supply, id restock: " + 
                req.body.idRestock+" id supply: "+req.body.idSupply)
            }
        }
    )
}

function deleteRestockSupply(req, res){
    con.query("DELETE FROM restocksupply WHERE idRestock = ? AND idSupply = ?", 
        [req.body.idRestock, req.body.idSupply], 
        function (err, result) {
            if (err){
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                res.status(200).json("delete "+result.affectedRows+" restock supply, id restock: "+ 
                req.body.idRestock+" id supply: "+req.body.idSupply)
            }
        }
    )
}

function promise_query(query , param , v){ 
    return new Promise( ( resolve , reject) => {
        con.query(query , param , function (err , rows) {  
            if(err) reject(err)
            else{
                v.supplies = rows
                resolve(v)
            } 
        })
    })
}

function getRestock(req, res){
    con.query(`SELECT r.idRestock, r.registrationDateRestock, r.idUser, u.emailUser, r.statusRestock 
        FROM restock AS r INNER JOIN users AS u ON r.idUser=u.idUser`,
        function (err, result, fields) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                let queries = []
                result.forEach(function(element){
                    let query = `SELECT r.idSupply, r.quantityRestockSupply, r.costRestockSupply,
                    r.arrivalDateRestockSupply, r.sellByDateRestockSupply, r.idProvider, p.nameProvider, 
                    r.statusRestockSupply, r.commentaryRestockSupply FROM restocksupply AS r 
                    INNER JOIN providers AS p ON r.idProvider=p.idProvider WHERE r.idRestock=?`
                    queries.push(promise_query(query , element.idRestock, element))
                })
                Promise.all(queries).then(values => {
                    res.status(200).json({ restock : values })
                }).catch(reason => { 
                    console.log("Error" , reason)
                    res.status(500).json({reason})
                })
            }
        }
    )
}

function getRestockRecommendation(req, res){
    con.query(`SELECT null as idRestock, null as registrationDateRestock, null as idUser, null as emailUser,
        null as statusRestock`,
        function (err, result, fields) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                let queries = []
                result.forEach(function(element){
                    let query = `SELECT s.idSupply, (s.maxQuantitySupply-s.quantitySupply) as quantityRestockSupply,
                    null as costRestockSupply, null as arrivalDateRestockSupply, null sellByDateRestockSupply, 
                    null as idProvider, null as nameProvider, 1 as statusRestockSupply, null as commentaryRestockSupply 
                    FROM supplies AS s WHERE s.quantitySupply<s.minQuantitySupply and s.statusSupply=1`
                    queries.push(promise_query(query , null, element))
                })
                Promise.all(queries).then(values => {
                    res.status(200).json({ restock : values })
                }).catch(reason => { 
                    console.log("Error" , reason)
                    res.status(500).json({reason})
                })
            }
        }
    )
}

function statusRestock(req, res){
    con.query("UPDATE restock AS r SET r.statusRestock=? WHERE r.idRestock=?", 
        [req.body.status, req.body.idRestock], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                console.log("update restock")
                con.query("UPDATE restocksupply AS rs SET rs.statusRestockSupply=? WHERE rs.idRestock=?", 
                    [req.body.status, req.body.idRestock], 
                    function (err, resul) {
                        if (err) {
                            console.log("Error" , err)
                            res.status(500).json({err})
                        }else{
                            console.log("update supplies restock")
                            res.status(200).json("update state of restock ID: "+ req.body.idRestock + 
                            " and " + resul.affectedRows+" restocksupplies")
                        }
                    }
                )
            }
        }
    )
}

module.exports = {
    insertRestock,
    getRestock,
    getRestockRecommendation,
    statusRestock,
    insertRestockSupply,
    updateRestockSupply,
    deleteRestockSupply,
    insertOnlyRestock
}