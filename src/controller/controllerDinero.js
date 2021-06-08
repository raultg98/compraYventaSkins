const pool = require('../db/database');
const controller = { };

function dinero(usuario, callback){
    pool.query('SELECT dinero FROM usuarios WHERE correo = ?', usuario, (err, result) => {
        if(err) console.log(err);
    
        const dinero = result[0].dinero;
        callback(dinero);
    });
}

controller.getDinero = (req, res, next) => {
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
            if(err){
                console.log(err);
            }else{

                dinero(usuario, (dineroUsuario) => {
                    const dinero = dineroUsuario;
                    
                    res.render('user/dinero', { admin, dinero });
                });
            }
        });
    }
}

controller.postDinero = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const  { dinero }  = req.body;
        const usuario = req.session.usuario;
        console.log(dinero)

        pool.query('UPDATE usuarios SET dinero = dinero + ? WHERE correo = ? ', [dinero, usuario], (err, result) => {
            if(err){
                console.log(err);
            }else {
                res.redirect('/inicio');
            }
        });
    }
}

module.exports = controller;