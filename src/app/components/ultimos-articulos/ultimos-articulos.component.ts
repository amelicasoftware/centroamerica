import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServicioHomeService } from '../../services/servicio-home.service';



@Component({
  selector: 'app-ultimos-articulos',
  templateUrl: './ultimos-articulos.component.html',
  styleUrls: ['./ultimos-articulos.component.css']
})
export class UltimosArticulosComponent implements OnInit {

  articulos: any[] = [];
  revistas: any[] = [];

  constructor(private homeService: ServicioHomeService) {
    this.homeService.getUltimosArticulos().subscribe(data => {
      console.log(data);
      this.articulos = data;
    });

    this.homeService.getRevistas().subscribe( revistas => {
      console.log(revistas);
      this.revistas = revistas;
    });

  }

  ngOnInit(): void { }

}