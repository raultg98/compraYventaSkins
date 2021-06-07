const { Router } = require('express');
const controllerVender = require('../controller/controllerVender');
const controllerComprar = require('../controller/controllerComprar');
const router = Router();

/*************    COMPRAR    *************/
router.get('/comprar', controllerComprar.getComprar);



/*************    VENDER    *************/
router.get('/vender', controllerVender.getSkins);

router.get('/skins/vender/:id', controllerVender.venderSkin);

module.exports = router;