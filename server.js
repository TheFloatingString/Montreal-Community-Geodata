require('dotenv').config();

// Postgres db setup

const pg = require('pg');
const config = require('./config');
const escape = require('pg-escape');

const pool = new pg.Pool(config.db);


// Express app

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const portNum = 8080;

app.use(express.static(__dirname+'/node_modules/leaflet/dist'));
app.use(express.static(__dirname+'/public'));

const dataFile = require(__dirname+"/public/static/data/montreal-food-locations.json")
// const dataFile = require(__dirname+"/public/static/data/businesses.geojson");

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
})


async function getRows(psqlPool) {
	customQuery = 'SELECT * FROM organizations;'
	let results = await psqlPool.query(customQuery);
	return results

}



app.get('/getPostgres', async function (req, res) {
	console.log('calling postgres');
	// customQuery = 'SELECT * FROM organizations;'

	// pool.query(customQuery).then((res, err) => {
	// 	console.log(res.rows);
	// }
	// );

	let psqlRsults = await getRows(pool);
	console.log(psqlRsults.rows);
	res.json(psqlRsults.rows);


})


app.get("/getData", function (req, res) {
	console.log("sending datafile...")
	let newDataObj = {"data": []};

	for (let i=0; i<dataFile.features.length; i++) {

		let currFeatureObj = dataFile.features[i]

		if (currFeatureObj.geometry !== null) {

			let newPoint = {
				"x": currFeatureObj.geometry.coordinates[0],
				"y": currFeatureObj.geometry.coordinates[1],
				"name": currFeatureObj.properties.name,
				"address": currFeatureObj.properties.address,
			}

			newDataObj.data.push(newPoint);

		}

	}

	res.json(newDataObj);
})


app.listen(portNum);
console.log('Running at port '+portNum.toString());
