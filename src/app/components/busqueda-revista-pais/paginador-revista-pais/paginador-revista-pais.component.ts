import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiosBusquedaService } from '../../../services/servios-busqueda.service';
import { FiltrosService } from '../../../services/filtros.service';
import { PaginadorService } from '../../../services/paginador.service';
import { Total } from '../../../models/total';
import { RevistasService } from '../../../services/revistas.service';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';

@Component({
  selector: 'app-paginador-revista-pais',
  templateUrl: './paginador-revista-pais.component.html',
  styleUrls: ['./paginador-revista-pais.component.css']
})
export class PaginadorRevistaPaisComponent implements OnInit {

  final: number;
  total: Total = new Total();
  P = this.paginadorService.posicion;

  revistasResultado: [] = [];
  constructor(private Ruta: Router, private revistasService: RevistasService, private filtrosService: FiltrosService,
              private filtrosRevistasService: FiltrosRevistasService, private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.paginadorService.cambioFinal.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.final = data2;
    });

    this.paginadorService.cambioPosicion.subscribe(data2 => {
      console.log('filtrosServicio', data2);
      this.P = data2;
    });

  }

  public posicionActual() {
    let posicion = this.paginadorService.posicion;
    console.log(posicion);
  }

  public ultimapagina(ultimapagina: number) {
    this.revistasService.getBusquedaRevistasPaginadorPais(this.paginadorService.pFinal, this.filtrosService.cvePais).
      subscribe((data: any) => {
        console.log(data);
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
        this.paginadorService.actualizarPosicion(this.paginadorService.pFinal);
      });
  }

  public primerPagina() {
    this.revistasService.getBusquedaRevistasPaginadorPais(1, this.filtrosService.cvePais).subscribe((data: any) => {
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.paginadorService.actualizarPosicion(1);
    });

  }


  public getCount() {
    // console.log('pagina', this.paginadorService.posicion);
    return this.paginadorService.posicion;
  }



  public getFin() {
    // this.total.pos = this.revistasService.count
    // console.log('paginaFinal', this.paginadorService.pFinal);
    return this.paginadorService.pFinal;
  }

  posicion() {
    return this.paginadorService.posicion;
  }

  public incCount() {
    console.log('siguiente');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion + 1);
    this.revistasService.getBusquedaRevistasPaginadorPais(this.paginadorService.posicion, this.filtrosService.cvePais).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      });
  }

  public incDCount() {
    console.log('anterior');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion - 1);
    this.revistasService.getBusquedaRevistasPaginadorPais(this.paginadorService.posicion, this.filtrosService.cvePais).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      });
  }

  public numerosPag(pagina: number, final: number) {

    //   if (pagina === final) {
    //     this.revistasService.setfin(0)
    //   } else {
    //     this.revistasService.setfin(1)
    //   }
    //   this.revistasService.setcount(pagina)
    //   this.RevistasInyectado.leerjson().subscribe((revistasDesdeApi: any) => {
    //     this.revistas = revistasDesdeApi.revistas.revistas;
    //   });
    //   this.total.pos = this.revistasService.count
    // }

    this.paginadorService.actualizarPosicion(pagina);
    // this.filtrosService.actualizarPalabra(this.articulosService.getpalabra());
    this.revistasService.getBusquedaRevistasPaginadorPais(pagina, this.filtrosService.cvePais).subscribe((data: any) => {
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
    });

  }
}
