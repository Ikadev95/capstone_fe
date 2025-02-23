import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificaComponent } from './classifica.component';

const routes: Routes = [{ path: '', component: ClassificaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificaRoutingModule { }
