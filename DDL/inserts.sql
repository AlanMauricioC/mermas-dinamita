-- users
INSERT INTO `users` (`idUser`, `emailUser`, `passwordUser`, `rolUser`, `pinUser`, `statusUser`) VALUES (1, 'diana@vivall.com', '80fbc3cdbfa8886d2d9da10a8649b3e77993cf5b', 1, '1234', 1), (2, 'joel@vivall.com', '80fbc3cdbfa8886d2d9da10a8649b3e77993cf5b', 0, '1234', 1);

-- units
INSERT INTO `units` (`idUnit`, `nameUnit`, `statusUnit`) VALUES (1, 'Litros', 1), (2, 'Mililitros', 1), (3, 'Kilogramos', 1), (4, 'Gramos', 1), (5, 'Piezas', 1);

-- supplies
INSERT INTO `supplies` (`idSupply`, `nameSupply`, `minQuantitySupply`, `maxQuantitySupply`, `quantitySupply`, `idUser`, `idUnit`, `statusSupply`) VALUES (1, 'Papas', 10, 22, 10, 2, 3, 1), (2, 'Chorizo', 5, 18, 8, 2, 3, 1), (3, 'Chocolate', 18, 24, 21, 2, 5, 1), (4, 'Leche', 10, 30, 16, 2, 1, 1), (5, 'Cafe', 4, 13, 9, 2, 3, 1), (6, 'Aguacate', 12, 35, 19, 2, 3, 1), (7, 'Huevo', 15, 40, 28, 2, 3, 1), (8, 'Mantequilla', 5, 20, 18, 2, 5, 1);

-- wastes
INSERT INTO `wastes` (`idWaste`, `idSupply`, `registrationDateWaste`, `sellByDateWaste`, `quantityWaste`, `typeWaste`, `idUser`, `statusWaste`) VALUES (1, 1, '2019-11-26 05:02:45', '2019-11-26 06:00:00', 8, 5, 1, 1);

-- Recipes
INSERT INTO `recipes` (`idRecipe`, `nameRecipe`, `imageRecipe`, `detailRecipe`, `idSupply`, `quantitySupplyRecipe`, `statusRecipe`, `idUser`) VALUES (1, 'Huevo con chorizo', 'recipes/default.jpg', 'Huevo revuelto con chorizo', NULL, NULL, 1, 1), (2, 'Chocolate caliente', 'recipes/default.jpg', 'Chocolate caliente', NULL, NULL, 1, 1);

-- recipesupply
INSERT INTO `recipesupply` (`idRecipe`, `idSupply`, `quantityRecipeSupply`) VALUES (1, 2, 2), (1, 7, 4), (2, 3, 1), (2, 4, 3);

-- Orders
INSERT INTO `orders` (`idOrder`, `dateOrder`, `idRecipe`, `supply`, `idUser`, `statusOrder`) VALUES (1, '2019-11-26 05:01:15', 1, 0, 1, 1);


-- ordersupply
INSERT INTO `ordersupply` (`idOrder`, `idSupply`, `quantityOrderSupply`) VALUES (1, 2, 2), (1, 7, 4);


-- restock
INSERT INTO `restock` (`idRestock`, `registrationDateRestock`, `idUser`, `statusRestock`) VALUES (1, '2019-11-26 05:06:34', 1, 5);

-- restocksupply
INSERT INTO `restocksupply` (`idRestock`, `idSupply`, `quantityRestockSupply`, `costRestockSupply`, `arrivalDateRestockSupply`, `sellByDateRestockSupply`, `idProvider`, `statusRestockSupply`, `commentaryRestockSupply`) VALUES (1, 1, 3, 50, NULL, NULL, 1, 5, '');

