var express = require('express');
var router = express.Router();
var units = require('../querys/units');

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

module.exports = router;