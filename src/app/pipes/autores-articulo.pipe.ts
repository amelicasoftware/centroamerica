import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autoresArticulo'
})
export class AutoresArticuloPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const autores = value.split('<<<');
    let autores2;
    for (let i = 0 ; i < autores.length; i++) {
    //  console.log(autores[i]);
     if(i === 0){
      autores2 = autores[i];
     }else if (i === (autores.length - 1)){
      autores2 = autores2 + autores[i] + '.';
     }
     else{
      autores2 = autores2 + ', ' + autores[i];
     }
    }
    return autores2;
  }

}
