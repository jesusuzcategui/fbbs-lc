const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const corsOptions = {
    origin: ["https://tarjetaslcdemo.tk", "http://localhost:3000"]
};

const App = express();

App.set('keyauthentication', process.env.KEYACCESS);

App.use( bodyParser.urlencoded({extended: true}) );
App.use( bodyParser.json() );
App.use( cors(corsOptions) );


App.get( '/', (req, res) => {
    res.json({
        message: 'Hola mundo'
    });
} );

require('./routes')(App);


App.listen( process.env.PORT, () => {
    console.log('Server stated on port', process.env.PORT);
} );