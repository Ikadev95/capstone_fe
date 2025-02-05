import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamenti',
  standalone: false,

  templateUrl: './pagamenti.component.html',
  styleUrl: './pagamenti.component.scss'
})
export class PagamentiComponent {

  selectedAmount: number = 0;
  concorsoName: string = '';

  onSelectAmount(amount: number) {
    this.selectedAmount = amount;
  }

}
