const pool = require('../db/database');
const controller = { };

/***************     COMPRAS     ***************/
controller.getCompras = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const usuario = req.session.usuario;

        const consulta = 'SELECT compras.id_compra, skins.*, us1.correo as vendedor, us2.correo as comprador FROM compras '+
                            'INNER JOIN skins ON compras.id_skin = skins.id_skin '+ 
                            'INNER JOIN usuarios us1 ON compras.id_vendedor = us1.id_user '+
                            'INNER JOIN usuarios us2 ON compras.id_comprador = us2.id_user '+
                            'WHERE us2.correo = ? ORDER BY compras.id_compra';

        pool.query(consulta, usuario, (err2, result2) => {
            if(err2) console.log(err2);

            const compras = result2;
            console.log(compras);

            dinero(usuario, (dineroUsuario, adminUsuario) => {
                const dinero = dineroUsuario;
                const admin = adminUsuario;
                
                res.render('user/misCompras', { compras, admin, dinero });
            });
        });
    }
}

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

module.exports = controller;