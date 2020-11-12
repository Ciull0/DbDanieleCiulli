import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit {

  constructor(
    private server:ServerService
  ) { }

  clienti = [];
  clienteSel;

  ngOnInit(): void {
    this.server.prendiClienti().then( (clienti:any) =>{
      this.clienti = clienti;
    });
  }

  form = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    data_nascita: new FormControl(''),
    indirizzo: new FormControl(''),
    carta_credito: new FormControl('')
  })

  formNoleggio = new FormGroup({
    id_auto: new FormControl(''),
    data_inizio: new FormControl(''),
    data_fine: new FormControl('')
  })

  guardaNoleggi(cliente){
    console.log(cliente);
    this.clienteSel=cliente;
  }

  aggiungiCliente(){
    this.server.aggiungiCliente(this.form.value);
    this.ngOnInit();
  }

}
