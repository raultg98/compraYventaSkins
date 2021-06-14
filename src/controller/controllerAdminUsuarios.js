const pool = require('../db/database');
const controller = { };


/***************     USUARIOS     ***************/
controller.getUsuarios = (req, res, next) => {
    pool.query('SELECT * FROM usuarios', (err, result) => {
        if(err) console.log(err);

        if(req.session.usuario == null){
            res.redirect('/login');
        }else{
            const usuarios = result;
            const usuario = req.session.usuario;

            dinero(usuario, (dineroUsuario, adminUsuario) => {
                const dinero = dineroUsuario;
                const admin = adminUsuario;
                
                res.render('admin/usuarios', { usuarios, admin, dinero });
            }); 
        }
    });
}


controller.deleteUsuarioById = (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('DELETE FROM usuarios WHERE id_user = ?', id, (err, result) => {
            if(err) console.log(err);
    
            res.redirect('/admin/usuarios');
        });
    }
};

controller.setAdminById = (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('UPDATE usuarios SET admin = true WHERE id_user = ?', id, (err, result) => {
            if(err) console.log(err);
    
            res.redirect('/admin/usuarios');
        });
    }
};

controller.removeAdminById = async (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('UPDATE usuarios SET admin = false WHERE id_user = ?', id, (err, result) => {
            if(err) console.log(err);
    
            res.redirect('/admin/usuarios');
        });
    }
};


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