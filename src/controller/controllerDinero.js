const pool = require('../db/database');
const controller = { };


controller.getDinero = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;

        pool.query('SELECT dinero FROM usuarios WHERE correo = ?', usuario, (err, result) => {
            if(err){
                console.log(err);
            }else{

                dinero(usuario, (dineroUsuario, adminUsuario) => {
                    const dinero = dineroUsuario;
                    const admin = adminUsuario;
                    
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