import { ProfileSvcService } from './../services/profile-svc.service';
import { Router } from '@angular/router';
import { AuthsrvService } from './authsrv.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iLoginRequest } from './interfaces/i-login-request';
import { tap } from 'rxjs';
import { DecodeTokenService } from '../services/decode-token.service';

@Component({
  standalone:false,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  form: FormGroup;

  constructor(private authSvc: AuthsrvService,private router: Router,
    private decodeToken: DecodeTokenService, private ProfileSvcService: ProfileSvcService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if(this.form.valid){
      const formData: iLoginRequest = this.form.value;
      this.authSvc.login(formData) .pipe(
        tap((res) =>
          this.decodeToken.userRoles$.next(this.decodeToken.getRoles())
        )
      )
      .subscribe((res) => {
        console.log(res);
        setTimeout(() => {
          if (this.decodeToken.userRoles$.getValue().includes('ROLE_USER') || this.decodeToken.userRoles$.getValue().includes('ROLE_JUDGE')) {
            this.ProfileSvcService.getMyDates();

            this.router.navigate(['home']);
          } else {
            this.ProfileSvcService.getMyDates();
            this.router.navigate(['utenti']);

          }
        }, 1000);
      });
  } else {
    console.log('form invalido');
  }
}


}
