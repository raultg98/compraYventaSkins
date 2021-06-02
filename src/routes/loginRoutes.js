const { Router } = require('express');
const controller = require('../controller/controllerLogin');

const router = Router();

/***************     LOGIN     ***************/
router.get('/login', controller.formLogin);

router.post('/login', controller.getLogin);

/***************     REGISTER     ***************/
router.get('/register', controller.formRegister);

router.post('/register', controller.getRegister);

module.exports = router;