    //create map
    var map = L.map('mapcontainer', {
        center: [40.0583, -74.4057],
        zoom: 8
    });

    //tile layer
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
      }).addTo(map);

    //add municipal geojson data to map
    L.geoJson(njMuni).addTo(map);

    //color selector for pop density
    function getColor(d) {
         return d > 4500   ? '#54278F' :
                d > 2549   ? '#756BB1' :
                d > 1295   ? '#9E9AC8' :
                d > 395.60 ? '#CBC9E2' :
                             '#F2F0F7' ;
    }

    //fill color for geojson based on the feature
    function style(feature) {
        return {
            weight: 1,
            opactiy: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7,
            fillColor: (feature.properties.POPDEN2010)
        };
    }

   var geojson = L.geoJson(njMuni, {
    style: style,
   }).addTo(map);