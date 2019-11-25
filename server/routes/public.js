const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const LOGIN = require('../querys/login')

// middleware specific to this router
ROUTER.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// Iniciar sesión
ROUTER.post('/logIn', LOGIN.logIn)

module.exports = ROUTER;