require.config({
    baseUrl: "scripts/contrib/",
    paths: {
        "app": "..",
        "underscore": "underscore",
        "backbone": "backbone",
        "bootstrap": "bootstrap",
        "d3": "d3",
    },
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        bootstrap: {
            deps: ["jquery"]
        },
        "d3": {
            exports: "d3"
        }
    }
});

require([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    'app/map'
], function(
    $,
    _,
    Backbone,
    d3,
    map
) {
    var map = map();

    var svg = d3.select(map.getPanes().overlayPane).append("svg"),
        g = svg.append("g").attr("class", "leaflet-zoom-hide"),
        projector = function(x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            return [p.x, p.y];
        };

    d3.json('data/HighwayBridge.shp.json', function(response) {
        
    })
});