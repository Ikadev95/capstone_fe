import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcorsoPoesieRoutingModule } from './concorso-poesie-routing.module';
import { ConcorsoPoesieComponent } from './concorso-poesie.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConcorsoPoesieComponent
  ],
  imports: [
    CommonModule,
    ConcorsoPoesieRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConcorsoPoesieModule { }
