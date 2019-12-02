const con = require('../DB/connection')
const validations = require('./validations')
const JWT = require('jsonwebtoken')

function logIn (req, res){
    if (validations.isValidEmail(req.body.email) && validations.isValidPassword(req.body.password)) {
        con.query(`SELECT idUser AS id, rolUser AS rol, emailUser AS email
        FROM users WHERE emailUser=? AND passwordUser=SHA1(?) AND statusUser=1`, 
        [req.body.email, req.body.password], function (err, result) {
            if (err) {
                console.log('Error' , err)
                res.status(500).json({err})
            }else{
                if (result.length>0) {
                    var data = {
                        id: result[0].id,
                        rol: result[0].rol
                    }
                    
                    toke = JWT.sign(data, 'password', { expiresIn: 60 * 60 * 24}) //token expira en 1 dia
                    res.status(200).json({ token : toke, rol: result[0].rol, email: result[0].email })
                }else
                    res.status(500).json({ status : 406 })
            }
        })
    }else
        res.status(200).json({ status : 406 })
}

function logOut(req, res) {
    req.body.tokenIdUser = null
    req.body.tokenRolUser = null

    if(req.body.tokenIdUser)
        res.status(500).json('Error al cerrar sesion')
    else
        res.status(200).json('Sesion cerrada exitosamente')
}

module.exports = {
    logIn,
    logOut
}