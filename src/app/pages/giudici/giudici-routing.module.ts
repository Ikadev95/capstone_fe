import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiudiciComponent } from './giudici.component';
import { RegistraGiudiceComponent } from './registra-giudice/registra-giudice.component';


const routes: Routes = [
  { path: '', component: GiudiciComponent },
  {path: 'registra', component: RegistraGiudiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiudiciRoutingModule { }
