import { Component, OnInit } from '@angular/core';
import { ServiosBusquedaService } from '../../services/servios-busqueda.service';
import { RevistasService } from '../../services/revistas.service';
import { Revistas } from '../../models/revistas';
import { FiltrosRevistasService } from '../../services/filtros-revistas.service';
import { Total } from '../../models/total';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { PaginadorService } from '../../services/paginador.service';

@Component({
  selector: 'app-vista-tabla',
  templateUrl: './vista-tabla.component.html',
  styleUrls: ['./vista-tabla.component.css']
})

export class VistaTablaComponent implements OnInit {

  revistas: Array<Revistas> = new Array<Revistas>();
  total: Total = new Total();
  imagenNR = 'assets/img/des.png';
  imagenMI = 'assets/img/des.png'; 

  constructor(private revistasService: RevistasService,
    private filtrosRevistasService: FiltrosRevistasService, private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    let palabra = this.revistasService.getpalabra();
    // this.total.palabra = this.filtrosRevistasService.palabra;
    console.log('aqui leo la palabra2', this.total.palabra);
    this.revistasService.getBusquedaRevistas(palabra).subscribe((revistasDesdeApi: any) => {
      console.log(revistasDesdeApi.revistas.total);
      this.revistas = revistasDesdeApi.revistas.revistas;
      // this.total.total = revistasDesdeApi.revistas.total;
      this.filtrosRevistasService.actualizarRevistas(revistasDesdeApi.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(revistasDesdeApi.filtros);
      this.paginadorService.actualizarTotal(revistasDesdeApi.revistas.total, 'revistas');
    });

    this.filtrosRevistasService.cambioRevistas.subscribe(data2 => {
      console.log('resutladosServicio', data2);
      this.revistas = data2;
    });

    this.filtrosRevistasService.cambioPalabra.subscribe(palabra => {
      console.log('cambioPalabra', palabra);
      this.total.palabra = palabra;
    });

    this.paginadorService.cambioTotal.subscribe(total => {
      this.total.total = total;
    });
  }

  public reversa(campo: string, reversa: boolean) {
    console.log(this.revistasService.getreversa());
    console.log(this.revistasService.getpalabraOrdenar());
    console.log(this.filtrosRevistasService.palabra);
    this.paginadorService.reversa = reversa;
    this.paginadorService.campo = campo;
    this.revistasService.setpalabraOrdenar(campo);
    if (this.revistasService.getreversa()) {
      // this.imagenNR = "assets/img/des.png";
      this.revistasService.setreversa(false);
      this.paginadorService.reversa = false;
    } else {
      // this.imagenNR = "assets/img/as.png";
      this.paginadorService.reversa = true;
      this.revistasService.setreversa(true);
    }
    let palabra = this.filtrosRevistasService.palabra;
    this.revistasService.ordenarReversa(campo, palabra).subscribe((data: any) => {
      this.revistas = data.revistas.revistas;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      console.log(this.revistas);
    });
    this.cambioIcono(campo);
  }

  cambioIcono(campo: string) {
    if (campo === 'nombreRevista' && this.paginadorService.reversa) {
      this.imagenNR = "assets/img/as.png";
    } else if (campo === 'nombreRevista' && this.paginadorService.reversa === false) {
      this.imagenNR = "assets/img/des.png";
    }
    if (campo === 'nombreInstitucion' && this.paginadorService.reversa) {
      this.imagenMI = "assets/img/as.png";
    } else if (campo === 'nombreInstitucion' && this.paginadorService.reversa === false) {
      this.imagenMI = "assets/img/des.png";
    }
  }
}