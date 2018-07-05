var express = require('express');
var app = express();

const { Pool } = require("pg");
const connectionString = "postgres://naocgjydoypbdv:21ad27e80d9c10dd0b0438d3f03477ef52d43cb1419643b4c63100afec9f19c5@ec2-54-83-59-144.compute-1.amazonaws.com:5432/d2ll6noaicerng";
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
	getVehicleFromDb(pri1, function(error, result) {
		if (error || result == null) {
			response.status(500).json({success: false, data: error});
		} else {
			var vehicle1 = result;

			getVehicleFromDb(pri2, function(error, result) {
				if (error || result == null) {
					response.status(500).json({success: false, data: error});
				} else {
					var vehicle2 = result;
					var vehicle3 = [];
					var indexes = [];
					var i;
					var k = 0;
					var l = 0;
					var negate = 1;
					for (i = 0; i < vehicle1.length; i++){
						if (negate == -1 && !indexes.includes(vehicle2[k].id)){
							negate = 1;
						vehicle3.push(vehicle2[k]);
						console.log("ONE: " + vehicle2[k].id);
						indexes.push(vehicle2[k].id);
						k++;
						}
						else{
							var j = l;
							while(indexes.includes(vehicle1[j].id) && (j + 1) % vehicle1.length != l){
								if (j + 1 == vehicle1.length)
								    j = 0;
								else
							   		j++;
							 }
							negate = -1;
							vehicle3.push(vehicle1[j]);
							console.log("TWO: " + vehicle1[j].id);
							indexes.push(vehicle1[j].id)
							l++;
						}
					}

					response.status(200).json(vehicle3);
				}
			});

		}
	});
}

function getVehicleFromDb(pri1, callback) {
	console.log("Getting vehicle from DB with pri1: " + pri1);
	switch(pri1) {
    case "1":
        var sql = "SELECT * FROM vehicle ORDER BY type DESC";
        break;
    case "2":
        var sql = "SELECT * FROM vehicle ORDER BY weight DESC";
        break;
		case "3":
        var sql = "SELECT * FROM vehicle ORDER BY power DESC";
        break;
		case "4":
				var sql = "SELECT * FROM vehicle ORDER BY size DESC";
				break;
		case "5":
				var sql = "SELECT * FROM vehicle ORDER BY speed DESC";
				break;
		case "6":
				var sql = "SELECT * FROM vehicle ORDER BY price DESC";
				break;
    default:
        var sql = "SELECT * FROM vehicle ORDER BY fuel_economy DESC";
}
	//var params = [pri1, pri2];
	pool.query(sql, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		//console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});

}
