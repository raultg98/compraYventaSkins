const { Router } = require('express');
const path = require('path');
const pool = require('../db/database');
const router = Router();
const db = require('../db/database');


/*************    RAIZ    *************/
router.get('/', (req, res, next)=>{
    res.send('Ruta Raiz');

    // res.render('login');
});


/*************    INICIO    *************/
router.get('/inicio', (req, res, next)=>{

    res.render('index');
});

/*************    LOGIN    *************/
router.get('/login', (req, res, next)=>{
    res.render('login');
});

router.post('/login', (req, res, next)=>{
    console.log('Se ha hecho una peticion login');

    const { correo, contrasenia } = req.body;
    const loginUsuario = {
        correo, 
        contrasenia
    };

    // await pool.query('INSERT INTO usuarios set ?', [loginUsuario]);

    console.log(loginUsuario);

    res.redirect('/inicio');
});


/*************    REGISTER    *************/
router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', async (req, res, next) => {
    console.log('Se ha hecho una peticion register');

    const { nombre, apellidos, correo, contrasenia } = req.body;
    const registerUser = {
        nombre, 
        apellidos, 
        correo,
        contrasenia, 
        admin: false
    }

    // HAGO UN INSERT CON LOS DATOS OBTENIDOS DEL FORMULARIO
    await pool.query('INSERT INTO usuarios set ?', [registerUser]);

    res.redirect('/inicio');
});

/*************    USUARIOS    *************/
router.get('/usuarios', async (req, res, next) => {
    const usuarios = await pool.query('SELECT * from usuarios');

    res.render('admin/usuarios', { usuarios });
})

// BORRO UN USUARIO EN CONCRETO
router.get('/usuarios/delete/:id', async (req, res, next) => {
    const { id } = req.params;

    await pool.query('DELETE from usuarios where id_user = ?', id);

    res.redirect('/usuarios');
});

// EDITO UN USUARIO PARA QUE ESTE PUEDA SER UN ADMIN
router.get('/usuarios/setAdmin/:id', async (req, res, next) => {
    const { id } = req.params;

    await pool.query('UPDATE usuarios SET admin=true WHERE id_user = ?', id);

    res.redirect('/usuarios');
});

router.get('/usuarios/removeAdmin/:id', async (req, res, next) => {
    const { id } = req.params;

    await pool.query('UPDATE usuarios SET admin=false WHERE id_user = ?', id);

    res.redirect('/usuarios');
});

router.get('/skins', async (req, res, next) => {
    const skins = await pool.query('SELECT * from skins');

    res.render('admin/skins', { skins });
});

router.get('/skins/delete/:id', async (req, res, next) => {
    const { id } = req.params;

    await pool.query('DELETE from skins WHERE id_skin = ?', id);

    res.redirect('/skins');
});

router.get('/skins/edit/:id', async (req, res, next) => {
    const { id } = req.params;
    const datosSkin = await pool.query('SELECT * from skins WHERE id_skin = ?', id);

    // PASO AL CLIENTE UN OBJETO QUE CONTIENE LOS DATOS DE UNA SKIN EN CONCRETO.
    res.render('admin/edit', { datos: datosSkin[0] });
});

router.post('/skins/edit/:id', async (req, res, next) => {
    const { id } = req.params;
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const updateSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    await pool.query('UPDATE skins SET ? WHERE id_skin = ?', [updateSkin, id]);
    res.redirect('/skins');
});

router.get('/skins/add', async (req, res, next) => {

    res.render('admin/add');
});

router.post('/skins/add', async (req, res, next) => {
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const newSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    await pool.query('INSERT INTO skins VALUES ?', [newSkin]);
 
    res.redirect('admin/skins');
});

// router.get('/editSkin', (req, res, next) => {

//     res.render('admin/editSkin');
// });


/*************    COMPRAR    *************/
router.get('/comprar', (req, res, next) => {
    res.render('comprar');
});


/*************    VENDER    *************/
router.get('/vender', (req, res, next) => {

    res.render('vender');
});


module.exports = router;