import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total';

@Component({
  selector: 'app-paginador-articulos',
  templateUrl: './paginador-articulos.component.html',
  styleUrls: ['./paginador-articulos.component.css']
})
export class PaginadorArticulosComponent implements OnInit {

  final: number;
  total: Total = new Total();
  P = this.paginadorService.posicion;

  revistasResultado: [] = [];
  constructor(private Ruta: Router, private articulosService: ServiosBusquedaService,
    private filtrosService: FiltrosService, private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    //  console.log("##########################",this.articulosService.getpalabra())
    //inicializa la busqueda con el primer metodo del servicio LeerJson 
    // this.revistasService.leerjson().subscribe((revistasDesdeApi: any) => {
    //   console.log(revistasDesdeApi.revistas.total);
    // this.revistas = revistasDesdeApi.revistas.revistas;
    // this.total.total = revistasDesdeApi.revistas.total;
    // this.paginadorService.total = revistasDesdeApi.revistas.total;
    // console.log('total', this.total.total);
    // if (Number.isInteger((this.total.total / 12))) {
    //   this.total.final = (this.total.total / 12)
    // } else {
    //   this.total.final = Math.floor(this.total.total / 12) + 1
    // // }
    // this.paginadorService.calculaFinal(revistasDesdeApi.revistas.total);
    // this.paginadorService.posicion = 1;
    // console.log(this.revistas)
    // console.log(this.total)
    // this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
    // });
    // this.total.palabra = this.revistasService.getpalabra();
    // this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
    //   console.log('resutladosServicio', data2);
    //   this.revistas = data2;
    // });

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


    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, this.paginadorService.pFinal).
      subscribe((data: any) => {
        console.log(data);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
        this.paginadorService.actualizarPosicion(this.paginadorService.pFinal);
      });
  }

  public primerPagina() {
    console.log("Palabra recibida en el boton de primer palabra", this.articulosService.getpalabra())

    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, 1).subscribe((data: any) => {
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.paginadorService.actualizarPosicion(1);
      this.filtrosService.actualizarPalabra(this.articulosService.getpalabra());
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
    console.log('siguiente');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion + 1);
    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, this.paginadorService.posicion).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
      });
  }


  public incDCount() {
    console.log('anterior');
    this.paginadorService.actualizarPosicion(this.paginadorService.posicion - 1);
    this.articulosService.getBusquedaArticulosPaginador(this.articulosService.palabra, this.paginadorService.posicion).
      subscribe((data: any) => {
        console.log('paginador', data);
        this.filtrosService.actualizarArticulos(data.articulos.articulos);
      });
  }

  public numerosPag(pagina: number, final: number) {
    this.paginadorService.actualizarPosicion(pagina);
    this.filtrosService.actualizarPalabra(this.articulosService.getpalabra())
    this.articulosService.getBusquedaArticulosPaginador(this.filtrosService.palabra, pagina).subscribe((data: any) => {
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
    });

  }

}
