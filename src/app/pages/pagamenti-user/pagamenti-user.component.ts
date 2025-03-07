import { Component } from '@angular/core';
import { UserSvcService } from '../../services/user-svc.service';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';
import { ActivatedRoute } from '@angular/router';
import { iPagamentoResponseWithDate } from '../../interfaces/i-pagamento-response-with-date';

@Component({
  selector: 'app-pagamenti-user',
  standalone: false,
  templateUrl: './pagamenti-user.component.html',
  styleUrl: './pagamenti-user.component.scss'
})
export class PagamentiUserComponent {

  pagamenti: iPagamentoResponseWithDate[] = []
  username : string = ""

  constructor(public service : UserSvcService, private pagamentiService: PagamentiSvcService, private route: ActivatedRoute) {

    const userId : number | null = Number(this.route.snapshot.paramMap.get('id'));
    this.username = this.route.snapshot.paramMap.get('username') || ""

    if(userId) {
    this.pagamentiService.getPagamentiUserId(
      userId
    ).subscribe(
      (result) => {
        this.pagamenti = result
        console.log(this.pagamenti)
      }
    );
   }
  }

}
