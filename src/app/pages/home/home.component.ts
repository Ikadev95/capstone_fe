import { environment } from './../../../environments/environment.development';
import { ConcorsoSvcService } from './../../services/concorso-svc.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { iConcorsoResponse } from '../../interfaces/i-concorso-response';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  datiConcorso!: iConcorsoResponse;
  urlBando!: string;

  constructor(private http: HttpClient, private ConcorsoSvcService: ConcorsoSvcService) {
    this.ConcorsoSvcService.$concorsoSubject$.subscribe((data) => {
      this.datiConcorso = data
      //console.log(data)
      this.urlBando = environment.uploadUrl + this.datiConcorso.bando

    })
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = this.urlBando; // Percorso del file nel frontend
    link.download = this.urlBando; // Nome del file scaricato
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
