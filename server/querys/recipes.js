const con = require('../DB/connection');

function insertRecipe(req, res){
    con.query("INSERT INTO recipes (nameRecipe, detailRecipe, idSupply) VALUES (?, ?, ?)", [req.body.nameRecipe, req.body.detailRecipe, req.body.idSupply], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else{
            var arr = JSON.parse(req.body.idSupplies);
            arr.forEach(function(v){
                con.query("INSERT INTO recipesupply (idRecipe, idSupply, quantityRecipeSupply) VALUES (?, ?, ?)", [result.insertId, v.idSupply, v.quantityRecipeSupply], function (err, resul, fields) {
                    if (err) {
                        console.log("Error" , err)
                        res.json({err}).status(500);
                    }else
                        console.log("insert "+resul.affectedRows+" recipe supply");
                });
            });
            res.json("insert "+result.affectedRows+" recipe, ID: "+ result.insertId).status(200);
        }
    });
}

function insertRecipeSupply(req, res){
    con.query("INSERT INTO recipesupply (idRecipe, idSupply, quantityRecipeSupply) VALUES (?, ?, ?)", [req.body.idRecipe, req.body.idSupply, req.body.quantityRecipeSupply], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else
            res.json("insert "+result.affectedRows+" recipe supply, ID: "+ result.insertId).status(200);
    });   
};

function updateRecipeSupply(req, res){
    con.query("UPDATE recipesupply SET quantityRecipeSupply = ? WHERE idRecipe = ? AND idSupply = ?", [req.body.quantityRecipeSupply, req.body.idRecipe, req.body.idSupply], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else
            res.json("update "+result.affectedRows+" recipe supply, id recipe: "+ req.body.idRestock+" id supply: "+req.body.idSupply).status(200);
    });   
};

function deleteRecipeSupply(req, res){
    con.query("DELETE FROM recipesupply WHERE idRecipe = ? AND idSupply = ?", [req.body.idRecipe, req.body.idSupply], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else
            res.json("delete "+result.affectedRows+" recipe supply, id recipe: "+ req.body.idRestock+" id supply: "+req.body.idSupply).status(200);
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

function getRecipes(req, res){
    if(req.body.search) {
        qry = "SELECT r.idRecipe, r.nameRecipe, r.detailRecipe, r.idSupply, s.nameSupply, r.statusRecipe FROM recipes AS r LEFT JOIN supplies AS s ON r.idSupply=s.idSupply WHERE nameRecipe LIKE ?";
        values = ["%"+req.body.search+"%"];
    }
    else {
        qry = "SELECT r.idRecipe, r.nameRecipe, r.detailRecipe, r.idSupply, s.nameSupply, r.statusRecipe FROM recipes AS r LEFT JOIN supplies AS s ON r.idSupply=s.idSupply";
        values = [];
    }

	con.query(qry, values, function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else{
            let queries = []
            result.forEach(function(element){
                let query = "SELECT r.idSupply, r.quantityRecipeSupply FROM recipesupply AS r INNER JOIN supplies AS s ON r.idSupply=s.idSupply WHERE r.idRecipe=?"
                queries.push(promise_query(query , element.idRecipe, element))
            });
            Promise.all(queries).then(values => {
                res.json({ recipes : values }).status(200);
            }).catch(reason => { 
                console.log("Error" , reason)
                res.json({reason}).status(500);
            });
        }
    });
};

function updateRecipe(req, res){
	con.query("UPDATE recipes AS r SET r.nameRecipe=?, r.detailRecipe=?, r.idSupply=?, r.statusRecipe=? WHERE r.idRecipe=?", [req.body.nameRecipe, req.body.detailRecipe, req.body.idSupply, req.body.statusRecipe, req.body.idRecipe], function (err, result, fields) {
        if (err) {
            console.log("Error" , err)
            res.json({err}).status(500);
        }else{
            console.log("update recipe");
            res.json("update recipe ID: "+ req.body.idRecipe).status(200);
        }
    });
};

module.exports = {
    insertRecipe,
    getRecipes,
    updateRecipe,
    insertRecipeSupply,
    updateRecipeSupply,
    deleteRecipeSupply
};