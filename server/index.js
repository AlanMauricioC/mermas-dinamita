const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeWebPage = require('./routes/webPage');

const app = express();

const allowedOrigins = ['http://localhost:3000','http://35.208.8.72','http://holi.tech'];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.'+origin;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'dinamita',
    resave: false,
    saveUninitialized: true
}));

app.use('/', routeWebPage);

app.listen(3002, () => {
    console.log("El servidor está inicializado en el puerto 3002");
});