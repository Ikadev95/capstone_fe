import { Component } from '@angular/core';

import { ComponimentiJudgeSvcService } from '../../services/componimenti-judge-svc.service';
import { Observable } from 'rxjs';
import { iComponimentoFullResponse } from '../../interfaces/i-componimento-full-response';

@Component({
  selector: 'app-componimenti',
  standalone: false,

  templateUrl: './componimenti.component.html',
  styleUrl: './componimenti.component.scss'
})
export class ComponimentiComponent {

    pages$: Observable<number[]> = new Observable;
    currentPage: number = 1;
    componiments$!: Observable<iComponimentoFullResponse[]>;
    total$!: Observable<number>;


  constructor(public service: ComponimentiJudgeSvcService) {
    this.componiments$ = this.service.componimenti$;
    this.total$ = this.service.total$;
    this.updatePagination();
    this.service._search$.next();
    this.pages$ = this.service._pages$;
   }

  changePage(page: number): void {
    console.log("Cambiando pagina a:", page);
    let pages = this.service._pages$.getValue();
    if (page >= 1 && page <= pages.length) {
      this.service.page = page;
      this.updatePagination();
      this.service._search$.next();
      console.log("Pagina impostata:", this.service.page);
    }
  }
  updatePagination(): void {
    this.total$.subscribe(total => {
      const totalPages = Math.ceil(total / this.service.pageSize);
      this.service._pages$.next(Array.from({ length: totalPages }, (_, i) => i + 1));
    });
  }
openModal(componiment: iComponimentoFullResponse){
  console.log("modale aperta")
}

}
