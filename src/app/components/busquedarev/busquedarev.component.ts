import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../models/revistas';
import { Usuario } from '../../models/usuario';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total';
import { RevistasService } from '../../services/revistas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { number } from '@amcharts/amcharts4/core';
import { PaginadorService } from '../../services/paginador.service';

@Component({
  selector: 'app-busquedarev',
  templateUrl: './busquedarev.component.html',
  styleUrls: ['./busquedarev.component.css']
})
export class BusquedarevComponent implements OnInit {
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
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true; }


  ngOnInit(): void {
    this.loading = false
    this.palabra = this._route.snapshot.paramMap.get('palabra');
    if(this.palabra === 'allRev'){
      this.filtrosRevistasService.allRevistas = true;
    }
    this.revistasService.setpalabra(this.palabra)
    this.filtrosRevistasService.actualizarPalabra(this.palabra)
    this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
      this.loading = true
      console.log(revistasDesdeApi);
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      //this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);    
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasDesdeApi.filtros);
      this.total.total = revistasDesdeApi.revistas.total;
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
      this.filtrosRevistasService.allRevistas = true;
    }else{
      this.filtrosRevistasService.allRevistas = false;
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