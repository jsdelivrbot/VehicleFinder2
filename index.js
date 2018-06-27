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
	var id = request.query.id;
	var type = request.query.type;
	getVehicleFromDb(id, type, function(error, result) {
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var vehicle = result[0];
			response.status(200).json(result[0]);
		}
	});
}

function getVehicleFromDb(id, type, callback) {
	console.log("Getting vehicle from DB with id: " + id);
	var sql = "SELECT * FROM vehicle WHERE fuel_economy = $1::int and type = $2::int";
	var params = [id, type];


	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});

}
