import { Component, OnInit, Input } from '@angular/core';
import { Revistas } from '../../../models/revistas';
import { Total } from '../../../models/total';
import { FiltrosRevistasService } from '../../../services/filtros-revistas.service';
import { PaginadorService } from '../../../services/paginador.service';
import { RevistasService } from '../../../services/revistas.service';

@Component({
  selector: 'app-tabla-revista',
  templateUrl: './tabla-revista.component.html',
  styleUrls: ['./tabla-revista.component.css']
}) 
export class TablaRevistaComponent implements OnInit {
  
  @Input() cvePais: number;
  @Input() revistas: Array<Revistas> = new Array<Revistas>();
  totales: Array<Total> = new Array<Total>();
  total: Total = new Total();

  imagenNR = 'assets/img/des.png';
  imagenMI = 'assets/img/des.png';

  constructor(private revistasService: RevistasService,
              private filtrosRevistasService: FiltrosRevistasService,
              private paginadorService: PaginadorService) { }

  ngOnInit(): void {
    this.filtrosRevistasService.cambioRevistas.subscribe( revistas =>{
      this.revistas = revistas;
    });
  }

  public reversa(campo: string, reversa: boolean){
    console.log(this.revistasService.getreversa());
    console.log(this.revistasService.getpalabraOrdenar());
    console.log(this.filtrosRevistasService.palabra);
    this.paginadorService.reversa = reversa;
    this.paginadorService.campo = campo;
    this.revistasService.setpalabraOrdenar(campo);
    if(this.revistasService.getreversa()){
      // this.imagenNR = "assets/img/des.png";
      this.revistasService.setreversa(false);
      this.paginadorService.reversa = false;
    }else{
      // this.imagenNR = "assets/img/as.png";
      this.paginadorService.reversa = true;
      this.revistasService.setreversa(true);
    }
    let palabra = this.filtrosRevistasService.palabra;
    this.revistasService.getRevistasXOrdenacion(campo, this.cvePais).subscribe((data: any) => {
      this.revistas = data.revistas.revistas;
      this.filtrosRevistasService.actualizarRevistas(data.revistas.revistas);
      this.filtrosRevistasService.actualizarFiltros(data.filtros);
      console.log(this.revistas);
    });
    this.cambioIcono(campo);
  }

  cambioIcono(campo: string){
    if(campo === 'nombreRevista' && this.paginadorService.reversa){
      this.imagenNR = "assets/img/as.png";
    }else if(campo === 'nombreRevista' && this.paginadorService.reversa === false){
      this.imagenNR = "assets/img/des.png";
    }
    if(campo === 'nombreInstitucion' && this.paginadorService.reversa){
      this.imagenMI = "assets/img/as.png";
    }else if(campo === 'nombreInstitucion' && this.paginadorService.reversa === false){
      this.imagenMI = "assets/img/des.png";
    }
  }

}
