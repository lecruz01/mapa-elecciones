mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnV6MDEiLCJhIjoiY2pyY2t1aXJiMWV3bTQ0bndiZHFtZnd3dCJ9.T_AWHGpxthQg8DRhzuKTGg';

fetch('http://192.168.0.100:8000/data/escuelas.geojson')
    .then(res => {
        return res.json();
    })
    .then(data => {
        map.on('load', function() {
            map.addSource('escuelas-data', {
                type: 'geojson',
                data: {
                    'type': 'FeatureCollection',
                    'features': data.features
                }
            });

            map.loadImage('../img/school.png', function(error, image) {
                if (error) throw error;
                map.addImage('school', image);
                
                map.addLayer({
                    'id': 'escuelas-layer',
                    'type': 'symbol',
                    'source': 'escuelas-data',
                    "layout": {
                        "icon-image": "school"
                    }
                });

                map.on('click', 'escuelas-layer', function (e) {
                    var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = '<h4>' + e.features[0].properties.NOMSERV + '</h4>' 
                        + '<p>' + e.features[0].properties.GEOGRAFICO + ' ' + e.features[0].properties.TIPO + ' ' + e.features[0].properties.AMBITO + '</p>' 
                        + '<em>Estado: ' + e.features[0].properties.CONDICION + '</em>';

                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                    
                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
                });

                map.on('mouseenter', 'escuelas-layer', function () {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', 'escuelas-layer', function () {
                    map.getCanvas().style.cursor = '';
                });
            });
        });
    });