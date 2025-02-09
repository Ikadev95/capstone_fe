import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistraGiudiceComponent } from './registra-giudice.component';

const routes: Routes = [{ path: '', component: RegistraGiudiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistraGiudiceRoutingModule { }
