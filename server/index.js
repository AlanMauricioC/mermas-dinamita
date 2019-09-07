const express = require("express");
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const app = express();
app.listen(3001, () => {
    console.log("El servidor está inicializado en el puerto 3001");
});

app.get('/', function (req, res) {
    res.send('Saludos desde express');
});

app.post('/hola', function (req, res) {
    res.send('[POST]Saludos desde express');
});