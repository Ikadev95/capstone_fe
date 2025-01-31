import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcorsoFotoComponent } from './concorso-foto.component';

const routes: Routes = [{ path: '', component: ConcorsoFotoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcorsoFotoRoutingModule { }
