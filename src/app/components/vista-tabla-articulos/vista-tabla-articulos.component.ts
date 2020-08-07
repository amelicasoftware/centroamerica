import { Component, OnInit } from '@angular/core';
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
  selector: 'app-vista-tabla-articulos',
  templateUrl: './vista-tabla-articulos.component.html',
  styleUrls: ['./vista-tabla-articulos.component.css']
})
export class VistaTablaArticulosComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();
  total: Total = new Total();
  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';
  loading: boolean;
  pagAct: number;
  pagFinal: number;
  totalResultados: number;
  constructor(private articulosService: ServiosBusquedaService,
              private filtrosArticulos: FiltrosService,
              private paginadorService: PaginadorService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.articulosService.setpalabra(this._route.snapshot.paramMap.get('palabra'))
    console.log("PARAMETRO DEBE SER TOTAL.PALABRA", this.total.palabra)
    this.articulosService.setNumA(this._route.snapshot.paramMap.get('palabra'));
    this.filtrosArticulos.actualizarPalabra(this.articulosService.getNumA());
    this.articulosService.leerjson().subscribe((articulosApi: any) => {
      console.log(articulosApi.articulos.total);
      this.articulos = articulosApi.articulos.articulos;
      // this.total.total = revistasDesdeApi.revistas.total;
      this.filtrosArticulos.actualizarArticulos(articulosApi.articulos.articulos);
      this.filtrosArticulos.actualizarFiltros(articulosApi.filtros);
      this.paginadorService.actualizarTotal(articulosApi.articulos.total, 'articulos');
      this.totalResultados = this.paginadorService.total;
    });

    this.paginadorService.cambioEstado.subscribe(estado => {
      console.log('ESTADO DEL LOADING *********************', estado);
      this.loading = estado
    });
    this.filtrosArticulos.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
    this.total.palabra = this.articulosService.getpalabra();
    this.paginadorService.cambioTotal.subscribe(data => {
      this.totalResultados = data;
    });
    this.total.palabra = this.articulosService.getpalabra()
    this.paginadorService.cambioPosicion.subscribe(data2 => {
      console.log('RESULTADO CAMBIO POS PAG ACT', data2);
      this.pagAct = data2;
    });
    this.paginadorService.cambioFinal.subscribe(data2 => {
      console.log('RESULTADO CAMBIO POS pagFinal', data2);
      this.pagFinal = data2;
    });

  }

  public reversa(campo: string, reversa: boolean){ 
    console.log(this.articulosService.getreversa());
    console.log(this.articulosService.getpalabraOrdenar());
    console.log(this.filtrosArticulos.palabra);
    this.paginadorService.reversa = reversa;
    this.paginadorService.campo = campo;
    this.articulosService.setpalabraOrdenar(campo);
    if(this.articulosService.getreversa()){
      // this.imagenNR = "assets/img/des.png";
      this.articulosService.setreversa(false);
      this.paginadorService.reversa = false;
    }else{
      // this.imagenNR = "assets/img/as.png";
      this.paginadorService.reversa = true;
      this.articulosService.setreversa(true);
    }
    let palabra = this.filtrosArticulos.palabra;
    this.articulosService.ordenarReversa(campo, palabra).subscribe((data: any) => {
      this.articulos = data.articulos.articulos;
      this.filtrosArticulos.actualizarArticulos(data.articulos.articulos);
      this.filtrosArticulos.actualizarFiltros(data.filtros);
      console.log(this.articulos);
    });
    this.cambioIcono(campo);

  }

  cambioIcono(campo: string){
    if(campo === 'nombreRevista' && this.paginadorService.reversa){
      this.imagenR = "assets/img/as.png";
    }else if(campo === 'nombreRevista' && this.paginadorService.reversa === false){
      this.imagenR = "assets/img/des.png";
    }
    if(campo === 'anio' && this.paginadorService.reversa){
      this.imagenN = "assets/img/as.png";
    }else if(campo === 'anio' && this.paginadorService.reversa === false){
      this.imagenN = "assets/img/des.png";
    }
  }

}
