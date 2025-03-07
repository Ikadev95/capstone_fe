import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentiUserRoutingModule } from './pagamenti-user-routing.module';
import { PagamentiUserComponent } from './pagamenti-user.component';
import { PagamentoContantiComponent } from './pagamento-contanti/pagamento-contanti.component';


@NgModule({
  declarations: [
    PagamentiUserComponent,
    PagamentoContantiComponent
  ],
  imports: [
    CommonModule,
    PagamentiUserRoutingModule
  ]
})
export class PagamentiUserModule { }
