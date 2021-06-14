const pool = require('../db/database');
const controller = { };

controller.getSkins = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        pool.query('SELECT * FROM skins ORDER BY categoria', (err, result) => {
            if(err) console.log(err);
    
            const skins = result;

            const usuario = req.session.usuario;
            dinero(usuario, (dineroUsuario, adminUsuario) => {
                const dinero = dineroUsuario;
                const admin = adminUsuario;
                
                res.render('compraVenta/vender', { skins, admin, dinero });
            });
        });
    }
}

controller.venderSkin = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const { id } = req.params;
        const usuario = req.session.usuario;
        // OBTENER EL ID DEL USUARIO
        pool.query('SELECT id_user FROM usuarios WHERE correo = ?', usuario, (err, result) => {
            if(err) console.log(err);

            const id_vendedor = result[0].id_user;
            const venta = {
                id_skin: id, 
                id_vendedor
            }

            // HACER EL INSERT 
            pool.query('INSERT INTO stock SET ?', [venta], (err) => {
                if(err) console.log(err);

                res.redirect('/vender');
            })
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