var con = require('./DB/conection.js');

const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3002, () => {
    console.log("El servidor está inicializado en el puerto 3002");
});

app.get('/', (req, res) => {
    res.send('Saludos desde express').status(200);
});

app.get('/units', (req, res) => {
    con.query("select * from units", null, function (data, error) {
            if(error) throw error;
            res.json(JSON.parse('{ "units" : ' + JSON.stringify(data) + '}')).status(200);
    });
});
