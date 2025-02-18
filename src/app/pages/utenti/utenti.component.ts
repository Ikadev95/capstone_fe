import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserSvcService } from '../../services/user-svc.service';
import { iUserPaged } from '../../interfaces/i-user-paged';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-utenti',
  standalone: false,

  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss'
})

export class UtentiComponent {

  pages$: Observable<number[]> = new Observable;
  currentPage: number = 1;
  user$!: Observable<iUserPaged[]>;
  total$!: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: UserSvcService) {
    this.user$ = this.service.users$;
    this.total$ = this.service.total$;
    this.updatePagination();
    this.service._search$.next();
    this.pages$ = this.service._pages$;
  }

	onSort({ column, direction }: SortEvent) {
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

	}

  change(){
    this.total$ = this.service.total$;
    this.total$.subscribe(data => console.log(data, "ok"))
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

  onToggle(event: Event){
    this.service.sorting = !this.service.sorting
    this.service._search$.next();
  }

  deleteUser(id: number) {
    if (confirm("Sei sicuro di voler eliminare questo utente?")) {
      this.service.deleteUser(id).subscribe({
        next: () => {
          alert("Utente eliminato con successo!");
          this.service._search$.next();
        },
        error: (err) => {
          alert("Errore nell'eliminazione dell'utente!");
          console.error(err);
        }
      });
    }
  }

}
