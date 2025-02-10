import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UserSvcService } from '../../services/user-svc.service';
import { iUserPaged } from '../../interfaces/i-user-paged';
import { NgbdSortableHeader, SortEvent } from '../../directives/sortable.directive';

@Component({
  selector: 'app-utenti',
  standalone: false,

  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss'
})

export class UtentiComponent implements OnInit {
  utenti: iUserPaged[] = [];

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: UserSvcService) {
    this.getUtenti();
  }
  ngOnInit(): void {
    console.log('Utenti iniziali:', this.utenti);
  }


  onSearch() {
    this.service.page = 1;
    this.getUtenti();
  }

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
    this.getUtenti();
  }

  getUtenti() {
    this.service.getUsers(this.service.page, this.service.pageSize, this.service.sortColumn)
      .subscribe();
    this.service.utentiSubject$.pipe().subscribe(data => {
      if(data)
      this.utenti = data});
  }

  trackById(index: number, user: iUserPaged) {
    return user.id;
  }
}
