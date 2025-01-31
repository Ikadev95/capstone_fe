import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcorsoPoesieRoutingModule } from './concorso-poesie-routing.module';
import { ConcorsoPoesieComponent } from './concorso-poesie.component';


@NgModule({
  declarations: [
    ConcorsoPoesieComponent
  ],
  imports: [
    CommonModule,
    ConcorsoPoesieRoutingModule
  ]
})
export class ConcorsoPoesieModule { }
