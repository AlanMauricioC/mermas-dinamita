const con = require('../DB/connection')

function insertOrder(req, res){
    con.query("INSERT INTO orders (idRecipe, supply, idUser) VALUES (?, ?, ?)", 
        [req.body.idRecipe, req.body.supply, req.body.tokenIdUser], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                try {
                    var as = req.body.supplies
                    as.forEach(function(supply){
                        con.query("INSERT INTO ordersupply (idOrder, idSupply, quantityOrderSupply) VALUES (?, ?, ?)", 
                            [result.insertId, supply.idSupply, supply.quantity], 
                            function (err, resul) {
                                if (err) {
                                    console.log("Error" , err)
                                    res.status(500).json({err})
                                }else
                                    console.log("insert " + resul.affectedRows + " order supply")
                            }
                        )
                    })
                    if(req.body.wastes){
                        var aw = req.body.wastes
                        aw.forEach(function(waste){
                            con.query("INSERT INTO orderwaste (idOrder, idWaste, quantityOrderWaste) VALUES (?, ?, ?)", 
                                [result.insertId, waste.idWaste, waste.quantityOrderWaste],  
                                function (err, resul) {
                                    if (err) {
                                        console.log("Error" , err)
                                        res.status(500).json({err})
                                    }else
                                        console.log("insert " + resul.affectedRows + " order waste")
                                }
                            )
                        })
                    }
                    res.status(200).json("insert " + result.affectedRows + " order, ID: "+ result.insertId)
                } catch (error) {
                    con.query("DELETE FROM orders WHERE idOrder=?", result.insertId, 
                        function (err, result) {
                            if (err) {
                                console.log("Error" , err)
                                res.status(500).json({del:err})
                            }else
                                res.status(500).json({try : error})
                        }
                    )
                }
            }
        }
    )
}

function promise_query_w(query , param , v){ 
    return new Promise( ( resolve , reject) => {
        con.query(query , param , function (err , rows) {  
            if(err) reject(err)
            else{
                v.wastes = rows
                resolve(v)
            } 
        })
    })
}

function promise_query_s(query , param , v){ 
    return new Promise( ( resolve , reject) => {
        con.query(query , param , function (err , rows) {  
            if(err) reject(err)
            else{
                let queries = []
                queries.push( promise_query_w(`SELECT ow.idWaste, s.nameSupply, ow.quantityOrderWaste, u.nameUnit 
                FROM orderwaste AS ow INNER JOIN wastes AS w ON w.idWaste=ow.idWaste INNER JOIN 
                supplies AS s ON w.idSupply=s.idSupply INNER JOIN units AS u ON s.idUnit=u.idUnit 
                WHERE ow.idOrder=? ORDER BY s.nameSupply`, param, v))
                Promise.all(queries).then(values => {
                    v = values[0]
                    v.supplies = rows
                    resolve(v)
                }).catch(reason => { 
                    console.log("Error" , reason)
                });
            } 
        })
    })
}

function getOrders(req, res){
    con.query(`SELECT o.idOrder, o.dateOrder, o.idRecipe, r.nameRecipe, o.idUser, u.emailUser, 
        o.statusOrder, CASE WHEN o.supply=1 THEN true ELSE false END AS supply FROM orders AS o INNER JOIN users AS u ON o.idUser=u.idUser 
        INNER JOIN recipes AS r ON r.idRecipe=o.idRecipe ORDER BY o.dateOrder`, 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                let queries = []
                result.forEach(function(element){
                    let query = `SELECT os.idSupply, s.nameSupply, os.quantityOrderSupply, u.nameUnit   
                    FROM ordersupply AS os INNER JOIN supplies AS s ON s.idSupply=os.idSupply 
                    INNER JOIN units AS u ON s.idUnit=u.idUnit WHERE os.idOrder=? ORDER BY s.nameSupply`
                    queries.push(promise_query_s(query, element.idOrder, element))
                })
                Promise.all(queries).then(values => {
                    res.status(200).json({ orders : values })
                }).catch(reason => { 
                    console.log("Error" , reason)
                    res.status(500).json({reason})
                });
            }
        }
    )
}

function updateOrder(req, res){
    con.query("UPDATE orders SET statusOrder = ?, idRecipe = ? WHERE idOrder = ?", 
        [req.body.statusOrder, req.body.idRecipe, req.body.idOrder], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                console.log("update order")
                res.status(200).json("update " + result.affectedRows + " order id: " + req.body.idOrder)
            }
        }
    )
}

function insertOrderSupply(req, res){
    con.query("INSERT INTO ordersupply (idOrder, idSupply, quantityOrderSupply) VALUES (?, ?, ?)", 
        [req.body.idOrder, req.body.idSupply, req.body.quantityOrderSupply], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json("insert " + result.affectedRows + " order supply")
        }
    )
}

function updateOrderSupply(req, res){
    con.query("UPDATE ordersupply SET quantityOrderSupply = ? WHERE idOrder = ? AND idSupply = ?", 
        [req.body.quantityOrderSupply, req.body.idOrder, req.body.idSupply], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                res.status(200).json("update " + result.affectedRows + " order supply, id order: " + 
                req.body.idOrder + " id supply: " + req.body.idSupply)
            }
        }
    )
}

function deleteOrderSupply(req, res){
    con.query("DELETE FROM ordersupply WHERE idOrder = ? AND idSupply = ?", 
        [req.body.idOrder, req.body.idSupply], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                res.status(200).json("delete " + result.affectedRows + " order supply, id order: " + 
                req.body.idOrder + " id supply: " + req.body.idSupply)
            }
        }
    )
}

function insertOrderWaste(req, res){
    con.query("INSERT INTO orderwaste (idOrder, idWaste, quantityOrderWaste) VALUES (?, ?, ?)", 
        [req.body.idOrder, req.body.idWaste, req.body.quantityOrderWaste], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json("insert " + result.affectedRows + " order waste, ID: " + result.insertId)
        }
    )
}

function updateOrderWaste(req, res){
    con.query("UPDATE orderwaste SET quantityOrderWaste = ? WHERE idOrder = ? AND idWaste = ?", 
        [req.body.quantityOrderWaste, req.body.idOrder, req.body.idWaste], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                res.status(200).json("update " + result.affectedRows + " order waste, id order: " + 
                req.body.idOrder + " id waste: " + req.body.idWaste)
            }
        }
    )
}

function deleteOrderWaste(req, res){
    con.query("DELETE FROM orderwaste WHERE idOrder = ? AND idWaste = ?", 
        [req.body.idOrder, req.body.idWaste], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                res.status(200).json("delete " + result.affectedRows + " order waste, id order: " + 
                req.body.idOrder + " id waste: " + req.body.idWaste)
            }
        }
    )
}

module.exports = {
    insertOrder,
    getOrders,
    updateOrder,
    insertOrderSupply,
    updateOrderSupply,
    deleteOrderSupply,
    insertOrderWaste,
    updateOrderWaste,
    deleteOrderWaste
}