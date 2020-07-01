import { Component, OnInit, Input } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { Total } from '../../../models/total';
import { FiltrosService } from '../../../services/filtros.service';


@Component({
  selector: 'app-tarjeta-articulo',
  templateUrl: './tarjeta-articulo.component.html',
  styleUrls: ['./tarjeta-articulo.component.css']
})
export class TarjetaArticuloComponent implements OnInit {

  @Input() articulos: Array<Articulo> = new Array<Articulo>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();

  constructor(private filtrosService: FiltrosService) { }

  ngOnInit(): void {
    this.filtrosService.cambioArticulos.subscribe( articulos =>{
      this.articulos = articulos;
    });
  }

}
