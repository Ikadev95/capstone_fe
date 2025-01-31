import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcorsoRoutingModule } from './concorso-routing.module';
import { ConcorsoComponent } from './concorso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ConcorsoComponent
  ],
  imports: [
    CommonModule,
    ConcorsoRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ConcorsoModule { }
