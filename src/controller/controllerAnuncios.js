const pool = require('../db/database');
const controller = { };


controller.getSkins = (req, res, next) => {
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
            
        // OBTENER TODAS LAS SKINS QUE TIENE UN USUARIO A LA VENTA
        pool.query('SELECT id_user FROM usuarios WHERE correo = ?', usuario, (err1, result1) => {
            if(err1) console.log(err1);

            const id_user = result1[0].id_user;

            pool.query('SELECT stock.id_stock, skins.* FROM stock INNER JOIN skins ON stock.id_skin = skins.id_skin WHERE stock.id_vendedor = ?', id_user, (err, result) => {
                if(err) console.log(err);

                const skins = result;
            
                dinero(usuario, (dineroUsuario) => {
                    const dinero = dineroUsuario;

                    res.render('user/anuncios', { skins, admin, dinero });
                })
            });
        });
    }
}

controller.deleteAnuncioById = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const { id } = req.params;

        pool.query('DELETE FROM stock WHERE id_stock = ?', id, (err, result) => {
            if(err) console.log(err);

            res.redirect('/anuncios/skinsUser');
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