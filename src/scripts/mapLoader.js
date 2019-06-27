var bounds = [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
];
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-73.9978, 40.7509],
    zoom: 13,
});
// mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnV6MDEiLCJhIjoiY2pyY2t1aXJiMWV3bTQ0bndiZHFtZnd3dCJ9.T_AWHGpxthQg8DRhzuKTGg';
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v10',
//     center: { lng: -99.63714410328947, lat: 19.301763904648325 },
//     zoom: 7.5,
//     maxZoom: 13
//         // scrollZoom: false
// });

// var nav = new mapboxgl.NavigationControl();
// map.addControl(nav, 'top-left');

// var scale = new mapboxgl.ScaleControl({
//     maxWidth: 80,
//     unit: 'metric'
// });
// map.addControl(scale);

// var markerHeight = 50,
//     markerRadius = 10,
//     linearOffset = 25;
// var popupOffsets = {
//     'top': [0, 0],
//     'top-left': [0, 0],
//     'top-right': [0, 0],
//     'bottom': [0, -markerHeight],
//     'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
//     'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
//     'left': [markerRadius, (markerHeight - markerRadius) * -1],
//     'right': [-markerRadius, (markerHeight - markerRadius) * -1]
// };
// var popup = new mapboxgl.Popup({
//     closeButton: false,
//     closeOnClick: false
// });

// map.addControl(new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     flyTo: {
//         speed: 2
//     },
//     marker: {
//         color: 'red'
//     },
//     mapboxgl: mapboxgl
// }));

// map.on('load', () => {
//     var json = (function() {
//         var json = null;
//         $.ajax({
//             'async': false,
//             'global': false,
//             'url': "../assets/data/CP_15Mex_v5.json",
//             'dataType': "json",
//             'success': function(data) {
//                 json = data;
//                 map.addSource('codigos', {
//                     type: 'geojson',
//                     data: json
//                 });
//                 map.addLayer({
//                     "id": "codigoslayer",
//                     "type": "fill",
//                     "source": "codigos",
//                     "layout": {},
//                     "paint": {
//                         "fill-color": "#627BC1",
//                         "fill-opacity": 0.5
//                     }
//                 });

//                 map.on('mouseenter', 'codigoslayer', function(e) {
//                     // Change the cursor style as a UI indicator.
//                     map.getCanvas().style.cursor = 'pointer';

//                     console.log(e.features);
//                     var coordinates = e.features[0].geometry.coordinates.slice();
//                     console.log(coordinates[0]);
//                     var description = e.features[0].properties.description;

//                     // Ensure that if the map is zoomed out such that multiple
//                     // copies of the feature are visible, the popup appears
//                     // over the copy being pointed to.
//                     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//                         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//                     }

//                     // Populate the popup and set its coordinates
//                     // based on the feature found.
//                     popup.setLngLat(coordinates[0])
//                         .setHTML(description)
//                         .addTo(map);
//                 });

//                 map.on('mouseleave', 'places', function() {
//                     map.getCanvas().style.cursor = '';
//                     popup.remove();
//                 });

//                 console.log(map.getLayer('codigoslayer'));
//             }
//         });
//         return json;
//     })();

// });