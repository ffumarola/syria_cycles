module.exports.create = function(pgClient) {
  var stationsDao = require('./stations_dao').create(pgClient);
  var self = {   
    newStation: function(req, res) {
      stationsDao.new(req.body.name, req.body.latitude, req.body.longitude, req.body.capacity, function(error, result) {
        if (!error) {
          res.send({success: true});
        }
        else {
          res.send(500, {success: false, errorMessage: "An error occurred creating a new station."})
        }
      });
    },
    stationStatus: function(req, res) {
      stationsDao.bikesAtStation(req.params.id, function(error, numberOfBikes) {
        stationsDao.stationCapacity(req.params.id, function(error, capacity) {
          if (!error) {
            res.send({
              success: true,
              availableBikes: numberOfBikes,
              availableDocks: capacity - numberOfBikes
            });
          }
          else {
            res.send(404, {success: false, errorMessage: "Station not found."});
          }
        });
      });
    }
  };
  return self;
}
