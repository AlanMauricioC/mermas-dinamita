-- unidades
INSERT INTO units VALUES (NULL, 'litros', 1), (NULL, 'mililitros', 1);

-- usuarios
INSERT INTO users VALUES (NULL, 'Diana', 'diana', 'chef', 1234, 1);

-- proveedores
INSERT INTO providers VALUES (NULL, 'lala', 1);

-- insumos
INSERT INTO supplies (idSupply, nameSupply, minQuantitySupply, maxQuantitySupply, idUser, idUnit, statusSupply) VALUES (NULL, 'Leche', 3, 8, 1, 1, 1), (NULL, 'chocolate', 3, 8, 1, 1, 1);

-- recetas
INSERT INTO recipes VALUES (NULL, 'chocomilk', 'recipes/default.jpg', 'sdfghj', NULL, 1);

-- insumo de la receta
INSERT INTO recipesupply VALUES (1, 1, 2);

-- restock
INSERT INTO restock VALUES (NULL, current_timestamp(), 1, 1);

-- insumo de restock
INSERT INTO restocksupply VALUES (1, 1, 5, 21, NULL, NULL, 1, 1, NULL);