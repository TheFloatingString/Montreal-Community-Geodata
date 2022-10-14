const Http = new XMLHttpRequest();
const url = "/getData"

var map = L.map('map').setView([45.5, -73.5], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var markers = L.markerClusterGroup();

fetch(url).then((resp) => resp.json()).then(data => {

            for (var i=0; i<data.data.length; i++){
                var marker = L.marker(new L.LatLng(data.data[i].y, data.data[i].x));
                marker.bindPopup('<b>'+data.data[i].name+'</b><br><br>'+data.data[i].address)
                markers.addLayer(marker);
            }

            map.addLayer(markers);
            
        }
    );
