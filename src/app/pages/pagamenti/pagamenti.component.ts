import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamenti',
  standalone: false,

  templateUrl: './pagamenti.component.html',
  styleUrl: './pagamenti.component.scss'
})
export class PagamentiComponent {

  selectedAmount: number = 0;
  concorsoName: string = 'concorsoAirali';
  sezione: string = '';
  numeroComponimenti : number = 0;
  ragione: string = '';

  onSelectAmount(amount: number, tipo:string) {
    this.selectedAmount = amount;
    if(tipo === 'singolo-poesia') {
      this.sezione = 'POESIA';
      this.numeroComponimenti = 1;
      this.ragione = 'CONCORSO_POESIA';
  }
  else if(tipo === 'tre-poesia') {
    this.sezione = 'POESIA';
    this.numeroComponimenti = 3;
    this.ragione = 'CONCORSO_POESIA';
  }
  else {
    this.sezione = 'FOTOGRAFIA';
    this.numeroComponimenti = 3;
    this.ragione = 'CONCORSO_FOTOGRAFIA';
  }
}

}
