const { Router } = require('express');
const router = Router();


/*************    RAIZ    *************/
router.get('/', (req, res, next)=>{
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuarioAdmin = req.session.usuario.split('@');
        let admin;
        if(usuarioAdmin[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }
        res.render('index', { admin });
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
        res.render('index', { usuario, admin });
    }
});

module.exports = router;