const { Router } = require('express');
const pool = require('../db/database');

const router = Router();

/*************    RAIZ    *************/
router.get('/', (req, res, next)=>{
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        res.redirect('/inicio');
    }
});


/*************    INICIO    *************/
router.get('/inicio', (req, res, next)=>{
    // COMPRUEBO SI HAY UN SESSION ACTIVA, EN CASO DE NO EXISTIR SESSION, REDIRIJO A '/login'.
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
        const usuarioAdmin = req.session.usuario.split('@');
        let admin;
        if(usuarioAdmin[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }

        pool.query('SELECT dinero FROM usuarios WHERE correo = ?', usuario, (err, result) => {
            if(err) console.log(err);

            const dinero = result[0].dinero;
            res.render('index', { usuario, admin, dinero });
        });
    }
});

module.exports = router;