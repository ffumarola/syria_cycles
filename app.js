var express = require('express');
var pg = require('pg');

var pgConnString = process.env.DATABASE_URL;
var port = process.env.PORT || 5000;

var pgClient = new pg.Client(pgConnString);
pgClient.connect();

var membersController = require('./members_controller').create(pgClient);
var bikesController = require('./bikes_controller').create(pgClient);
var stationsController = require('./stations_controller').create(pgClient);

var app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post('/members/new', membersController.newMember);

app.post('/stations/new', stationsController.newStation);
app.get('/stations/:id', stationsController.stationStatus);

app.post('/bikes/new', bikesController.newBike);
app.post('/bikes/checkout/:id', bikesController.checkoutBike);
app.post('/bikes/checkin/:id', bikesController.checkinBike);

app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
