import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {

  filtros: Array<any> = [];
  filtrosElegidos: Array<any> = [];
  resultadoArticulos: Array<any> = [];
  filtrosGlobos: Array<any> = [];
  palabra: string = '';
  area: string;
  cadenafiltros: string;

  cvePais: number;

  @Output() cambioFiltros: EventEmitter<any> = new EventEmitter();
  @Output() cambioArticulos: EventEmitter<any> = new EventEmitter();
  @Output() cambioGlobos: EventEmitter<any> = new EventEmitter();
  @Output() cambioPalabra: EventEmitter<any> = new EventEmitter();
  @Output() cambioPais: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  actualizarFiltros(filtros: []) {
    this.filtros = filtros;
    this.cambioFiltros.emit(this.filtros);
    console.log(this.filtros);
  }

  actualizarArticulos(artiuculos: []) {
    this.resultadoArticulos = artiuculos;
    this.cambioArticulos.emit(this.resultadoArticulos);
    console.log(this.resultadoArticulos);
  }

  actualizarGlobos(filtrosElegidos: any[]) {
    this.filtrosGlobos = filtrosElegidos;
    this.cambioGlobos.emit(this.filtrosGlobos);
    console.log(this.filtrosGlobos);
  }

  actualizarPais(cvePais: number) {
    this.cvePais = cvePais;
    this.cambioPais.emit(this.filtrosGlobos);
  }
  
  construirCadena(filtro: string): string {
    const arregloFiltros = [];
    let cadena = '';
    this.filtrosElegidos.forEach(element => {
      if (element.nombreFiltro === filtro) {
        arregloFiltros.push(element.clave);
      }
    });
    cadena = arregloFiltros.join('<<<');
    console.log(cadena);
    return cadena;
  }
  
  actualizarPalabra(palabra: string) {
    this.palabra = palabra;
    this.cambioPalabra.emit(this.palabra);
  }

  cambioEstado() {
    this.filtrosGlobos.forEach(element => {
      console.log(element.estado);
      element.estado = true;
      console.log(element.estado);
    });
  }


}