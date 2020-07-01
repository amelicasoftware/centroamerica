import { Component, NgZone, NgModule } from '@angular/core';
//graficas y mapa
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud';
//servicios 
import { ServicioHomeService } from '../../services/servicio-home.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../common/global-constants';
import "core-js";
import { get } from 'scriptjs';
import { Router } from '@angular/router';



am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private chart: am4charts.XYChart;

  articulosF: any[] = [];

  url: string = GlobalConstants.serviciosURL;
  url2: string = GlobalConstants.url;
  numerosHome: any;

  constructor(private zone: NgZone, private service: ServicioHomeService, private router: Router) {
  }

  title = 'ConocimientoAncestral';

  ngOnInit(){

    get(`${this.url2}assets/js/home.js`, () => {
    });
    get(`${this.url2}assets/js/red.js`, () => {
    });

    this.service.getNumeros().subscribe( numeros => {
      this.numerosHome = numeros;
      console.log(this.numerosHome);
      console.log(this.numerosHome[0].Paises);
      console.log(this.numerosHome[1].Revistas);
      console.log(this.numerosHome[2].Articulos);
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart2 = am4core.create("wordCloud", am4plugins_wordCloud.WordCloud);
      chart2.fontFamily = "Courier New";
      let series = chart2.series.push(new am4plugins_wordCloud.WordCloudSeries());
      series.randomness = 0.1;
      series.rotationThreshold = 0.5;
      series.dataSource.url = 'assets/js/json/palabrasAncestral.json';

      series.dataFields.word = "word";
      series.dataFields.value = "weight";

      series.heatRules.push({
        "target": series.labels.template,
        "property": "fill",
        "min": am4core.color("#4d4d4d"),
        "max": am4core.color("#4d4d4d"),
        "dataField": "value"
      });

      series.labels.template.url = `${this.url2}#/busqueda-pal-clav/{word}`;
      series.labels.template.urlTarget = "_self";
      console.log("############"+`${this.url}{word}`);

      let subtitle2 = chart2.titles.create();
      subtitle2.text = "";

      let title2 = chart2.titles.create();
      title2.text = "";
      title2.fontSize = 20;
      title2.fontWeight = "800";

    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  buscarTexto(palabra: string) {
    console.log('seleccionaste:',palabra);
    this.router.navigate( ['/busquedaGeneral', palabra] );
  }

}