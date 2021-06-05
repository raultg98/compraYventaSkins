const pool = require('../db/database');
const bcrypt =  require('bcrypt');
const controller = { };

let erroresRegister = [];
let erroresLogin = [];

const expReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

/***************     LOGIN     ***************/
controller.getLogin = (req, res, next) => {
    res.render('user/login', { errors: erroresLogin });

    erroresLogin = [];
};

controller.postLogin = async (req, res, next) => {
    const { correo, contrasenia } = req.body;

    // COMPRUEBO QUE EL CORREO Y LA CONTRASEÑA INTRODUCIDOS SON VALIDOS
    if(!expReg.test(correo) || contrasenia.length < 3){
        erroresLogin.push({ text: 'EL CORREO O LA CONTRASEÑA NO SON VALIDOS'});
        req.session.usuario = null;
        res.redirect('/login');
    }else {
        // TENEMOS QUE COMPROBAR SI EL CORREO ESTA REGISTRADO.
        isUserRegister(correo, (existe) => {
            if(!existe){
                erroresLogin.push({ text: 'EL USUARIO NO ESTA REGISTRADO' });
                req.session.usuario = null;
                res.redirect('/login');
            }else {
                // TENGO QUE OBTENER LA CONTRASEÑA Y COMPROBAR SI ES IGUAL A LA QUE ME HAN PASADO
                isContraseniaCorrecta(correo, contrasenia, (correcta) => {
                    if(!correcta){
                        erroresLogin.push({ text: 'LA CONTRASEÑA NO COINCIDE' });
                        req.session.usuario = null;
                        res.redirect('/login');
                    }else {
                        req.session.usuario = correo;
                        // let usuario = req.session.usuario;
                        console.log(req.session.usuario);
                        res.redirect('/inicio');
                    }
                })
            }
        })
    }
};

// FUNCION QUE ME COMPRUEBA SI UN CORREO ESTA REGISTRADO O NO.
function isUserRegister(correo, callback){
    pool.query('SELECT correo FROM usuarios WHERE correo = ?', correo, (err, result, fields) => {
        if(err){
            console.log(err);
        }else {
            // CON RESULT.LENGTH COMPRUEBO SI LA CONSULTA TIENE DATOS.
            if(!result.length){
                callback(false);
            }else{
                callback(true);
            }
        }
    });
}

function isContraseniaCorrecta(correo, contrasenia, callback){
    pool.query('SELECT contrasenia FROM usuarios WHERE correo = ?', correo, (err, result) => {
        if(err){
            console.log(err);
        }else {
            if(!result.length){
                console.log('ERROR: USUARIO NO REGISTRADO');
                callback(false);
            }else{
                const contraseniaBD = result[0].contrasenia;

                if(!bcrypt.compare(contraseniaBD, contrasenia)){
                    callback(false);
                }else {
                    callback(true);
                }
            }
        }
    })
}

// /***************     REGISTER     ***************/
controller.getRegister = (req, res, next) => {
    res.render('user/register', { errors: erroresRegister });
    // RESETEO LOS ERRORES.
    erroresRegister = [];
}

controller.postRegister = async (req, res, next) => {
    const { nombre, apellidos, correo, contrasenia, contrasenia2 } = req.body;

    // HACER VALIDACIONES.
    if(nombre.length <= 3){
        erroresRegister.push({text: 'Nombre.length <= 3'});
    }
    if(apellidos.length <= 3){
        erroresRegister.push({text: 'Apellidos.length <= 3'});
    }
    if(contrasenia.length < 3){
        erroresRegister.push({text: 'contrasenia.length < 3'});
    }
    if(contrasenia2.length < 3){
        erroresRegister.push({text: 'contrasenia2.length < 3'});
    }
    if(!expReg.test(correo)){
        erroresRegister.push({text: 'Correo invalido'});
    }
    if(contrasenia2 !== contrasenia){
        erroresRegister.push({text: 'Las contraseñas no coinciden'});
    }
    // TENGO QUE COMPROBAR QUE EL CORREO NO ESTE EN LA BASE DE DATOS


    if(erroresRegister.length > 0){
        res.redirect('/register');
    }else {
        isUserRegister(correo, (existe) => {
            if(existe){
                erroresRegister.push({ text: 'EL USUARIO YA ESTA REGISTRADO'});
                res.redirect('/register');
            }else{
                const contraEncriptada = bcrypt.hash(contrasenia, 10);

                const registerUser = {
                    nombre,
                    apellidos, 
                    correo, 
                    contrasenia: contraEncriptada, 
                    admin: false
                }

                pool.query('INSERT INTO usuarios SET ?', [registerUser], (err, result) => {
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/login');
                    }
                });
            }
        });
    }
}

module.exports = controller;