/* SCRIPT QUE CREA LA BASE DE DATOS, LAS TABLAS Y HACE ALGUNOS INSERT*/
CREATE DATABASE proyecto;

USE proyecto;

CREATE TABLE usuarios(
    id_user int(10) auto_increment, 
    nombre VARCHAR(16) not null, 
    apellidos varchar(30) not null, 
    correo varchar(40) not null,
    contrasenia varchar(255) not null,
    admin boolean not null, 
    dinero int(10) not null, 
    primary key clave_primaria_usuarios (id_user)
);

CREATE TABLE skins(
    id_skin int(10) auto_increment, 
    nombre varchar(30) not null, 
    foto varchar(50) not null, 
    precio float(6, 2) not null, 
    categoria varchar(20) not null, 
    descripcion varchar(250), 
    primary key clave_primaria_skins (id_skin)
);

CREATE TABLE stock (
    id_stock int(10) auto_increment, 
    id_skin int(10), 
    id_vendedor int(10), 
    primary key clave_primaria_stock(id_stock), 
    FOREIGN KEY fkv_idSkin (id_skin) REFERENCES  skins (id_skin) ON DELETE CASCADE,
    FOREIGN KEY fkv_idVendedor (id_vendedor) REFERENCES usuarios (id_user) ON DELETE CASCADE
);

CREATE TABLE carrito(
    id_carrito int(10) auto_increment, 
    id_stock int(10) not null, 
    id_comprador int(10) not null, 
    PRIMARY KEY clave_primaria_carrito (id_carrito), 
    FOREIGN KEY fkCarrito_idStock (id_stock) REFERENCES stock (id_stock) ON DELETE CASCADE, 
    FOREIGN KEY fkCarrito_idComprador (id_comprador) REFERENCES usuarios (id_user) ON DELETE CASCADE
);

CREATE TABLE compras(
    id_compra int(10) auto_increment, 
    id_skin int(10) not null, 
    id_comprador int(10) not null, 
    id_vendedor int(10) not null, 
    PRIMARY KEY clave_primaria_compra(id_compra), 
    FOREIGN KEY fkcompra_idSkin (id_skin) REFERENCES skins (id_skin) ON DELETE CASCADE, 
    FOREIGN KEY fkcompra_idComprador (id_comprador) REFERENCES usuarios (id_user) ON DELETE CASCADE, 
    FOREIGN KEY fkcompra_idVendedor (id_vendedor) REFERENCES usuarios (id_user) ON DELETE CASCADE
);

INSERT INTO skins(nombre, foto, precio, categoria)
    VALUES ('Fire Serpent', '/img/ak47-fireSerpent.png', 3000, 'AK47'), 
           ('Neon Rider', '/img/ak47-neonRider.png', 120, 'AK47'),
           ('Bloodsport', '/img/ak47-bloodsport.png', 140, 'AK47'),
           ('Howl', '/img/m4a4-howl.png', 5000, 'M4A4'),
           ('The Emperor', '/img/m4a4-theEmperor.png', 230, 'M4A4'),
           ('Desolate Space', '/img/m4a4-desolateSpace.png', 20, 'M4A4'),
           ('Dragon Lore', '/img/awp-dragonLore.png', 6000, 'AWP'),
           ('Gungnir', '/img/awp-gungnir.png', 4000, 'AWP'),
           ('Atheris', '/img/awp-atheris.png', 100, 'AWP'),
           ('Dragonfire', '/img/ssg-dragonfire.png', 80, 'SSG'),
           ('Bloodshot', '/img/ssg-bloodshot.png', 60, 'SSG'),
           ('Blood In The Water', '/img/ssg-bloodInTheWater.png', 60, 'SSG'),
           ('Chameleon', '/img/aug-chameleon.png', 10, 'AUG'),
           ('Akihabara', '/img/aug-akihabara.png', 670, 'AUG'),
           ('Momentum', '/img/aug-momentum.png', 8, 'AUG'),
           ('Cobalt', '/img/deagle-cobalt.png', 20, 'DEAGLE'),
           ('Kumicho', '/img/deagle-kumicho.png', 25, 'DEAGLE'),
           ('Prinstream', '/img/deagle-printstream.png', 300, 'DEAGLE'),
           ('Kill Confirmed', '/img/usp-killConfirmed.png', 230, 'USP'),
           ('Neo Noir', '/img/usp-neoNoir.png', 140, 'USP'),
           ('Cortex', '/img/usp-cortex.png', 45, 'USP'),
           ('Water Elemental', '/img/glock18-waterElemental.png', 25, 'GLOCK18'),
           ('Bullet Queen', '/img/glock18-bulletQueen.png', 100, 'GLOCK18'),
           ('Fade', '/img/glock18-fade.png', 400, 'GLOCK18'),
           ('See Ya Later', '/img/p250-seeYaLater.png', 23, 'P250'),
           ('Undertow', '/img/p250-undertow.png', 34, 'P250'),
           ('Muertos', '/img/p250-muertos.png', 12, 'P250'),
           ('Emerald Dragon', '/img/p90-emeraldDragon.png', 300, 'P90'),
           ('Grim', '/img/p90-grim.png', 2, 'P90'),
           ('Death By Kitty', '/img/p90-deathByKitty.png', 35, 'P90'),
           ('Wild Lily', '/img/mp9-wildLily.png', 350, 'MP9'),
           ('Hydra', '/img/mp9-hydra.png', 240, 'MP9'),
           ('Food Chain', '/img/mp9-foodChain.png', 230, 'MP9'),
           ('Monster Call', '/img/mag7-monsterCall.png', 20, 'MAG7'),
           ('Heat', '/img/mag7-heat.png', 2, 'MAG7'),
           ('Justice', '/img/mag7-justice.png', 40, 'MAG7');

/***************************************************************************************************/
show tables; 

describe usuarios;

drop DATABASE proyecto;

delete table usuarios;

INSERT INTO usuarios(nombre, apellidos, correo, contrasenia, admin)
VALUES ('Admin', 'admin', 'admin@gmail.com', 'admin', true);

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
