import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';

import { ComponimentiJudgeSvcService } from '../../services/componimenti-judge-svc.service';
import { Observable } from 'rxjs';
import { iComponimentoFullResponse } from '../../interfaces/i-componimento-full-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-componimenti',
  standalone: false,

  templateUrl: './componimenti.component.html',
  styleUrl: './componimenti.component.scss'
})
export class ComponimentiComponent {

   @ViewChild('voteModal') voteModal: TemplateRef<any> | undefined;
    pages$: Observable<number[]> = new Observable;
    currentPage: number = 1;
    componiments$!: Observable<iComponimentoFullResponse[]>;
    total$!: Observable<number>;
    selectedComponimento: iComponimentoFullResponse | null = null;
    vote: number | null = null;
    comment: string = '';
    componimentToVote: any;


  constructor(public service: ComponimentiJudgeSvcService, private modalService: NgbModal) {
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

  openModal(componiment: any) {
    this.componimentToVote = componiment;
    this.modalService.open(this.voteModal);
  }
  submitVote() {
    if (this.vote && this.componimentToVote) {
      // Invia il voto e il commento al backend
      console.log(`Voto per: ${this.componimentToVote.titolo}, Voto: ${this.vote}, Commento: ${this.comment}`);
      // Chiudi la modale
      this.modalService.dismissAll();
    }
  }

}
