var express = require('express');
var router = express.Router();
var app = express();
var url = require('url');

var pg = require('pg');
var conString = 'postgres://postgresql-slippery-98712';

module.exports = router;
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


router.get('/users', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM type', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

app.get('/math', function(request, response) {
	handleMath(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function handleMath(request, response) {
	var requestUrl = url.parse(request.url, true);

	console.log("Query parameters: " + JSON.stringify(requestUrl.query));

	// TODO: Here we should check to make sure we have all the correct parameters

	var operation = requestUrl.query.operation;
	var operand1 = Number(requestUrl.query.operand1);

	computeOperation(response, operation, operand1);
}

function computeOperation(response, op, weight) {
	op = op.toLowerCase();

	var result = 0;

	if (op == "letters (stamped)") {
		if (weight <= 1) {
			result = 0.5;
		}
		else if (weight <= 2) {
			result = 0.71;
		}
		else if (weight <= 3) {
			result = 0.92;
		}
		else {
			result = 1.13;
		}
	} else if (op == "letters (metered)") {
		if (weight <= 1) {
			result = 0.47;
		}
		else if (weight <= 2) {
			result = 0.68;
		}
		else if (weight <= 3) {
			result = 0.89;
		}
		else {
			result = 1.10;
		}
	} else if (op == "large envelopes (flats)") {
		if (weight <= 1) {
			result = 1.00;
		}
		else if (weight <= 2) {
			result = 1.21;
		}
		else if (weight <= 3) {
			result = 1.42;
		}
		else if (weight <= 4) {
			result = 1.63;
		}
		else if (weight <= 5) {
			result = 1.84;
		}
		else if (weight <= 6) {
			result = 2.05;
		}
		else if (weight <= 7) {
			result = 2.26;
		}
		else if (weight <= 8) {
			result = 2.47;
		}
		else if (weight <= 9) {
			result = 2.68;
		}
		else if (weight <= 10) {
			result = 2.89;
		}
		else if (weight <= 11) {
			result = 3.10;
		}
		else if (weight <= 12) {
			result = 3.31;
		}
		else {
			result = 3.52;
		}
	} else if (op == "first-class package service - retail") {
    if (weight <= 4) {
			result = 3.50;
		}
		else if (weight <= 8) {
			result = 3.75;
		}
		else if (weight <= 9) {
			result = 4.10;
		}
		else if (weight <= 10) {
			result = 4.45;
		}
		else if (weight <= 11) {
			result = 4.80;
		}
		else if (weight <= 12) {
			result = 5.15;
		}
		else {
			result = 5.50;
		}
	}

	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {operation: op, weight: weight, result: result};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('pages/result', params);

}
