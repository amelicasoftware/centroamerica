import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../../models/revistas';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';
import { Total } from '../../../models/total';
import { RevistasService } from '../../../services/revistas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginadorService } from '../../../services/paginador.service';


@Component({
  selector: 'app-busq-disciplinarev-tab',
  templateUrl: './busq-disciplinarev-tab.component.html',
  styleUrls: ['./busq-disciplinarev-tab.component.css']
})
export class BusqDisciplinarevTabComponent implements OnInit {
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
   
    this.revistasService.setpalabra(this._route.snapshot.paramMap.get('area'))
    this.revistasService.setNumA(this._route.snapshot.paramMap.get('area'));
    this.filtrosRevistasService.actualizarPalabra(this.revistasService.getNumA());
    this.revistasService.getAreas().subscribe((revistasDesdeApi: any) => {
      this.loading = true
      console.log(revistasDesdeApi);
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
