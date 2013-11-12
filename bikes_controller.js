module.exports.create = function(pgClient) {
  var bikesDao = require('./bikes_dao').create(pgClient);
  var self = {
    
    newBike: function(req, res) {
      bikesDao.new(req.body.badge, req.body.initialStationId, function(error, result) {
        res.send({success: true});
      });
    },
    
    checkoutBike: function(req, res) {
      bikesDao.checkOut(req.params.id, req.body.memberId, function(error, result) {
        res.send({success: true});
      });
    },
    
    checkinBike: function(req, res) {
      bikesDao.checkIn(req.params.id, req.body.memberId, req.body.stationId, function(error, result) {
        res.send({success: true});
      });
    }
  }
  return self;
}
