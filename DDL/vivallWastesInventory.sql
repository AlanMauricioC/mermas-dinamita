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
    quantitySupply DOUBLE NOT NULL DEFAULT 0,
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
    imageRecipe VARCHAR(100) NOT NULL DEFAULT "recipes/default.jpg",
    detailRecipe VARCHAR(200) NULL,
    idSupply INT NULL,
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
-- Tabla de detalle de orden con insumos
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
    registrationDateRestock timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    idUser INT NOT NULL,
    statusRestock TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idRestock),
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de detalle de restock con insumos
CREATE TABLE restocksupply(
    idRestock INT NOT NULL,
    idSupply INT NOT NULL,
    quantityRestockSupply DOUBLE NOT NULL,
    costRestockSupply DOUBLE NOT NULL,
    arrivalDateRestockSupply timestamp NULL,
    sellByDateRestockSupply timestamp NULL,
    idProvider INT NOT NULL,
    statusRestockSupply TINYINT(1) NOT NULL DEFAULT 1,
    commentaryRestockSupply VARCHAR(300) NULL,
    PRIMARY KEY (idRestock, idSupply),
    FOREIGN KEY (idRestock) REFERENCES restock (idRestock) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION,FOREIGN KEY (idProvider) REFERENCES providers (idProvider) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de mermas
CREATE TABLE wastes(
    idWaste INT NOT NULL AUTO_INCREMENT,
    idSupply INT NOT NULL,
    registrationDateWaste timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    sellByDateWastetimestamp timestamp NULL,
    quantityWaste DOUBLE NOT NULL,
    idUser INT NOT NULL,
    statusWaste TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idWaste),
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de detalle de orden con mermas
CREATE TABLE orderwaste(
    idOrder INT NOT NULL,
    idWaste INT NOT NULL,
    quantityOrderWaste DOUBLE NOT NULL,
    PRIMARY KEY (idOrder, idWaste),
    FOREIGN KEY (idOrder) REFERENCES orders (idOrder) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idWaste) REFERENCES wastes (idWaste) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;


-- Crear evento o trigger para actualizar la cantidad una vez que se recibió el pedido 
-- trigger para disminuir cantidad de inusmo por cada orden 
-- evento para disminuir cantidad de insumo por mermas y crear la merma de almacenamiento

-- Trigger para actualizar cantidad de insumo cada que se inserta en restocksupply
-- DELIMITER //
-- CREATE OR REPLACE TRIGGER insertQuantitySupply AFTER INSERT ON restocksupply FOR EACH ROW 
--     BEGIN
--         DECLARE quantity INT;
--         SELECT quantitySupply INTO quantity FROM supplies WHERE idSupply=NEW.idSupply;
--         SET quantity = NEW.quantityRestockSupply + quantity;
--         UPDATE supplies SET quantitySupply=quantity WHERE idSupply=NEW.idSupply;
--     END//
-- DELIMITER ;