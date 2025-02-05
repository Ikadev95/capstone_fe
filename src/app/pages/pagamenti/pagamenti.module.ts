import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentiRoutingModule } from './pagamenti-routing.module';
import { PagamentiComponent } from './pagamenti.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PagamentiComponent
  ],
  imports: [
    CommonModule,
    PagamentiRoutingModule,
    SharedModule
  ]
})
export class PagamentiModule { }
