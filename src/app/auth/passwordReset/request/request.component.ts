import { Component } from '@angular/core';
import { AuthsrvService } from '../../authsrv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request',
  standalone: false,

  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {

    form: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;

  constructor(private authSvc: AuthsrvService) {
  this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  request(){
    console.log(this.form.value)
    this.authSvc.requestResetPassword(this.form.value.email).subscribe({
      next: (res) => {
        this.successMessage = 'Se l\'email è registrata, riceverai un link per reimpostare la password.';
        this.errorMessage = null;
        this.form.reset();
      },
      error: (err) => {
        this.errorMessage = 'Errore nell\'invio della richiesta. Riprova.';
      }
  })
  }

}
