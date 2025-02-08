import { Component } from '@angular/core';
import { PagamentiSvcService } from '../../services/pagamenti-svc.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-success-pagamento',
  standalone: false,

  templateUrl: './success-pagamento.component.html',
  styleUrl: './success-pagamento.component.scss'
})
export class SuccessPagamentoComponent {

  constructor(private router: Router, private pagamentiService: PagamentiSvcService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.aggiorna();
      }
    });
  }

  aggiorna() {
    this.pagamentiService.getPagamentiUser().subscribe();
  }
}
