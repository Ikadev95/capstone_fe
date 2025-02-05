import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentButtonComponent } from './payment-button/payment-button.component';



@NgModule({
  declarations: [PaymentButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [PaymentButtonComponent]
})
export class SharedModule { }
