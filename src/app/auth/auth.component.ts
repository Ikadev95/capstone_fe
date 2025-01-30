import { Router } from '@angular/router';
import { AuthsrvService } from './authsrv.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iLoginRequest } from './interfaces/i-login-request';

@Component({
  standalone:false,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  form: FormGroup;

  constructor(private authSvc: AuthsrvService,private router: Router){
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){
    if(this.form.valid){
      //prendo i dati dal form e li inserisco in una varabile
      const formData: iLoginRequest = this.form.value;
      this.authSvc.login(formData).subscribe(

        {
          next: (data) => {
            console.log('login effettuato con successo')
            this.router.navigate(['home'])
          },
          error:(data) => {
            console.log('errore login')
          }
        }
      )

    }
    else{
      console.log('form invalido')
    }
  }


}
