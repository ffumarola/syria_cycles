module.exports.create = function(pgClient) {
  var self = {
    new: function(name, keyfob, email, callback) {
      var queryString = "INSERT INTO members (name, keyfob, email) VALUES ($1, $2, $3)";
      var queryVals = [name, keyfob, email];
      pgClient.query(queryString, queryVals, function(error, result) {
        callback(error, result);
      });
    },
    
    tripHistory: function(id, callback) {
      var queryString = "SELECT * FROM trips WHERE members_id=$1";
      var queryVals = [id];
      pgClient.query(queryString, queryVals, function(error, result) {
        if (result) {
          callback(error, result.rows);
        }
        else {
          callback("User not found!", null);
        }
      })
    },
    
    info: function(id, callback) {
      var queryString = "SELECT * FROM members WHERE id=$1";
      var queryVals = [id];
      pgClient.query(queryString, queryVals, function(error, result) {
        if (result) {
          callback(error, result.rows[0]);
        }
        else {
          callback("User not found!", null);
        }
      })
    }
  }
  return self;
}
