const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const portNum = 3000;

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/views/index.html'));
})

app.use(express.static(__dirname+'/node_modules/leaflet/dist'));
app.use(express.static(__dirname+'/public'));

app.listen(portNum);
console.log('Running at port '+portNum.toString());
