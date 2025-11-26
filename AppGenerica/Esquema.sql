CREATE DATABASE dbprueba
;
use dbprueba
;
CREATE TABLE dbprueba.tblestudiante (
  codigo int NOT NULL auto_increment primary key,
  tipodocumento char(2) NOT NULL,
  documento varchar(20) NOT NULL,
  nombreuno varchar(50) NOT NULL,
  nombredos varchar(50) DEFAULT NULL,
  apellidouno varchar(50) NOT NULL,
  apellidodos varchar(50) DEFAULT NULL,
  sexo char(1) NOT NULL,
  rh char(5) NOT NULL,
  direccion varchar(500), 
  telefono varchar(50) DEFAULT null,
  fecha varchar(50) not null
)
;