-- unidades
INSERT INTO units VALUES (NULL, 'litros', 1), (NULL, 'mililitros', 1);

-- usuarios
INSERT INTO users VALUES (NULL, 'admi@vivall.com', SHA1('Aa123456_'), 1, '12345', 1);

-- proveedores
INSERT INTO providers VALUES (NULL, 'Inventario', 0), (NULL, 'lala', 1);

-- insumos
INSERT INTO supplies (idSupply, nameSupply, minQuantitySupply, maxQuantitySupply, idUser, idUnit, statusSupply) VALUES (NULL, 'Leche', 3, 8, 1, 1, 1), (NULL, 'chocolate', 3, 8, 1, 1, 1), (NULL, 'chocomilk', 3, 8, 1, 1, 1);

-- recetas
INSERT INTO recipes VALUES (NULL, 'chocomilk', 'recipes/default.jpg', 'sdfghj', 3, 1.5, 1, 1);

-- insumo de la receta
INSERT INTO recipesupply VALUES (1, 1, 2), (1, 2, 2);

-- restock
INSERT INTO restock VALUES (NULL, current_timestamp(), 1, 7), (NULL, current_timestamp(), 1, 1);

-- insumo de restock
INSERT INTO restocksupply VALUES (2, 1, 5, 21, current_timestamp(), current_timestamp(), 1, 1, 'asdfghjkl');