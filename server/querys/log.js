const con = require('../DB/connection')
const validations = require('./validations')

function logIn (req, res){
    if (validations.isValidEmail(req.body.email) && req.body.password) {
        con.query('SELECT idUser AS id, emailUser AS email, rolUser AS rol FROM users WHERE emailUser=? AND passwordUser=SHA1(?)', [req.body.email, req.body.password], function (err, result) {
            if (err) {
                console.log('Error' , err)
                res.status(500).json({err})
            }
            else{
                if(result.length == 1) {
                    var time = 1800000
                    result.forEach(element => {
                        req.session.idUser = element.id
                        req.session.email = element.email
                        req.session.rol = element.rol
                        req.session.cookie.expires = new Date(Date.now() + time)
                    })
                    res.status(200).json({ id: req.session.idUser, email: req.session.email, rol: req.session.rol, status: 200 })
                }else
                    res.status(200).json({ id: null, email: null, rol: null, status: 406 })
            }
        })
    }else
        res.status(200).json({ id: null, email: null, rol: null, status : 406})
}

function getSession(req, res) {
    if(req.session.idUser) {
        var session = {}
        session.id = req.session.idUser
        session.email = req.session.email
        session.rol = req.session.rol
        res.status(200).json({ id: req.session.idUser, email: req.session.email, rol: req.session.rol, status: 200})
    }
    else
        res.status(500).json('No existe sesion')
}

function logOut(req, res) {
    req.session.idUser = null
    req.session.email = null
    req.session.rol = null

    if(req.session.idUser)
        res.status(500).json('Error al cerrar sesion')
    else
        res.status(200).json('Sesion cerrada exitosamente')
}

module.exports = {
    logIn,
    getSession,
    logOut
}