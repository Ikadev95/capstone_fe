import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagamentiSvcService } from '../../../services/pagamenti-svc.service';
import { iPagamentoResponseWithDate } from '../../../interfaces/i-pagamento-response-with-date';
import { iItemPaymentCash,  } from '../../../interfaces/i-pagamento-cash';

@Component({
  selector: 'app-pagamento-contanti',
  standalone: false,

  templateUrl: './pagamento-contanti.component.html',
  styleUrl: './pagamento-contanti.component.scss'
})
export class PagamentoContantiComponent {

  id: number = 0
  username : string = ""
  selectedAmount: number = 0;
  concorsoName: string = 'concorsoAirali';
  sezione: string = '';
  numeroComponimenti : number = 0;
  ragione: string = '';
  pagamentoPoesie: iPagamentoResponseWithDate[] = [];
  pagamentoFoto: iPagamentoResponseWithDate[] = [];
  poesieBlocco: boolean = false;
  fotoBlocco: boolean = false;

  constructor(private route: ActivatedRoute, private pagamentiService : PagamentiSvcService, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.username = this.route.snapshot.paramMap.get('username') || ""
  }

    ngOnInit() {

          this.id = Number(this.route.snapshot.paramMap.get('id'))
         this.username = this.route.snapshot.paramMap.get('username') || ""

         this.pagamentiService.getPagamentiUserId(this.id).subscribe(data => {
              if (data) {
                this.pagamentoPoesie = data.filter((pagamento: iPagamentoResponseWithDate) => pagamento.ragione_pagamento === 'CONCORSO_POESIA');
                this.pagamentoFoto = data.filter((pagamento: iPagamentoResponseWithDate) => pagamento.ragione_pagamento === 'CONCORSO_FOTOGRAFIA');
                if(this.pagamentoPoesie.length > 0){this.poesieBlocco = true}
                if(this.pagamentoFoto.length > 0){this.fotoBlocco = true}
              }
            });

            console.log(this.id)

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

    checkout() {

      const item : iItemPaymentCash = {
        name: this.username,
        amount: this.selectedAmount,
        sezione: this.sezione,
        numeroComponimenti: this.numeroComponimenti,
        ragione: this.ragione,
        id: this.id
      }
      console.log(item)

      this.pagamentiService.pagamentoInContanti(
        item
      ).subscribe(data => {
        if (data) {
          console.log(data);
          if(item.ragione === 'CONCORSO_POESIA'){
            this.poesieBlocco = true;
          } else if(item.ragione === 'CONCORSO_FOTOGRAFIA'){
            this.fotoBlocco = true;
          }
          this.selectedAmount = 0;
          this.router.navigate(['pagamentiUser', this.id, this.username]);
        }
      })

    }


}
