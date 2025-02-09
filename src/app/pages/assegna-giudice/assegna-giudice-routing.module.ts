import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssegnaGiudiceComponent } from './assegna-giudice.component';

const routes: Routes = [{ path: '', component: AssegnaGiudiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssegnaGiudiceRoutingModule { }
