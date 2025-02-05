import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment-button',
  standalone: false,

  templateUrl: './payment-button.component.html',
  styleUrl: './payment-button.component.scss'
})
export class PaymentButtonComponent {
  @Input() amount!: number; // Importo in centesimi (€10 = 1000)
  @Input() name!: string;

  stripe: Stripe | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // Inizializza Stripe con la chiave pubblica
    this.stripe = await loadStripe('pk_test_51Qp3WL4IjMu18cdi5rovgzG92zjqtEUV0WpQShpjbiTChwlHpqXL5qBLl2DJJ0YrmukfYHD9x2muJGIbiPptQIRD00vdTWo9rK');
  }

  checkout() {
    if (!this.stripe) return;

    const items = [{
      name: this.name,
      amount: this.amount / 100,
    }];

    this.http.post<{ id: string }>('http://localhost:8080/api/payments/create-checkout-session', {
      items
    }).subscribe(async (session) => {
      const { error } = await this.stripe!.redirectToCheckout({ sessionId: session.id });
      if (error) console.error(error.message);
    });
  }


}
