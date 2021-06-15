const pool = require('../db/database');
const controller = { };

controller.getAbout = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const usuario = req.session.usuario;

        dinero(usuario, (dineroUsuario, adminUsuario) => {
            const dinero = dineroUsuario;
            const admin = adminUsuario;
            
            res.render('templates/about', { dinero, admin });
            mensaje = [];
        });
    }
}

controller.getContacto = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const usuario = req.session.usuario;

        dinero(usuario, (dineroUsuario, adminUsuario) => {
            const dinero = dineroUsuario;
            const admin = adminUsuario;
            
            res.render('templates/contacto', { dinero, admin });
            mensaje = [];
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