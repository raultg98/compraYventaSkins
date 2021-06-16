const pool = require('../db/database');
const controller = { };

let mensaje_success = [];
let mensaje_error = [];

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
                    
                    res.render('user/dinero', { admin, dinero, mensaje_success, mensaje_error });

                    mensaje_success = [];
                    mensaje_error = [];
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

        pool.query('UPDATE usuarios SET dinero = dinero + ? WHERE correo = ? ', [dinero, usuario], (err, result) => {
            if(err){
                console.log(err);
            }else {
                mensaje_success.push({ text: `SE HAN AÑADIDO SATISFACTORIAMENTE ${dinero} $` });

                res.redirect('/dinero');
            }
        });
    }
}

controller.postRetirarDinero = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const { retirarDinero } = req.body;
        const usuario = req.session.usuario;

        console.log(retirarDinero);

        pool.query('SELECT dinero FROM usuarios WHERE correo = ?', usuario, (err, result) => {
            if(err) console.log(err);

            const dineroActual = result[0].dinero;

            if(dineroActual < retirarDinero){
                mensaje_error.push({ text: `ERROR: NO TIENES SUFICIENTES FONDOS` })

                res.redirect('/dinero');
            }else {
                
                pool.query('UPDATE usuarios SET dinero = dinero - ? WHERE correo = ?', [retirarDinero, usuario], (err1, result1) => {
                    if(err1) console.log(err1);

                    mensaje_success.push({ text: `SE HAN RETIRADO SATISFACTORIAMENTE ${retirarDinero}` });

                    res.redirect('/dinero');
                });
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