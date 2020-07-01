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
import { number } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['./busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();


  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];
  palabraBusqueda: string;
  totalResultados: number;
  palabra: string;
  loading: boolean;
  pagAct: number;
  pagFinal: number;
  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
    private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true; }

  ngOnInit(): void {
    this.loading = false    
    this.palabra = this._route.snapshot.paramMap.get('palabra');   
    this.articuloService.setpalabra(this.palabra)   
    this.filtrosService.actualizarPalabra(this.palabra)
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi: any) => {
      this.loading = true
      console.log(articulosDesdeApi.articulos.total);
      this.total.total = articulosDesdeApi.articulos.total;
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.filtrosService.actualizarFiltros(articulosDesdeApi.filtros);
      this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.totalResultados = this.paginadorService.total;
    });

    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
    this.total.palabra = this.articuloService.getpalabra();
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
    this.articuloService.getBusquedaArticulos(palabra).subscribe((data: any) => {
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
      this.loading = true
    });
    this.filtrosService.palabra = palabra;
    this.filtrosService.actualizarPalabra(palabra)

  }

  /////////////////////////////////////////////////////////////////////////////////////

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
