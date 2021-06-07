const pool = require('../db/database');
const controller = { };

controller.getComprar = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario.split('@');
        let admin;
        if(usuario[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }

        pool.query('SELECT skins.*, usuarios.correo as vendedor FROM ventas INNER JOIN usuarios ON ventas.id_vendedor = usuarios.id_user INNER JOIN skins ON ventas.id_skin = skins.id_skin ORDER BY ventas.id_vendedor', admin, (err, result) => {
            if(err) console.error(err);

            const ventas = result;
            

            res.render('compraVenta/comprar', { ventas, admin });
        });
    }
}

module.exports = controller;