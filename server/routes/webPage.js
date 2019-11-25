const express = require('express')
const router = express.Router()
const units = require('../querys/units')
const supplies = require('../querys/supplies')
const restock = require('../querys/restock')
const wastes = require('../querys/wastes')
const recipes = require('../querys/recipes')
const orders = require('../querys/orders')
const alerts = require('../querys/alerts')
const users = require('../querys/users')
const login = require('../querys/login')
const stadistic = require('../querys/stadistic')
const providers = require('../querys/providers')
const JWT = require('jsonwebtoken')

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    if((/.(gif|jpg|jpeg|tiff|png)$/i).test(req.path)){
        next()
    }
    else{
        var token = req.headers['token']
        if (!token) {
            res.status(500).json({err : 'Token invalido'})
        }
        else{
            token = token.replace('Bearer ', '')
            try {
                var decoded = JWT.verify(token, 'password');
                req.body.tokenIdUser = decoded.id
                req.body.tokenRolUser = decoded.rol
                next()
            } catch(err) {
                res.status(500).json({err : err})
            }
        }
    }
})

router.use(function middleware(req, res, next) {
    if((/.(gif|jpg|jpeg|tiff|png)$/i).test(req.path)){
        next()
    }
    else{
        //Arreglo de rutas de administrador y chef
        const routesAdmin = ['/logOut', '/getUnits', '/getSupplies', '/restock', '/recommendationRestock', '/statusRestock', '/getWastes', '/getRecipes', '/recipes/:image', '/orders', '/alerts', '/deleteAlert', '/users', '/insertUser', '/updateUser', '/deleteUser', '/stadisticWastes', '/stadisticRecipes', '/stadisticRestocks', '/providers']
        const routesChef = ['/logOut', '/getUnits', '/insertUnit', '/updateUnit', '/deleteUnit', '/insertSupply', '/getSupplies', '/updateSupply', '/deleteSupply', '/insertRestock', '/insertOnlyRestock', '/restock', '/recommendationRestock', '/statusRestock', '/getWastes', '/getRecipes', '/recipes/:image', '/orders', '/alerts', '/deleteAlert', '/providers', '/insertSupplyRestock', '/updateSupplyRestock', '/deleteSupplyRestock', '/insertWaste', '/updateWaste', '/deleteWaste', '/insertRecipe', '/updateRecipe', '/deleteRecipe', '/insertSupplyRecipe', '/updateSupplyRecipe', '/deleteSupplyRecipe', '/insertOrder', '/updateOrder', '/insertSupplyOrder', '/updateSupplyOrder', '/deleteSupplyOrder', '/insertWasteOrder', '/updateWasteOrder', '/deleteWasteOrder']
        
        if(req.body.tokenRolUser == 0) {
            if(routesAdmin.includes(req.path)) {
                next()
            }
            else {
                res.status(500).json({err: 'Error, usuario no valido'})
            }
        }
        else if(req.body.tokenRolUser == 1) {
            if(routesChef.includes(req.path)) {
                next()
            }
            else {
                res.status(500).json({err: 'Error, usuario no valido'})
            }
        }
        else {
            res.status(403).json({err: 'Error, sesion no iniciada o expirada'})
        }
    }
})

router.get('/', (req, res) => {
    res.send('Saludos desde express').status(200)
})

// Cerrar sesión
router.get('/logOut', login.logOut)

// Obtener unidades existentes
router.get('/getUnits', units.getUnits)

// Insertar nueva unidade
router.post('/insertUnit', units.insertUnit)

// Actualizar una unidades
router.post('/updateUnit', units.updateUnit)

// Eliminar una unidad
router.post('/deleteUnit', units.deleteUnit)

// Insertar nuevos insumos
router.post('/insertSupply', supplies.insertSupply)

// Obtener los insumos existentes
router.post('/getSupplies', supplies.getSupplies)

// Actualizar un insumo
router.post('/updateSupply', supplies.updateSupply)

// Eliminar insumo
router.post('/deleteSupply', supplies.deleteSupply)

// Insertar pedido de restock y todos sus insumos
router.post('/insertRestock', restock.insertRestock)

// Insertar solo pedido de restock
router.post('/insertOnlyRestock', restock.insertOnlyRestock)

// Obtener pedidos de restock y todos sus insumos
router.get('/restock', restock.getRestock)

// Obtener recomendación de pedido de restock y todos sus insumos
router.get('/recommendationRestock', restock.getRestockRecommendation)

// Modificar el estado de un pedido de restock y de todos sus insumos
router.post('/statusRestock', restock.statusRestock)
// Estados:
// 0 = Cancelado: Ya no se requiere
// 1 = Pendiente: Estado inicial
// 2 = Aprobado: Aceptado por el gerente
// 3 = No aprobado: No aceptado por el gerente
// 4 = Pedido: Aceptado y pedido a provedor
// 5 = Entregado: Aceptada la entrega del pedido por el chef
// 6 = Rechazado: No Aceptada la entrega del pedido por el chef

// Insertar insumo a pedido restock
router.post('/insertSupplyRestock', restock.insertRestockSupply)

// Modificar insumo de pedido restock
router.post('/updateSupplyRestock', restock.updateRestockSupply)

// Eliminar insumo de pedido restock
router.post('/deleteSupplyRestock', restock.deleteRestockSupply)

// Insertar merma de de un insumo
router.post('/insertWaste', wastes.insertWaste)

// Obtener las memas 
router.post('/getWastes', wastes.getWastes)

// Actualizar una merma
router.post('/updateWaste', wastes.updateWaste)

// Eliminar una merma
router.post('/deleteWaste', wastes.deleteWaste)

// Insertar receta y todos sus insumos
router.post('/insertRecipe', recipes.insertRecipe)

// Obtener recetas y todos sus insumos
router.post('/getRecipes', recipes.getRecipes)

// obtener imagen de recetas
router.get('/recipes/:image', recipes.getRecipeImage)

// Modificar receta
router.post('/updateRecipe', recipes.updateRecipe)
// Estados de la receta:
// 0: eliminada
// 1: activa
// 2: inactiva

// Eliminar receta
router.post('/deleteRecipe', recipes.deleteRecipe)

// Insertar insumo a receta
router.post('/insertSupplyRecipe', recipes.insertRecipeSupply)

// Modificar insumo de receta
router.post('/updateSupplyRecipe', recipes.updateRecipeSupply)

// Eliminar insumo de receta
router.post('/deleteSupplyRecipe', recipes.deleteRecipeSupply)

// Insertar orden y todos sus insumos y/o mermas
router.post('/insertOrder', orders.insertOrder)

// Obtener ordenes y todos sus insumos y/o mermas
router.get('/orders', orders.getOrders)

// Modificar orden
router.post('/updateOrder', orders.updateOrder)

// Insertar insumo a orden
router.post('/insertSupplyOrder', orders.insertOrderSupply)

// Modificar insumo de orden
router.post('/updateSupplyOrder', orders.updateOrderSupply)

// Eliminar insumo de orden
router.post('/deleteSupplyOrder', orders.deleteOrderSupply)

// Insertar merma a orden
router.post('/insertWasteOrder', orders.insertOrderWaste)

// Modificar merma de orden
router.post('/updateWasteOrder', orders.updateOrderWaste)

// Eliminar merma de orden
router.post('/deleteWasteOrder', orders.deleteOrderWaste)

// Obtiene alarmas de restock y caducidad
router.get('/alerts', alerts.alerts)

// Eliminar alarma de restock/caducidad
router.post('/deleteAlert', alerts.deleteAlert)

// Obtiene usuarios registrados
router.get('/users', users.getUsers)

// Inserta un nuevo usuario
router.post('/insertUser', users.insertUser)

// Actualiza datos de usuario
router.post('/updateUser', users.updateUser)

// Elimina usuario
router.post('/deleteUser', users.deleteUser)

// Obtiene estadisticas de mermas
router.post('/stadisticWastes', stadistic.stadisticWastes)

// Obtiene estadisticas de recetas
router.post('/stadisticRecipes', stadistic.stadisticRecipes)

// Obtiene estadisticas de pedidos
router.post('/stadisticRestocks', stadistic.stadisticRestocks)

// Obtiene los proveedores registrados
router.get('/providers', providers.getProviders)

module.exports = router