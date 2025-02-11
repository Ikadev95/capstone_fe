import { Component, QueryList, ViewChildren } from '@angular/core';
import { GiudiciSrcService } from '../../services/giudici-src.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable.directive';
import { iGiudiceResponse } from '../../interfaces/i-giudice-response';

@Component({
  selector: 'app-giudici',
  standalone: false,

  templateUrl: './giudici.component.html',
  styleUrl: './giudici.component.scss'
})
export class GiudiciComponent {
  pages$: Observable<number[]> = new Observable;
  currentPage: number = 1;
  user$!: Observable<iGiudiceResponse[]>;
  total$!: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service : GiudiciSrcService) {
    this.user$ = this.service.users$;
    this.total$ = this.service.total$;
    this.updatePagination();
    this.pages$ = this.service._pages$;

  }

  onSort({ column, direction }: SortEvent) {
      this.headers.forEach((header) => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });

      this.service.sortColumn = column;
      this.service.sortDirection = direction;
    }

    change(){
      this.total$ = this.service.total$;
      this.total$.subscribe(data => console.log(data, "ok"))
    }

    updatePagination(): void {
      this.total$.subscribe(total => {
        const totalPages = Math.ceil(total / this.service.pageSize); // Calcola il numero di pagine
        this.service._pages$.next(Array.from({ length: totalPages }, (_, i) => i + 1)); // Aggiorna le pagine = Array.from({ length: totalPages }, (_, i) => i + 1); // Genera il range delle pagine
      });
    }

    // Metodo per cambiare la pagina
  changePage(page: number): void {
    console.log("Cambiando pagina a:", page);
    let pages = this.service._pages$.getValue();
    if (page >= 1 && page <= pages.length) {
      this.service.page = page; // Imposta la pagina corrente
      this.updatePagination();
      this.service._search$.next(); // Esegui una nuova ricerca
      console.log("Pagina impostata:", this.service.page);
    }
  }

  // Metodo per cambiare la dimensione della pagina
  changePageSize(event: any): void {
    const pageSize = event.target.value;  // Ottieni il valore dalla selezione
    this.service.pageSize = pageSize;  // Aggiorna la dimensione della pagina
    this.service.page = 1;  // Resetta alla prima pagina
    this.updatePagination();  // Ricalcola le pagine
    this.service._search$.next();  // Esegui una nuova ricerca
  }


}
