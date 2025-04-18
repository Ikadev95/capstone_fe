import { Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { GiudiciSrcService } from '../../services/giudici-src.service';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable.directive';
import { iGiudiceResponse } from '../../interfaces/i-giudice-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { iCategoriaResponse } from '../../interfaces/i-categoria-response';
import { HttpClient } from '@angular/common/http';
import { CategoriaSrvService } from '../../services/categoria-srv.service';

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
  selectedCategoryId!: number;
  selectedUserId!: number;
  categorie$!: Observable<iCategoriaResponse[]>;
  resultMessage: string = '';

    @ViewChild('confirmDelete') confirmDelete!: TemplateRef<any>;
    @ViewChild('resultModal') resultModal!: TemplateRef<any>;

    userIdToDelete!: number;

  @ViewChild('modalContent') modalContent: any;

  constructor(public service : GiudiciSrcService, private modalService: NgbModal, private http : HttpClient, private categorieSvc: CategoriaSrvService) {
    this.user$ = this.service.users$;
    this.total$ = this.service.total$;
    this.updatePagination();
    this.service._search$.next();
    this.pages$ = this.service._pages$;
    this.categorie$ = this.categorieSvc.categoriaSubject$;


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

  openModal(user_id: number) {
    this.selectedUserId = user_id;
    this.modalService.open(this.modalContent, { ariaLabelledBy: 'modal-title' });
  }

  assignCategory() {
    if (!this.selectedCategoryId || !this.selectedUserId) {
      this.openResultModal('Seleziona una categoria prima di assegnare!');
      return;
    }

    this.service.assegnaGiudice(this.selectedUserId, this.selectedCategoryId).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.service._search$.next();
      },
      error: (err) => {
        this.openResultModal('Errore nell\'assegnazione');
        console.error(err);
      }
    });
  }

  openDeleteModal(id: number) {
    this.userIdToDelete = id;
    const modalRef = this.modalService.open(this.confirmDelete);
    modalRef.result.then((result) => {
      if (result === 'confirm') {
        this.eliminaGiudice(this.userIdToDelete);
      }
    }).catch(() => {});
  }

  eliminaGiudice(user_id: number) {

    this.service.eliminaGiudice(user_id).subscribe({
      next: () => {
        this.openResultModal('Giudice eliminato con successo!');
        this.service._search$.next();
      },
      error: (err) => {
        this.openResultModal('Errore nell\'eliminazione dell giudice!');
        console.error(err);
      }
    });
  }

  openResultModal(message: string) {
    this.resultMessage = message;
    this.modalService.open(this.resultModal);
  }

}
