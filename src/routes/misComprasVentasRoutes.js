const { Router } = require('express');
const controllerCompras = require('../controller/controllerMisCompras');
const controllerVentas = require('../controller/controllerMisVentas');

const router = Router();

/***************     COMPRAS     ***************/
router.get('/usuario/compras', controllerCompras.getCompras);

/***************     VENTAS     ***************/
router.get('/usuario/ventas', controllerVentas.getVentas);

module.exports = router;