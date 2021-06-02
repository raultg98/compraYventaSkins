const pool = require('../db/database');
const controller = { };

/***************     LOGIN     ***************/
controller.formLogin = (req, res, next) => {
    res.render('user/register');
};

controller.getLogin = async (req, res, next) => {
    const { correo, contrasenia } = req.body;
    const loginUsuario = {
        correo, 
        contrasenia
    };

    res.redirect('/inicio');
};
 

/***************     REGISTER     ***************/
controller.formRegister = (req, res, next) => {
    res.render('user/register');
}

controller.getRegister = async (req, res, next) => {
    const { nombre, apellidos, correo, contrasenia, Rcontrasenia } = req.body;
    const registerUser = {
        nombre, 
        apellidos, 
        correo,
        contrasenia, 
        admin: false
    }

    await pool.query('INSERT INTO usuarios set ?', [registerUser]);

    res.redirect('/inicio');
}


module.exports = controller;