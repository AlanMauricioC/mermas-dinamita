var express = require('express');
var router = express.Router();
var units = require('../querys/units');
var supplies = require('../querys/supplies');
var restock = require('../querys/restock');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.send('Saludos desde express').status(200);
});

// get units
router.get('/units', units.getUnits);

router.post('/insertSupply', supplies.insertSupply);

router.get('/getSupplies', supplies.getSupplies);

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

module.exports = router;