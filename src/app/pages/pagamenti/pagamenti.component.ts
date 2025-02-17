import { Component } from '@angular/core';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';
import { iPagamentoResponse } from '../../interfaces/i-pagamento-response';

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
  pagamentoPoesie: iPagamentoResponse[] = [];
  pagamentoFoto: iPagamentoResponse[] = [];
  poesieBlocco: boolean = false;
  fotoBlocco: boolean = false;

  constructor(private pagamentiService: PagamentiSvcService){}

  ngOnInit() {


       this.pagamentiService.pagamentiSubject$.subscribe(data => {
            if (data) {
              this.pagamentoPoesie = data.filter((pagamento: iPagamentoResponse) => pagamento.ragione_pagamento === 'CONCORSO_POESIA');
              this.pagamentoFoto = data.filter((pagamento: iPagamentoResponse) => pagamento.ragione_pagamento === 'CONCORSO_FOTOGRAFIA');
              if(this.pagamentoPoesie.length > 0){this.poesieBlocco = true}
              if(this.pagamentoFoto.length > 0){this.fotoBlocco = true}
            }
          });



    }

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
