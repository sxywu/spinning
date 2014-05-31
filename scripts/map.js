define([
	'jquery',
	'underscore',
	'backbone'
], function(
	$,
	_,
	Backbone
) {
	return function() {
		var bounds = [
		[39.5, -124.65],
        [39.5, -120.7],
        [36.1, -120.7],
        [36.1, -124.65]
        ];

		var map = L.map('map', {
				minZoom: 6,
				maxZoom: 15,
				scrollWheelZoom: false
				//zoomControl: false // added below
		});

		var terrain = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Esri, HERE, DeLorme, TomTom, USGS, NGA, USDA, EPA, NPS'
		}).addTo(map);

		map.fitBounds(bounds);

		map.on("viewreset", viewReset);
      	function viewReset() {
	        var topLeft = map.latLngToLayerPoint(new L.LatLng(bounds[0][0], bounds[0][1]));
	        var bottomRight = map.latLngToLayerPoint(new L.LatLng(bounds[2][0], bounds[2][1]));
	        svg.attr("width", bottomRight.x - topLeft.x)
	          .attr("height", bottomRight.y - topLeft.y)
	          .style("left", topLeft.x + "px")
	          .style("top", topLeft.y + "px");
	        g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

	        render.update();
	    }

		return map;
	}
})