mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnV6MDEiLCJhIjoiY2pyY2t1aXJiMWV3bTQ0bndiZHFtZnd3dCJ9.T_AWHGpxthQg8DRhzuKTGg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-guidance-day-v2',
    center: [-99.666233, 19.294109],
    zoom: 10,
    maxZoom: 13,
    minZoom: 8,
    // scrollZoom: false
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

var scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
});
map.addControl(scale);

var markerHeight = 50,
    markerRadius = 10,
    linearOffset = 25;
var popupOffsets = {
    'top': [0, 0],
    'top-left': [0, 0],
    'top-right': [0, 0],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
};
var popup = new mapboxgl.Popup({ offset: popupOffsets, className: 'my-class' })
    .setLngLat([-99.666233, 19.294109])
    .setHTML("<h3>Toluca</h3><p><strong>Poblacion: </strong>15 mill</p>")
    .addTo(map);

map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
}));