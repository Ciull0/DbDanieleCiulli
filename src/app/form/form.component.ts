import { TmplAstBoundAttribute } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(private server: ServerService) { }

  bottone = "Aggiungi";

  @Input() catSelezionata;
  ngOnInit(): void {
    if(this.catSelezionata){
      this.bottone = "Modifica";
    }
  }
  form = new FormGroup({
    descrizione: new FormControl(''),
    prezzo_giornaliero: new FormControl(''),
    prezzo_settimanale: new FormControl(''),
    prezzo_mensile: new FormControl('')
  })

  aggiungiCategoria(){
    if(this.catSelezionata){
      this.server.aggiornaCategoria(this.form.value,this.catSelezionata.id);
    }
    else{
      this.server.aggiungiCategoria(this.form.value);
    }
  }
}
