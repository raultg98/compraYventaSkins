const { Router } = require('express');
const controllerUsuarios = require('../controller/controllerAdminUsuarios');
const controllerSkins = require('../controller/controllerAdminSkins');
const controllerComprar = require('../controller/controllerAdminCompras');

const router = Router();

/***************     USUARIOS     ***************/
router.get('/admin/usuarios', controllerUsuarios.getUsuarios);

router.get('/admin/usuarios/delete/:id', controllerUsuarios.deleteUsuarioById);

router.get('/admin/usuarios/setAdmin/:id', controllerUsuarios.setAdminById);

router.get('/admin/usuarios/removeAdmin/:id', controllerUsuarios.removeAdminById);


/***************     SKINS     ***************/
router.get('/admin/skins', controllerSkins.getSkins);

router.get('/admin/skins/delete/:id', controllerSkins.deleteSkinById);

router.get('/admin/skins/edit/:id', controllerSkins.getSkinToEdit);

router.post('/admin/skins/edit/:id', controllerSkins.editSkinById);

router.get('/admin/skins/add', controllerSkins.formNewSkin);

router.post('/admin/skins/add', controllerSkins.createNewSkin);


/***************     COMPRAS     ***************/
router.get('/admin/compras', controllerComprar.getAdminCompras);

module.exports = router;