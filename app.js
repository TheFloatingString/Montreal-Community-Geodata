const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const portNum = 3000;
let newDataObj = {"data": []};

app.use(express.static(__dirname+'/node_modules/leaflet/dist'));
app.use(express.static(__dirname+'/public'));

const dataFile = require(__dirname+"/public/static/data/montreal-food-locations.json");
// console.log(dataFile)

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
})


app.get("/getData", function (req, res) {
	console.log("sending datafile...")

	for (let i=0; i<100; i++) {

		let currFeatureObj = dataFile.features[i]

		if (currFeatureObj.geometry !== null) {
			console.log(currFeatureObj);

			let newPoint = {
				"x": currFeatureObj.geometry.coordinates[0],
				"y": currFeatureObj.geometry.coordinates[1]
			}

			newDataObj.data.push(newPoint);

		}

	}

	console.log(newDataObj);
	res.json(newDataObj);
})


app.listen(portNum);
console.log('Running at port '+portNum.toString());
