import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponimentiRoutingModule } from './componimenti-routing.module';
import { ComponimentiComponent } from './componimenti.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ComponimentiComponent
  ],
  imports: [
    CommonModule,
    ComponimentiRoutingModule,
    SharedModule
  ]
})
export class ComponimentiModule { }
