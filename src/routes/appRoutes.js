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

        pool.query('SELECT skins.* FROM stock INNER JOIN skins ON stock.id_skin = skins.id_skin  INNER JOIN usuarios ON stock.id_vendedor = usuarios.id_user WHERE usuarios.correo = ? ', usuario, (err, result) => {
            if(err) console.log(err);

            const skinsVenta = result;

            console.log(skinsVenta);

            pool.query('SELECT skins.* FROM stock INNER JOIN skins ON stock.id_skin = skins.id_skin INNER JOIN usuarios ON stock.id_vendedor != usuarios.id_user WHERE usuarios.correo = ?', usuario, (err1, result1) => {
                if(err1) console.log(err1);

                const skinsCompra = result1;

                dinero(usuario, (dineroUsuario, adminUsuario) => {
                    const dinero = dineroUsuario;
                    const admin = adminUsuario;
                    
                    res.render('index', { usuario, admin, dinero, skinsVenta, skinsCompra });
                });
            });
        });
    }
});

function dinero(usuario, callback){
    pool.query('SELECT dinero, admin FROM usuarios WHERE correo = ?', usuario, (err, result) => {
        if(err) console.log(err);
    
        const dinero = result[0].dinero;

        if(result[0].admin == 1){
            callback(dinero, true);
        }else{
            callback(dinero, false);
        }
    });
}


module.exports = router;