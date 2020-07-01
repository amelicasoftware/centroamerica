import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
import { from } from 'rxjs';
import { number, string } from '@amcharts/amcharts4/core';




@Component({
  selector: 'app-busqueda-pal-clav',
  templateUrl: './busqueda-pal-clav.component.html',
  styleUrls: ['./busqueda-pal-clav.component.css']
})
export class BusquedaPalClavComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';
  loading: boolean;

  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];

  palabraBusqueda: string;
  totalResultados: number;
  fuente: string;
  pagAct: number;
  pagFinal: number;

  constructor(private Ruta: Router,
    private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true; }

  ngOnInit(): void {
    this.loading = false
    this.fuente = this._route.snapshot.paramMap.get('fuente');
    this.articuloService.setpalabra(this.fuente)
    this.filtrosService.actualizarPalabra(this.fuente)
    this.articuloService.leerjsonPC().subscribe((articulosDesdeApi: any) => {
      this.loading = true
      console.log(articulosDesdeApi)
      console.log(articulosDesdeApi.articulos.total)
      this.total.total = articulosDesdeApi.articulos.total;
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.totalResultados = this.paginadorService.total;
    });


    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });

    this.total.palabra = this.articuloService.getpalabra()
    this.paginadorService.cambioTotal.subscribe(data => {
      this.totalResultados = data;
    });
    this.total.palabra = this.articuloService.getpalabra()
    this.paginadorService.cambioPosicion.subscribe(data2 => {
      console.log('RESULTADO CAMBIO POS PAG ACT', data2);
      this.pagAct = data2;
    });
    this.paginadorService.cambioFinal.subscribe(data2 => {
      console.log('RESULTADO CAMBIO POS pagFinal', data2);
      this.pagFinal = data2;
    });
  }


  buscar(palabra: string) {
    console.log(palabra);
    this.loading = false
    this.total.palabra = palabra;
    this.filtrosService.palabra = palabra;
    this.filtrosService.actualizarPalabra(palabra)
    this.articuloService.setpalabra(palabra)
    this.articuloService.getBusquedaArticulosPalClav(palabra).subscribe((data: any) => {
      this.loading = true
      console.log(data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.filtrosService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosService.actualizarGlobos(globos);
      this.filtrosService.filtrosElegidos = [];
      this.filtrosService.cadenafiltros = '';
      this.paginadorService.actualizarTotal(data.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = data.articulos.total;
    });
    this.filtrosService.palabra = palabra;
    this.filtrosService.actualizarPalabra(palabra)
  }

  posicion() {
    return this.paginadorService.posicion;
  }




  limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }

}