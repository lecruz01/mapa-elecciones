// var bounds = [
//     [-74.04728500751165, 40.68392799015035], // Southwest coordinates
//     [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
// ];
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/dark-v9',
//     center: [-73.9978, 40.7509],
//     zoom: 13,
// });

var map;
require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/dijit/PopupTemplate",
    "esri/request",
    "esri/geometry/Point",
    "esri/graphic",
    "dojo/on",
    "dojo/_base/array",
    "dojo/domReady!"
], function(
    Map,
    FeatureLayer,
    PopupTemplate,
    esriRequest,
    Point,
    Graphic,
    on,
    array
) {

    var featureLayer;

    map = new Map("map", {
        basemap: "gray",
        center: [-99.701254, 19.294099],
        zoom: 9
    });

    //hide the popup if its outside the map's extent
    map.on("mouse-drag", function(evt) {
        if (map.infoWindow.isShowing) {
            var loc = map.infoWindow.getSelectedFeature().geometry;
            if (!map.extent.contains(loc)) {
                map.infoWindow.hide();
            }
        }
    });

    fetch('http://192.168.104.193:8000/data/ESCUELAS.json')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            //create a feature collection for the flickr photos
            var featureCollection = {
                "layerDefinition": {
                    "geometryType": data.geometryType,
                    "objectIdField": "ObjectID",
                    "drawingInfo": {
                        "renderer": {
                            "type": "simple",
                            "symbol": {
                                "type": "esriPMS",
                                "url": "images/flickr.png",
                                "contentType": "image/png",
                                "width": 15,
                                "height": 15
                            }
                        }
                    },
                    "fields": data.fields
                },
                "featureSet": {
                    "features": [],
                    "geometryType": data.geometryType
                }
            };

            //define a popup template
            var popupTemplate = new PopupTemplate({
                title: "{title}",
                description: "{description}"
            });

            //create a feature layer based on the feature collection
            featureLayer = new FeatureLayer(featureCollection, {
                id: 'schoolsLayer'
            });

            //associate the features with the popup on click
            // featureLayer.on("click", function(evt) {
            //     map.infoWindow.setFeatures([evt.graphic]);
            // });

            map.on("layers-add-result", function(results) {
                requestPhotos();
            });
            //add the feature layer that contains the flickr photos to the map
            map.addLayers([featureLayer]);
        });

    function requestPhotos() {
        //get geotagged photos from flickr
        //tags=flower&tagmode=all
        var requestHandle = esriRequest({
            url: "./data/escuela.json",
            callbackParamName: "jsoncallback"
        });
        requestHandle.then(requestSucceeded, requestFailed);
    }

    function requestSucceeded(response, io) {
        //loop through the items and add to the feature layer
        var features = [];
        array.forEach(response.features, function(item) {
            var attr = item.attributes;

            console.log(item.geometry);
            var geometry = new Point(item.geometry);

            // var graphic = new Graphic(geometry);
            // graphic.setAttributes(attr);
            features.push(geometry);
        });

        console.log(features);
        featureLayer.applyEdits(features, null, null);
    }

    function requestFailed(error) {
        console.log('failed');
    }
});


// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/light-v10',
//     center: [-99.701254, 19.294099],
//     zoom: 8
// });



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
//             'url': '../assets/data/CP_15Mex_v5.json',
//             'dataType': 'json',
//             'success': function(data) {
//                 json = data;
//                 map.addSource('codigos', {
//                     type: 'geojson',
//                     data: json
//                 });
//                 map.addLayer({
//                     'id': 'codigoslayer',
//                     'type': 'fill',
//                     'source': 'codigos',
//                     'layout': {},
//                     'paint': {
//                         'fill-color': '#627BC1',
//                         'fill-opacity': 0.5
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