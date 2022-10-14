const Http = new XMLHttpRequest();
const url = "/getData"

var map = L.map('map').setView([45.5, -73.5], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var markers = L.markerClusterGroup();


fetch(url).then((resp) => resp.json()).then(data => {

            for (let i=0; i<data.data.length; i++){
                console.log(data.data[i].x, data.data[i].y)
                let marker = L.marker(new L.LatLng(data.data[i].y, data.data[i].x));
                marker.bindPopup(data.data[i].name)
                markers.addLayer(marker);
            }

            map.addLayer(markers);
            
        }
    );
// console.log(raps);

// Http.open("GET", url);
// Http.send()

let filteredPoints = Array()


// Http.onreadystatechange=(e)=>{
//     try {
//         let jsonVar = JSON.parse(Http.responseText);
//         // console.log(jsonVar);

//         for (let i=0; i<jsonVar.data.length; i++) {
//             // console.log(jsonVar.data[i]);

//             // console.log(markers);

//             let xCoord = jsonVar.data[i].x;
//             let yCoord = jsonVar.data[i].y;

//             // let xCoord = 45.5;
//             // let yCoord = -73.5;

//             // console.log(xCoord);
//             // console.log(typeof xCoord);

//             // console.log(yCoord);
//             // console.log(typeof yCoord);

//             // var marker = L.marker(new L.LatLng(xCoord, yCoord), {"title": "title"})
//             // marker.bindPopup("title");
//             // markers.addLayer(L.marker(new L.LatLng(xCoord, yCoord)));

//             filteredPoints.push({x:xCoord, y:yCoord})

//             // L.marker([
//             //     yCoord, 
//             //     xCoord
//             // ]).addTo(map);
//         }

//     } catch (e) {
//         console.log(e);
//     }

//     // map.addLayer(markers);
//     console.log("done http request");
// }

// console.log(filteredPoints);
// // setTimeout(5000);
// for (let i=1; i<filteredPoints.length; i++){
//     console.log(filteredPoints[i].x, filteredPoints[i].y)
// }