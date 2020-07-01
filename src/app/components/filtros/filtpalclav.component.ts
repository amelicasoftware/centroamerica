import { Component, OnInit } from '@angular/core';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';

@Component({
  selector: 'app-filtpalclav',
  templateUrl: './filtpalclav.component.html',
  styleUrls: ['./filtpalclav.component.css']
})
export class FiltpalclavComponent implements OnInit {

  filtros: [] = [];
  estadoPositivo: boolean = false;
  nombreFiltroEstilo: string = '';
  boton: string = 'Ver más';

  constructor(private articulosService: ServiosBusquedaService,
              private filtrosService: FiltrosService, private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.articulosService.leerjsonPC().subscribe((data: any) => {
      this.filtros = data.filtros;
    });

    this.filtrosService.cambioFiltros.subscribe(data2 => {
      // this.isOpen = isOpen;
      console.log('filtrosServicio', data2);
      this.filtros = data2;
      // this.activarFiltros = false;
    });
  }

  agregarFiltro(clave: string, nombreFiltro: string, nombreElemento: string) {
    const elemento = {
      clave: clave,
      nombre: nombreElemento,
      nombreFiltro: nombreFiltro,
      estado: false
    };
    if (this.filtrosService.filtrosElegidos.find(element => element.nombre === nombreElemento)) {
      let index = this.filtrosService.filtrosElegidos.findIndex(filtro => filtro.clave === elemento.clave);
      this.filtrosService.filtrosElegidos.splice(index, 1);
    } else {
      this.filtrosService.filtrosElegidos.push(elemento);
    }
    console.log(this.filtrosService.filtrosElegidos);

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
    if (this.filtrosService.filtrosElegidos.find(element => element.nombre === elemento.nombre)) {
      return true;
    }else{
      return false;
    }

  }

  applicarFiltros() {
    let cadenaAnio = this.filtrosService.construirCadena('Año');
    let cadenaPais = this.filtrosService.construirCadena('País');
    let cadenaDisciplina = this.filtrosService.construirCadena('Disciplina');
    let cadenaFuente = this.filtrosService.construirCadena('Fuente');
    let cadenaIdioma = this.filtrosService.construirCadena('Idioma');
    let palabra = this.filtrosService.palabra;
    console.log(palabra);
    this.articulosService.getBusquedaArtFiltroPalClav(palabra, cadenaAnio, cadenaPais, cadenaDisciplina, 
                                                      cadenaFuente, cadenaIdioma).subscribe((data: any) => {
        console.log('resultados', data);
        this.filtrosService.actualizarFiltros(data.filtros);
        console.log(this.filtrosService.filtros);
        this.filtrosService.actualizarGlobos(this.filtrosService.filtrosElegidos);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
        this.filtrosService.cambioEstado();
        this.paginadorService.actualizarTotal(data.articulos.total, 'articulos');
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
