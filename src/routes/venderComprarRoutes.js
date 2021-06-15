const { Router } = require('express');
const controllerVender = require('../controller/controllerVender');
const controllerComprar = require('../controller/controllerComprar');
const controllerAnuncios = require('../controller/controllerAnuncios');
const router = Router();

/*************    VENDER    *************/
// SELECT * FROM SKINS
router.get('/vender', controllerVender.getSkins);

// INSERT INTO STOCK
router.get('/vender/:id', controllerVender.venderSkin);

/*************    COMPRAR    *************/
// SELECT * FROM STOCK
router.get('/comprar', controllerComprar.getComprar);

// INSERT INTO CARRITO, EL ID ES EL DEL STOCK
router.get('/comprar/:id', controllerComprar.comprarSkinById);

/*************    ANUNCIOS    *************/
// SELECT * FROM CARRITO
router.get('/usuario/anuncios', controllerAnuncios.getSkins);

// DELETE FROM CARRITO WHERE id_carrito = id;
router.get('/usuario/anuncios/delete/:id', controllerAnuncios.deleteAnuncioById);

module.exports = router;