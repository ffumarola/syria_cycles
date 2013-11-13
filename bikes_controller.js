module.exports.create = function(pgClient) {
  var bikesDao = require('./bikes_dao').create(pgClient);
  var self = {
    
    newBike: function(req, res) {
      bikesDao.new(req.body.badge, req.body.initialStationId, function(error, result) {
        if (!error) {
          res.send({success: true});
        }
        else {
          res.send(500, {success: false, errorMessage: "An error occurred adding a new bike."});
        }
      });
    },
    
    checkoutBike: function(req, res) {
      bikesDao.checkOut(req.params.id, req.body.memberId, function(error, result) {
        if (!error) {
          res.send({success: true});
        }
        else {
          res.send(500, {success: false, errorMessage: "An error occurred checking out a bike.  Member possibly has another bike checked out."});
        }
      });
    },
    
    checkinBike: function(req, res) {
      bikesDao.checkIn(req.params.id, req.body.memberId, req.body.stationId, function(error, result) {
        if (!error) {
          res.send({success: true});
        }
        else {
          res.send(500, {success: false, errorMessage: "An error occurred checking in a bike."});
        }
      });
    }
  }
  return self;
}
