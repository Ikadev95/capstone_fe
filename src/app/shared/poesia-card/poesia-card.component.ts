import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iComponimentoFullResponse } from '../../interfaces/i-componimento-full-response';
import { ComponimentiJudgeSvcService } from '../../services/componimenti-judge-svc.service';

@Component({
  selector: 'app-poesia-card',
  standalone: false,

  templateUrl: './poesia-card.component.html',
  styleUrl: './poesia-card.component.scss'
})
export class PoesiaCardComponent {

  @Input() componiment!: iComponimentoFullResponse
  voto?: number;

  ngOnInit(): void {
    this.getVoto()
  }


    constructor(private service: ComponimentiJudgeSvcService) { }


  getVoto(){
    this.service.getVoto(this.componiment.id).subscribe({
      next: (response) => {
        this.voto = response.voto;
      },
      error: (err) => {
        this.voto = 0;

      }
    })
  }

}
