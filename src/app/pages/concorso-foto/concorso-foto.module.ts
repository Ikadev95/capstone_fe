import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcorsoFotoRoutingModule } from './concorso-foto-routing.module';
import { ConcorsoFotoComponent } from './concorso-foto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConcorsoFotoComponent
  ],
  imports: [
    CommonModule,
    ConcorsoFotoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConcorsoFotoModule { }
