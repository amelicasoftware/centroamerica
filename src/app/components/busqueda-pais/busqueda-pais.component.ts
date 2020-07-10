import { Component, OnInit, Input} from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total';
import { ActivatedRoute } from '@angular/router';
// import listaPaises from '../../../assets/js/json/paises.json';


@Component({
  selector: 'app-busqueda-pais',
  templateUrl: './busqueda-pais.component.html',
  styleUrls: ['./busqueda-pais.component.css']
})
export class BusquedaPaisComponent implements OnInit {

  articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();
  cvePais: number;
  // articulosResultado: [] = [];

  // palabraBusqueda: string;
  // totalResultados: number;
  nombrePais: string;

  listaPaises: any;
  vista = true;
  pagAct: number;
  pagFinal: number;
  loading: boolean;
  imgLista = 'assets/img/lista.png';
  // imgListaA = 'assets/img/lista-act.png';
  imgTabla = 'assets/img/tarjetas-act.png';
  // imgTablaA = 'assets/img/tarjetas-act.png';

  totalResultados: number;

  constructor(private ArticuloInyectado: ServiosBusquedaService, private activatedRoute: ActivatedRoute,
              private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
              private paginadorService: PaginadorService) {
                this.loading = true;
                this.activatedRoute.params.subscribe( params =>{
                  this.cvePais = params['cvePais'];
                  console.log(this.cvePais);
                });
               }

  ngOnInit(): void {
    this.loading = false;
    this.ArticuloInyectado.getArticulosXPais(this.cvePais).subscribe((articulosXPais: any) => {
      console.log(articulosXPais.articulos.total);
      console.log('estos son mis datos' , articulosXPais);
      this.loading = true;
      this.total.total = articulosXPais.articulos.total;
      this.filtrosService.actualizarArticulos(articulosXPais.articulos.articulos);
      this.filtrosService.actualizarFiltros(articulosXPais.filtros);
      this.paginadorService.actualizarTotal(articulosXPais.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.nombrePais = articulosXPais.articulos.articulos[0].pais;
      this.filtrosService.actualizarPais(this.cvePais);
    });
    this.paginadorService.cambioEstado.subscribe(estado => {
      console.log('ESTADO DEL LOADING *********************', estado);
      this.loading = estado
        });

    this.filtrosService.cambioArticulos.subscribe(data2 => {
      console.log('resutladosArticuloPais', data2);
      this.articulos = data2;
    });
    this.total.palabra = this.articuloService.getpalabra();

    this.articuloService.getPaises().subscribe( paises => {
      console.log('paises', paises);
      this.listaPaises = paises;
    });
    this.paginadorService.cambioTotal.subscribe(data => {
      console.log('pruebababb202', data);
      this.totalResultados = data;
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

  posicion() {
    return this.paginadorService.posicion;
  }


  limpiarDatos() {
    console.log('voy a limpiar');
    this.filtrosService.filtrosElegidos = [];
    const globos = [];
    this.filtrosService.actualizarGlobos(globos);
  }

  llenarCombo(pais){
    this.loading = false
    console.log(pais);
    this.cvePais = pais;
    this.articuloService.getArticulosXPais(this.cvePais).subscribe((articulosXPais: any) => {
      console.log(articulosXPais.articulos.total);
      console.log('estos son mis datos' , articulosXPais);
      this.total.total = articulosXPais.articulos.total;
      this.filtrosService.actualizarArticulos(articulosXPais.articulos.articulos);
      this.filtrosService.actualizarFiltros(articulosXPais.filtros);
      this.paginadorService.actualizarTotal(articulosXPais.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.nombrePais = articulosXPais.articulos.articulos[0].pais;
      this.filtrosService.actualizarPais(this.cvePais);
      const globos = [];
      this.filtrosService.actualizarGlobos(globos);
      this.filtrosService.filtrosElegidos = [];
      this.filtrosService.cadenafiltros = '';
      this.paginadorService.actualizarTotal(articulosXPais.articulos.total, 'articulos');
      this.paginadorService.actualizarPosicion(1);
      this.total.total = articulosXPais.articulos.total;
        this.loading = true
    });
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
