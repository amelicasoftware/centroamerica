import { Component, OnInit, Input} from '@angular/core';
import { Revistas } from '../../models/revistas';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total';
import { ActivatedRoute } from '@angular/router';
// import listaPaises from '../../../assets/js/json/paises.json';
import { RevistasService } from '../../services/revistas.service';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';

@Component({
  selector: 'app-busqueda-revista-pais',
  templateUrl: './busqueda-revista-pais.component.html',
  styleUrls: ['./busqueda-revista-pais.component.css']
})
export class BusquedaRevistaPaisComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total(); 
  cvePais: number;
    nombrePais: string;

  listaPaises: any;
  vista = true;

  imgLista = 'assets/img/lista.png';

  imgTabla = 'assets/img/tarjetas-act.png';
  totalResultados: number;

  constructor(private revistasService: RevistasService, private activatedRoute: ActivatedRoute,
              private filtrosRevistasService: FiltrosRevistasService, private paginadorService: PaginadorService,
              private filtroService: FiltrosService) {
                this.activatedRoute.params.subscribe( params =>{
                  this.cvePais = params['cvePais'];
                  console.log(this.cvePais);
                });
               } 

  ngOnInit(): void {
    this.revistasService.getRevistasXPais(this.cvePais).subscribe((revistasXPais: any) => {
      console.log(revistasXPais.revistas.total);
      console.log('estos son mis datos' , revistasXPais);
      this.total.total = revistasXPais.revistas.total;
      this.filtrosRevistasService.actualizarRevistas(revistasXPais.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasXPais.filtros);
      this.paginadorService.actualizarTotal(revistasXPais.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      this.nombrePais = revistasXPais.revistas.revistas[0].nombrePais;
      this.filtroService.actualizarPais(this.cvePais);
    });

    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('resutladosArticuloPais', data2);
      this.revistas = data2;
    });

    this.filtrosRevistasService.cambioPalabra.subscribe(data2 => {
      console.log('resutladosArticuloPais', data2);
      this.revistas = data2;
    });
    this.total.palabra = this.revistasService.getpalabra();

    this.revistasService.getPaises().subscribe( paises => {
      console.log('paises', paises);
      this.listaPaises = paises;
    });
    this.paginadorService.cambioTotal.subscribe(data => {
      console.log('pruebababb202', data);
      this.totalResultados = data;
    });
  }

  llenarCombo(pais){
    console.log(pais);
    this.cvePais = pais;
    this.revistasService.getRevistasXPais(this.cvePais).subscribe((revistasXPais: any) => {
      console.log(revistasXPais.revistas.total);
      console.log('estos son mis datos' , revistasXPais);
      this.total.total = revistasXPais.revistas.total;
      this.filtrosRevistasService.actualizarRevistas(revistasXPais.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasXPais.filtros);
      this.paginadorService.actualizarTotal(revistasXPais.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      this.nombrePais = revistasXPais.revistas.revistas[0].nombrePais;
      this.filtroService.actualizarPais(this.cvePais);
      const globos = [];
      this.filtrosRevistasService.actualizarGlobos(globos);
      this.filtrosRevistasService.filtrosElegidos = [];
      this.filtrosRevistasService.cadenaFitros = '';
      this.paginadorService.actualizarTotal(revistasXPais.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = revistasXPais.revistas.total;
    });
  }

  limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosRevistasService.filtrosElegidos = [];
    const globos = [];
    this.filtrosRevistasService.actualizarGlobos(globos);
  }

  cambioVista(estado: boolean){
    this.vista = estado;
    if(estado){
      this.imgLista = 'assets/img/lista.png';
      this.imgTabla = 'assets/img/tarjetas-act.png';
    }else{
      this.imgTabla = 'assets/img/tarjetas.png';
      this.imgLista = 'assets/img/lista-act.png';
    }
  }

}
