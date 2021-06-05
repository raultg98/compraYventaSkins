const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    // COMPRUEBO ALGUNO DE LOS ERRORES MAS TIPICOS QUE SUELEN SALIR EN MYSQL
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('SE HA PERDIDO LA CONEXION CON LA BASE DE DATOS')
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('LA CONEXION CON LA BASE DE DATOS FUE RECHAZADA');
        }
    }

    if(connection) {
        connection.release();
        console.log('SE HA CONECTADO A LA BASE DE DATOS');
        return;
    }
});

// PARA QUE AL HACER CONSULTAS PUEDA UTILIZAR TANTO PROMESAS COMO ASYNC/AWAY
// pool.query = promisify(pool.query);


module.exports = pool;