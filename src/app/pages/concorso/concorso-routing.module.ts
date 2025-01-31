import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcorsoComponent } from './concorso.component';

const routes: Routes = [{ path: '', component: ConcorsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcorsoRoutingModule { }
