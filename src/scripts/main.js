// mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnV6MDEiLCJhIjoiY2pyY2t1aXJiMWV3bTQ0bndiZHFtZnd3dCJ9.T_AWHGpxthQg8DRhzuKTGg';

// fetch('http://192.168.104.193:8000/data/DistritoL_Gobernador2017.json')
//     .then(res => {
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
// map.on('load', function() {
//     map.addSource('escuelas-data', {
//         type: 'geojson',
//         data: {
//             'type': 'FeatureCollection',
//             'features': [{
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": [data.features[0].geometry.x, data.features[0].geometry.y]
//                 },
//                 "properties": {
//                     "title": data.features[0].attributes.GEOGRAFICO + ' ' + data.features[0].attributes.Tipo + ' ' + data.features[0].attributes.AMBITO,
//                     "icon": "monument"
//                 }
//             }, {
//                 "type": "Feature",
//                 "geometry": {
//                     "type": "Point",
//                     "coordinates": [data.features[1].geometry.x, data.features[1].geometry.y]
//                 },
//                 "properties": {
//                     "title": data.features[1].attributes.GEOGRAFICO + ' ' + data.features[1].attributes.Tipo + ' ' + data.features[1].attributes.AMBITO,
//                     "icon": "monument"
//                 }
//             }]
//         }
//     });

//     map.addLayer({
//         'id': 'escuelas-layer',
//         'type': 'symbol',
//         'source': 'escuelas-data',
//         "layout": {
//             "icon-image": "{icon}-15",
//             "text-field": "{title}",
//             "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
//             "text-offset": [0, 0.6],
//             "text-anchor": "top"
//         }
//     });
//     console.log('Agregado');
// });




// map.addSource('national-park', {
//     'type': 'geojson',
//     'data': {
//         'type': 'FeatureCollection',
//         'features': [{
//             'type': 'Feature',
//             'geometry': {
//                 'type': 'Polygon',
//                 'coordinates': [
//                     [
//                         [-121.353637, 40.584978],
//                         [-121.284551, 40.584758],
//                         [-121.275349, 40.541646],
//                         [-121.246768, 40.541017],
//                         [-121.251343, 40.423383],
//                         [-121.326870, 40.423768],
//                         [-121.360619, 40.434790],
//                         [-121.363694, 40.409124],
//                         [-121.439713, 40.409197],
//                         [-121.439711, 40.423791],
//                         [-121.572133, 40.423548],
//                         [-121.577415, 40.550766],
//                         [-121.539486, 40.558107],
//                         [-121.520284, 40.572459],
//                         [-121.487219, 40.550822],
//                         [-121.446951, 40.563190],
//                         [-121.370644, 40.563267],
//                         [-121.353637, 40.584978]
//                     ]
//                 ]
//             }
//         }, {
//             'type': 'Feature',
//             'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-121.415061, 40.506229]
//             }
//         }, {
//             'type': 'Feature',
//             'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-121.505184, 40.488084]
//             }
//         }, {
//             'type': 'Feature',
//             'geometry': {
//                 'type': 'Point',
//                 'coordinates': [-121.354465, 40.488737]
//             }
//         }]
//     }
// });
// });
// var req = new XMLHttpRequest();
// req.open('GET', 'http://localhost:8080/geoserver/tiger/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tiger:tiger_roads&maxFeatures=8000&outputFormat=application/json', true);
// req.onreadystatechange = function(aEvt) {
//     if (req.readyState == 4) {
//         if (req.status == 200) {
//             map.on('load', function() {

//                 console.log(JSON.parse(req.responseText));

//                 map.addSource('calles', {
//                     type: 'geojson',
//                     data: JSON.parse(req.responseText)
//                 });
//                 map.addLayer({
//                     'id': 'calles-layer',
//                     'type': 'line',
//                     'source': 'calles',
//                     'layout': {},
//                     'paint': {
//                         'line-color': '#fff',
//                         'line-width': 1
//                     }
//                 });

//                 map.on('click', 'calles-layer', function(e) {
//                     console.log(e.features[0]);
//                     new mapboxgl.Popup()
//                         .setLngLat(e.lngLat)
//                         .setHTML(e.features[0].properties.NAME)
//                         .addTo(map);
//                 });

//                 // Change the cursor to a pointer when the mouse is over the states layer.
//                 map.on('mouseenter', 'calles-layer', function() {
//                     map.getCanvas().style.cursor = 'pointer';
//                 });

//                 // Change it back to a pointer when it leaves.
//                 map.on('mouseleave', 'calles-layer', function() {
//                     map.getCanvas().style.cursor = '';
//                 });

//             });
//         }
//     }
// };
// req.send(null);

// var extent = [-125203.8523311187,-107470.46176895782,125050.97827454835,107623.33582552816];

// var projection = new ol.proj.Projection({
//     code: 'EPSG:4326',
//     // extent: extent,
//     units: 'm'
// });
// ol.proj.addProjection(projection);

// var map = new ol.Map({
//     layers: [
//         new ol.layer.Tile({
//             source: new ol.source.OSM()
//         })
//     ],
//     target: 'map',
//     view: new ol.View({
//         projection: projection,
//         center: [0,0],
//         zoom: 10
//     })
// });

// map.getView().fit(extent);

// var wmsSource = new ol.source.ImageWMS({
//     url: 'http://localhost:8080/geoserver/wms',
//     params: {'LAYERS': 'topp:states'},
//     serverType: 'geoserver',
//     crossOrigin: ''
// });

// var wmsLayer = new ol.layer.Image({
//     source: wmsSource
// });

// var view = new ol.View({
//     center: [-73.907005, 40.684221],
//     zoom: 10
// });

// console.log(wmsSource);

// var map = new ol.Map({
//     layers: [
//     new ol.layer.Tile({
//         source: new ol.source.OSM()
//     }),
//     wmsLayer],
//     target: 'map',
//     view: view
// });