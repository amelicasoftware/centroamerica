import { Component, OnInit } from '@angular/core';
import { FiltrosService } from '../../../services/filtros.service';
import { ServiosBusquedaService } from '../../../services/servios-busqueda.service';
import { PaginadorService } from '../../../services/paginador.service';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';
import { RevistasService } from '../../../services/revistas.service';

@Component({
  selector: 'app-filtro-revista-pais',
  templateUrl: './filtro-revista-pais.component.html',
  styleUrls: ['./filtro-revista-pais.component.css']
})
export class FiltroRevistaPaisComponent implements OnInit {

  filtros: [] = [];
  estadoPositivo: boolean = false;
  nombreFiltroEstilo: string = '';
  boton: string = 'Ver más';

  constructor(private revistasService: RevistasService, private filtrosService: FiltrosService,
              private filtrosRevistasService: FiltrosRevistasService, private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.filtrosRevistasService.cambioFiltros.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.filtros = data2;
    });
  }

  agregarFiltro(clave: string, nombreFiltro: string, nombreElemento: string) {
    const elemento = {
      clave,
      nombre: nombreElemento,
      nombreFiltro,
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
    this.revistasService.getRevistasXPaisFiltro(cadenaDisciplina, cadenaInstitucion, cadenaPais, cadenaFuente,
                                                this.filtrosService.cvePais).subscribe((data: any) => {
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
    if(filtro.elementos.length > 5){
      return false;
    }else{
      return true;
    }
  }

}
