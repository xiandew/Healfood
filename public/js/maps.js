var themap;
var markerGroup;
var addr_searched;
var addr_found;

window.onload = function () {
    markerGroup = new L.featureGroup([]);
    addr_searched = addr_found = 0;

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
        add_marker(rstrntData[i]);
    }

    themap.fitBounds(markerGroup.getBounds().pad(0.5));
    themap.addLayer(markerGroup);
};

function add_marker(r) {
    if (!r.coord) {
        return;
    }
    L.marker(JSON.parse(r.coord))
        .bindPopup(`<b>${r.name}</b><br><a href=\"/restaurants/id/${r._id}\">See more information</a>`)
        .addTo(markerGroup);
}
