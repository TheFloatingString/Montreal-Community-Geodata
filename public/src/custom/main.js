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
        console.log(jsonVar);

        for (let i=0; i<jsonVar.data.length; i++) {
            L.marker([
                jsonVar.data[i].x, 
                jsonVar.data[i].y
            ]).addTo(map);
        }

    } catch (e) {
        console.log(e);
    }

    console.log("done http request");
}