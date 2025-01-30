import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthsrvService } from '../authsrv.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup

  constructor(private authSrv: AuthsrvService, private router: Router){
    this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        surname: new FormControl('',[Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })
  }

  register(){
    if(this.form.valid){
      console.log(this.form.value);
      this.authSrv.register(this.form.value).subscribe(
        {
          next: (data) => {
            console.log('registrazione effettuata con successo')
            this.router.navigate(['home'])
          },
          error:(data) => {
            console.log('errore registrazione')
          }
        }
      )
    }
  }

}
