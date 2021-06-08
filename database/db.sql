/* SCRIPT QUE CREA LA BASE DE DATOS, LAS TABLAS Y HACE ALGUNOS INSERT*/



/***************************************************************************************************/
show tables; 

describe usuarios;

drop DATABASE proyecto;

delete table usuarios;

INSERT INTO usuarios(nombre, apellidos, correo, contrasenia, admin)
VALUES ('Admin', 'admin', 'admin@gmail.com', 'admin', true);

CREATE TABLE compras(
    id_compra int(10) auto_increment, 
    fecha date not null, 
    PRIMARY KEY pk_compra (id_compra),
    CONSTRAINT fk_skin_compra FOREING KEY (id_skin) REFERENCES skins (id_skin),
    CONSTRAINT fk_user_compra FOREING KEY (id_user) REFERENCES usuarios (id_user)
);

CREATE TABLE ventas(
    id_venta int(10) auto_increment, 
    fecha date not null, 
    PRIMARY KEY pk_venta (id_venta)
);

alter table usuarios add rol int(1);
username varchar(15) not null, 

ALTER TABLE usuarios CHANGE rol admin BOOLEAN;

update usuarios set nombre = 'SUPER ADMIN' WHERE id_user = 1;
