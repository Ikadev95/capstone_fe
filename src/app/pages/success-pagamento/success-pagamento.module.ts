import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessPagamentoRoutingModule } from './success-pagamento-routing.module';
import { SuccessPagamentoComponent } from './success-pagamento.component';


@NgModule({
  declarations: [
    SuccessPagamentoComponent
  ],
  imports: [
    CommonModule,
    SuccessPagamentoRoutingModule
  ]
})
export class SuccessPagamentoModule { }
