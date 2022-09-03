// We create the title layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Satellite Streets": satelliteStreets,
    "Streets": streets,
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [43.7, -79.3],
  zoom: 11,
	layers: [streets]
});


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// Access the Toronto airline routes GeoJSON URL.
let torontoNeighborhoods = "https://raw.githubusercontent.com/Super-Manda/Mapping_Earthquakes/main/torontoNeighborhoods.json";


// Grab GeoJSON data.
d3.json(torontoNeighborhoods).then(function(data) {
  console.log(data);

// Create a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  color: "blue",
  fillColor: "yellow",
  weight: 1,
  onEachFeature: function(feature, layer) {
   layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME);
  }
}
)
.addTo(map);
});