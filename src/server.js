// import necessary components to create server.
var express = require('express');
var bodyParser = require('body-parser');

// set up express server & enable parsing of reqs to handle as json
var app = express();
var server = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//define qr routes location
const qrRoutes = require('./routes/qrRoutes');
app.use('/qrApi', qrRoutes);


// start listening
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server listening on port: ', port);
});