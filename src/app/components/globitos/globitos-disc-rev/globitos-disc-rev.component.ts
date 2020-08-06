import { Component, OnInit } from '@angular/core';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';
import { RevistasService } from '../../../services/revistas.service';
import { PaginadorService } from '../../../services/paginador.service';

@Component({
  selector: 'app-globitos-disc-rev',
  templateUrl: './globitos-disc-rev.component.html',
  styleUrls: ['./globitos-disc-rev.component.css']
})
export class GlobitosDiscRevComponent implements OnInit {

 
  filtroGlobitos: [] = [];

  constructor( private filtrosRevistasService: FiltrosRevistasService, private revistasService: RevistasService, 
               private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.filtrosRevistasService.cambioGlobos.subscribe(data2 => {
      console.log('filtrosGlobos', data2);
      this.filtroGlobitos = data2;
    });
  }

  borrarFiltro(globo){
    console.log(globo);
    if( this.filtrosRevistasService.filtrosElegidos.find( globo => globo.nombre = globo.nombre)){
      let index = this.filtrosRevistasService.filtrosElegidos.findIndex(filtro => filtro.clave === globo.clave);
      this.filtrosRevistasService.filtrosElegidos.splice(index, 1);
    }
    let cadenaDisciplina = this.filtrosRevistasService.construirCadena('Disciplina');
    let cadenaInstitucion = this.filtrosRevistasService.construirCadena('Institución');
    let cadenaPais = this.filtrosRevistasService.construirCadena('País');
    let cadenaFuente = this.filtrosRevistasService.construirCadena('Fuente');
    let palabra = this.filtrosRevistasService.palabra;
    console.log(palabra);
    this.revistasService.getBusquedaRevistaFiltroDisc(palabra, cadenaDisciplina, cadenaInstitucion, cadenaPais,
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
}
