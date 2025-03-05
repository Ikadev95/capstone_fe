import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iPasswordResetRequest } from '../../../interfaces/i-password-reset-request';
import { iPasswordResetConfirmRequest } from '../../../interfaces/i-password-reset-confirm-request';

@Component({
  selector: 'app-reset',
  standalone: false,

  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {
  token: string | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  form: FormGroup;
  email: string | null = '';
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
  this.form = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
    console.log('Token:', this.token);

    if (!this.token) {
      this.router.navigate(['/login']);
    }

  }
  resetPassword(): void {
    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.errorMessage = 'Le password non corrispondono';
      return;
    }

    if (this.token && this.form.valid && this.email) {
      const resetRequest : iPasswordResetConfirmRequest = { token: this.token, newPassword: this.form.value.newPassword, email: this.email };

      this.http.post('http://localhost:8080/api/auth/reset-password/confirm', resetRequest)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Password reimpostata con successo';
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.errorMessage = 'Si è verificato un errore, prova di nuovo';
          }
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
