import { Observable } from 'rxjs';
import { ClassificaSvcService } from './../../services/classifica-svc.service';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { iFotografiaClassifica } from '../../interfaces/i-fotografia-classifica';
import { iPoesiaClassifica } from '../../interfaces/i-poesia-classifica';
import { CategoriaSrvService } from './../../services/categoria-srv.service';
import { ComponimentiSvcService } from './../../services/componimenti-svc.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-classifica',
  standalone: false,

  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent {

  CategorieFoto: iCategoriaResponse[] = []
  CategoriePoesie: iCategoriaResponse[] = []
  Poesie$!:Observable<iPoesiaClassifica[]>
  Foto$!:Observable<iFotografiaClassifica[]>
  pages$: Observable<number[]> = new Observable;
  currentPage: number = 1;
  total$!: Observable<number>;


  constructor(private ComponimentiSvcService : ComponimentiSvcService, private CategoriaSrvService: CategoriaSrvService, private service: ClassificaSvcService) {
    this.CategoriaSrvService.getCategorieBySezioneFotografia().subscribe(data => {
      this.CategorieFoto = data

    console.log(this.CategorieFoto)
    })

    this.CategoriaSrvService.getCategrieBySezionePoesia().subscribe(data => {
      this.CategoriePoesie = data

    console.log(this.CategoriePoesie)

    })

    this.total$ = this.service.total$;
    this.updatePagination();
    this.service._search$.next();
    this.pages$ = this.service._pages$;
    this.Foto$ = this.service._foto$;
    console.log(this.service._foto$)
   }


   updatePagination(): void {
    this.total$.subscribe(total => {
      const totalPages = Math.ceil(total / this.service.pageSize);
      this.service._pages$.next(Array.from({ length: totalPages }, (_, i) => i + 1));
    });
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


  changePageSize(event: any): void {
    const pageSize = event.target.value;
    this.service.pageSize = pageSize;
    this.service.page = 1;
    this.updatePagination();
    this.service._search$.next();
  }


}
