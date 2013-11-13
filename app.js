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

//Adds new member to the system
app.post('/members/new', membersController.newMember);
//Gets info and trip history for a member
app.get('/members/:id', membersController.memberInfo);

//Adds a new station to the system
app.post('/stations/new', stationsController.newStation);
//Gets number of available bikes and available docks for a station
app.get('/stations/:id', stationsController.stationStatus);

//Adds a new bike to the system
app.post('/bikes/new', bikesController.newBike);
//Checks out a bike for a given member
app.post('/bikes/checkout/:id', bikesController.checkoutBike);
//Checks in a bike for a given member at a given station
app.post('/bikes/checkin/:id', bikesController.checkinBike);

app.listen(port);
console.log("app listening on port " + port);

module.exports = app;
