const { Router } = require('express');
const path = require('path');
const pool = require('../db/database');
const router = Router();
const db = require('../db/database');


/*************    RAIZ    *************/
router.get('/', (req, res, next)=>{
    res.render('index');
});


/*************    INICIO    *************/
router.get('/inicio', (req, res, next)=>{
    // COMPRUEBO SI HAY UN SESSION ACTIVA, EN CASO DE NO EXISTIR SESSION, REDIRIJO A '/login'.
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
        res.render('index', { usuario });
    }

   
});


/*************    COMPRAR    *************/
router.get('/comprar', (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
        res.render('comprar');
    }
});


/*************    VENDER    *************/
router.get('/vender', (req, res, next) => {

    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
        res.render('vender');
    }
});


module.exports = router;