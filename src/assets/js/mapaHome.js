am4core.ready(function() {

	let url = "http://amelica.org/centroamerica/";
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
		console.log('voy a enviar' + data.cvePais);
		if(data.cvePais != undefined){
			window.location.href = `${url}/#/busquedaPais/${data.cvePais}`;
		}		
	  });

	// Create hover state and set alternative fill color
	var hs = polygonTemplate.states.create("hover");
	hs.properties.fill = am4core.color("#ffc200");

	// Remove Antarctica
	polygonSeries.exclude = ["AQ"];

	// Add some data
	polygonSeries.data = [{
		"id": "PA",
		"cvePais": 79,
		"name": "Panama",
		"value": 9,
		"fill": "#ffc200"
		},
		{
		"id": "CR",
		"cvePais": 33,
		"name": "Costa Rica",
		"value": 4,
		"fill": "#ffc200"
		},
		{
		"id": "NI",
		"cvePais": 76,
		"name": "Nicaragua",
		"value": 3,
		"fill": "#ffc200"
		},
		{
		"id": "CU",
		"cvePais": 35,
		"name": "Cuba",
		"value": 3,
		"fill": "#ffc200"
		},
		{
		"id": "HN",
		"cvePais": 57,
		"name": "Honduras",
		"value": 2,
		"fill": "#ffc200"
		},
		{
		"id": "SV",
		"cvePais": 39,
		"name": "El Salvador",
		"value": 1,
		"fill": "#ffc200"
		},
		{
		"id": "GT",
		"cvePais": 52,
		"name": "Guatemala",
		"value": 1,
		"fill": "#ffc200"
		}];

	// Bind "fill" property to "fill" key in data
	polygonTemplate.propertyFields.fill = "fill";

});


