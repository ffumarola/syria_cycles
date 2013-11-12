module.exports.create = function(pgClient) {
  var self = {
    new: function(name, keyfob, email, callback) {
      var queryString = "INSERT INTO members (name, keyfob, email) VALUES ($1, $2, $3)";
      var queryVals = [name, keyfob, email];
      pgClient.query(queryString, queryVals, function(error, result) {
        callback(error, result);
      });
    }
  }
  return self;
}
