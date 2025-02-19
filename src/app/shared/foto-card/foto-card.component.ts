import { ComponimentiJudgeSvcService } from './../../services/componimenti-judge-svc.service';
import { Component, Input, OnInit } from '@angular/core';
import { iComponimentoFullResponse } from '../../interfaces/i-componimento-full-response';

@Component({
  selector: 'app-foto-card',
  standalone: false,

  templateUrl: './foto-card.component.html',
  styleUrl: './foto-card.component.scss'
})
  export class FotoCardComponent implements OnInit{
  ngOnInit(): void {
    this.getVoto()
  }

  constructor(private service: ComponimentiJudgeSvcService) { }
  @Input() componiment!: iComponimentoFullResponse
  voto?: number;
  selectedImage: string = '';
  isLightboxOpen: boolean = false;

  getVoto(){
    this.service.getVoto(this.componiment.id).subscribe({
      next: (response) => {
        console.log(response)
        this.voto = response.voto;
      },
      error: (err) => {
        this.voto = 0;
        console.log(err)
      }
    })
  }


  showImage(imagePath: string) {
    this.selectedImage = imagePath;
    this.isLightboxOpen = true;
  }


}
