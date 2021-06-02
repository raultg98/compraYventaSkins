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

    res.render('index');
});


/*************    COMPRAR    *************/
router.get('/comprar', (req, res, next) => {
    res.render('comprar');
});


/*************    VENDER    *************/
router.get('/vender', (req, res, next) => {

    res.render('vender');
});


module.exports = router;