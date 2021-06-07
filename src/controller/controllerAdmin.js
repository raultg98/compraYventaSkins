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
            const usuario = req.session.usuario.split('@');
            let admin;
            if(usuario[0] === 'admin'){
                admin = true;
            }else{
                admin = false;
            }
            res.render('admin/usuarios', { usuarios, admin });
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
    
            res.redirect('/usuarios');
        });
    }
};

controller.setAdminById = (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('UPDATE usuarios SER admin = true WHERE id_user = ?', id, (err, result) => {
            if(err) console.log(err);
    
            res.redirect('/usuarios');
        });
    }
};

controller.removeAdminById = async (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('UPDATE usuarios SET admin=false WHERE id_user = ?', id, (err, result) => {
            if(err) console.log(err);
    
            res.redirect('/usuarios');
        });
    }
};


/***************     SKINS     ***************/
controller.getSkins = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('SELECT * FROM skins ORDER BY categoria', (err, result) => {
            if(err) console.log(err);
    
            const skins = result;
            const usuario = req.session.usuario.split('@');
            let admin;
            if(usuario[0] === 'admin'){
                admin = true;
            }else{
                admin = false;
            }
            res.render('admin/skins', { skins, admin });
        });
    }
};

controller.deleteSkinById =  (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('DELETE FROM skins WHERE id_skin = ?', id, (err) => {
            if(err) console.log(err);
    
            res.redirect('/skins');
        });
    }
};

controller.getSkinToEdit = (req, res, next) => {
    const { id } = req.params;

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('SELECT * FROM skins WHERE id_skin = ?', id, (err, result) => {
            if(err) console.log(err);
    
            const datosSkin = result[0];
            const usuario = req.session.usuario.split('@');
            let admin;
            if(usuario[0] === 'admin'){
                admin = true;
            }else{
                admin = false;
            }
            // PASO AL CLIENTE UN OBJETO QUE CONTIENE LOS DATOS DE UNA SKIN EN CONCRETO.
            res.render('admin/edit', { datos: datosSkin, admin });
        });
    }
};

controller.editSkinById = (req, res, next) => {
    const { id } = req.params;
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const updateSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('UPDATE skins SET ? WHERE id_skin = ?', [updateSkin, id], (err, result) => {
            if(err) console.log(err);

            res.redirect('/skins');
        });
    }
};

controller.formNewSkin = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const usuario = req.session.usuario.split('@');
        let admin;
        if(usuario[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }
        res.render('admin/add', { admin });
    }
};

controller.createNewSkin = (req, res, next) => {
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const newSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('INSERT INTO skins SET ?', [newSkin], (err, result) => {
            if(err) console.log(err);
     
            res.redirect('/skins');
        });
    }
};


module.exports = controller;