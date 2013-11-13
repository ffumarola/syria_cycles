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
    }
  };
  return self;
}
