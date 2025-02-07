import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { HttpClient } from '@angular/common/http';
import { CategoriaSrvService } from '../../services/categoria-srv.service';
import { DecodeTokenService } from '../../services/decode-token.service';
import { ComponimentiSvcService } from '../../services/componimenti-svc.service';
import { iPoesiaRequest } from '../../interfaces/i-poesia-request';

@Component({
  selector: 'app-concorso-poesie',
  standalone: false,

  templateUrl: './concorso-poesie.component.html',
  styleUrl: './concorso-poesie.component.scss'
})
export class ConcorsoPoesieComponent {
  form: FormGroup;
   Categorie: iCategoriaResponse[] = []

  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService,private decoder: DecodeTokenService, private compService: ComponimentiSvcService) {
    this.form = new FormGroup({
       titolo: new FormControl('', [Validators.required]),
       id_categoria: new FormControl('',[Validators.required]),
       testo: new FormControl('',[Validators.required])
    })

    this.categoriaSrv.getCategrieBySezionePoesia().subscribe(data => {
      this.Categorie = data
      console.log(this.Categorie);
    })

  }

  uploadPoesia() {
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

  }

}
