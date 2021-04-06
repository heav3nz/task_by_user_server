// Third party lib
const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan');

require('dotenv').config();


var server = express();
server.use(bodyParser.json({ limit: '5mb', extended: true }));
server.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
server.use(morgan('dev'));

// Cors header for testing purpose
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Served routes
server.use(require('./routes'));

// Unhandled paths
server.use(function(req, res, done) {
    var err = new Error("Invalid Path");
    err.status = 404;
    done(err);
});

// Initializing the server instance
var server = server.listen(process.env.PORT || 5000, () => {
    console.log(`Listening the server port: ${ process.env.PORT || 5000 }`);
});