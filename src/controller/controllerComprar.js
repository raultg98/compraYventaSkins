const pool = require('../db/database');
const controller = { };

let mensaje = [];

controller.getComprar = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
        const usuarioAdmin = req.session.usuario.split('@');
        let admin;
        if(usuarioAdmin[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }

        // OBTENGO EL ID DEL USUARIO QUE ESTA UTILIZANDO LA WEB
        pool.query('SELECT id_user FROM usuarios WHERE correo = ?', usuario, (err, result1) => {
            if(err) console.log(err);

            const id_user = result1[0].id_user;

            // OBTENGO TODOS LOS DATOS DE LA SKIN PUESTA EN VENTA Y EL CORREO DEL USUARIO QUE LA PUSO EN VENTA. 
            // EL USUARIO QUE PONE UNA SKIN A LA VENTA NO LA VE EN LA RUTA '/COMPRAR'
            pool.query('SELECT stock.*, usuarios.correo as vendedor, skins.* FROM stock INNER JOIN usuarios ON stock.id_vendedor = usuarios.id_user INNER JOIN skins ON stock.id_skin = skins.id_skin WHERE stock.id_vendedor != ? ORDER BY stock.id_vendedor', [id_user, admin], (err, result) => {
                if(err) console.error(err);
    
                /**
                 * ARRAY DE OBJETOS QUE CONTIENE:
                 * id_stock, id_skin, id_vendedor, 
                 */
                const ventas = result;
                // console.log(ventas);
    
                dinero(usuario, (dineroUsuario) => {
                    const dinero = dineroUsuario;
                    
                    res.render('compraVenta/comprar', { ventas, admin, dinero, mensaje });
                    mensaje = [];
                });
                
            });
        })
    }
}

controller.comprarSkinById = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else{
        const usuario = req.session.usuario;
        const usuarioAdmin = req.session.usuario.split('@');
        let admin;
        if(usuarioAdmin[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }

        // TENGO QUE COMPROBAR SI LA id_stock QUE RECIBO COMO PARAMETRO LO TENGO YA EN LA BASE DE DATOS.

        // TENGO QUE AÑADIR ESTA SKIN AL CARRITO DEL USUARIO.
        pool.query('SELECT id_user FROM usuarios WHERE correo = ?', usuario, (err1, result1) => {
            if(err1) console.log(err1);

            const id_comprador = result1[0].id_user;
            const { id } = req.params;
            const id_stock = id;

            // TENGO QUE HACER LA CONSULTA DE QUE NO YO NO TENGO LA SKIN EN EL CARRITO
            pool.query('SELECT id_stock FROM carrito WHERE id_stock = ? and id_comprador = ?', [id_stock, id_comprador], (err2, result2) => {
                if(err2) console.log(err2);

                if(!result2.length){

                    const carrito = {
                        id_stock, 
                        id_comprador
                    }

                    pool.query('INSERT INTO carrito SET ?', carrito, (err3, result3) => {
                        if(err3) console.log(err3);

                        mensaje.push({ text: 'LA SKIN SE HA AGREGADO AL CARRITO' });

                        res.redirect('/comprar');
                    });
                }else { 
                    mensaje.push({ text: 'LA SKIN YA ESTABA EN EL CARRITO' });
                
                    res.redirect('/comprar');
                }
            });
        });
    }
}


function dinero(usuario, callback){
    pool.query('SELECT dinero FROM usuarios WHERE correo = ?', usuario, (err, result) => {
        if(err) console.log(err);
    
        const dinero = result[0].dinero;
        callback(dinero);
    });
}


module.exports = controller;