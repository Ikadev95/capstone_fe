import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentButtonComponent } from './payment-button/payment-button.component';
import { PoesiaCardComponent } from './poesia-card/poesia-card.component';
import { FotoCardComponent } from './foto-card/foto-card.component';



@NgModule({
  declarations: [PaymentButtonComponent, PoesiaCardComponent, FotoCardComponent],
  imports: [
    CommonModule
  ],
  exports: [PaymentButtonComponent, PoesiaCardComponent, FotoCardComponent]
})
export class SharedModule { }
