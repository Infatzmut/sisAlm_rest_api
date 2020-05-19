create database sisinventario;
use sisinventario;

create table if not exists colores(
id_color tinyint primary key auto_increment,
destalle varchar(20) not null
);

create table if not exists proveedores(
prov_id tinyint primary key auto_increment,
razon_social varchar(20) not null,
ruc varchar(10) ,
direccion varchar(50) , 
telefono varchar(10) ,
email varchar(30) unique,
status char(1)
);

create table if not exists productos(
prod_id tinyint primary key auto_increment,
descripcion varchar(50),
colorId tinyint,
talla varchar(4),
status char(1),
compra_susp boolean default 1,
constraint FK_colorId foreign key (colorId) references colores(id_color)
);

create table if not exists producto_prov(
producto_id tinyint,
proveedor_id tinyint,
primary key(producto_id, proveedor_id),
constraint Fk_productoId2 foreign key (producto_id) references productos(prod_id),
constraint Fk_proveedorId foreign key (proveedor_id) references proveedores(prov_id)
);

create table if not exists sucursales(
id_suc tinyint primary key auto_increment,
direccion varchar(50)
);

create table if not exists depositos(
id_dep tinyint primary key auto_increment,
nombre varchar(30),
id_suc tinyint not null,
constraint FK_sucId foreign key (id_suc) references sucursales(id_suc)
);

create table if not exists secciones(
id_seccion tinyint primary key auto_increment,
nombre varchar(10) not null,
status char(1) default 'D',
id_deposito tinyint not null,
constraint FK_depositoId foreign key (id_deposito) references depositos(id_dep)
);

create table if not exists racks(
id_rack tinyint primary key auto_increment,
id_seccion tinyint,
nro_rack tinyint,
filas tinyint,
columnas tinyint,
status char(1) default '1',
constraint Fk_seccionId foreign key (id_seccion) references secciones(id_seccion)
);

create table if not exists deposito_stock(
id_stock tinyint primary key auto_increment,
id_prod tinyint,
id_rack tinyint not null,
fila tinyint not null,
columna tinyint not null,
cantidad mediumint,
ultimo_mov date,
ultimo_inv date,
constraint Fk_idProducto3 foreign key(id_prod) references productos(prod_id),
constraint Fk_idRack foreign key(id_rack) references racks(id_rack)
);

create table if not exists mov_stock(
id_mov bigint primary key auto_increment,
fecha datetime,
id_prod tinyint,
accion char(1),
id_rack tinyint,
cantidad mediumint not null,
constraint Fk_idProducto4 foreign key (id_prod) references productos(prod_id),
constraint Fk_idRack2 foreign key (id_rack) references racks(id_rack)
);

create table if not exists mapa_rack (
mapa_id mediumint primary key auto_increment,
rack_id tinyint not null,
fila int not null,
columna int not null,
id_prod tinyint,
cantidad int,
ultima_rev date,
ultima_mod date,
constraint Fk_idRack3 foreign key (rack_id) references racks(id_rack),
constraint Fk_idProducto5 foreign key (id_prod) references productos(prod_id)
);

