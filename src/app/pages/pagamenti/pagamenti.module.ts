import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentiRoutingModule } from './pagamenti-routing.module';
import { PagamentiComponent } from './pagamenti.component';


@NgModule({
  declarations: [
    PagamentiComponent
  ],
  imports: [
    CommonModule,
    PagamentiRoutingModule
  ]
})
export class PagamentiModule { }
