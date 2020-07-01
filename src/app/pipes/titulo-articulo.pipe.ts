import { Pipe, PipeTransform } from '@angular/core';
import { indexOf } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Pipe({
  name: 'tituloArticulo'
})
export class TituloArticuloPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    // console.log(value);
    let datos = value.split('<<<');

    for(let i=0; i < datos.length; i++){
      if (datos[i] === 'es') {
          let titulo = datos[i + 1];
          return titulo;
      }if (datos[i] === 'en') {
          let titulo = datos[i + 1];
          return titulo;
      }if (datos[i] === 'pt') {
          let titulo = datos[i + 1];
          return titulo;
      }else{
        return datos[0];
      }
    }
    // if (datos.indexOf('es')) {
    //   let posicion = datos.indexOf('es');
    //   let titulo = datos[posicion + 1];
    //   return titulo;
    // }
    // if (datos.indexOf('en')) {
    //   let posicion = datos.indexOf('en');
    //   let titulo = datos[posicion + 1];
    //   return titulo;
    // }
    // if (datos.indexOf('pt')) {
    //   let posicion = datos.indexOf('pt');
    //   let titulo = datos[posicion + 1];
    //   return titulo;
    // } else {
    //   return datos[0];
    // }
    //console.log(datos);
    // return datos[1];
  }

}
