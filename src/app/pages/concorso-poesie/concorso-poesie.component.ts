import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { HttpClient } from '@angular/common/http';
import { CategoriaSrvService } from '../../services/categoria-srv.service';
import { DecodeTokenService } from '../../services/decode-token.service';
import { ComponimentiSvcService } from '../../services/componimenti-svc.service';
import { iPoesiaRequest } from '../../interfaces/i-poesia-request';
import { iPoesiaResponse } from '../../interfaces/i-poesia-response';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';
import { iPagamentoResponse } from '../../interfaces/i-pagamento-response';

@Component({
  selector: 'app-concorso-poesie',
  standalone: false,

  templateUrl: './concorso-poesie.component.html',
  styleUrl: './concorso-poesie.component.scss'
})
export class ConcorsoPoesieComponent {
  form: FormGroup;
   Categorie: iCategoriaResponse[] = []
   Poesie: iPoesiaResponse[] = []
   PagamentoPoesie: iPagamentoResponse[] = []
   poesiePagate: number = 0

  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService,private decoder: DecodeTokenService,
     private compService: ComponimentiSvcService, private pagamentiService: PagamentiSvcService) {
    this.form = new FormGroup({
       titolo: new FormControl('', [Validators.required]),
       id_categoria: new FormControl('',[Validators.required]),
       testo: new FormControl('',[Validators.required])
    })

  }

  ngOnInit() {
    this.categoriaSrv.getCategrieBySezionePoesia().subscribe(data => {
      this.Categorie = data
    })

    this.getPoesie();

     this.pagamentiService.pagamentiSubject$.subscribe(data => {
          if (data) {
            this.PagamentoPoesie = data.filter((pagamento: iPagamentoResponse) => pagamento.ragione_pagamento === 'CONCORSO_POESIA');
            console.log(this.PagamentoPoesie);
            this.poesiePagate = this.PagamentoPoesie[0].numero_poesie_pagate;
          }
        });
  }

  uploadPoesia() {

    if (this.Poesie.length >= this.poesiePagate) {
      alert("Hai raggiunto il numero massimo di foto che puoi caricare!");
      return;
    }

    let data : iPoesiaRequest = this.form.value;
    let username = this.decoder.getUsername();
    if (username) {
      data.username = username
    }
    this.compService.uploadPoesia(data).subscribe(
      (response) => {
        console.log('Poesia caricata con successo:', response);
      },
      (error) => {
        console.error('Errore durante il caricamento della poesia:', error);
      }
     )
     this.form.reset();
     this.getPoesie();

  }

  getPoesie(){
    this.compService.poesiaSubject$.subscribe(data => {
      if(data)
      this.Poesie = data
    })
  }

}
