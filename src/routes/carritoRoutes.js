const { Router } = require('express');
const controller = require('../controller/controllerCarrito'); 

const router = Router();

router.get('/carrito', controller.getCarrito);

router.get('/carrito/remove/:id', controller.removeSkinCarrito);

router.get('/carrito/pagar', controller.pagar);

module.exports = router;