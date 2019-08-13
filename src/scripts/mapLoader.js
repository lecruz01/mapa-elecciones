var bounds = [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-99.701254, 19.294099],
    zoom: 8
});