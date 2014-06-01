require.config({
    baseUrl: "scripts/contrib/",
    paths: {
        "app": "..",
        "underscore": "underscore",
        "backbone": "backbone",
        "bootstrap": "bootstrap",
        "d3": "d3",
        'topojson': 'topojson.v1.min'
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
        },
        'topojson': {
            exports: 'topojson'
        }
    }
});

require([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    'topojson',
    'app/map',
    'app/renderCircle',
    'app/renderPath'
], function(
    $,
    _,
    Backbone,
    d3,
    topojson,
    Map,
    RenderCircle,
    RenderPath
) {
    map = Map();
    // svg = d3.select(map.getPanes().overlayPane).append("svg");
    // g = svg.append("g");
    renderCircle = RenderCircle().map(map);
    renderPath = RenderPath().map(map);

    var container = d3.select(map.getPanes().overlayPane).append('div');


    d3.json('data/CareFlty.shp.json', function(response) {
        points = topojson.feature(response, response.objects.CareFlty).features;
        renderCircle.points(points);
        container.call(renderCircle);
    })
    d3.json('data/EmergencyCtr.shp.json', function(response) {
        points = topojson.feature(response, response.objects.EmergencyCtr).features;
        renderCircle.points(points);
        container.call(renderCircle);
            // .attr('fill', 'red');
            // .attr('fill-opacity', function(d) {return (d.properties.FunctDay1 / 100)});
    })
    // d3.json('data/HighwaySegment.shp.json', function(response) {
    //     points = topojson.feature(response, response.objects.HighwaySegment).features;
    //     renderPath.points(points);
    //     container.call(renderPath);
    //         // .attr('fill', 'red');
    //         // .attr('fill-opacity', function(d) {return (d.properties.FunctDay1 / 100)});
    // })

});