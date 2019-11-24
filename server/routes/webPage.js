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
const log = require('../querys/log')
const stadistic = require('../querys/stadistic')
const providers = require('../querys/providers')
const middleware = require('../querys/middleware')
 
// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', (req, res) => {
    res.send('Saludos desde express').status(200)
})

// Obtener unidades existentes
router.get('/getUnits', middleware.middleware, units.getUnits)

// Insertar nueva unidade
router.post('/insertUnit', middleware.middlewareOnlyChef, units.insertUnit)

// Actualizar una unidades
router.post('/updateUnit',middleware.middlewareOnlyChef,  units.updateUnit)

// Eliminar una unidad
router.post('/deleteUnit',middleware.middlewareOnlyChef,  units.deleteUnit)

// Insertar nuevos insumos
router.post('/insertSupply',middleware.middlewareOnlyChef,  supplies.insertSupply)

// Obtener los insumos existentes
router.post('/getSupplies', middleware.middleware, supplies.getSupplies)

// Actualizar un insumo
router.post('/updateSupply',middleware.middlewareOnlyChef,  supplies.updateSupply)

// Eliminar insumo
router.post('/deleteSupply',middleware.middlewareOnlyChef,  supplies.deleteSupply)

// Insertar pedido de restock y todos sus insumos
router.post('/insertRestock',middleware.middlewareOnlyChef,  restock.insertRestock)

// Insertar solo pedido de restock
router.post('/insertOnlyRestock',middleware.middlewareOnlyChef,  restock.insertOnlyRestock)

// Obtener pedidos de restock y todos sus insumos
router.get('/restock', middleware.middleware, restock.getRestock)

// Obtener recomendación de pedido de restock y todos sus insumos
router.get('/recommendationRestock', middleware.middleware, restock.getRestockRecommendation)

// Modificar el estado de un pedido de restock y de todos sus insumos
router.post('/statusRestock', middleware.middleware, restock.statusRestock)
// Estados:
// 0 = Cancelado: Ya no se requiere
// 1 = Pendiente: Estado inicial
// 2 = Aprobado: Aceptado por el gerente
// 3 = No aprobado: No aceptado por el gerente
// 4 = Pedido: Aceptado y pedido a provedor
// 5 = Entregado: Aceptada la entrega del pedido por el chef
// 6 = Rechazado: No Aceptada la entrega del pedido por el chef

// Insertar insumo a pedido restock
router.post('/insertSupplyRestock',middleware.middlewareOnlyChef,  restock.insertRestockSupply)

// Modificar insumo de pedido restock
router.post('/updateSupplyRestock',middleware.middlewareOnlyChef,  restock.updateRestockSupply)

// Eliminar insumo de pedido restock
router.post('/deleteSupplyRestock',middleware.middlewareOnlyChef,  restock.deleteRestockSupply)

// Insertar merma de de un insumo
router.post('/insertWaste',middleware.middlewareOnlyChef,  wastes.insertWaste)

// Obtener las memas 
router.post('/getWastes', middleware.middleware, wastes.getWastes)

// Actualizar una merma
router.post('/updateWaste',middleware.middlewareOnlyChef,  wastes.updateWaste)

// Eliminar una merma
router.post('/deleteWaste',middleware.middlewareOnlyChef,  wastes.deleteWaste)

// Insertar receta y todos sus insumos
router.post('/insertRecipe',middleware.middlewareOnlyChef,  recipes.insertRecipe)

// Obtener recetas y todos sus insumos
router.post('/getRecipes', middleware.middleware, recipes.getRecipes)

// obtener imagen de recetas
router.get('/recipes/:image', middleware.middleware, recipes.getRecipeImage)

// Modificar receta
router.post('/updateRecipe',middleware.middlewareOnlyChef,  recipes.updateRecipe)
// Estados de la receta:
// 0: eliminada
// 1: activa
// 2: inactiva

// Eliminar receta
router.post('/deleteRecipe',middleware.middlewareOnlyChef,  recipes.deleteRecipe)

// Insertar insumo a receta
router.post('/insertSupplyRecipe',middleware.middlewareOnlyChef,  recipes.insertRecipeSupply)

// Modificar insumo de receta
router.post('/updateSupplyRecipe',middleware.middlewareOnlyChef,  recipes.updateRecipeSupply)

// Eliminar insumo de receta
router.post('/deleteSupplyRecipe',middleware.middlewareOnlyChef,  recipes.deleteRecipeSupply)

// Insertar orden y todos sus insumos y/o mermas
router.post('/insertOrder',middleware.middlewareOnlyChef,  orders.insertOrder)

// Obtener ordenes y todos sus insumos y/o mermas
router.get('/orders', middleware.middleware, orders.getOrders)

// Modificar orden
router.post('/updateOrder',middleware.middlewareOnlyChef,  orders.updateOrder)

// Insertar insumo a orden
router.post('/insertSupplyOrder',middleware.middlewareOnlyChef,  orders.insertOrderSupply)

// Modificar insumo de orden
router.post('/updateSupplyOrder',middleware.middlewareOnlyChef,  orders.updateOrderSupply)

// Eliminar insumo de orden
router.post('/deleteSupplyOrder',middleware.middlewareOnlyChef,  orders.deleteOrderSupply)

// Insertar merma a orden
router.post('/insertWasteOrder',middleware.middlewareOnlyChef,  orders.insertOrderWaste)

// Modificar merma de orden
router.post('/updateWasteOrder',middleware.middlewareOnlyChef,  orders.updateOrderWaste)

// Eliminar merma de orden
router.post('/deleteWasteOrder',middleware.middlewareOnlyChef,  orders.deleteOrderWaste)

// Obtiene alarmas de restock y caducidad
router.get('/alerts', middleware.middleware, alerts.alerts)

// Eliminar alarma de restock/caducidad
router.post('/deleteAlert', middleware.middleware, alerts.deleteAlert)

// Obtiene usuarios registrados
router.get('/users', middleware.middlewareOnlyAdmin, users.getUsers)

// Inserta un nuevo usuario
router.post('/insertUser', middleware.middlewareOnlyAdmin, users.insertUser)

// Actualiza datos de usuario
router.post('/updateUser', middleware.middlewareOnlyAdmin, users.updateUser)

// Elimina usuario
router.post('/deleteUser', middleware.middlewareOnlyAdmin, users.deleteUser)

// Inicia sesion
router.post('/logIn', log.logIn)

// Obtiene sesion activa
router.get('/getSession', log.getSession)

// Cierra sesion
router.get('/logOut', log.logOut)

// Obtiene estadisticas de mermas
router.post('/stadisticWastes', middleware.middlewareOnlyAdmin, stadistic.stadisticWastes)

// Obtiene estadisticas de recetas
router.post('/stadisticRecipes', middleware.middlewareOnlyAdmin, stadistic.stadisticRecipes)

// Obtiene estadisticas de pedidos
router.post('/stadisticRestocks', middleware.middlewareOnlyAdmin, stadistic.stadisticRestocks)

// Obtiene los proveedores registrados
router.get('/providers', middleware.middleware, providers.getProviders)

module.exports = router