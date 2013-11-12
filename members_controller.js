module.exports.create = function(pgClient) {
  var membersDao = require('./members_dao').create(pgClient);
  var self = {   
    newMember: function(req, res) {
      membersDao.new(req.body.name, req.body.keyfob, req.body.email, function(error, result) {
        res.send({success: true});
      });
    }
  };
  return self;
}
