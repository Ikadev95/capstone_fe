import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConcorsoSvcService } from '../../services/concorso-svc.service';

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
  @ViewChild('confirmDelete') confirmDelete!: TemplateRef<any>;
  @ViewChild('resultModal') resultModal!: TemplateRef<any>;
  resultMessage: string = '';
  userIdToDelete!: number;
  dataBlocco!: Date;
  bloccoData =  false;


  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService,private decoder: DecodeTokenService,
     private compService: ComponimentiSvcService, private pagamentiService: PagamentiSvcService, private modalService: NgbModal,
     private ConcorsoSvcService: ConcorsoSvcService) {
    this.form = new FormGroup({
       titolo: new FormControl('', [Validators.required]),
       id_categoria: new FormControl('',[Validators.required]),
       testo: new FormControl('',[Validators.required])
    })

    this.ConcorsoSvcService.$concorsoSubject$.subscribe((data) => {
      this.dataBlocco = new Date(data.data_invio_opere);
      if(this.dataBlocco < new Date()){
        this.bloccoData = true;
      }
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

      this.compService.deletePoesia(id).subscribe({
        next: () => {
          this.openResultModal('Poesia eliminata con successo!');
          window.location.reload();

        },
        error: (err) => {
          if(err.error.error === "L'elemento è collegato ad altri record e non può essere eliminato."){
            this.errorMessage = "la poesia selezionata è già stata votata da un giudice, non puoi eliminarla"
          }
           this.openResultModal("la poesia selezionata è già stata votata da un giudice, non puoi eliminarla");
        }
      });

  }

  openResultModal(message: string) {
    this.resultMessage = message;
    this.modalService.open(this.resultModal);
  }

  openConfirmModal(id: number) {

    if(this.bloccoData){
      this.openResultModal("Il concorso è terminato, non è possibile eliminare la poesia");
      return
    }
    this.userIdToDelete = id;
    const modalRef = this.modalService.open(this.confirmDelete);
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.eliminaPoesia(this.userIdToDelete);
      }
    }).catch(() => {});
  }


}
