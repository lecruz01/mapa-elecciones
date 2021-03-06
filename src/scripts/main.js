mapboxgl.accessToken = 'pk.eyJ1IjoibGVjcnV6MDEiLCJhIjoiY2pyY2t1aXJiMWV3bTQ0bndiZHFtZnd3dCJ9.T_AWHGpxthQg8DRhzuKTGg';

fetch('http://192.168.0.100:8000/assets/data/entidades.geojson')
    .then(res => {
        return res.json();
    })
    .then(data => {
        // console.log(data);
        map.on('load', function() {

            var feats = [];
            for (var i = 0; i < data.features.length; i++) {
                var dataJson = {
                    type: 'Feature',
                    geometry: data.features[i].geometry
                };
                // console.log(data.features[i].properties.G18);
                feats.push(dataJson);
            }

            map.addSource('escuelas-data', {
                type: 'geojson',
                data: data
            });

            // map.loadImage('../img/school.png', function(error, image) {
            //     if (error) throw error;
            //     map.addImage('school', image);
                
                map.addLayer({
                    'id': 'ganadores-layer',
                    'type': 'fill',
                    'source': 'escuelas-data',
                    // 'layout': {
                    //     'icon-image': 'school'
                    // },
                    'paint': {
                        'fill-color': {
                            type: 'categorical',
                            property: 'G18',
                            stops: [['PT-MORENA-PES', '#F00'], ['PRI', '#0f0'], ['PAN-PRD-MC', '#00f'], ['MORENA', '#000']]
                        },
                        'fill-outline-color': '#fff',
                        'fill-opacity': 0.6
                    },
                });

                map.on('click', 'ganadores-layer', function (e) {
                    console.log(e.features[0]);
                    // var coordinates = e.features[0].geometry.coordinates.slice();
                    var description = '<h4>' + e.features[0].properties.CABECERA + '</h4>' 
                        + '<p><strong>Gobernado por:</strong>' + e.features[0].properties.G18 + '</p>';

                    // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    // coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    new mapboxgl.Popup()
                        .setLngLat(e.lngLat)
                        .setHTML(description)
                        .addTo(map);
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

                map.on('mouseenter', 'ganadores-layer', function () {
                    map.getCanvas().style.cursor = 'pointer';
                });

                map.on('mouseleave', 'ganadores-layer', function () {
                    map.getCanvas().style.cursor = '';
                });
            // });
        });
    });