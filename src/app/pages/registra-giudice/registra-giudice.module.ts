import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistraGiudiceRoutingModule } from './registra-giudice-routing.module';
import { RegistraGiudiceComponent } from './registra-giudice.component';


@NgModule({
  declarations: [
    RegistraGiudiceComponent
  ],
  imports: [
    CommonModule,
    RegistraGiudiceRoutingModule
  ]
})
export class RegistraGiudiceModule { }
