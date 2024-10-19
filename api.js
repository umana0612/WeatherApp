const map = L.map('map').setView([26.08, -80.2], 13);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a dark theme layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map);

const marker = L.marker([26.0817, -80.2360]).addTo(map);
marker.bindPopup('<b>Pluto Hackathon</b><br>Emergency.').openPopup();

//map.on('click', function(e) {
  const coords = e.latlng;
  L.marker([coords.lat, coords.lng]).addTo(map)
      .bindPopup(`You clicked at ${coords.lat}, ${coords.lng}`)
      .openPopup();
//});

const overpassUrl = 'http://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="restaurant"](51.49,-0.1,51.5,0););out;';
fetch(overpassUrl)
    .then(response => response.json())
    .then(data => {
        data.elements.forEach(element => {
            if (element.lat && element.lon) {
                L.marker([element.lat, element.lon])
                    .addTo(map)
                    .bindPopup(element.tags.name || 'Unnamed');
            }
        });
    })
    .catch(err => console.error(err));
