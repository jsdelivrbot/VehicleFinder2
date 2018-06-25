var express = require('express');
var router = express.Router();

//pg config
var pg = require('pg');
var conString = 'postgres://jmjpstzyyzexxe:127c8c9e3b14656d5e45ae9fc2904a79c958c74612e63fdb5384d3986fe743ff@ec2-54-225-76-243.compute-1.amazonaws.com:5432/dbcd7ut9b6om9r';

//Users
//get all users
router.get('/users', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT name FROM vehicle', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result.rows);
    });
  });
});

module.exports = router;
