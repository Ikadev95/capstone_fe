import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiudiciRoutingModule } from './giudici-routing.module';
import { GiudiciComponent } from './giudici.component';
import { RegistraGiudiceComponent } from './registra-giudice/registra-giudice.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GiudiciComponent,
    RegistraGiudiceComponent
  ],
  imports: [
    CommonModule,
    GiudiciRoutingModule,
    ReactiveFormsModule
  ]
})
export class GiudiciModule { }
