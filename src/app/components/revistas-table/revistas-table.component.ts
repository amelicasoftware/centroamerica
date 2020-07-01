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
  selector: 'app-revistas-table',
  templateUrl: './revistas-table.component.html',
  styleUrls: ['./revistas-table.component.css']
})
export class RevistasTableComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  imagenNR = 'assets/img/des.png';
  imagenMI = 'assets/img/des.png'; 
  palabra: string;
  totalResultados: number;
  pagAct: number;
  pagFinal: number;
  loading: boolean;
 
  revistasResultado: [] = [];
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true; }


  ngOnInit(): void {
    this.loading = false
    this.palabra = this._route.snapshot.paramMap.get('palabra');
    this.revistasService.setpalabra(this.palabra)
    console.log('$#$$$$$$$$$$$$$$$$$$$$$$$$$',this.palabra);
    this.filtrosRevistasService.actualizarPalabra(this.palabra)
    this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
      this.loading = true
      console.log(revistasDesdeApi);
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
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
    this.loading = false
    console.log(palabra);
    this.total.palabra = palabra;
    this.filtrosRevistasService.palabra = palabra;  
    this.filtrosRevistasService.actualizarPalabra(palabra)
    this.revistasService.setpalabra(palabra)
    this.revistasService.getBusquedaRevistas(palabra).subscribe((data: any) => {
      console.log(data);
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosRevistasService.actualizarGlobos(globos);
      this.filtrosRevistasService.filtrosElegidos = [];
      this.filtrosRevistasService.cadenaFitros = '';
      this.paginadorService.actualizarTotal(data.revistas.total, 'revistas');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = data.revistas.total;
      this.loading = true
    });
    this.paginadorService.reversa = false;
    this.filtrosRevistasService.actualizarPalabra(palabra);
  }
  posicion() {
    return this.paginadorService.posicion;
  }



  public reversa(campo: string, reversa: boolean) {
    console.log(this.revistasService.getreversa());
    console.log(this.revistasService.getpalabraOrdenar());
    console.log(this.filtrosRevistasService.palabra);
    this.paginadorService.reversa = reversa;
    this.paginadorService.campo = campo;
    this.revistasService.setpalabraOrdenar(campo);
    if (this.revistasService.getreversa()) {
      // this.imagenNR = "assets/img/des.png";
      this.revistasService.setreversa(false);
      this.paginadorService.reversa = false;
    } else {
      // this.imagenNR = "assets/img/as.png";
      this.paginadorService.reversa = true;
      this.revistasService.setreversa(true);
    }
    let palabra = this.filtrosRevistasService.palabra;
    this.revistasService.ordenarReversa(campo, palabra).subscribe((data: any) => {
      this.revistas = data.revistas.revistas;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      console.log(this.revistas);
    });
    this.cambioIcono(campo);
  }

  cambioIcono(campo: string) {
    if (campo === 'nombreRevista' && this.paginadorService.reversa) {
      this.imagenNR = "assets/img/as.png";
    } else if (campo === 'nombreRevista' && this.paginadorService.reversa === false) {
      this.imagenNR = "assets/img/des.png";
    }
    if (campo === 'nombreInstitucion' && this.paginadorService.reversa) {
      this.imagenMI = "assets/img/as.png";
    } else if (campo === 'nombreInstitucion' && this.paginadorService.reversa === false) {
      this.imagenMI = "assets/img/des.png";
    }
  }


 
}
