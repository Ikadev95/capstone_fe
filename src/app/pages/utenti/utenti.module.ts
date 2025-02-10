import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { UtentiRoutingModule } from './utenti-routing.module';
import { UtentiComponent } from './utenti.component';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbdSortableHeader } from '../../directives/sortable.directive';


@NgModule({
  declarations: [
    UtentiComponent
  ],
  imports: [
    CommonModule,
    UtentiRoutingModule,
    NgbPaginationModule,
    NgbHighlight,
    FormsModule,
    AsyncPipe,
    NgbdSortableHeader
  ]
})
export class UtentiModule { }
