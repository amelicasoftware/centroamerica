import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrosRevistasService {

  filtros: Array<any> = []; 
  filtrosElegidos: Array<any> = [];
  resultadoRevistas: Array<any> = [];
  filtrosGlobos: Array<any> = [];
  palabra: string = '';
  cadenaFitros: string;
  allRevistas: boolean = false;

  @Output() cambioFiltros: EventEmitter<any> = new EventEmitter();
  @Output() cambioRevistas: EventEmitter<any> = new EventEmitter();
  @Output() cambioGlobos: EventEmitter<any> = new EventEmitter();
  @Output() cambioPalabra: EventEmitter<any> = new EventEmitter();


  constructor() { }

  actualizarFiltros(filtros: []) {
    this.filtros = filtros;
    this.cambioFiltros.emit(this.filtros);
    console.log(this.filtros);
  }

  actualizarRevistas(revistas: any[]) {
    this.resultadoRevistas = revistas;
    this.cambioRevistas.emit(this.resultadoRevistas);
    console.log(this.resultadoRevistas);
  }

  actualizarGlobos(filtrosElegidos: any[]) {
    this.filtrosGlobos = filtrosElegidos;
    this.cambioGlobos.emit(this.filtrosGlobos);
    console.log(this.filtrosGlobos);
  }

  actualizarPalabra(palabra: string) {
    this.palabra = palabra;
    this.cambioPalabra.emit(this.palabra);
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

  cambioEstado() {
    this.filtrosGlobos.forEach(element => {
      console.log(element.estado);
      element.estado = true;
      console.log(element.estado);
    });
  }
}
