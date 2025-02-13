import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponimentiRoutingModule } from './componimenti-routing.module';
import { ComponimentiComponent } from './componimenti.component';


@NgModule({
  declarations: [
    ComponimentiComponent
  ],
  imports: [
    CommonModule,
    ComponimentiRoutingModule
  ]
})
export class ComponimentiModule { }
