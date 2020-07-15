am4core.ready(function() {

	let url = "http://localhost:4200/";
	console.log('voy hacer la graficas44444');
	am4core.useTheme(am4themes_animated);

	// Create map instance
	var chart = am4core.create("chartdiv4", am4maps.MapChart);

	// Set map definition
	chart.geodata = am4geodata_worldLow;

	// Set projection
	chart.projection = new am4maps.projections.Miller();
	chart.seriesContainer.draggable = false;
	chart.seriesContainer.resizable = false;
	// Setting map's initial zoom
	chart.homeZoomLevel = 7
	chart.homeGeoPoint = {
	latitude: 14,
	longitude: -88
	};

	// Create map polygon series
	var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

	// Make map load polygon (like country names) data from GeoJSON
	polygonSeries.useGeodata = true;
	polygonSeries.nonScalingStroke = true;

	// Configure series
	var polygonTemplate = polygonSeries.mapPolygons.template;
	polygonTemplate.tooltipText = "{name}";
	polygonTemplate.fill = am4core.color("#1a1a1a");
	polygonTemplate.events.on("hit", function(ev) {
		var data = ev.target.dataItem.dataContext;
		console.log('voy a enviar' + data.id);
		window.location.href = `${url}/#/busquedarev/${data.id}`;
	  });

	// Create hover state and set alternative fill color
	var hs = polygonTemplate.states.create("hover");
	hs.properties.fill = am4core.color("#ffc200");

	// Remove Antarctica
	polygonSeries.exclude = ["AQ"];

	// Add some data
	polygonSeries.data = [{
	"id": "PA",
	"name": "Panama",
	"value": 100,
	"fill": am4core.color("#ffc200")
	}];

	// Bind "fill" property to "fill" key in data
	polygonTemplate.propertyFields.fill = "fill";

});


