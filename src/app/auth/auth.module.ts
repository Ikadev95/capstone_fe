import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
