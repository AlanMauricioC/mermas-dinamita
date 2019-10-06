var con = require('../DB/connection');

function insertRestock(req, res){
    con.query("INSERT INTO restock (idUser) VALUES (?)", [req.body.idUser], function (err, result, fields) {
        if (err) throw err;
        var arr = JSON.parse(req.body.idSupplies);
        arr.forEach(function(v){
            con.query("INSERT INTO restocksupply (idRestock, idSupply, quantityRestockSupply, costRestockSupply, idProvider, commentaryRestockSupply) VALUES (?, ?, ?, ?, ?, ?)", [result.insertId, v.idSupply, v.quantity, v.cost, v.idProvider, v.commentary], function (err, resul, fields) {
                if (err) throw err;
                console.log("insert "+resul.affectedRows+" restock supply");
            });
        });
        res.json("insert "+result.affectedRows+" restock, ID: "+ result.insertId).status(200);
    });
}

function insertRestockSupply(req, res){
    con.query("INSERT INTO restocksupply (idRestock, idSupply, quantityRestockSupply, costRestockSupply, idProvider, commentaryRestockSupply) VALUES (?, ?, ?, ?, ?, ?)", [req.body.idRestock, req.body.idSupply, req.body.quantity, req.body.cost, req.body.idProvider, req.body.commentary], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else{
            res.json("insert "+result.affectedRows+" restock supply, ID: "+ result.insertId).status(200);
        }
    });   
};

function updateRestockSupply(req, res){
    con.query("UPDATE restocksupply SET quantityRestockSupply = ?, costRestockSupply = ?, arrivalDateRestockSupply = ?, sellByDateRestockSupply = ?, idProvider = ?, statusRestockSupply = ?, commentaryRestockSupply = ? WHERE idRestock = ? AND idSupply = ?", [req.body.quantity, req.body.cost, req.body.arrivalDate, req.body.sellByDate,req.body.idProvider, req.body.status, req.body.commentary, req.body.idRestock, req.body.idSupply], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else{
            res.json("update "+result.affectedRows+" restock supply, id restock: "+ req.body.idRestock+" id supply: "+req.body.idSupply).status(200);
        }
    });   
};

function deleteRestockSupply(req, res){
    con.query("DELETE FROM restocksupply WHERE idRestock = ? AND idSupply = ?", [req.body.idRestock, req.body.idSupply], function (err, result, fields) {
        if (err) throw err;
        res.json("delete "+result.affectedRows+" restock supply, id restock: "+ req.body.idRestock+" id supply: "+req.body.idSupply).status(200);
    });   
};

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
	con.query("SELECT r.idRestock, r.registrationDateRestock, r.idUser, r.statusRestock FROM restock AS r", function (err, result, fields) {
        if (err) throw err;
        let queries = []
        result.forEach(function(element){
            let query = "SELECT r.idSupply, r.quantityRestockSupply, r.costRestockSupply, r.arrivalDateRestockSupply, r.sellByDateRestockSupply, r.idProvider, r.statusRestockSupply, r.commentaryRestockSupply FROM restocksupply AS r WHERE r.idRestock=?"
            queries.push(promise_query(query , element.idRestock, element))
        });
        Promise.all(queries).then(values => {
            res.json({ restock : values }).status(200);
        }).catch(reason => { 
            console.log("Error" , reason)
            res.json({reason}).status(500);
        });
    });
};

function statusRestock(req, res){
	con.query("UPDATE restock AS r SET r.statusRestock=? WHERE r.idRestock=?", [req.body.status, req.body.idRestock], function (err, result, fields) {
        if (err) throw err;
        console.log("update restock");
        con.query("UPDATE restocksupply AS rs SET rs.statusRestockSupply=? WHERE rs.idRestock=?", [req.body.status, req.body.idRestock], function (err, resul, fields) {
            if (err) throw err;
            console.log("update supplies restock");
            res.json("update state of restock ID: "+ req.body.idRestock + " and "+resul.affectedRows+" restocksupplies").status(200);
        });
    });
};

module.exports = {
    insertRestock,
    getRestock,
    statusRestock,
    insertRestockSupply,
    updateRestockSupply,
    deleteRestockSupply
};