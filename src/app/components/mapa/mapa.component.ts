import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import * as am4charts from "@amcharts/amcharts4/charts";
import { GlobalConstants } from '../../common/global-constants';


import { get } from 'scriptjs';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  url: string = GlobalConstants.url;

  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) { }

  ngOnInit(): void {

    get(`${this.url}assets/js/mapaHome.js`, () => {

    });

    console.log(`${this.url}assets/js/mapaHome.js`);

    // let chart = am4core.create('chartdiv', am4maps.MapChart);
    // let title = chart.titles.create();
    // title.text = "";
    // title.textAlign = "middle";

    // // Set map definition
    // chart.geodata = am4geodata_worldLow;

    // // Set projection
    // chart.projection = new am4maps.projections.Miller();
    // chart.maxZoomLevel = 1;
    // chart.seriesContainer.draggable = false;
    // chart.seriesContainer.resizable = false;
    // chart.seriesContainer.events.disableType('doublehit');
    // chart.chartContainer.background.events.disableType('doublehit');

    // // Create map polygon series
    // // let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // // polygonSeries.exclude = ['AQ'];
    // // polygonSeries.useGeodata = true;
    // // polygonSeries.nonScalingStroke = true;
    // // polygonSeries.strokeWidth = 0.5;

    // // Configure series
    // // let polygonTemplate = polygonSeries.mapPolygons.template;
    // // polygonTemplate.tooltipText = "{name}";
    // // polygonTemplate.fill = am4core.color('#4762b2');
    
    // var polygonSeries2 = chart.series.push(new am4maps.MapPolygonSeries());
    // polygonSeries2.geodataSource.url = 'assets/js/json/mundo.geojson';
    // polygonSeries2.dataSource.parser = new am4core.JSONParser();

    // let polygonTemplate2 = polygonSeries2.mapPolygons.template;
    // polygonTemplate2.fill = am4core.color('red');

    // let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    // imageSeries.dataFields.value = 'value';
    // imageSeries.fill = am4core.color('#74B266');
    // imageSeries.tooltip.label.interactionsEnabled = true;
    // imageSeries.tooltip.keepTargetHover = true;
    // imageSeries.dataSource.url = 'assets/js/json/paisesAncestral.json';
    // imageSeries.dataSource.parser = new am4core.JSONParser();
    // imageSeries.dataSource.parser.options.numberFields = ['latitude', 'longitude'];

    // let imageTemplate = imageSeries.mapImages.template;
    // imageTemplate.propertyFields.latitude = 'latitude';
    // imageTemplate.propertyFields.longitude = 'longitude';
    // imageTemplate.nonScaling = true;
    // imageTemplate.tooltipHTML = '<a href="pais.oa?id={clave}" style="color:#000000; text-decoration:none;" target="_blank">{name}</a>';
    // imageTemplate.fill = am4core.color('white');

    // let circle = imageTemplate.createChild(am4core.Circle);
    // circle.fillOpacity = 0.7;
    // circle.propertyFields.fill = 'color';
    // circle.tooltipText = '{name}';
    // circle.urlTarget = 'top';
    // circle.url = '#';

    // imageSeries.heatRules.push({
    //   "target": circle,
    //   "property": 'radius',
    //   "min": 5,
    //   "max": 15,
    //   "dataField": 'value'
    // });


    // am4core.ready(function() {

    //   console.log('voy hacer la graficas');
    //   am4core.useTheme(am4themes_animated);
    //   Themes end
    
    //   Create map instance
    //   var chart = am4core.create("chartdiv2", am4maps.MapChart);
    
    //   var title = chart.titles.create();
    //   title.text = "";
    //   title.textAlign = "middle";
    
    //   Set map definition
    //   chart.geodata = am4geodata_worldLow;
    
    //   Set projection
    //   chart.projection = new am4maps.projections.Miller();
    //   chart.maxZoomLevel = 1;
    //   chart.seriesContainer.draggable = false;
    //   chart.seriesContainer.resizable = false;
    //   chart.seriesContainer.events.disableType("doublehit");
    //   chart.chartContainer.background.events.disableType("doublehit");
    
    //   Create map polygon series
    //   var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    //   polygonSeries.exclude = ["AQ"];
    //   polygonSeries.useGeodata = true;
    //   polygonSeries.nonScalingStroke = true;
    //   polygonSeries.strokeWidth = 0.5;
      
    //   Configure series
    //   var polygonTemplate = polygonSeries.mapPolygons.template;
    //   polygonTemplate.tooltipText = "{name}";
    //   polygonTemplate.fill = am4core.color("#4762b2");
      
    //   var polygonSeries2 = chart.series.push(new am4maps.MapPolygonSeries());
    //   polygonSeries2.geodataSource.url = 'assets/js/json/mundo.geojson';
    //   polygonSeries2.dataSource.parser = new am4core.JSONParser();
  
    //   let polygonTemplate2 = polygonSeries2.mapPolygons.template;
    //   polygonTemplate2.fill = am4core.color('red');

    //   var imageSeries = chart.series.push(new am4maps.MapImageSeries());
    //   imageSeries.dataFields.value = "value";
    //   imageSeries.fill = am4core.color("#74B266");
    
    //   var imageTemplate = imageSeries.mapImages.template;
    //   imageTemplate.propertyFields.latitude = "latitude";
    //   imageTemplate.propertyFields.longitude = "longitude";
    //   imageTemplate.nonScaling = true
    //   imageTemplate.tooltipHTML = '<a href="pais.oa?id={clave}" style="color:#000000; text-decoration:none;" target="_blank">{name}</a>';
    //   imageTemplate.fill = am4core.color("white");
    
    //   imageSeries.tooltip.label.interactionsEnabled = true;
    //   imageSeries.tooltip.keepTargetHover = true;
    
    //   var circle = imageTemplate.createChild(am4core.Circle);
    //   circle.fillOpacity = 0.7;
    //   circle.propertyFields.fill = "color";
    //   circle.tooltipText = "{name}";
    //   circle.urlTarget="top";
    //   circle.url="#";
    
    //   imageSeries.dataSource.url = "http://148.215.2.20:8080/CAncestral-0.0.1-SNAPSHOT/js/paises.json";
    //   imageSeries.dataSource.parser = new am4core.JSONParser();
    
    //   imageSeries.heatRules.push({
    //     "target": circle,
    //     "property": "radius",
    //     "min": 5,
    //     "max": 15,
    //     "dataField": "value"
    //   })
    
    // });

  }

}
