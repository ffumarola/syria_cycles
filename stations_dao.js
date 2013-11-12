module.exports.create = function(pgClient) {
  var self = {
    new: function(name, latitude, longitude, capacity, callback) {
      var queryString = "INSERT INTO stations (name, latitude, longitude, capacity) VALUES ($1, $2, $3, $4)";
      var queryVals = [name, latitude, longitude, capacity];
      pgClient.query(queryString, queryVals, function(error, result) {
        callback(error, result);
      });
    },
    bikesAtStation: function(stationId, callback) {
      var queryString = "SELECT COUNT(*) FROM bikes_to_stations WHERE stations_id=$1";
      var queryVals = [stationId];
      pgClient.query(queryString, queryVals, function(error, result) {
        callback(error, result.rows[0].count);
      });
    },
    stationCapacity: function(stationId, callback) {
      var queryString = "SELECT capacity FROM stations WHERE id=$1";
      var queryVals = [stationId];
      pgClient.query(queryString, queryVals, function(error, result) {
        callback(error, result.rows[0].capacity);
      });
    }
  }
  return self;
}
