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
		var bounds = [[36, -124], [40, -120]];

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

		return map;
	}
})