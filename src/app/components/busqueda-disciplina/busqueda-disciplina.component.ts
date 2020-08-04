import { Component, OnInit } from '@angular/core';

import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FiltrosComponent } from '../filtros/filtros.component';
import { FiltrosService } from '../../services/filtros.service';
import { PaginadorService } from '../../services/paginador.service';
import { Total } from '../../models/total'
@Component({
  selector: 'app-busqueda-disciplina',
  templateUrl: './busqueda-disciplina.component.html',
  styleUrls: ['./busqueda-disciplina.component.css']
})
export class BusquedaDisciplinaComponent implements OnInit {
  
  articulosResultado: [] = [];
  palabraBusqueda: string;
  totalResultados: number;
  palabra: string;
  loading: boolean;
  pagAct: number;
  pagFinal: number;
  constructor(private ArticuloInyectado: ServiosBusquedaService, private Ruta: Router,
    private articuloService: ServiosBusquedaService, private filtrosService: FiltrosService,
    private paginadorService: PaginadorService, private _route: ActivatedRoute) { this.loading = true; }

  ngOnInit(): void {
  }

}
