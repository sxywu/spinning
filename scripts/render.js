define([
	'jquery',
	'underscore',
	'backbone',
	'd3'
], function(
	$,
	_,
	Backbone,
	d3
) {
	var map,
		points,
		spinner,
		radius = 6,
		projector = function(coords) {
            var point = map.latLngToLayerPoint(new L.LatLng(coords[1], coords[0]));
            return [point.x, point.y];
        };

	var pie = d3.layout.pie().sort(null)

	var color = d3.scale.category10()
	color = function(d){
	  return d ? '#2ecc71' : '#e74c3c'
	}

	var arc = d3.svg.arc()
	  .innerRadius(radius / 2)
	  .outerRadius(radius)

	var Render = function(selection) {
		spinner = selection.selectAll('.highway')
            .data(points).enter().append('svg')
            .style({
            	left: function(d) { var x = projector(d.geometry.coordinates)[0] - radius; return x; },
                top: function(d) { var y = projector(d.geometry.coordinates)[1] - radius; return y; }
            })
            .attr({width: radius * 2, height: radius * 2 })
		    .style('-webkit-transform-origin', radius + 'px ' + radius + 'px')

        // spinner.append('circle')
        //     .classed('highway', true)
        //     .attr({
        //         cx: radius,
        //         cy: radius,
        //         r: radius,
	       //      fill: function(d) {return (d.properties.FunctDay1 > 50 ? 'green' : 'red')},
	       //      stroke: function(d) {return (d.properties.FunctDay1 > 50 ? 'green' : 'red')},
	       //      // 'fill-opacity': function(d) {return (d.properties.FunctDay1 % 50) / 50}

        //     });

		circle = spinner.append('circle')
			.attr('cx', radius)
			.attr('cy', radius)
			.attr('r', radius)
			.style('display', 'none');

		var paths = spinner.append('g')
		    .selectAll('path').data(function(d){
		      return pie([Math.random(), Math.random()])
		    })
		      .enter().append('path')
		        .attr('d', arc)
		        .style('fill', function(d, i){ return color(i) })
		        .style('stroke', '#fff');
		  paths.attr('transform', 'translate(' + [ radius, radius] + ')')

		

        spinner.call(loop);

	}

	Render.update = function(g) {
		spinner.transition().duration(500)
			.style({
            	left: function(d) { var x = projector(d.geometry.coordinates)[0] - radius; return x; },
                top: function(d) { var y = projector(d.geometry.coordinates)[1] - radius; return y; }
            })
	}

	function loop(sel) {
	    sel.style('-webkit-transform', 'rotate(' + 0 + 'deg)')
	      .transition().duration(function(){
	        return Math.random() * 200 + 500
	      }).ease(easeAccelerateThenCoast(1.1))
	      .style('-webkit-transform', 'rotate(' + 3600 + 'deg)')
	      .each('end', function(d){
	      	var fill = color(Math.random() > (d.properties.FunctDay1 / 100));
	        d3.select(this)
	        	.select('circle')
	        	.style('display', 'block')
	        	.style('fill', fill);
	        // .selectAll('path').style('fill', fill)
	        // 	.style('stroke', 'none');
	      })
	}

	// originally from: http://www.nytimes.com/newsgraphics/2014/senate-model/
	function easeAccelerateThenCoast(acceleration) {
	  if (acceleration < 1) throw new Error("impossible");
	  if (!isFinite(acceleration)) return d3.ease("linear");
	  var speed = 2 * (acceleration - Math.sqrt((acceleration - 1) * acceleration)),
	      t0 = speed / 2 / acceleration;
	  return function(t) {
	    return t < t0 ? acceleration * t * t : speed * t - speed + 1;
	  };
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