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
    var layer = L.geoJson(njMuni).addTo(map);

    //color selector for pop density
    function getColor(d) {
         return d > 4500   ? '#54278F' :
                d > 2549   ? '#756BB1' :
                d > 1295   ? '#9E9AC8' :
                d > 395    ? '#CBC9E2' :
                             '#F2F0F7' ;
    }

    //fill color for geojson based on the feature
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.POPDEN2010),
            weight: 1,
            opacity: .9,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
        };
    }

var geojson = L.geoJson(njMuni, {style: style}).addTo(map);

//highlight feature on mouseover
function highlightFeature(e) {
    var layer= e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.6
    });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

//mousout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

//zoom to feature on click of municipality
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//listen for the functions so that on these actions it highlights, zooms etc.
function onEachFeature(feature,layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function onEachFeature(feature,layer) { 
    {
        var PopupText = [];
        PopupText.push("<b>Municipality: </b>" + feature.properties.NAME);
        PopupText.push("<b><br>Population per square mile: </b>" + feature.properties.POPDEN2010)
        layer.bindPopup("<p>" + PopupText.join("") + "</p>");
    }
}

//add these features to the map
geojson = L.geoJson(njMuni, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);




