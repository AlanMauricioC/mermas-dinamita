-- Eliminar base de datos si ya existe
DROP DATABASE IF EXISTS vivallWastesInventory;
-- Crear base de datos
CREATE DATABASE vivallWastesInventory/*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
-- Usar base de datos
USE vivallWastesInventory;
-- Activar planificador de eventos 
-- SET GLOBAL event_scheduler = ON;
-- Tablas
-- Tabla de unidades
CREATE TABLE units(
    idUnit INT NOT NULL AUTO_INCREMENT,
    nameUnit VARCHAR(45) NOT NULL,
    statusUnit TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idUnit)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de usuarios
CREATE TABLE users(
    idUser INT NOT NULL AUTO_INCREMENT,
    nameUser VARCHAR(45) NOT NULL,
    passwordUser VARCHAR(45) NOT NULL,
    rolUser VARCHAR(15) NOT NULL,
    pinUser INT(4) NOT NULL,
    statusUser TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idUser)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de insumos
CREATE TABLE supplies(
    idSupply INT NOT NULL AUTO_INCREMENT,
    nameSupply VARCHAR(45) NOT NULL,
    minQuantitySupply DOUBLE NOT NULL,
    maxQuantitySupply DOUBLE NOT NULL,
    quantitySupply DOUBLE NOT NULL,
    idUser INT NOT NULL,
    idUnit INT NOT NULL,
    statusSupply TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idSupply),
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUnit) REFERENCES units (idUnit) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de recetas
CREATE TABLE recipes(
    idRecipe INT NOT NULL AUTO_INCREMENT,
    nameRecipe VARCHAR(45) NOT NULL,
    detailRecipe VARCHAR(200) NULL,
    idSupply INT NOT NULL,
    statusRecipe TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idRecipe),
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de detalle de receta
CREATE TABLE recipesupply(
    idRecipe INT NOT NULL,
    idSupply INT NOT NULL,
    quantityRecipeSupply DOUBLE NOT NULL,
    PRIMARY KEY (idRecipe, idSupply),
    FOREIGN KEY (idRecipe) REFERENCES recipes (idRecipe) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de ordenes
CREATE TABLE orders(
    idOrder INT NOT NULL AUTO_INCREMENT,
    dateOrder timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idRecipe INT NOT NULL,
    idUser INT NOT NULL,
    statusOrder TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idOrder),
    FOREIGN KEY (idRecipe) REFERENCES recipes (idRecipe) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de detalle de orden
CREATE TABLE ordersupply(
    idOrder INT NOT NULL,
    idSupply INT NOT NULL,
    quantityOrderSupply DOUBLE NOT NULL,
    PRIMARY KEY (idOrder, idSupply),
    FOREIGN KEY (idOrder) REFERENCES orders (idOrder) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de provedores
CREATE TABLE providers(
    idProvider INT NOT NULL AUTO_INCREMENT,
    nameProvider VARCHAR(45) NOT NULL,
    statusProvider TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idProvider)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de reabastecimiento
CREATE TABLE restock(
    idRestock INT NOT NULL AUTO_INCREMENT,
    dateRestock timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    quantityRestock DOUBLE NOT NULL,
    idSupply INT NOT NULL,
    idProvider INT NOT NULL,
    idUser INT NOT NULL,
    statusRestock TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idRestock),
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION,FOREIGN KEY (idProvider) REFERENCES providers (idProvider) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;