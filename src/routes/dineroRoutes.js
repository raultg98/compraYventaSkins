const { Router } = require('express');
const controller = require('../controller/controllerDinero');

const router = Router();

/***************     LOGIN     ***************/
router.get('/dinero', controller.getDinero);

router.post('/dinero', controller.postDinero);

router.post('/dinero/retirar', controller.postRetirarDinero);


module.exports = router;