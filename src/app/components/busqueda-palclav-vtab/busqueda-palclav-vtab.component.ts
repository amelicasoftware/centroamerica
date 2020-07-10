import { Component, OnInit } from '@angular/core';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
import { FiltrosService } from '../../services/filtros.service';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from '../../models/articulo';
@Component({
  selector: 'app-busqueda-palclav-vtab',
  templateUrl: './busqueda-palclav-vtab.component.html',
  styleUrls: ['./busqueda-palclav-vtab.component.css']
})
export class BusquedaPalclavVtabComponent implements OnInit {
  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';

  // filtros: FiltrosComponent = new FiltrosComponent(this.ArticuloInyectado, this);


  articulosResultado: [] = [];

  palabraBusqueda: string;
  totalResultados: number;
  palabra: string;
  pagAct: number;
  pagFinal: number;
  loading: boolean;
  constructor(private Ruta: Router,
    private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true;}

  ngOnInit(): void {
    this.loading = false
    this.palabra = this._route.snapshot.paramMap.get('palabra');
    this.articuloService.setpalabra(this.palabra)
    this.filtrosService.actualizarPalabra(this.palabra)
    this.articuloService.leerjsonPC().subscribe((articulosDesdeApi: any) => {
      this.loading = true
      console.log(articulosDesdeApi)
      console.log(articulosDesdeApi.articulos.total)     
      this.total.total = articulosDesdeApi.articulos.total;    
      this.filtrosService.actualizarArticulos(articulosDesdeApi.articulos.articulos);
      this.paginadorService.actualizarTotal(articulosDesdeApi.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.totalResultados = this.paginadorService.total;
    });

    this.paginadorService.cambioEstado.subscribe(estado => {
      console.log('ESTADO DEL LOADING *********************', estado);
      this.loading = estado
    });
    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.articulos = data2;
    });
    console.log("Coso Imprimiendo algo abr que es ", this.articuloService.getpalabra())
    this.total.palabra = this.articuloService.getpalabra();
    this.paginadorService.cambioTotal.subscribe(data2 => {
      this.totalResultados = data2;
    });
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
    console.log(palabra);
    this.total.palabra = palabra;
    this.filtrosService.palabra = palabra;
    this.filtrosService.actualizarPalabra(palabra)
    this.articuloService.setpalabra(palabra)
    this.articuloService.getBusquedaArticulosPalClav(palabra).subscribe((data: any) => {
      console.log(data);
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.filtrosService.actualizarFiltros(data.filtros);
      const globos = [];
      this.filtrosService.actualizarGlobos(globos);
      this.filtrosService.filtrosElegidos = [];
      this.filtrosService.cadenafiltros = '';
      this.paginadorService.actualizarTotal(data.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = data.articulos.total;
    });
    this.filtrosService.palabra = palabra;
    this.filtrosService.actualizarPalabra(palabra)
  }

  posicion() {
    return this.paginadorService.posicion;
  }

  limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }

  public reversa(campo: string, reversa: boolean) {
    console.log(this.articuloService.getreversa());
    console.log(this.articuloService.getpalabraOrdenar());
    console.log(this.filtrosService.palabra);
    this.paginadorService.reversa = reversa;
    this.paginadorService.campo = campo;
    this.articuloService.setpalabraOrdenar(campo);
    if (this.articuloService.getreversa()) {
      // this.imagenNR = "assets/img/des.png";
      this.articuloService.setreversa(false);
      this.paginadorService.reversa = false;
    } else {
      // this.imagenNR = "assets/img/as.png";
      this.paginadorService.reversa = true;
      this.articuloService.setreversa(true);
    }
    let palabra = this.filtrosService.palabra;
    this.articuloService.ordenarReversa(campo, palabra).subscribe((data: any) => {
      this.articulos = data.articulos.articulos;
      this.filtrosService.actualizarArticulos(data.articulos.articulos);
      this.filtrosService.actualizarFiltros(data.filtros);
      console.log(this.articulos);
    });
    this.cambioIcono(campo);

  }

  cambioIcono(campo: string) {
    if (campo === 'nombreRevista' && this.paginadorService.reversa) {
      this.imagenR = "assets/img/as.png";
    } else if (campo === 'nombreRevista' && this.paginadorService.reversa === false) {
      this.imagenR = "assets/img/des.png";
    }
    if (campo === 'anio' && this.paginadorService.reversa) {
      this.imagenN = "assets/img/as.png";
    } else if (campo === 'anio' && this.paginadorService.reversa === false) {
      this.imagenN = "assets/img/des.png";
    }
  }
}
