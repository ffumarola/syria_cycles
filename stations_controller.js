module.exports.create = function(pgClient) {
  var stationsDao = require('./stations_dao').create(pgClient);
  var self = {   
    newStation: function(req, res) {
      stationsDao.new(req.body.name, req.body.latitude, req.body.longitude, req.body.capacity, function(error, result) {
        res.send({success: true});
      });
    },
    stationStatus: function(req, res) {
      stationsDao.bikesAtStation(req.params.id, function(error, numberOfBikes) {
        stationsDao.stationCapacity(req.params.id, function(error, capacity) {
          res.send({
            availableBikes: numberOfBikes,
            availableDocks: capacity - numberOfBikes
          });
        });
      });
    }
  };
  return self;
}
