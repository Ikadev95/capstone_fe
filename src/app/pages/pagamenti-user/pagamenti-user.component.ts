import { Component } from '@angular/core';
import { UserSvcService } from '../../services/user-svc.service';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';
import { iPagamentoResponse } from '../../interfaces/i-pagamento-response';

@Component({
  selector: 'app-pagamenti-user',
  standalone: false,
  templateUrl: './pagamenti-user.component.html',
  styleUrl: './pagamenti-user.component.scss'
})
export class PagamentiUserComponent {

  pagamenti: iPagamentoResponse[] = []

  constructor(public service : UserSvcService, private pagamentiService: PagamentiSvcService) {
    this.pagamentiService.getPagamentiUserId(
      this.service.user_id
    ).subscribe(
      (result) => {
        this.pagamenti = result
        console.log(this.pagamenti)
      }
    );
   }

}
