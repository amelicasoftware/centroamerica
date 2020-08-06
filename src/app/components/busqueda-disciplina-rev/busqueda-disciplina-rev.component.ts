import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../models/revistas';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total';
import { RevistasService } from '../../services/revistas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginadorService } from '../../services/paginador.service';


@Component({
  selector: 'app-busqueda-disciplina-rev',
  templateUrl: './busqueda-disciplina-rev.component.html',
  styleUrls: ['./busqueda-disciplina-rev.component.css']
})


export class BusquedaDisciplinaRevComponent implements OnInit {

  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  totalResultados: number;
  pagAct: number;
  pagFinal: number;
  loading: boolean;
  palabra: string;
  todoRevitas: boolean;
  revistasResultado: [] = [];
  area: string;
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true; }


  ngOnInit(): void {
    this.loading = false  
    this.revistasService.setpalabra(this._route.snapshot.paramMap.get('area'))
    this.revistasService.setNumA(this._route.snapshot.paramMap.get('area'));
    this.filtrosRevistasService.actualizarPalabra(this.revistasService.getNumA());
    this.revistasService.getAreas().subscribe((revistasDesdeApi: any) => {      
      this.total.total = revistasDesdeApi.revistas.total;      
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasDesdeApi.filtros);
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = revistasDesdeApi.revistas.total;
      this.loading = true
    });
    this.paginadorService.cambioEstado.subscribe(estado => {
      console.log('ESTADO DEL LOADING *********************', estado);
      this.loading = estado
    });
    this.total.palabra = this.revistasService.getpalabra();
    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.revistas = data2;
    });
    this.paginadorService.cambioTotal.subscribe(data => {
      console.log('pruebababb202', data);
      this.totalResultados = data;
    });
    this.total.palabra = this.revistasService.getpalabra();
    this.paginadorService.cambioTotal.subscribe(data => {
      this.totalResultados = data;
    });
    this.total.palabra = this.revistasService.getpalabra()
    this.paginadorService.cambioPosicion.subscribe(data2 => {
      console.log('RESULTADO CAMBIO POS PAG ACT', data2);
      this.pagAct = data2;
    });
    this.paginadorService.cambioFinal.subscribe(data2 => {
      console.log('RESULTADO CAMBIO POS pagFinal', data2);
      this.pagFinal = data2;
    });
  }


  buscar(palabra: string) {
    if(this.palabra === 'allRev'){
      this.filtrosRevistasService.allRevistas = false;
    }else{
      this.filtrosRevistasService.allRevistas = true;
    }
    this.loading = false
    this.total.palabra = palabra;
    console.log(palabra);
    this.filtrosRevistasService.palabra = palabra;
    this.filtrosRevistasService.actualizarPalabra(palabra)
    this.revistasService.setpalabra(palabra)
    this.revistasService.getBusquedaRevistas(palabra).subscribe((data: any) => {      
      this.total.total = data.revistas.total;
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      this.filtrosRevistasService.filtrosElegidos = [];
      this.filtrosRevistasService.palabra = palabra;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      const globos = [];
      this.filtrosRevistasService.actualizarGlobos(globos);
      this.filtrosRevistasService.cadenaFitros = '';
      this.paginadorService.actualizarTotal(data.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);  
      this.loading = true
    });
    this.filtrosRevistasService.palabra = palabra;
    this.filtrosRevistasService.actualizarPalabra(palabra)

    
  }
  posicion() {
    return this.paginadorService.posicion;
  }

  allRevistas(){
    
  }

}