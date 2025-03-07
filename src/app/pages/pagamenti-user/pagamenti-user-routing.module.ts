import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentiUserComponent } from './pagamenti-user.component';
import { PagamentoContantiComponent } from './pagamento-contanti/pagamento-contanti.component';

const routes: Routes = [
  { path: '', component: PagamentiUserComponent },
  {path: 'contanti', component: PagamentoContantiComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentiUserRoutingModule { }
