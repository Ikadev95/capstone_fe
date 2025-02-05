import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessPagamentoComponent } from './success-pagamento.component';

const routes: Routes = [{ path: '', component: SuccessPagamentoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessPagamentoRoutingModule { }
