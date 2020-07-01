import { Component, OnInit } from '@angular/core';
import { RevistasService } from '../../services/revistas.service';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { PaginadorService } from '../../services/paginador.service';

@Component({
  selector: 'app-filtros-revista',
  templateUrl: './filtros-revista.component.html',
  styleUrls: ['./filtros-revista.component.css']
})
export class FiltrosRevistaComponent implements OnInit {

  filtros: [] = [];
  estadoPositivo: boolean = false;
  nombreFiltroEstilo: string = '';
  boton: string = 'Ver más';

  constructor(private revistasInyectado: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
              private paginadorService: PaginadorService) { }
  ngOnInit(): void {
   this.revistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
       console.log(revistasDesdeApi)
       this.filtros = revistasDesdeApi.filtros;
       console.log(this.filtros)
    });
    this.filtrosRevistasService.cambioFiltros.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.filtros = data2;
    });
  }

  agregarFiltro(clave: string, nombreFiltro: string, nombreElemento: string) {
    const elemento = {
      clave: clave,
      nombre: nombreElemento,
      nombreFiltro: nombreFiltro,
      estado: false
    };
    if (this.filtrosRevistasService.filtrosElegidos.find(element => element.nombre === nombreElemento)) {
      let index = this.filtrosRevistasService.filtrosElegidos.findIndex(filtro => filtro.clave === elemento.clave);
      this.filtrosRevistasService.filtrosElegidos.splice(index, 1);
    } else {
      this.filtrosRevistasService.filtrosElegidos.push(elemento);
    }
    console.log(this.filtrosRevistasService.filtrosElegidos);

  }

  mostrarElementos(filtro) {
    console.log(filtro);
    if (!filtro.hasOwnProperty('estado')) {
      Object.defineProperty(filtro, 'estado', {
        value: false,
        writable: true
      });
    }
    console.log(filtro.estado);
    if (filtro.estado) {
      Object.defineProperty(filtro, 'estado', {
        value: false
      });
    } else {
      Object.defineProperty(filtro, 'estado', {
        value: true
      });
    }

    // if(this.nombreFiltroEstilo === 'otraclaseD'){
    //   this.nombreFiltroEstilo = '';
    //   this.estadoPositivo = false;
    // }else if(this.nombreFiltroEstilo === 'otraclaseP'){
    //   this.nombreFiltroEstilo = '';
    // }else if(this.nombreFiltroEstilo === 'otraclaseI'){
    //   this.nombreFiltroEstilo = '';
    // }else if(this.nombreFiltroEstilo === 'otraclaseF'){
    //   this.nombreFiltroEstilo = '';
    // }else{
    //   this.nombreFiltroEstilo = 'otraclase' + nombre.charAt(0);
    //   this.estadoPositivo = true;
    //   console.log(this.nombreFiltroEstilo);
    // }
    // this.prueba();
  }

  prueba() {
    let estilo = '';
    estilo = this.nombreFiltroEstilo;
    return estilo;
  }

  activarFiltros(elemento, nombre: string) {
    // console.log(elemento);
    if (this.filtrosRevistasService.filtrosElegidos.find(element => element.nombre === elemento.nombre)) {
      return true;
    }else{
      return false;
    }

  }

  applicarFiltros() {
    let cadenaDisciplina = this.filtrosRevistasService.construirCadena('Disciplina');
    let cadenaInstitucion = this.filtrosRevistasService.construirCadena('Institución');
    let cadenaPais = this.filtrosRevistasService.construirCadena('País');
    let cadenaFuente = this.filtrosRevistasService.construirCadena('Fuente');
    let palabra = this.filtrosRevistasService.palabra;
    this.revistasInyectado.getBusquedaRevistaFiltro(palabra, cadenaDisciplina, cadenaInstitucion, cadenaPais,
      cadenaFuente).subscribe((data: any) => {
        console.log('resultados', data);
        this.filtrosRevistasService.actualizarFiltros(data.filtros);
        console.log(this.filtrosRevistasService.filtros);
        this.filtrosRevistasService.actualizarGlobos(this.filtrosRevistasService.filtrosElegidos);
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
        this.filtrosRevistasService.cambioEstado();
        this.paginadorService.actualizarTotal(data.revistas.total, 'revistas');
        this.paginadorService.actualizarPosicion(1);
      });

  }

  mostrarBoton(filtro){
    // console.log('tamaño filtro', filtro);
    if(filtro.elementos.length > 5){
      // console.log(true);
      return false;
    }else{
      // console.log(false);
      return true;
    }
  }

}
