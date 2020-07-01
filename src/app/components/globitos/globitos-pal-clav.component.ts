import { Component, OnInit } from '@angular/core';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosService } from '../../services/filtros.service';
import { threadId } from 'worker_threads';
import { PaginadorService } from '../../services/paginador.service';
@Component({
  selector: 'app-globitos-pal-clav',
  templateUrl: './globitos-pal-clav.component.html',
  styleUrls: ['./globitos-pal-clav.component.css']
})
export class GlobitosPalClavComponent implements OnInit {

  filtroGlobitos: [] = [];
  mostrarFiltros: boolean;

  constructor(private filtrosService: FiltrosService, private serviosBusquedaService: ServiosBusquedaService,
              private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    console.log('globitos');
    this.filtrosService.cambioGlobos.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.filtroGlobitos = data2;
    });
  }

  borrarFiltro(globo){
    console.log('borrar', globo);
    console.log(this.filtrosService.filtrosElegidos.findIndex(filtro => filtro.clave === globo.clave));
    if ( this.filtrosService.filtrosElegidos.find( globo => globo.nombre = globo.nombre)){
      let index = this.filtrosService.filtrosElegidos.findIndex(filtro => filtro.clave === globo.clave);
      this.filtrosService.filtrosElegidos.splice(index, 1);
    }
    let cadenaAnio = this.filtrosService.construirCadena('Año');
    let cadenaPais = this.filtrosService.construirCadena('País');
    let cadenaDisciplina = this.filtrosService.construirCadena('Disciplina');
    let cadenaFuente = this.filtrosService.construirCadena('Fuente');
    let cadenaIdioma = this.filtrosService.construirCadena('Idioma');
    let palabra = this.filtrosService.palabra;
    this.serviosBusquedaService.getBusquedaArtFiltroPalClav(palabra, cadenaAnio, cadenaPais, cadenaDisciplina, 
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

}
