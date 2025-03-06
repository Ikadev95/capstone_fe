import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentiUserRoutingModule } from './pagamenti-user-routing.module';
import { PagamentiUserComponent } from './pagamenti-user.component';


@NgModule({
  declarations: [
    PagamentiUserComponent
  ],
  imports: [
    CommonModule,
    PagamentiUserRoutingModule
  ]
})
export class PagamentiUserModule { }
