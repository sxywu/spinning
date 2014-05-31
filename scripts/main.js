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
    'app/render'
], function(
    $,
    _,
    Backbone,
    d3,
    topojson,
    Map,
    Render
) {
    map = Map();
    svg = d3.select(map.getPanes().overlayPane).append("svg");
    g = svg.append("g");
    render = Render().map(map);

    d3.json('data/CareFlty.shp.json', function(response) {
        points = topojson.feature(response, response.objects.CareFlty).features;
        render.points(points);
        g.call(render);
        
            // .attr('fill', 'red');
            // .attr('fill-opacity', function(d) {return (d.properties.FunctDay1 / 100)});
    })
});