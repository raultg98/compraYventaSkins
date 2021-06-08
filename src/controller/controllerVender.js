const pool = require('../db/database');
const controller = { };

controller.getSkins = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        pool.query('SELECT * FROM skins ORDER BY categoria', (err, result) => {
            if(err) console.log(err);
    
            const skins = result;
            const usuarioAdmin = req.session.usuario.split('@');
            let admin;
            if(usuarioAdmin[0] === 'admin'){
                admin = true;
            }else{
                admin = false;
            }

            const usuario = req.session.usuario;
            dinero(usuario, (dineroUsuario) => {
                const dinero = dineroUsuario;
                
                res.render('compraVenta/vender', { skins, admin, dinero });
            });
        });
    }
}

function dinero(usuario, callback){
    pool.query('SELECT dinero FROM usuarios WHERE correo = ?', usuario, (err, result) => {
        if(err) console.log(err);
    
        const dinero = result[0].dinero;
        callback(dinero);
    });
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

module.exports = controller;