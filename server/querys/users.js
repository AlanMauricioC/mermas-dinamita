const con = require('../DB/connection')
const validations = require('./validations')

function getUsers (req, res){
    con.query('SELECT idUser AS id, emailUser AS email, rolUser AS rol, pinUser AS pin FROM users WHERE statusUser=1', function (err, result) {
        if (err) {
            console.log('Error' , err)
            res.status(500).json({err})
        }else
            res.status(200).json({ users : result })
    })
}

function insertUser(req, res) {
    if (validations.isValidEmail(req.body.email) && validations.isValidPassword(req.body.password)) {
        con.query('INSERT INTO users(emailUser, passwordUser, rolUser, pinUser) VALUES(?, SHA1(?), ?, ?)', [req.body.email, req.body.password, req.body.rol, req.body.pin],  function (err, result) {
                if (err) {
                    console.log('Error' , err)
                    res.status(500).json({err})
                }
                else {
                    console.log('{ users :' + JSON.stringify(result) + '}')
                    res.status(200).json("insert "+result.affectedRows+" user, ID: "+ result.insertId)
                }
            }
        )
    }else
        res.status(200).json({status : 406})
}

function updateUser(req, res) {
    if (validations.isValidEmail(req.body.email)) {
        let qry = 'UPDATE users SET emailUser=?, rolUser=?, pinUser=?'
        let values = []
        let status = true
        if(req.body.password) {
            if (validations.isValidPassword(req.body.password)) {
                qry += ', passwordUser=SHA1(?) WHERE idUser=?'
                values = [req.body.email, req.body.rol, req.body.pin, req.body.password, req.body.id]
            } else 
                status = false
        } else {
            qry += 'WHERE idUser=?'
            values = [req.body.email, req.body.rol, req.body.pin, req.body.id]
        }
        if (status) {
            con.query(qry, values,  function (err, result) {
                if (err) {
                    console.log('Error' , err)
                    res.status(500).json({err})
                }
                else {
                    console.log('update '+result.affectedRows+' user, ID: '+ req.body.id)
                    res.status(200).json('update '+result.affectedRows+' user, ID: '+ req.body.id)
                }
            })
        } else 
            res.status(200).json({status : 406})
    }else
        res.status(200).json({status : 406})
}

function deleteUser(req, res) {
    con.query('UPDATE users SET statusUser=0 WHERE idUser=?', [req.body.id],  function (err, result) {
            if (err) {
                console.log('Error' , err)
                res.status(500).json({err})
            }
            else {
                console.log('delete '+result.affectedRows+' user, ID: '+ req.body.id)
                res.status(200).json('delete '+result.affectedRows+' user, ID: '+ req.body.id)
            }
        }
    )
}

module.exports = {
	getUsers,
    insertUser,
    updateUser,
    deleteUser
}