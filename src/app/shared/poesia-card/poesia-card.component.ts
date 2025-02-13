import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iComponimentoFullResponse } from '../../interfaces/i-componimento-full-response';

@Component({
  selector: 'app-poesia-card',
  standalone: false,

  templateUrl: './poesia-card.component.html',
  styleUrl: './poesia-card.component.scss'
})
export class PoesiaCardComponent {

  @Input() componiment!: iComponimentoFullResponse

}
