import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponimentiComponent } from './componimenti.component';

const routes: Routes = [{ path: '', component: ComponimentiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponimentiRoutingModule { }
