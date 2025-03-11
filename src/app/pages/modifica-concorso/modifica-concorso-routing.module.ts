import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificaConcorsoComponent } from './modifica-concorso.component';

const routes: Routes = [{ path: '', component: ModificaConcorsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificaConcorsoRoutingModule { }
