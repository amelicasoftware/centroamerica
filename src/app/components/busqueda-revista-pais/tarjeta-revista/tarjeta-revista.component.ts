import { Component, OnInit, Input } from '@angular/core';
import { Revistas } from '../../../models/revistas';
import { Total } from '../../../models/total';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';

@Component({
  selector: 'app-tarjeta-revista',
  templateUrl: './tarjeta-revista.component.html',
  styleUrls: ['./tarjeta-revista.component.css']
})
export class TarjetaRevistaComponent implements OnInit {

  @Input() revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();

  constructor(private filtrosRevistasService: FiltrosRevistasService) { }

  ngOnInit(): void {
    this.filtrosRevistasService.cambioRevistas.subscribe( revistas =>{
      this.revistas = revistas;
    });
  }
}
