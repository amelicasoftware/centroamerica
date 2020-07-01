am4core.ready(function() {

	// let url = "http://localhost:4200/";
	// let url = "http://localhost:8080/";
	let url = "http://amelica.org/ConocimientoAncestral/";
	console.log('voy hacer la graficas44444');
	am4core.useTheme(am4themes_animated);
	// Themes end

	// Create map instance
	var chart = am4core.create("chartdiv4", am4maps.MapChart);

	var title = chart.titles.create();
	title.text = "";
	title.textAlign = "middle";

	// Set map definition
	chart.geodata = am4geodata_worldLow;

	// Set projection
	chart.projection = new am4maps.projections.Miller();
	chart.maxZoomLevel = 1;
	chart.seriesContainer.draggable = false;
	chart.seriesContainer.resizable = false;
	chart.seriesContainer.events.disableType("doublehit");
	chart.chartContainer.background.events.disableType("doublehit");

	// Create map polygon series
	var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
	polygonSeries.exclude = ["AQ"];
	polygonSeries.useGeodata = true;
	polygonSeries.nonScalingStroke = true;
	polygonSeries.strokeWidth = 0.5;
	
	// Configure series
	var polygonTemplate = polygonSeries.mapPolygons.template;
	//polygonTemplate.tooltipText = "{name}";
	polygonTemplate.fill = am4core.color("#4762b2");
	
	var imageSeries = chart.series.push(new am4maps.MapImageSeries());
	imageSeries.dataFields.value = "value";
	imageSeries.fill = am4core.color("#74B266");

	var imageTemplate = imageSeries.mapImages.template;
	imageTemplate.propertyFields.latitude = "latitude";
	imageTemplate.propertyFields.longitude = "longitude";
	imageTemplate.nonScaling = true
	// imageTemplate.tooltipHTML = '<a href="http://localhost:4200/#/busquedaPais/{clave}" style="color:#000000; text-decoration:none;" target="_blank">{name}</a>';
	imageTemplate.fill = am4core.color("white");

	imageSeries.tooltip.label.interactionsEnabled = true;
	imageSeries.tooltip.keepTargetHover = true;

	var circle = imageTemplate.createChild(am4core.Circle);
	circle.fillOpacity = 0.7;
	circle.propertyFields.fill = "color";
	circle.tooltipText = "{name}";
	circle.urlTarget="_blank";
	circle.url=url + "#/busquedaPais/{clave}";

	// imageSeries.dataSource.url = "../assets/js/json/paises.json";//local
	imageSeries.dataSource.url = url + "assets/js/json/paises.json";//produccion
	imageSeries.dataSource.parser = new am4core.JSONParser();

	imageSeries.heatRules.push({
	  "target": circle,
	  "property": "radius",
	  "min": 5,
	  "max": 15,
	  "dataField": "value"
	})

});


