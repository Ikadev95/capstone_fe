import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { HttpClient } from '@angular/common/http';
import { CategoriaSrvService } from '../../services/categoria-srv.service';

@Component({
  selector: 'app-concorso-poesie',
  standalone: false,

  templateUrl: './concorso-poesie.component.html',
  styleUrl: './concorso-poesie.component.scss'
})
export class ConcorsoPoesieComponent {
  form: FormGroup;
   Categorie: iCategoriaResponse[] = []

  constructor(private http: HttpClient, private categoriaSrv: CategoriaSrvService,) {
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

  }

}
