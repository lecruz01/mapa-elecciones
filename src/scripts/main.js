mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnV6MDEiLCJhIjoiY2pyY2t1aXJiMWV3bTQ0bndiZHFtZnd3dCJ9.T_AWHGpxthQg8DRhzuKTGg';
var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:8080/geoserver/tiger/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tiger:tiger_roads&maxFeatures=8000&outputFormat=application/json', true);
req.onreadystatechange = function (aEvt) {
    if (req.readyState == 4) {
        if(req.status == 200) {
            map.on('load', function() {

                console.log(JSON.parse(req.responseText));

                map.addSource('calles', {
                    type: 'geojson',
                    data: JSON.parse(req.responseText)
                });
                map.addLayer({
                    "id": "calles-layer",
                    "type": "line",
                    "source": "calles",
                    "layout": {},
                    "paint": {
                        "line-color": "#fff",
                        "line-width": 1
                    }
                });

                map.on('click', 'calles-layer', function (e) {
                    console.log(e.features[0]);
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(e.features[0].properties.NAME)
                        .addTo(map);
                });

                // Change the cursor to a pointer when the mouse is over the states layer.
                map.on('mouseenter', 'calles-layer', function () {
                    map.getCanvas().style.cursor = 'pointer';
                });
                
                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'calles-layer', function () {
                    map.getCanvas().style.cursor = '';
                });
                
            });                
        }
    }
};
req.send(null);

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