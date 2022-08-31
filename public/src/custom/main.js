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
            console.log(jsonVar.data[i]);

            let xCoord = jsonVar.data[i].x;
            let yCoord = jsonVar.data[i].y;

            // let xCoord = 45.5;
            // let yCoord = -73.5;

            console.log(xCoord);
            console.log(typeof xCoord);

            console.log(yCoord);
            console.log(typeof yCoord);

            L.marker([
                yCoord, 
                xCoord
            ]).addTo(map);
        }

    } catch (e) {
        console.log(e);
    }

    console.log("done http request");
}