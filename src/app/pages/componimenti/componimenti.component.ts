import { Component } from '@angular/core';

import { ComponimentiJudgeSvcService } from '../../services/componimenti-judge-svc.service';

@Component({
  selector: 'app-componimenti',
  standalone: false,

  templateUrl: './componimenti.component.html',
  styleUrl: './componimenti.component.scss'
})
export class ComponimentiComponent {
  constructor(private compService: ComponimentiJudgeSvcService) {
    this.compService.getComponimentiBySezione(0, 10).subscribe(
      data => console.log(data)
    );
   }

}
