const { compareSync } = require('bcrypt');
const pool = require('../db/database');
const controller = { };

/***************     USUARIOS     ***************/
controller.getUsuarios = (req, res, next) => {
    pool.query('SELECT * FROM usuarios', (err, result) => {
        if(err) console.log(err);

        const usuarios = result;
        res.render('admin/usuarios', { usuarios });
    });
}

controller.deleteUsuarioById = (req, res, next) => {
    const { id } = req.params;

    pool.query('DELETE FROM usuarios WHERE id_user = ?', id, (err, result) => {
        if(err) console.log(err);

        res.redirect('/usuarios');
    });
};

controller.setAdminById = (req, res, next) => {
    const { id } = req.params;

    pool.query('UPDATE usuarios SER admin = true WHERE id_user = ?', id, (err, result) => {
        if(err) console.log(err);

        res.redirect('/usuarios');
    });
};

controller.removeAdminById = async (req, res, next) => {
    const { id } = req.params;

    pool.query('UPDATE usuarios SET admin=false WHERE id_user = ?', id, (err, result) => {
        if(err) console.log(err);

        res.redirect('/usuarios');
    });
};


/***************     SKINS     ***************/
controller.getSkins = (req, res, next) => {
    pool.query('SELECT * FROM skins ORDER BY categoria', (err, result) => {
        if(err) console.log(err);

        const skins = result;
        res.render('admin/skins', { skins });
    });
};

controller.deleteSkinById =  (req, res, next) => {
    const { id } = req.params;

    pool.query('DELETE FROM skins WHERE id_skin = ?', id, (err) => {
        if(err) console.log(err);

        res.redirect('/skins');
    });
};

controller.getSkinToEdit = (req, res, next) => {
    const { id } = req.params;

    pool.query('SELECT * FROM skins WHERE id_skin = ?', id, (err, result) => {
        if(err) console.log(err);

        const datosSkin = result[0];
        // PASO AL CLIENTE UN OBJETO QUE CONTIENE LOS DATOS DE UNA SKIN EN CONCRETO.
        res.render('admin/edit', { datos: datosSkin });
    });
};

controller.editSkinById = (req, res, next) => {
    const { id } = req.params;
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const updateSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    pool.query('UPDATE skins SET ? WHERE id_skin = ?', [updateSkin, id], (err, result) => {
        if(err) console.log(err);

        res.redirect('/skins');
    });
};

controller.formNewSkin = (req, res, next) => {
    res.render('admin/add');
};

controller.createNewSkin = (req, res, next) => {
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const newSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    pool.query('INSERT INTO skins SET ?', [newSkin], (err, result) => {
        if(err) console.log(err);
 
        res.redirect('/skins');
    });
};


module.exports = controller;