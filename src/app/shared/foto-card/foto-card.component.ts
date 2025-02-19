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
  console.log(this.componiment.percorsoFile)
}
@Input() componiment!: iComponimentoFullResponse



}
