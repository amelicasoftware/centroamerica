import { Component, OnInit } from '@angular/core';
import { Revistas } from '../../models/revistas';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total'
import { RevistasService } from '../../services/revistas.service'
import { Router } from '@angular/router';
import { PaginadorService } from 'src/app/services/paginador.service';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css']
})

export class PaginadorComponent implements OnInit {
  revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  final: number;
  P = this.paginadorService.posicion;

  revistasResultado: [] = [];
  constructor(private RevistasInyectado: RevistasService, private Ruta: Router,
    private revistasService: RevistasService, private filtrosRevistasService: FiltrosRevistasService,
    private paginadorService: PaginadorService) { }

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
    this.paginadorService.cambioloading(false)
    console.log("estado debe ser false",  this.paginadorService.cambioloading(false) )
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, this.paginadorService.pFinal).
      subscribe((data: any) => {
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
        this.paginadorService.actualizarPosicion(this.paginadorService.pFinal);
        this.paginadorService.cambioloading(true)
      });
  }

  public primerPagina() {
    this.paginadorService.cambioloading(false)
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, 1).subscribe((data: any) => {
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.paginadorService.actualizarPosicion(1);
      this.paginadorService.cambioloading(true)
    });
  }


  public getCount() {
    return this.paginadorService.posicion;
  }

  public getFin() {
    return this.paginadorService.pFinal;
  }

  posicion() {
    return this.paginadorService.posicion;
  }

  public incCount() {
    this.paginadorService.cambioloading(false)
    console.log('siguiente');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion + 1);
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, this.paginadorService.posicion).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
        this.paginadorService.cambioloading(true)
      });
  }



  public incDCount() {
    this.paginadorService.cambioloading(false)
    console.log('anterior');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion - 1);
    this.revistasService.getBusquedaRevistasPaginador(this.revistasService.palabra, this.paginadorService.posicion).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
        this.paginadorService.cambioloading(true)
      });
  }

  public numerosPag(pagina: number, final: number) {
    this.paginadorService.cambioloading(false)
    this.paginadorService.actualizarPosicion(pagina);
    console.log(this.revistasService.palabra);
    this.revistasService.getBusquedaRevistasPaginador(this.filtrosRevistasService.palabra, pagina).subscribe((data: any) => {
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.paginadorService.cambioloading(true)
    });

  }


}
