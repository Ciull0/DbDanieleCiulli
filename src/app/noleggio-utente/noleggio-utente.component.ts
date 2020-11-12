import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-noleggio-utente',
  templateUrl: './noleggio-utente.component.html',
  styleUrls: ['./noleggio-utente.component.css']
})
export class NoleggioUtenteComponent implements OnInit {
  [x: string]: any;

  constructor(
    private server: ServerService
  ) { }

  @Input() clienteSel;
  autoDisponibili = [];
  noleggiCliente=[];

  formNoleggio = new FormGroup({
    id_auto: new FormControl(''),
    data_inizio: new FormControl(''),
    data_fine: new FormControl('')
  })

  ngOnChanges(changes){
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.server.prendiNoleggiDiCliente(this.clienteSel).then( (noleggi:any) => {
      this.noleggiCliente = noleggi;
      for(let noleggio of this.noleggiCliente){
        noleggio.costo = this.calcolaCostoNoleggio(noleggio);
      }
      console.log(this.noleggiCliente);
    })
    this.server.prendiAutoDisponibili().then ( (auto:any) =>{
      this.autoDisponibili = auto;
    })
  }

  aggiungiNoleggio(){
    this.formNoleggio.value.id_cliente = this.clienteSel.id;
    this.server.aggiungiNoleggio(this.formNoleggio.value).then( () =>{
      this.ngOnInit();
    });
  }

  eliminaCliente(cliente){
    this.server.eliminaCliente(this.clienteSel);
  }

  calcolaCostoNoleggio(noleggio){
    let dInizio = new Date;
    let dFine = new Date;
    dInizio.setFullYear( noleggio.data_inizio.substring(0,4) );
    dInizio.setMonth(noleggio.data_inizio.substring(5,7));
    dInizio.setDate(noleggio.data_inizio.substring(8,10));
    
    dFine.setFullYear( noleggio.data_fine.substring(0,4) );
    dFine.setMonth(noleggio.data_fine.substring(5,7));
    dFine.setDate(noleggio.data_fine.substring(8,10));

    let giorniDiDifferenza =( dFine.getTime() - dInizio.getTime() )/(1000*60*60*24);
    
    let tmp = giorniDiDifferenza%30;
    let mesiDifferenza = (giorniDiDifferenza-tmp)/30;
    giorniDiDifferenza = tmp;
    tmp = tmp%7;
    let settimaneDiDIfferenza = Math.round((giorniDiDifferenza-tmp)/7);
    giorniDiDifferenza = giorniDiDifferenza - settimaneDiDIfferenza*7;

    let costoTotale = (mesiDifferenza*noleggio.prezzo_mensile) + (settimaneDiDIfferenza*noleggio.prezzo_settimanale) + (giorniDiDifferenza*noleggio.prezzo_giornaliero);
    return(costoTotale);
  }

  eliminaNoleggio(noleggio){
    this.server.eliminaNoleggio(noleggio).then( () =>{
      this.ngOnInit();
    })
  }
}
