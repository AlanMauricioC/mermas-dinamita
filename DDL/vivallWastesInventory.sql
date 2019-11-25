-- Eliminar base de datos si ya existe
DROP DATABASE IF EXISTS vivallWastesInventory;
-- Crear base de datos
CREATE DATABASE vivallWastesInventory/*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
-- Usar base de datos
USE vivallWastesInventory;
-- Activar planificador de eventos 
SET GLOBAL event_scheduler = ON;
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
    emailUser VARCHAR(254) NOT NULL,
    passwordUser VARCHAR(45) NOT NULL,
    rolUser TINYINT(1) NOT NULL,
    pinUser VARCHAR(4) NOT NULL,
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
    quantitySupplyRecipe DOUBLE NULL, 
    statusRecipe TINYINT(1) NOT NULL DEFAULT 1,
    idUser INT NOT NULL,
    PRIMARY KEY (idRecipe),
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Estados de la receta:
-- 0: eliminada
-- 1: activa
-- 2: inactiva

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
    supply TINYINT(1) NULL,
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
-- Estados restock:
-- 0 = Cancelado: Ya no se requiere
-- 1 = Pendiente: Estado inicial
-- 2 = Aprobado: Aceptado por el gerente
-- 3 = No aprobado: No aceptado por el gerente
-- 4 = Pedido: Aceptado y pedido a provedor
-- 5 = Entregado: Aceptada la entrega del pedido por el chef
-- 6 = Rechazado: No Aceptada la entrega del pedido por el chef

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
    sellByDateWaste timestamp NULL,
    quantityWaste DOUBLE NOT NULL,
    typeWaste TINYINT(1) NOT NULL,
    idUser INT NOT NULL,
    statusWaste TINYINT(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (idWaste),
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idUser) REFERENCES users (idUser) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tipos de mermas:
-- 1: reutilizable
-- 2: devolución
-- 3: accidente
-- 4: comida de personal
-- 5: caduco

-- Tabla de detalle de orden con mermas
CREATE TABLE orderwaste(
    idOrder INT NOT NULL,
    idWaste INT NOT NULL,
    quantityOrderWaste DOUBLE NOT NULL,
    PRIMARY KEY (idOrder, idWaste),
    FOREIGN KEY (idOrder) REFERENCES orders (idOrder) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (idWaste) REFERENCES wastes (idWaste) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de notificaciones de insumos
CREATE OR REPLACE TABLE notificationsSupply(
    typeNotification TINYINT(1) NOT NULL,
    idSupply INT NOT NULL,
    registrationDateNotifSupply timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (idSupply, typeNotification),
    FOREIGN KEY (idSupply) REFERENCES supplies (idSupply) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tabla de notificaciones de mermas
CREATE TABLE notificationsWaste(
    typeNotification TINYINT(1) NOT NULL,
    idWaste INT NOT NULL,
    registrationDateNotifWaste timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (idWaste, typeNotification),
    FOREIGN KEY (idWaste) REFERENCES wastes (idWaste) ON DELETE NO ACTION ON UPDATE NO ACTION
) DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
-- Tipos de notificaciones:
-- 1: inventario
-- 2: caducidad

-- Triggers
-- Trigger para actualizar cantidad de insumo cada que se recibe un pedido
DELIMITER //
CREATE OR REPLACE TRIGGER acceptRestockSupply AFTER UPDATE ON restocksupply FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        IF NEW.statusRestockSupply = 5 THEN
            SELECT quantitySupply INTO quantity FROM supplies WHERE idSupply=NEW.idSupply;
            SET quantity = NEW.quantityRestockSupply + quantity;
            UPDATE supplies SET quantitySupply=quantity WHERE idSupply=NEW.idSupply;
        END IF;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de insumo cada que se inserta una orden para preparar insumo de insumos
DELIMITER //
CREATE OR REPLACE TRIGGER insertOrder AFTER INSERT ON orders FOR EACH ROW 
    BEGIN
        DECLARE idS DOUBLE;
        DECLARE quantity DOUBLE;
        DECLARE maxquantity DOUBLE;
        DECLARE recipeQuantity DOUBLE;
        IF NEW.supply=1 THEN
            SELECT idSupply, quantitySupplyRecipe INTO idS, recipeQuantity FROM recipes WHERE idRecipe=NEW.idRecipe;
            SELECT quantitySupply, maxQuantitySupply INTO quantity, maxquantity FROM supplies WHERE idSupply=idS;
            SET quantity = quantity + recipeQuantity;
            UPDATE supplies SET quantitySupply=quantity WHERE idSupply=idS;
            IF quantity <= maxquantity THEN
                INSERT INTO notificationsSupply VALUES (1, idS, current_timestamp()) ON DUPLICATE KEY UPDATE registrationDateNotifSupply=current_timestamp();
            END IF;
        END IF;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de insumo cada que se inserta un insumo a una orden
DELIMITER //
CREATE OR REPLACE TRIGGER insertOrderSupply AFTER INSERT ON ordersupply FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        DECLARE minquantity DOUBLE;
        SELECT quantitySupply, minQuantitySupply INTO quantity, minquantity FROM supplies WHERE idSupply=NEW.idSupply;
        SET quantity = quantity - NEW.quantityOrderSupply;
        UPDATE supplies SET quantitySupply=quantity WHERE idSupply=NEW.idSupply;
        IF quantity <= minquantity THEN
            INSERT INTO notificationsSupply VALUES (1, NEW.idSupply, current_timestamp()) ON DUPLICATE KEY UPDATE registrationDateNotifSupply=current_timestamp();
        END IF;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de insumo cada que se actualiza un insumo de una orden
DELIMITER //
CREATE OR REPLACE TRIGGER updateOrderSupply AFTER UPDATE ON ordersupply FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        DECLARE minquantity DOUBLE;
        SELECT quantitySupply, minQuantitySupply INTO quantity, minquantity FROM supplies WHERE idSupply=NEW.idSupply;
        SET quantity = quantity + OLD.quantityOrderSupply - NEW.quantityOrderSupply;
        UPDATE supplies SET quantitySupply=quantity WHERE idSupply=NEW.idSupply;
        IF quantity <= minquantity THEN
            INSERT INTO notificationsSupply VALUES (1, NEW.idSupply, current_timestamp()) ON DUPLICATE KEY UPDATE registrationDateNotifSupply=current_timestamp();
        END IF;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de insumo cada que se elimina un insumo de una orden
DELIMITER //
CREATE OR REPLACE TRIGGER deleteOrderSupply AFTER DELETE ON ordersupply FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        SELECT quantitySupply INTO quantity FROM supplies WHERE idSupply=OLD.idSupply;
        SET quantity = quantity + OLD.quantityOrderSupply;
        UPDATE supplies SET quantitySupply=quantity WHERE idSupply=OLD.idSupply;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de merma cada que se inserta una merma a una orden
DELIMITER //
CREATE OR REPLACE TRIGGER insertOrderWaste AFTER INSERT ON orderwaste FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        SELECT quantityWaste INTO quantity FROM wastes WHERE idWaste=NEW.idWaste;
        SET quantity = quantity - NEW.quantityOrderWaste;
        UPDATE wastes SET quantityWaste=quantity WHERE idWaste=NEW.idWaste;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de merma cada que se actualiza una merma de una orden
DELIMITER //
CREATE OR REPLACE TRIGGER updateOrderWaste AFTER UPDATE ON orderwaste FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        SELECT quantityWaste INTO quantity FROM wastes WHERE idWaste=NEW.idWaste;
        SET quantity = quantity + OLD.quantityOrderWaste - NEW.quantityOrderWaste;
        UPDATE wastes SET quantityWaste=quantity WHERE idWaste=NEW.idWaste;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de merma cada que se elimina una merma de una orden
DELIMITER //
CREATE OR REPLACE TRIGGER deleteOrderWaste AFTER DELETE ON orderwaste FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        SELECT quantityWaste INTO quantity FROM wastes WHERE idWaste=OLD.idWaste;
        SET quantity = quantity + OLD.quantityOrderWaste;
        UPDATE wastes SET quantityWaste=quantity WHERE idWaste=OLD.idWaste;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de insumo cada que se inserta una merma
DELIMITER //
CREATE OR REPLACE TRIGGER insertWaste AFTER INSERT ON wastes FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        SELECT quantitySupply INTO quantity FROM supplies WHERE idSupply=NEW.idSupply;
        SET quantity = quantity - NEW.quantityWaste;
        UPDATE supplies SET quantitySupply=quantity WHERE idSupply=NEW.idSupply;
    END//
DELIMITER ;
-- Trigger para actualizar cantidad de insumo cada que se actualiza una merma
DELIMITER //
CREATE OR REPLACE TRIGGER updateWaste AFTER UPDATE ON wastes FOR EACH ROW 
    BEGIN
        DECLARE quantity DOUBLE;
        SELECT quantitySupply INTO quantity FROM supplies WHERE idSupply=OLD.idSupply;
        IF NEW.statusWaste = 0 THEN
            SET quantity = quantity + OLD.quantityWaste;
        ELSE
            SET quantity = quantity + OLD.quantityWaste - NEW.quantityWaste;
        END IF;
        UPDATE supplies SET quantitySupply=quantity WHERE idSupply=OLD.idSupply;
    END//
DELIMITER ;

-- Procedimientos
-- Procedimiento para alertas de caducidad insumos
DELIMITER //
CREATE OR REPLACE PROCEDURE createnotificationsupply ()
    BEGIN
        DECLARE id INTEGER;
        DECLARE sellByDate date;
        DECLARE beforeSellByDate date;
        DECLARE dat date;
        DECLARE fin INTEGER DEFAULT 0;
        -- Declarar cursor
        DECLARE st_cursor CURSOR FOR SELECT n.idSupply, DATE_FORMAT(DATE_SUB(n.sellByDateRestockSupply, INTERVAL 2 DAY), '%Y-%m-%d') as beforeSellByDateRestockSupply, DATE_FORMAT(sellByDateRestockSupply, '%Y-%m-%d') as SellByDateRestockSupply FROM (SELECT rs.idSupply, rs.sellByDateRestockSupply FROM restocksupply as rs WHERE rs.statusRestockSupply=1 AND rs.quantityRestockSupply>0 GROUP BY rs.idSupply, rs.sellByDateRestockSupply) as n GROUP BY n.idSupply;
        -- Condición de salida
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
        SET dat = DATE_FORMAT(NOW(), '%Y-%m-%d');
        OPEN st_cursor;
        st: LOOP
            FETCH st_cursor INTO id, beforeSellByDate, sellByDate;
            IF fin = 1 THEN
                LEAVE st;
            END IF;
            IF dat >= beforeSellByDate AND dat <= sellByDate THEN
                INSERT INTO notificationsSupply VALUES (2, id, current_timestamp()) ON DUPLICATE KEY UPDATE registrationDateNotifSupply=current_timestamp();
            END IF;
        END LOOP st;
        CLOSE st_cursor;
        SELECT 200;
    END//
DELIMITER ;
-- Procedimiento para alertas de caducidad mermas
DELIMITER //
CREATE OR REPLACE PROCEDURE createnotificationwaste ()
    BEGIN
        DECLARE id INTEGER;
        DECLARE sellByDate date;
        DECLARE beforeSellByDate date;
        DECLARE dat date;
        DECLARE fin INTEGER DEFAULT 0;
        -- Declarar cursor
        DECLARE st_cursor CURSOR FOR SELECT n.idWaste, DATE_FORMAT(DATE_SUB(n.sellByDateWaste, INTERVAL 2 DAY), '%Y-%m-%d') as beforeSellByDateWaste, DATE_FORMAT(sellByDateWaste, '%Y-%m-%d') as sellByDateWaste FROM (SELECT w.idWaste, w.idSupply, w.sellByDateWaste FROM wastes as w WHERE w.quantityWaste>0 AND W.typeWaste=1 AND w.statusWaste=1 GROUP BY w.idSupply, w.sellByDateWaste) as n GROUP BY n.idSupply;
        -- Condición de salida
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
        SET dat = DATE_FORMAT(NOW(), '%Y-%m-%d');
        OPEN st_cursor;
        st: LOOP
            FETCH st_cursor INTO id, beforeSellByDate, sellByDate;
            IF fin = 1 THEN
                LEAVE st;
            END IF;
            IF dat >= beforeSellByDate AND dat <= sellByDate THEN
                INSERT INTO notificationsWaste VALUES (2, id, current_timestamp()) ON DUPLICATE KEY UPDATE registrationDateNotifWaste=current_timestamp();
            END IF;
        END LOOP st;
        CLOSE st_cursor;
        SELECT 200;
    END//
DELIMITER ;

-- Eventos
-- Evento para ejecutar el procedimiento para generar alertas de caducidad de insumos, cada dia a las 3am
CREATE EVENT createnotificationsupply ON SCHEDULE EVERY 1 DAY STARTS '2019-11-05 03:00:00'
DO CALL createnotificationsupply();

-- Evento para ejecutar el procedimiento para generar alertas de caducidad de mermas, cada dia a las 3:30am
CREATE EVENT createnotificationswaste ON SCHEDULE EVERY 1 DAY STARTS '2019-11-05 03:30:00'
DO CALL createnotificationwaste();