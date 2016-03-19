var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);