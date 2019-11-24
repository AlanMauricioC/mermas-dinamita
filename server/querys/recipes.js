const con = require('../DB/connection')
const formidable = require('formidable')
const path = require('path')

function insertRecipe(req, res){
    var form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {
        if(fields){
            var qry = `INSERT INTO recipes VALUES (NULL, ?, ?, ?, ?, ?, 1, ?)`
            var values = []
            if(!files.image){
                values = [fields.nameRecipe, 'recipes/default.jpg', fields.detailRecipe, fields.idSupply, fields.quantity, req.session.idUser]
            }
            else{
                values = [fields.nameRecipe, 'recipes/' + files.image.name, fields.detailRecipe, fields.idSupply, fields.quantity, req.session.idUser]
            }
            con.query(qry, values,
                function (err, result) {
                    if (err){
                        console.log("Error" , err)
                        res.status(500).json({err})
                    }else{
                        try{
                            var arr = JSON.parse(fields.supplies)
                            arr.forEach(function(supply){
                                con.query("INSERT INTO recipesupply (idRecipe, idSupply, quantityRecipeSupply) VALUES (?, ?, ?)", 
                                    [result.insertId, supply.id, supply.quantity], 
                                    function (err, resul) {
                                        if (err) {
                                            console.log("Error" , err)
                                            res.status(500).json({err})
                                        }else
                                            console.log("insert "+resul.affectedRows+" recipe supply")
                                    })
                                }
                            )
                        }catch(error){
                            console.error(error)
                        }
                        res.status(200).json("insert "+result.affectedRows+" recipe, ID: "+ result.insertId)
                    }
                }
            )
        }
    })
    form.on('fileBegin', (name, file, ) => {
        file.path = __dirname + '\\..\\files\\recipes\\' + file.name
    })
    form.on('file', (name, file) => {
        console.log('Uploaded file ', file.name)
    })
}

function insertRecipeSupply(req, res){
    con.query("INSERT INTO recipesupply (idRecipe, idSupply, quantityRecipeSupply) VALUES (?, ?, ?)", 
        [req.body.idRecipe, req.body.idSupply, req.body.quantity], 
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
        [req.body.quantity, req.body.idRecipe, req.body.idSupply], 
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
    var qry = `SELECT r.idRecipe, r.nameRecipe, r.detailRecipe, r.imageRecipe, r.idSupply, 
    r.quantitySupplyRecipe as quantity, s.nameSupply, r.statusRecipe 
    FROM recipes AS r 
    LEFT JOIN supplies AS s ON r.idSupply=s.idSupply 
    WHERE r.statusRecipe<>0`
    var values = []
    if(req.body.search) {
        qry = qry + ` AND nameRecipe LIKE ?`
        values = ["%"+req.body.search+"%"]
    }
	con.query(qry, values, function (err, result){
        if (err) {
            console.log("Error" , err)
            res.status(500).json({err})
        }else{
            let queries = []
            result.forEach(function(element){
                let query = `SELECT r.idSupply as id, r.quantityRecipeSupply as quantity, s.nameSupply as name,u.nameUnit 
                FROM recipesupply AS r 
                INNER JOIN supplies AS s ON r.idSupply=s.idSupply 
                INNER JOIN units AS u on u.idUnit=s.idUnit
                WHERE r.idRecipe=?`
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
    var form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {
        if(fields){
            var qry = `UPDATE recipes AS r SET r.nameRecipe=?, r.detailRecipe=?, r.idSupply=?, r.quantitySupplyRecipe=?, r.statusRecipe=?`
            var values = []
            if(!files.image){
                qry = qry + ` WHERE r.idRecipe=?`
                values = [fields.nameRecipe, fields.detailRecipe, fields.idSupply, fields.statusRecipe, fields.quantity, fields.idRecipe]
            }
            else{
                qry = qry + `, r.imageRecipe=? WHERE r.idRecipe=?`
                values = [fields.nameRecipe, fields.detailRecipe, fields.idSupply, fields.statusRecipe, 'recipes/' + files.image.name, fields.quantity, fields.idRecipe]
            }
            con.query(qry, values,
                function (err, result) {
                    if (err){
                        console.log("Error" , err)
                        res.status(500).json({err})
                    }else
                        res.status(200).json("update " + result.affectedRows + " recipe(s)")
                }
            )
        }
    })
    form.on('fileBegin', (name, file, ) => {
        try {
            file.path = __dirname + '\\..\\files\\recipes\\' + file.name
        } catch (error) {
            console.log(error)
        }
    })
    form.on('file', (name, file) => {
        console.log('Uploaded file ', file.name)
    })
}

function deleteRecipe(req, res){
    con.query(`UPDATE recipes AS r SET r.statusRecipe=0 WHERE r.idRecipe=?`, 
        [req.body.idRecipe], 
        function (err, result) {
            if (err) {
                console.log("Error" , err)
                res.status(500).json({err})
            }else{
                console.log("delete recipe")
                res.status(200).json("delete recipe ID: "+ req.body.idRecipe)
            }
        }
    )
}

function getRecipeImage (req, res){
    const img=req.params.image
    res.sendFile(path.resolve(__dirname + "/../files/recipes/" + img))
}

module.exports = {
    insertRecipe,
    getRecipes,
    updateRecipe,
    deleteRecipe,
    insertRecipeSupply,
    updateRecipeSupply,
    deleteRecipeSupply,
    getRecipeImage
}