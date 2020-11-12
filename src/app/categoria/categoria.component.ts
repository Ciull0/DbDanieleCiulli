import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorie = [];
  auto = [];
  categoriaSel;
  autoDiCategoria = [];
  constructor(
    private server: ServerService
  ) { }

  ngOnInit(): void {

    this.server.prendiCategorie().then( (result:any) => {
      this.categorie = result;
    });

  }

  selezionaCategoria(categoria){
    this.autoDiCategoria = [];
    this.categoriaSel = categoria;
    this.server.prendiAutoDiCategoria(this.categoriaSel).then( (auto:any)  =>{
      this.autoDiCategoria = auto;
    });
  }

  eliminaCategoria(categoria){
    this.categoriaSel = 0;
    this.server.deleteCategoria(categoria).then( () => {
      this.ngOnInit();
    })
  }

  eliminaAuto(auto){
    this.server.eliminaAuto(auto).then( () => {
      this.ngOnInit();
    })
  }
}
