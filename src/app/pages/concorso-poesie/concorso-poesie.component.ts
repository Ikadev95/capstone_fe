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
   sblocco: boolean = false
   errorMessage: string | null = null;
   successMessage: string | null = null;


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
            if(this.PagamentoPoesie.length > 0){
              this.poesiePagate = this.PagamentoPoesie[0].numero_poesie_pagate;

            }

            if (this.Poesie.length >= this.poesiePagate) {
              this.sblocco = false
            } else
              this.sblocco = true
          }
        });

  }

  uploadPoesia() {

    if (this.Poesie.length >= this.poesiePagate) {
      this.sblocco = false
      alert("Hai raggiunto il numero massimo di poesie che puoi caricare!");
      return;
    }
    this.sblocco = true


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
      if (this.Poesie.length >= this.poesiePagate) {
        this.sblocco = false}
    })
  }

  eliminaPoesia(id: number) {
    if (confirm('Sei sicuro di voler eliminare questa poesia?')) {
      this.compService.deletePoesia(id).subscribe({
        next: () => {
          alert('Poesia eliminata con successo!');
          this.compService.getPoesieByUser().subscribe();
        },
        error: (err) => {
          if(err.error.error === "L'elemento è collegato ad altri record e non può essere eliminato."){
            this.errorMessage = "la poesia selezionata è già stata votata da un giudice, non puoi eliminarla"
          }
           alert(this.errorMessage)
        }
      });
    }
  }


}
