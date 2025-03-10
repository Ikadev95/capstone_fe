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

  constructor(private http: HttpClient, private ConcorsoSvcService: ConcorsoSvcService) {
    this.ConcorsoSvcService.$concorsoSubject$.subscribe((data) => {
      this.datiConcorso = data
      console.log(this.datiConcorso);
    })
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = 'bando.pdf'; // Percorso del file nel frontend
    link.download = 'bando.pdf'; // Nome del file scaricato
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
