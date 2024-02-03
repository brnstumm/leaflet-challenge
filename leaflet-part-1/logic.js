// Set the variable for the URL used to gather the earthquake data
let earthquakeurl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"


let map = L.map('map').setView([20, -0.09], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

d3.json(earthquakeurl).then(data => {
  L.geoJSON(data, {
    style: function (feature) {
      let mag = feature.properties.mag;
      let depth = feature.geometry.coordinates[2];

        return {
          color: 'black',
          weight: 1,
          radius: mag * 3,
          fillOpacity: .3,
          fillColor: 
            depth > 90 ? 'red' : 
            depth > 70 ? 'darkorange' : 
            depth > 50 ? 'orange' : 
            depth > 30 ? 'yellow' : 
            depth > 10 ? 'lime' : 'green'

        };
    },
   
    pointToLayer: function(geoJsonPoint, latlng) {
      return L.circleMarker(latlng);
  }    
}).bindPopup(function (layer) {
    let mag = layer.feature.properties.mag;
    let place = layer.feature.properties.place;
    let time = new Date(layer.feature.properties.time).toLocaleString();
    return `<h3>${place}<br>Magnitude: ${mag}<br>${time}</h3>`

  
}).addTo(map);


});