var themap;
var markers = [];

window.onload = function () {
    themap = new L.map('mapid');
    themap.setView([-37.813611, 144.963056], 13);
    let baseLayer = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: 1,
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoicGF1bHdlbiIsImEiOiJjanV2NmFseXAwcWd5M3lwaDZndnRiZTVyIn0.wMsXpTwPNHtT1cUD1S3giw'
    });
    themap.addLayer(baseLayer);

    for (let i = 0; i < rstrntData.length; i++) {
        let r = rstrntData[i];
        addr_search(r, add_marker);
    }
    let markerGroup = new L.featureGroup(markers);
    themap.fitBounds(markerGroup.getBounds());
};

function add_marker(r, coord) {
    let marker = L.marker(coord)
        .addTo(themap)
        .bindPopup(`<b>${r.name}</b><br><a href=\"/restaurants/id/${r._id}\">See more information</a>`);
    markers.push(marker);
    console.log(markers);
}

function addr_search(r, cb) {
    let xmlhttp = new XMLHttpRequest();
    let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + r.address;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let resultArr = JSON.parse(this.responseText);
            if (resultArr.length > 0) {
                cb(r, [resultArr[0].lat, resultArr[0].lon]);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}