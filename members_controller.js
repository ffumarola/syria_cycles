module.exports.create = function(pgClient) {
  var membersDao = require('./members_dao').create(pgClient);
  var self = {   
    newMember: function(req, res) {
      membersDao.new(req.body.name, req.body.keyfob, req.body.email, function(error, result) {
        if (!error) {
          res.send({success: true});
        }
        else {
          res.send(500, {success: false, errorMessage: "An error occurred creating a new member."});
        }
      });
    },
    memberInfo: function(req, res) {
      membersDao.info(req.params.id, function(error, info) {
        membersDao.tripHistory(req.params.id, function(error, tripHistory) {
          if (!error) {
            res.send({success: true, info: info, tripHistory: tripHistory});
          }
          else {
            res.send(404, {success: false, errorMessage: "Member not found."});
          }
        })
      })
    }
  };
  return self;
}
