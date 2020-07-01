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
  selector: 'app-vista-tabla-articulos',
  templateUrl: './vista-tabla-articulos.component.html',
  styleUrls: ['./vista-tabla-articulos.component.css']
})
export class VistaTablaArticulosComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();
  total: Total = new Total();
  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';

  constructor(private articulosService: ServiosBusquedaService,
              private filtrosArticulos: FiltrosService,
              private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    let palabra = this.articulosService.getpalabra();
    // this.total.palabra = this.filtrosRevistasService.palabra;
    console.log('aqui leo la palabra2', this.total.palabra );
    this.articulosService.getBusquedaArticulos(palabra).subscribe((articulosApi: any) => {
      console.log(articulosApi.articulos.total);
      this.articulos = articulosApi.articulos.articulos;
      // this.total.total = revistasDesdeApi.revistas.total;
      this.filtrosArticulos.actualizarArticulos(articulosApi.articulos.articulos);
      this.filtrosArticulos.actualizarFiltros(articulosApi.filtros);
      this.paginadorService.actualizarTotal(articulosApi.articulos.total, 'articulos');
    });

    this.filtrosArticulos.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
    
    this.filtrosArticulos.cambioPalabra.subscribe(palabra => {
      console.log('cambioPalabra', palabra);
      this.total.palabra = palabra;
    });

    this.paginadorService.cambioTotal.subscribe( total =>{
      this.total.total = total;
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
