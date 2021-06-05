const { Router } = require('express');
const controller = require('../controller/controllerLogin');

const router = Router();

/***************     LOGIN     ***************/
router.get('/login', controller.getLogin);

router.post('/login', controller.postLogin);

/***************     REGISTER     ***************/
router.get('/register', controller.getRegister);

router.post('/register', controller.postRegister);

module.exports = router;