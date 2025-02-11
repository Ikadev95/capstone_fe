import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { GiudiciRoutingModule } from './giudici-routing.module';
import { GiudiciComponent } from './giudici.component';
import { RegistraGiudiceComponent } from './registra-giudice/registra-giudice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '../../directives/sortable.directive';


@NgModule({
  declarations: [
    GiudiciComponent,
    RegistraGiudiceComponent
  ],
  imports: [
    CommonModule,
    GiudiciRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbHighlight,
    AsyncPipe,
    NgbdSortableHeader
  ]
})
export class GiudiciModule { }
