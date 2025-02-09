import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssegnaGiudiceRoutingModule } from './assegna-giudice-routing.module';
import { AssegnaGiudiceComponent } from './assegna-giudice.component';


@NgModule({
  declarations: [
    AssegnaGiudiceComponent
  ],
  imports: [
    CommonModule,
    AssegnaGiudiceRoutingModule
  ]
})
export class AssegnaGiudiceModule { }
