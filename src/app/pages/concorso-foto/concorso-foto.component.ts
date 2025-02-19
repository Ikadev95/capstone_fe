import { iPagamentoResponse } from './../../interfaces/i-pagamento-response';
import { iFotografiaResponse } from './../../interfaces/i-fotografia-response';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaSrvService } from '../../services/categoria-srv.service';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { DecodeTokenService } from '../../services/decode-token.service';
import { ComponimentiSvcService } from '../../services/componimenti-svc.service';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';


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


  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService, private decoder: DecodeTokenService,
    private compService: ComponimentiSvcService, private pagamentiService: PagamentiSvcService) {
    this.form = new FormGroup({
      file: new FormControl(null),
      titolo: new FormControl('', [Validators.required]),
      id_categoria: new FormControl('',[Validators.required])
    });
  }

  ngOnInit() {
    this.categoriaSrv.getCategorieBySezioneFotografia().subscribe(data => {
      this.Categorie = data
    })

    console.log(this.img1);
    console.log(this.img2);
    console.log(this.img3);

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
        alert('Il file selezionato non è un\'immagine valida.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Il file è troppo grande! La dimensione massima consentita è di 5MB.');
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

          console.log(`Risoluzione immagine: ${width}x${height}`);

          // Controllo risoluzione massima
          if (width > 4000 || height > 3000) {
            alert(`La risoluzione dell'immagine è troppo alta (${width}x${height}). Il massimo consentito è 4000x3000.`);
            return;
          }

          // Se la risoluzione è accettata, procedi con la preview o il caricamento
          this.selectedFile = file;
          this.previewUrl = event.target.result;
        };
      };
    }
  }
  uploadFile() {

    if (this.Fotografie.length >= this.fotoPagate) {
      this.sblocco = false
      alert("Hai raggiunto il numero massimo di foto che puoi caricare!");
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
          console.log('Immagine caricata con successo:', response);
        },
        (error) => {
          console.error('Errore durante il caricamento dell\'immagine:', error);
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

        // Debugging per verificare i dati ricevuti
        console.log("Dati ricevuti:", data);
        console.log("Foto 1:", this.img1, "Percorso:", data[0]?.percorsoFile);
        console.log("Foto 2:", this.img2, "Percorso:", data[1]?.percorsoFile);
        console.log("Foto 3:", this.img3, "Percorso:", data[2]?.percorsoFile);
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



}
