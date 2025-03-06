import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentiUserComponent } from './pagamenti-user.component';

const routes: Routes = [{ path: '', component: PagamentiUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentiUserRoutingModule { }
