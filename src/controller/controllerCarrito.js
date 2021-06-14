const pool = require('../db/database');
const controller = { };

controller.getCarrito = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const usuario = req.session.usuario;
        const usuarioAdmin = req.session.usuario.split('@');
        let admin;
        if(usuarioAdmin[0] === 'admin'){
            admin = true;
        }else{
            admin = false;
        }

        /**
         * OBTENGO EL NOMBRE Y EL APELLIDO DEL USUARIO
         * OBTENGO TODAS LAS SKINS QUE TIENE EL USUARIO EN EL CARRITO
         * OBTENGO CUANTAS SKINS TIENE EL USUARIO EN EL CARRITO
         * OBTENGO EL TOTAL DE DINERO QUE CUESTAN LAS SKINS
         */
        pool.query('SELECT id_user, nombre, apellidos FROM usuarios WHERE correo = ?', usuario, (err, result) => {
            if(err) {
                console.log(err);
            }else {
                const id_user = result[0].id_user;
                const datosUser = { 
                    nombre: result[0].nombre, 
                    apellidos: result[0].apellidos, 
                    correo: usuario
                }

                pool.query('SELECT skins.*, usuarios.correo as vendedor, carrito.id_carrito FROM carrito INNER JOIN stock ON carrito.id_stock = stock.id_stock INNER JOIN skins ON stock.id_skin = skins.id_skin INNER JOIN usuarios ON stock.id_vendedor = usuarios.id_user WHERE carrito.id_comprador = ?', id_user, (err1, result1) =>{
                    if(err1) console.log(err1);

                    const skins = result1;
                    console.log(skins);

                    let totalSkin = 0;

                    for(let i=0; i<skins.length; i++){
                        totalSkin += skins[i].precio;
                    }

                    dinero(usuario, (dineroUsuario) => {
                        const dinero = dineroUsuario;

                        res.render('user/carrito', { admin, dinero, datosUser, skins, precioTotal: totalSkin });
                    });
                });
            }
        });
    }
}

controller.removeSkinCarrito = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else {
        const { id } = req.params;

        pool.query('DELETE FROM carrito WHERE id_carrito = ?', id, (err, result) => {
            if(err) console.log(err);

            res.redirect('/carrito');
        });
    }
}

controller.pagar = (req, res, next) => {
    if(req.session.usuario == null){
        res.redirect('/login');
    }else { 
        const usuario = req.session.usuario;

        pool.query('SELECT id_user FROM usuarios WHERE correo = ?', usuario, (err1, result1) => {
            if(err1) console.log(err1);

            const id_user = result1[0].id_user;

            pool.query('SELECT SUM(precio) as dineroTotal FROM skins INNER JOIN stock ON skins.id_skin = stock.id_skin INNER JOIN carrito ON stock.id_stock = carrito.id_stock WHERE carrito.id_comprador = ?', id_user, (err, result) => {
                if(err) console.log(err);

                // console.log('RESULT');
                // console.log(result);

                const dineroTotal = result[0].dineroTotal;

                dinero(usuario, (dineroUsuario, adminUsuario) => {
                    const dinero = dineroUsuario;
                    
                    if(dineroTotal <= dinero){
                        // OBTENER TODAS LAS SKINS DEL CARRITO -------------> DONE
                        // QUITAR TODAS LAS SKINS DEL CARRITO DEL USUARIO --> DONE
                        // QUITAR LAS SKIN DE LA VENTA ---------------------> DONE
                        // QUITARLE EL DINERO AL USUARIO -------------------> DONE
                        // PONERLE EL DINERO AL USUARIO QUE LA VENDIO ------> DONE
                        // AÑADIR LA TRANSACCION A UNA NUEVA TABLA ---------> DONE

                        pool.query('SELECT carrito.*, stock.* FROM carrito INNER JOIN stock ON carrito.id_stock = stock.id_stock WHERE carrito.id_comprador = ?', id_user, (err2, result2) => {
                            if(err2) console.log(err2);

                            for(let i=0; i<result2.length; i++){

                                const { id_carrito, id_stock, id_comprador, id_skin, id_vendedor } = result2[i];
                                const compra = {
                                    id_skin, id_comprador, id_vendedor
                                }

                                pool.query('INSERT INTO compras SET ?', compra, (err3, result3) => {
                                    if(err3) console.log(err3);

                                    console.log('COMPRA INSERTADA');
                                });

                                pool.query('DELETE FROM carrito WHERE id_carrito = ?', id_carrito, (err5, result5) => {
                                    if(err5) console.log(err5);
                                    
                                    console.log('SE HAN BORRADO LAS SKINS DEL CARRITO');
                                });

                                pool.query('DELETE FROM stock WHERE id_stock = ?', id_stock, (err6, result6) => {
                                    if(err6) console.log(err6);

                                    console.log('SE HAN BORRADO LAS QUE ESTABAN PUESTAS A LA VENTA');
                                });

                                const nuevoDineroComprador = dinero - dineroTotal;
                                pool.query('UPDATE usuarios SET dinero = ? WHERE id_user = ?', [nuevoDineroComprador, id_comprador], (err7, result7) => {
                                    if(err7) console.log(err7);

                                    console.log('SE HA MODIFICADO EL DINERO DEL COMPRADOR');
                                });

                            
                                pool.query('SELECT precio FROM skins WHERE id_skin = ?', id_skin, (err8, result8) => {
                                    if(err8) console.log(err8);
                                    
                                    const precioSkin = result8[0].precio;
                                    // AL USUARIO SE LE QUITA EL 10% DE VALOR DE LA COMPRA, ESTE ES BENEFICIO QUE SE LLEVA LA WEB.
                                    const nuevoDineroVendedor = precioSkin * 0.9;
                                    pool.query('UPDATE usuarios SET dinero = dinero + ? WHERE id_user = ?', [nuevoDineroVendedor, id_vendedor], (err9, result9) => {
                                        if(err9) console.log(err9);
    
                                        console.log('SE HA MODIFICADO EL DINERO DEL VENDEDOR');
                                    })
                                });
                            }

                            res.redirect('/inicio');
                        });
                    }else{
                        res.redirect('/dinero');
                    }
                    
                }); 
            });
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