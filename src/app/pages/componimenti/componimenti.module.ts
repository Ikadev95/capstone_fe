import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponimentiRoutingModule } from './componimenti-routing.module';
import { ComponimentiComponent } from './componimenti.component';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ComponimentiComponent
  ],
  imports: [
    CommonModule,
    ComponimentiRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule
  ]
})
export class ComponimentiModule { }
