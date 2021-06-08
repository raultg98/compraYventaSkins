const pool = require('../db/database');
const controller = { };

controller.getComprar = (req, res, next) => {
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

        pool.query('SELECT stock.*, usuarios.correo as vendedor FROM stock INNER JOIN usuarios ON stock.id_vendedor = usuarios.id_user INNER JOIN skins ON stock.id_skin = skins.id_skin ORDER BY stock.id_vendedor', admin, (err, result) => {
            if(err) console.error(err);

            const ventas = result;

            dinero(usuario, (dineroUsuario) => {
                const dinero = dineroUsuario;
                
                res.render('compraVenta/comprar', { ventas, admin, dinero });
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


module.exports = controller;