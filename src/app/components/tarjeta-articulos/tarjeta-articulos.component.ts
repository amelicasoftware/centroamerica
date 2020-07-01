import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
import { from } from 'rxjs';
import { number } from '@amcharts/amcharts4/core';
@Component({
  selector: 'app-tarjeta-articulos',
  templateUrl: './tarjeta-articulos.component.html',
  styleUrls: ['./tarjeta-articulos.component.css']
})
export class TarjetaArticulosComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();


  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];

  palabraBusqueda: string;
  totalResultados: number;

  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
              private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.ArticuloInyectado.leerjson().subscribe((articulosDesdeApi: any) => {
       console.log(articulosDesdeApi.articulos.total)     
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
    });
    

    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
     this.total.palabra = this.articuloService.getpalabra()
  }


  buscar(palabra: string) {
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
    });
    this.filtrosService.palabra = palabra;
  }
 
  limpiarDatos(){
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }
}

