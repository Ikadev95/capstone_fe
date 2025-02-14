import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private http: HttpClient) {}

  downloadPDF() {
    const link = document.createElement('a');
    link.href = 'bando.pdf'; // Percorso del file nel frontend
    link.download = 'bando.pdf'; // Nome del file scaricato
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
