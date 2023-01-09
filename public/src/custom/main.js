const url = "/getPostgres"

var map = L.map('map').setView([45.55, -73.6], 10.35);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var markers = L.markerClusterGroup();

fetch(url).then((resp) => resp.json()).then(data => {

            for (var i=0; i<data.length; i++){
                var marker = L.marker(new L.LatLng(data[i].latitude, data[i].longitude));
                marker.bindPopup('<b>'+data[i].name+'</b><br><br>'+data[i].address+'<br><br>'+data[i].datasource);
                markers.addLayer(marker);
            }

            map.addLayer(markers);
            
        }
    );
