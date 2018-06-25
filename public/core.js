var express = require('express');
var router = express.Router();
var pg = require('pg');
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
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
      $scope.fullName = function() {
        return result.rows[0].name + " " + result.rows[1].name;
      };
    });
  });
});
