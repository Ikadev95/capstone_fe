import { iFotografiaResponse } from './../../interfaces/i-fotografia-response';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaSrvService } from '../../services/categoria-srv.service';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { DecodeTokenService } from '../../services/decode-token.service';
import { ComponimentiSvcService } from '../../services/componimenti-svc.service';

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

  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService, private decoder: DecodeTokenService, private compService: ComponimentiSvcService) {
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

    this.getFoto();

  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Anteprima immagine
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  uploadFile() {
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

  getFoto(){
    this.compService.fotoSubject$.subscribe(data => {
      if(data)
      this.Fotografie = data
    })
  }
}
