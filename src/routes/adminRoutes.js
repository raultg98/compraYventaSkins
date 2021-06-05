const { Router } = require('express');
const controller = require('../controller/controllerAdmin');

const router = Router();

/***************     USUARIOS     ***************/
router.get('/usuarios', controller.getUsuarios);

router.get('/usuarios/delete/:id', controller.deleteUsuarioById);

router.get('/usuarios/setAdmin/:id', controller.setAdminById);

router.get('/usuarios/removeAdmin/:id', controller.removeAdminById);


// /***************     SKINS     ***************/
router.get('/skins', controller.getSkins);

router.get('/skins/delete/:id', controller.deleteSkinById);

router.get('/skins/edit/:id', controller.getSkinToEdit);

router.post('/skins/edit/:id', controller.editSkinById);

router.get('/skins/add', controller.formNewSkin);

router.post('/skins/add', controller.createNewSkin);

module.exports = router;