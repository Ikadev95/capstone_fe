import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificaRoutingModule } from './classifica-routing.module';
import { ClassificaComponent } from './classifica.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ClassificaComponent
  ],
  imports: [
    CommonModule,
    ClassificaRoutingModule,
    SharedModule,
  ]
})
export class ClassificaModule { }
