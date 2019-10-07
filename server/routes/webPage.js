const express = require('express');
const router = express.Router();
const units = require('../querys/units');
const supplies = require('../querys/supplies');
const restock = require('../querys/restock');
const wastes = require('../querys/wastes');
const recipes = require('../querys/recipes');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Saludos desde express').status(200);
});

// Obtener unidades existentes
router.get('/getUnits', units.getUnits);

// Insertar nuevos insumos
router.post('/insertSupply', supplies.insertSupply);

// Obtener los insumos existentes
router.post('/getSupplies', supplies.getSupplies);

// Actualizar un insumo
router.post('/updateSupply', supplies.updateSupply);

// Eliminar insumo
router.post('/deleteSupply', supplies.deleteSupply);

// Insertar pedido de restock y todos sus insumos
router.post('/insertRestock', restock.insertRestock);

// Obtener pedidos de restock y todos sus insumos
router.get('/restock', restock.getRestock);

// Modificar el estado de un pedido de restock y de todos sus insumos
router.post('/statusRestock', restock.statusRestock);
// Estados:
// 0 = Cancelado: Ya no se requiere
// 1 = Pendiente: Estado inicial
// 2 = Aprobado: Aceptado por el gerente
// 3 = No aprobado: No aceptado por el gerente
// 4 = Pedido: Aceptado y pedido a provedor
// 5 = Entregado: Aceptada la entrega del pedido por el chef
// 6 = Rechazado: No Aceptada la entrega del pedido por el chef

// Insertar insumo a pedido restock
router.post('/insertSupplyRestock', restock.insertRestockSupply);

// Modificar insumo de pedido restock
router.post('/updateSupplyRestock', restock.updateRestockSupply);

// Eliminar insumo de pedido restock
router.post('/deleteSupplyRestock', restock.deleteRestockSupply);

// Eliminar una merma
router.post('/deleteWaste', wastes.deleteWaste);

// Insertar receta y todos sus insumos
router.post('/insertRecipe', recipes.insertRecipe);

// Obtener recetas y todos sus insumos
router.get('/recipes', recipes.getRecipes);

// Modificar receta
router.post('/updateRecipe', recipes.updateRecipe);

// Insertar insumo a receta
router.post('/insertSupplyRecipe', recipes.insertRecipeSupply);

// Modificar insumo de receta
router.post('/updateSupplyRecipe', recipes.updateRecipeSupply);

// Eliminar insumo de receta
router.post('/deleteSupplyRecipe', recipes.deleteRecipeSupply);

module.exports = router;