import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificaConcorsoRoutingModule } from './modifica-concorso-routing.module';
import { ModificaConcorsoComponent } from './modifica-concorso.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModificaConcorsoComponent
  ],
  imports: [
    CommonModule,
    ModificaConcorsoRoutingModule,
    ReactiveFormsModule
  ]
})
export class ModificaConcorsoModule { }
