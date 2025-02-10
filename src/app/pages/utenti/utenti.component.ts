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

  user$!: Observable<iUserPaged[]>;
  total$!: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: UserSvcService) {
    this.user$ = this.service.users$;
    this.total$ = service.total$;
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
}
