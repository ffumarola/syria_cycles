module.exports.create = function(pgClient) {
  var self = {
    new: function(badge, initialStationId, callback) {
      //create the new bike
      var queryString = "INSERT INTO bikes (badge) VALUES ($1) RETURNING id";
      var queryVals = [badge];
      pgClient.query(queryString, queryVals, function(error, result) {
        //dock the bike at its initial station
        var queryString = "INSERT INTO bikes_to_stations (bikes_id, stations_id) VALUES ($1, $2)";
        var queryVals = [result.rows[0].id, initialStationId];
        pgClient.query(queryString, queryVals, function(error, result) {
          callback(error, result);
        });
      });
    },
    checkOut: function(bikeId, memberId, callback) {
      //ensure member does not already have a bike checked out
      var queryString = "SELECT COUNT(*) FROM trips WHERE members_id=$1 AND in_progress=$2";
      var queryVals = [memberId, true];
      pgClient.query(queryString, queryVals, function(error, result) {
        if (result.rows[0].count > 0) {
          callback("Member already has bike checked out", null);
        }
        else {
          //determine which station the bike is at
          var queryString = "SELECT stations_id FROM bikes_to_stations WHERE bikes_id=$1";
          var queryVals = [bikeId];
          pgClient.query(queryString, queryVals, function(error, result) {
            //create a new trip for the member
            var queryString = "INSERT INTO trips (start_time, members_id, bikes_id, start_station_id, in_progress) VALUES ($1, $2, $3, $4, $5)";
            var queryVals = [new Date(), memberId, bikeId, result.rows[0].stations_id, true];
            pgClient.query(queryString, queryVals, function(error, result) {
              //remove the bike from the station
              var queryString = "DELETE FROM bikes_to_stations WHERE bikes_id=$1";
              var queryVals = [bikeId];
              pgClient.query(queryString, queryVals, function(error, result) {
                callback(null, true);
              });
            });
          });
        }
      });
    },
    checkIn: function(bikeId, memberId, stationId, callback) {
      //mark the member's trip as complete
      var queryString = "UPDATE trips SET end_station_id=$1, end_time=$2, in_progress=$3 WHERE bikes_id=$4 AND members_id=$5";
      var queryVals = [stationId, new Date(), false, bikeId, memberId];
      pgClient.query(queryString, queryVals, function(error, result) {
        //add the bike to the new station
        var queryString = "INSERT INTO bikes_to_stations (bikes_id, stations_id) VALUES ($1, $2)";
        var queryVals = [bikeId, stationId];
        pgClient.query(queryString, queryVals, function(error, result) {
          callback(null, true);
        });
      });
    }
  }
  return self;
}
