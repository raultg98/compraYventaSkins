const pool = require('../db/database');
const controller = { };

/***************     USUARIOS     ***************/
controller.getUsuarios = async (req, res, next) => {
    const usuarios = await pool.query('SELECT * from usuarios');

    res.render('admin/usuarios', { usuarios });
};

controller.deleteUsuarioById = async (req, res, next) => {
    const { id } = req.params;

    await pool.query('DELETE from usuarios WHERE id_user = ?', id);

    req.flash('SUCCESS', 'Usuario borrado correctamente');
    res.redirect('/usuarios');
};

controller.setAdminById = async (req, res, next) => {
    const { id } = req.params;

    await pool.query('UPDATE usuarios SET admin=true WHERE id_user = ?', id);

    res.redirect('/usuarios');
};

controller.removeAdminById = async (req, res, next) => {
    const { id } = req.params;

    await pool.query('UPDATE usuarios SET admin=false WHERE id_user = ?', id);

    res.redirect('/usuarios');
};


/***************     SKINS     ***************/
controller.getSkins = async (req, res, next) => {
    const skins = await pool.query('SELECT * from skins ORDER BY categoria');

    res.render('admin/skins', { skins });
};

controller.deleteSkinById = async (req, res, next) => {
    const { id } = req.params;

    await pool.query('DELETE from skins WHERE id_skin = ?', id);

    res.redirect('/skins');
};

controller.getSkinToEdit = async (req, res, next) => {
    const { id } = req.params;
    const datosSkin = await pool.query('SELECT * from skins WHERE id_skin = ?', id);

    // PASO AL CLIENTE UN OBJETO QUE CONTIENE LOS DATOS DE UNA SKIN EN CONCRETO.
    res.render('admin/edit', { datos: datosSkin[0] });
};

controller.editSkinById = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const updateSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    await pool.query('UPDATE skins SET ? WHERE id_skin = ?', [updateSkin, id]);
    res.redirect('/skins');
};

controller.formNewSkin = async (req, res, next) => {
    res.render('admin/add');
};

controller.createNewSkin = async (req, res, next) => {
    const { nombre, foto, precio, categoria, descripcion } = req.body;
    const newSkin = {
        nombre, precio, foto, categoria, descripcion
    }

    await pool.query('INSERT INTO skins SET ?', [newSkin]);
 
    res.redirect('/skins');
};


module.exports = controller;