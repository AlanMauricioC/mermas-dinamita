const con = require('../DB/connection')

function logIn (req, res){
    con.query('SELECT idUser AS id, nameUser AS name, rolUser AS rol FROM users WHERE nameUser=? AND passwordUser=?', [req.body.name, req.body.password], function (err, result) {
        if (err) {
            console.log('Error' , err)
            res.status(500).json({err})
        }else
            result.forEach(element => {
                req.session.idUser = element.id
                req.session.name = element.name
                req.session.rol = element.rol

                console.log(req.session)
            })
            res.status(200).json({ user : result })
    })
}

function getSession(req, res) {
    if(req.session.idUser) {
        var user = []
        var session = {}

        session.id = req.session.idUser
        session.name = req.session.name
        session.rol = req.session.rol
        user.push(session)

        console.log(user)
        res.status(200).json({ user : user})
    }
    else {
        res.status(500).json('No existe sesion')
    }
}

function logOut(req, res) {
    req.session.idUser = null
    req.session.name = null
    req.session.rol = null

    if(req.session.idUser) {
        res.status(500).json('Error al cerrar sesion')
    }
    else {
        res.status(200).json('Sesion cerrada exitosamente')
    }
}

module.exports = {
    logIn,
    getSession,
    logOut
}