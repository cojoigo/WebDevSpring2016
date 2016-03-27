var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./public/assignment/server/app.js")(app);

var BreweryDb = require('brewerydb-node');
var brewdb = new BreweryDb('d3aab9c57c687035a95747bd8450ae75');

require("./public/project/server/app.js")(app, brewdb);


app.listen(port, ipaddress);