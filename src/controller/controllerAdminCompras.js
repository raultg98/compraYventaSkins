const pool = require('../db/database');
const controller = { };

controller.getAdminCompras = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
       

        // pool.query('SELECT * FROM compras ORDER BY id_comprador', (err, result) => {
        pool.query('SELECT compras.id_compra, skins.nombre, skins.precio, us1.correo as comprador, us2.correo as vendedor FROM compras INNER JOIN skins ON compras.id_skin = skins.id_skin INNER JOIN usuarios us1 ON compras.id_comprador = us1.id_user INNER JOIN usuarios us2 ON compras.id_vendedor = us2.id_user ORDER BY compras.id_compra', (err, result) => {
            if(err) console.log(err);

            const compras = result;
            let beneficiosTotales = 0;

            pool.query('SELECT sum(skins.precio) as dinero FROM compras INNER JOIN skins ON compras.id_skin = skins.id_skin', (err1, result1) => {
                if(err1) console.log(err1);

                console.log('DINERO TOTAL');
                console.log(result1);
                beneficiosTotales = result1[0].dinero * 0.1;

                dinero(usuario, (dineroUsuario, adminUsuario) => {
                    const dinero = dineroUsuario;
                    const admin = adminUsuario;
                    
                    res.render('admin/compras', { compras, admin, dinero, beneficiosTotales });
                });
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