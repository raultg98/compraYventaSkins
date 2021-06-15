const { Router } = require('express');
const controller = require('../controller/controllerAbout'); 

const router = Router();

router.get('/about', controller.getAbout);

router.get('/contacto', controller.getContacto);

module.exports = router;