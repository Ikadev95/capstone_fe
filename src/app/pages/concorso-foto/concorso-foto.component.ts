import { ConcorsoSvcService } from './../../services/concorso-svc.service';
import { iPagamentoResponse } from './../../interfaces/i-pagamento-response';
import { iFotografiaResponse } from './../../interfaces/i-fotografia-response';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaSrvService } from '../../services/categoria-srv.service';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { DecodeTokenService } from '../../services/decode-token.service';
import { ComponimentiSvcService } from '../../services/componimenti-svc.service';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-concorso-foto',
  standalone: false,
  templateUrl: './concorso-foto.component.html',
  styleUrl: './concorso-foto.component.scss'
})
export class ConcorsoFotoComponent{
form: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  Categorie: iCategoriaResponse[] = []
  Fotografie: iFotografiaResponse[] = []
  PagamentoFoto: iPagamentoResponse[] = []
  fotoPagate: number = 0;
  defaultImage = 'nofoto.png';
  img1 = false;
  img2 = false;
  img3 = false;
  sblocco: boolean = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  resultMessage: string = '';
  hovered: boolean[] = [];
  @ViewChild('confirmDelete') confirmDelete!: TemplateRef<any>;
  @ViewChild('resultModal') resultModal!: TemplateRef<any>;
  dataBlocco!: Date;
  userIdToDelete!: number;
  bloccoData =  false;


  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService, private decoder: DecodeTokenService,
    private compService: ComponimentiSvcService, private pagamentiService: PagamentiSvcService, private modalService: NgbModal,
    private ConcorsoSvcService: ConcorsoSvcService) {
    this.form = new FormGroup({
      file: new FormControl(null),
      titolo: new FormControl('', [Validators.required]),
      id_categoria: new FormControl('',[Validators.required])
    });
    this.ConcorsoSvcService.$concorsoSubject$.subscribe((data) => {
      this.dataBlocco = new Date(data.data_invio_opere);
      if(this.dataBlocco < new Date()){
        this.bloccoData = true;
      }
    })
  }

  ngOnInit() {
    this.categoriaSrv.getCategorieBySezioneFotografia().subscribe(data => {
      this.Categorie = data
    })


    this.getFoto();



    this.pagamentiService.pagamentiSubject$.subscribe(data => {
      if (data) {
        this.PagamentoFoto = data.filter((pagamento: iPagamentoResponse) => pagamento.ragione_pagamento === 'CONCORSO_FOTOGRAFIA');
        if(this.PagamentoFoto.length > 0){
        this.fotoPagate = this.PagamentoFoto[0].numero_foto_pagate;}
      }


      if (this.Fotografie.length >= this.fotoPagate) {
        this.sblocco = false}
        else this.sblocco = true
    });



  }
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.openResultModal('Il file selezionato non è un\'immagine valida.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.openResultModal('Il file è troppo grande! La dimensione massima consentita è di 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;

         // console.log(`Risoluzione immagine: ${width}x${height}`);

          if (width > 4000 || height > 3000) {
            this.openResultModal(`La risoluzione dell'immagine è troppo alta (${width}x${height}). Il massimo consentito è 4000x3000.`);
            return;
          }

          this.selectedFile = file;
          this.previewUrl = event.target.result;
        };
      };
    }
  }
  uploadFile() {

    if (this.Fotografie.length >= this.fotoPagate) {
      this.sblocco = false
      this.openResultModal("Hai raggiunto il numero massimo di foto che puoi caricare!");

      return;
    }
    this.sblocco = true

    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('file', this.selectedFile);
      formData.append('titolo', this.form.value.titolo);

      let username = this.decoder.getUsername();
      if (username) {
        formData.append('id_user', username);
      }

      formData.append('id_categoria', this.form.value.id_categoria);

      this.compService.uploadFoto(formData).subscribe(
        (response) => {
        //  console.log('Immagine caricata con successo:', response);
        },
        (error) => {
          console.error('Errore durante il caricamento dell\'immagine:', error);
          this.openResultModal("Errore durante il caricamento dell\'immagine:");
        }
      )
      this.resetFile();
    }
  }
  resetFile() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.form.reset();

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  getFoto() {
    this.compService.fotoSubject$.subscribe(data => {
      if (data) {
        this.Fotografie = data;


      if (this.Fotografie.length >= this.fotoPagate) {
        this.sblocco = false}

        this.img1 = data.length > 0 && !!data[0]?.percorsoFile;
        this.img2 = data.length > 1 && !!data[1]?.percorsoFile;
        this.img3 = data.length > 2 && !!data[2]?.percorsoFile;

      }
    });
  }



  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }

  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched;
  }

  isInValidTouched(fieldName: string) {
    return !this.isValid(fieldName) && this.isTouched(fieldName);
  }



  deletePhoto(id: number) {



      this.compService.deleteFoto(id).subscribe({
        next: (response) => {
          this.successMessage = response.toString() || "Foto eliminata con successo!";
          this.compService.getFotoByUser().subscribe(
            {
              next: () => this.getFoto()

            }
          )
          this.sblocco = true;

        },
        error: (err) =>{
          if(err.error.error === "L'elemento è collegato ad altri record e non può essere eliminato."){
            this.errorMessage = "la fotografia selezionata è già stata votata da un giudice, non puoi eliminarla"
          }
          this.openResultModal("la fotografia selezionata è già stata votata da un giudice, non puoi eliminarla");
        }
      });

  }


  openResultModal(message: string) {
    this.resultMessage = message;
    this.modalService.open(this.resultModal);
  }

  openConfirmModal(id: number) {
    if(this.bloccoData){
      this.openResultModal("Il concorso è terminato, non è possibile eliminare la foto");
      return
    }

    this.userIdToDelete = id;
    const modalRef = this.modalService.open(this.confirmDelete);
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.deletePhoto(this.userIdToDelete);
      }
    }).catch(() => {});
  }


}
