const con = require('../DB/connection')

function insertRecipe(req, res){
    con.query("INSERT INTO recipes (nameRecipe, detailRecipe, idSupply) VALUES (?, ?, ?)",
        [req.body.nameRecipe, req.body.detailRecipe, req.body.idSupply],
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                var arr = req.body.idSupplies
                arr.forEach(function(v){
                    con.query("INSERT INTO recipesupply (idRecipe, idSupply, quantityRecipeSupply) VALUES (?, ?, ?)", 
                        [result.insertId, v.idSupply, v.quantityRecipeSupply], 
                        function (err, resul) {
                            if (err) {
                                console.log("Error" , err)
                                res.status(500).json({err})
                            }else
                                console.log("insert "+resul.affectedRows+" recipe supply")
                        })
                    }
                )
                res.status(200).json("insert "+result.affectedRows+" recipe, ID: "+ result.insertId)
            }
        }
    )
}

function insertRecipeSupply(req, res){
    con.query("INSERT INTO recipesupply (idRecipe, idSupply, quantityRecipeSupply) VALUES (?, ?, ?)", 
        [req.body.idRecipe, req.body.idSupply, req.body.quantityRecipeSupply], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json("insert "+result.affectedRows+" recipe supply, ID: "+ result.insertId)
        }
    )
}

function updateRecipeSupply(req, res){
    con.query("UPDATE recipesupply SET quantityRecipeSupply = ? WHERE idRecipe = ? AND idSupply = ?", 
        [req.body.quantityRecipeSupply, req.body.idRecipe, req.body.idSupply], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json("update "+result.affectedRows+" recipe supply, id recipe: "+ req.body.idRestock+" id supply: "+req.body.idSupply)
        }
    )
}

function deleteRecipeSupply(req, res){
    con.query("DELETE FROM recipesupply WHERE idRecipe = ? AND idSupply = ?", 
        [req.body.idRecipe, req.body.idSupply], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else
                res.status(200).json("delete "+result.affectedRows+" recipe supply, id recipe: "+ req.body.idRestock+" id supply: "+req.body.idSupply)
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

function getRecipes(req, res){
    var qry = `SELECT r.idRecipe, r.nameRecipe, r.detailRecipe, r.idSupply, s.nameSupply, 
    r.statusRecipe FROM recipes AS r LEFT JOIN supplies AS s ON r.idSupply=s.idSupply`
    var values = []
    if(req.body.search) {
        qry = qry + ` WHERE nameRecipe LIKE ?`
        values = ["%"+req.body.search+"%"]
    }
	con.query(qry, values, function (err, result){
        if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }else{
            let queries = []
            result.forEach(function(element){
                let query = `SELECT r.idSupply, r.quantityRecipeSupply FROM recipesupply AS r 
                INNER JOIN supplies AS s ON r.idSupply=s.idSupply WHERE r.idRecipe=?`
                queries.push(promise_query(query , element.idRecipe, element))
            })
            Promise.all(queries).then(values => {
                res.status(200).json({ recipes : values })
            }).catch(reason => { 
                console.log("Error" , reason)
                res.status(500).json({reason})
            })
        }
    })
}

function updateRecipe(req, res){
    con.query(`UPDATE recipes AS r SET r.nameRecipe=?, r.detailRecipe=?, r.idSupply=?, r.statusRecipe=?
        WHERE r.idRecipe=?`, 
        [req.body.nameRecipe, req.body.detailRecipe, req.body.idSupply, req.body.statusRecipe, req.body.idRecipe], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                console.log("update recipe")
                res.status(200).json("update recipe ID: "+ req.body.idRecipe)
            }
        }
    )
}

module.exports = {
    insertRecipe,
    getRecipes,
    updateRecipe,
    insertRecipeSupply,
    updateRecipeSupply,
    deleteRecipeSupply
}