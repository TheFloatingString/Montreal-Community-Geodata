const Http = new XMLHttpRequest();
const url = "/getData"

var map = L.map('map').setView([45.5, -73.5], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

Http.open("GET", url);
Http.send()

Http.onreadystatechange=(e)=>{
    try {
        let jsonVar = JSON.parse(Http.responseText);
        for (let i=0; i<jsonVar.data.length; i++) {
            console.log(jsonVar.data[i].coordinates.x);
            console.log(jsonVar.data[i].coordinates.y);
            console.log('');

            L.marker([
                jsonVar.data[i].coordinates.x,
                jsonVar.data[i].coordinates.y
            ]).addTo(map);
        }
        // console.log(jsonVar.data[0]);
    } catch (e) {
        console.log(e);
    }
    
}