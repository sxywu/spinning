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
        [38.39118617958438, -122.94525146484375],
        [38.39118617958438, -119.56146240234375],
        [36.82907321372808, -119.56146240234375],
        [36.82907321372808, -122.94525146484375]
        ]

		var map = L.map('map', {
				minZoom: 6,
				maxZoom: 15,
				scrollWheelZoom: false
				//zoomControl: false // added below
		});

		var markers = L.layerGroup().addTo(map);

		var terrain = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Esri, HERE, DeLorme, TomTom, USGS, NGA, USDA, EPA, NPS'
		}).addTo(map);

		map.fitBounds(bounds);

		map.on("viewreset", viewReset);
      	function viewReset() {
	        // var topLeft = map.latLngToLayerPoint(new L.LatLng(bounds[0][0], bounds[0][1]));
	        // var bottomRight = map.latLngToLayerPoint(new L.LatLng(bounds[2][0], bounds[2][1]));
	        // svg.attr("width", bottomRight.x - topLeft.x)
	        //   .attr("height", bottomRight.y - topLeft.y)
	        //   .style("left", topLeft.x + "px")
	        //   .style("top", topLeft.y + "px");
	        // g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

	        renderCircle.update();
	    }


	  /*
		 * get lat, lon for user-entered address 
		 */
		function geocode(address) {
			var apikey = 'Fmjtd%7Cluur2d6anq%2Cb0%3Do5-9absua',
				url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + apikey;
			
			$.ajax({
				url: url,
				data: {
					location: address
				},
				dataType: 'json'
			}).done(function(data) {
				var location = {
					latlng: data.results[0].locations[0].latLng,
					address: address
				};
				showOnMap(location);
			}).fail(function(data) {
				console.log(data);
			});
		}
		/*
		 * show user address on map 
		 */
		function showOnMap(location) {
			var marker,
				lat = location.latlng.lat,
				lon = location.latlng.lng;
			
			markers.clearLayers();
			map.setView([lat, lon], 12);
			marker = L.marker([lat, lon]).bindPopup(location.address).openPopup();
			markers.addLayer(marker);
		}
		return {
			geocode: geocode,
			map: map
		};

	};
});
