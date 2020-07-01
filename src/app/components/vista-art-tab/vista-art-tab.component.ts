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
  selector: 'app-vista-art-tab',
  templateUrl: './vista-art-tab.component.html',
  styleUrls: ['./vista-art-tab.component.css']
})
export class VistaArtTABComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();


  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];
  loading: boolean;
  palabraBusqueda: string;
  totalResultados: number;
  pagAct: number;
  pagFinal: number;
  palabra: string;

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
      console.log(articulosDesdeApi.articulos.total)
      this.total.total = articulosDesdeApi.articulos.total;
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
    });


    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
    this.total.palabra = this.articuloService.getpalabra()
    this.paginadorService.cambioTotal.subscribe(data2 => {
      this.totalResultados = data2;
    });
    
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
    this.loading = false
    console.log(palabra);
    this.total.palabra = palabra;
    this.filtrosService.palabra = palabra;
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
  }

   limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }
  posicion() {
    return this.paginadorService.posicion;
  }

}
