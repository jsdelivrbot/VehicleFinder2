var express = require('express');
var app = express();

const { Pool } = require("pg");
const connectionString = "postgres://kqbjayaoloktbi:53ca815c90f87a7674987395b394905de14898d1ae59f091d9dd8ab1ca10173c@ec2-54-83-12-150.compute-1.amazonaws.com:5432/dbvslumrik88hn";
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/getVehicle', function(request, response) {
	getVehicle(request, response);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getVehicle(request, response) {
	var pri1 = request.query.pri1;
	var pri2 = request.query.pri2;
	getVehicleFromDb(pri1, pri2, function(error, result) {
		if (error || result == null) {
			response.status(500).json({success: false, data: error});
		} else {
			var vehicle = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getVehicleFromDb(pri1, pri2, callback) {
	console.log("Getting vehicle from DB with pri1: " + pri1 + " and pri2: " + pri2);
	switch(pri1) {
    case 1:
        var sql = "SELECT * FROM vehicle ORDER BY type DESC LIMIT 1";
        break;
    case 2:
        var sql = "SELECT * FROM vehicle ORDER BY weight DESC LIMIT 1";
        break;
		case 3:
        var sql = "SELECT * FROM vehicle ORDER BY power DESC";
        break;
		case 4:
				var sql = "SELECT * FROM vehicle ORDER BY size DESC";
				break;
		case 5:
				var sql = "SELECT * FROM vehicle ORDER BY speed DESC";
				break;
		case 6:
				var sql = "SELECT * FROM vehicle ORDER BY price DESC";
				break;
    default:
        var sql = "SELECT * FROM vehicle ORDER BY fuel_economy DESC";
}

	var params = [pri1, pri2];


	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});

}
