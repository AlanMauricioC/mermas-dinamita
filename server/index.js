const express = require("express");
const bodyParser = require('body-parser');
const routeWebPage = require('./routes/webPage');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routeWebPage);

app.listen(3002, () => {
    console.log("El servidor está inicializado en el puerto 3002");
});