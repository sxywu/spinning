define([
	'jquery',
	'underscore',
	'backbone'
], function(
	$,
	_,
	Backbone
) {
	var map,
		points,
		highways,
		projector = function(coords) {
            var point = map.latLngToLayerPoint(new L.LatLng(coords[1], coords[0]));
            return [point.x, point.y];
        };

	var Render = function(selection) {
		highways = selection.selectAll('.highway')
            .data(points).enter().append('circle')
            .classed('highway', true)
            .attr({
                cx: function(d) { var x = projector(d.geometry.coordinates)[0]; return x; },
                cy: function(d) { var y = projector(d.geometry.coordinates)[1]; return y; },
                r: 4,
	            fill: function(d) {return (d.properties.FunctDay1 > 50 ? 'green' : 'red')},
	            stroke: function(d) {return (d.properties.FunctDay1 > 50 ? 'green' : 'red')},
	            // 'fill-opacity': function(d) {return (d.properties.FunctDay1 % 50) / 50}

            });
	}

	Render.update = function(g) {
		highways.transition().duration(500)
			.attr({
				cx: function(d) { var x = projector(d.geometry.coordinates)[0]; return x; },
	            cy: function(d) { var y = projector(d.geometry.coordinates)[1]; return y; },
	            r: 4
			})
	}

	Render.points = function(value) {
		points = value;
		return Render;
	}

	Render.map = function(value) {
		map = value;
		return Render;
	}

	return function() {
		return Render;
	}
})