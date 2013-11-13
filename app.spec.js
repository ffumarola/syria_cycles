var request = require('supertest');

var app = require('./app')

describe('POST /members/new', function() {
  it('creates a new member', function(done) {
    request(app)
      .post('/members/new')
      .send({
        'name': 'Jeff',
        'keyfob': 'ABC123',
        'email': 'fake@mailinator.com'
      })
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});

describe('POST /stations/new', function() {
  it('creates a new station', function(done) {
    request(app)
      .post('/stations/new')
      .send({
        'name': 'Union Square',
        'latitude': 40.736478,
        'longitude': -73.991164,
        'capacity': 15
      })
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});

describe('POST /bikes/new', function() {
  it('creates a new bike', function(done) {
    request(app)
      .post('/bikes/new')
      .send({
        'badge': 'AA01',
        'initialStationId': 1
      })
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});

describe('GET /stations/:id', function() {
  it('checks the status of a station', function(done) {
    request(app)
      .get('/stations/1')
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});

describe('POST /bikes/checkout/:id', function() {
  it('checks out a bike from a station', function(done) {
    request(app)
      .post('/bikes/checkout/1')
      .send({
        'memberId': 1
      })
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});

describe('POST /bikes/checkin/:id', function() {
  it('checks a bike into a station', function(done) {
    request(app)
      .post('/bikes/checkin/1')
      .send({
        'memberId': 1,
        'stationId': 1
      })
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});

describe('GET /members/:id', function() {
  it('gets info and trip history for a member', function(done) {
    request(app)
      .get('/members/1')
      .expect(200)
      .end(function(error, res) {
        done();
      });
  });
});
