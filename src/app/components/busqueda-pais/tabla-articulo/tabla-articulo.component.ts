import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { Total } from '../../../models/total';
import { FiltrosService } from '../../../services/filtros.service';
import { ServiosBusquedaService } from '../../../services/servios-busqueda.service';
import { PaginadorService } from '../../../services/paginador.service';

@Component({
  selector: 'app-tabla-articulo',
  templateUrl: './tabla-articulo.component.html',
  styleUrls: ['./tabla-articulo.component.css']
})

export class TablaArticuloComponent implements OnInit {

  @Input() cvePais: number;
  @Input() articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();

  imagenR = 'assets/img/des.png';
  imagenN = 'assets/img/des.png';

  constructor(private articulosService: ServiosBusquedaService,
              private filtrosArticulos: FiltrosService,
              private paginadorService: PaginadorService) { }

  ngOnInit(): void {
  }

  public reversa(campo: string, reversa: boolean){ 
    console.log(this.articulosService.getreversa());
    console.log(this.articulosService.getpalabraOrdenar());
    console.log(this.cvePais);
    this.paginadorService.reversa = reversa;
    this.paginadorService.campo = campo;
    this.articulosService.setpalabraOrdenar(campo);
    if(this.articulosService.getreversa()){
      // this.imagenNR = "assets/img/des.png";
      this.articulosService.setreversa(false);
      this.paginadorService.reversa = false;
    }else{
      // this.imagenNR = "assets/img/as.png";
      this.paginadorService.reversa = true;
      this.articulosService.setreversa(true);
    }
    let palabra = this.filtrosArticulos.palabra;
    this.articulosService.getArticulosXOrdenacion(campo, this.cvePais).subscribe((data: any) => {      
      this.articulos = data.articulos.articulos;
      this.filtrosArticulos.actualizarArticulos(data.articulos.articulos);
      this.filtrosArticulos.actualizarFiltros(data.filtros);
      console.log(this.articulos);
    });
    this.cambioIcono(campo);

  }

  cambioIcono(campo: string){
    if(campo === 'nombreRevista' && this.paginadorService.reversa){
      this.imagenR = "assets/img/as.png";
    }else if(campo === 'nombreRevista' && this.paginadorService.reversa === false){
      this.imagenR = "assets/img/des.png";
    }
    if(campo === 'anio' && this.paginadorService.reversa){
      this.imagenN = "assets/img/as.png";
    }else if(campo === 'anio' && this.paginadorService.reversa === false){
      this.imagenN = "assets/img/des.png";
    }
  }

}
