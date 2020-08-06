import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
@Component({
  selector: 'app-busqueda-disciplina',
  templateUrl: './busqueda-disciplina.component.html',
  styleUrls: ['./busqueda-disciplina.component.css']
})
export class BusquedaDisciplinaComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  area: string;
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
    this.articuloService.setpalabra(this._route.snapshot.paramMap.get('area'))
    console.log("PARAMETRO DEBE SER TOTAL.PALABRA", this.total.palabra)
    this.ArticuloInyectado.setNumA(this._route.snapshot.paramMap.get('area'));
    this.filtrosService.actualizarPalabra(this.articuloService.getNumA());
    this.ArticuloInyectado.getAreas().subscribe((articulosDesdeApi: any) => {
        this.total.total = articulosDesdeApi.articulos.total;
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.filtrosService.actualizarFiltros(articulosDesdeApi.filtros);
      this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.totalResultados = this.paginadorService.total;
      this.loading = true


    });
    this.paginadorService.cambioEstado.subscribe(estado => {
      console.log('ESTADO DEL LOADING *********************', estado);
      this.loading = estado
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

  posicion() {
    return this.paginadorService.posicion;
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
      console.log('que estoy consumiendo*********************', this.articuloService.getBusquedaArticulos(palabra));
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



  limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }

}
