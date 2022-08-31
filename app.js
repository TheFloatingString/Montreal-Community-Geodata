const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const portNum = 3000;

app.use(express.static(__dirname+'/node_modules/leaflet/dist'));
app.use(express.static(__dirname+'/public'));

const dataFile = require(__dirname+"/public/static/data/test_data.json");
console.log(dataFile)

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
})


app.get("/getData", function (req, res) {
	console.log("sending datafile...")
	res.json(dataFile);
})


app.listen(portNum);
console.log('Running at port '+portNum.toString());
