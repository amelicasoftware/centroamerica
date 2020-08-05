import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginadorService {

  total: number;
  count = 1;
  pFinal = 1;
  posicion: number;
  reversa: boolean = false;
  campo: string = '';
  loading: boolean;
  area:string;
  @Output() cambioTotal: EventEmitter<any> = new EventEmitter();
  @Output() cambioFinal: EventEmitter<any> = new EventEmitter();
  @Output() cambioPosicion: EventEmitter<any> = new EventEmitter();
  @Output() cambioEstado: EventEmitter<any> = new EventEmitter();

  constructor() { }

  actualizarTotal(filtros: number, tipo: string) {
    this.total = filtros;
    this.cambioTotal.emit(this.total);
    console.log(this.total);
    this.calculaFinal(filtros, tipo);
  }


   cambioloading(loading:boolean){
     
     this.loading = loading
     this.cambioEstado.emit(this.loading)
   }


  actualizarFinal() {
    this.pFinal = this.total;
    this.cambioTotal.emit(this.pFinal);
  }

  actualizarPosicion(pagina: number) {
    this.posicion = pagina;
    this.cambioPosicion.emit(this.posicion);
  }

  calculaFinal(total: number, tipo: string) {
    if(tipo === 'revistas'){
      if (Number.isInteger((total / 12))) {
        this.pFinal = (total / 12);
      } else {
        this.pFinal = Math.floor(total / 12) + 1;
      }   
    }

    if(tipo === 'articulos'){
      if (Number.isInteger((total / 10))) {
        this.pFinal = (total / 10);
      } else {
        this.pFinal = Math.floor(total / 10) + 1;
      }     
    }
    this.cambioFinal.emit(this.pFinal);
  }
}

