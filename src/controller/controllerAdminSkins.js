const pool = require('../db/database');
const controller = { };


/***************     SKINS     ***************/
controller.getSkins = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('SELECT * FROM skins ORDER BY categoria', (err, result) => {
            if(err) console.log(err);
    
            const skins = result;
            const usuarioAdmin = req.session.usuario.split('@');
            let admin;
            if(usuarioAdmin[0] === 'admin'){
                admin = true;
            }else{
                admin = false;
            }

            const usuario = req.session.usuario;
            dinero(usuario, (dineroUsuario) => {
                const dinero = dineroUsuario;
                
                res.render('admin/skins', { skins, admin, dinero });
            });
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
    
            res.redirect('/admin/skins');
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
            const usuario = req.session.usuario;

            dinero(usuario, (dineroUsuario, adminUsuario) => {
                const dinero = dineroUsuario;
                const admin = adminUsuario;
                
                res.render('admin/edit', { datos: datosSkin, admin, dinero });
            });
        });
    }
};

controller.editSkinById = (req, res, next) => {
    // id ==>  id_skin
    const { id } = req.params;
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const updateSkin = {
        nombre, precio, foto, categoria, descripcion
    }
    console.log(updateSkin);

    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        pool.query('UPDATE skins SET ? WHERE id_skin = ?', [updateSkin, id], (err, result) => {
            if(err) console.log(err);

            res.redirect('/admin/skins');
        });
    }
};

controller.formNewSkin = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const usuario = req.session.usuario;

        dinero(usuario, (dineroUsuario, adminUsuario) => {
            const dinero = dineroUsuario;
            const admin = adminUsuario;
            
            res.render('admin/add', { admin, dinero });
        });
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
     
            res.redirect('/admin/skins');
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