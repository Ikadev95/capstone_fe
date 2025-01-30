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
        password: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        privacy: new FormControl(false, [Validators.requiredTrue]),
        data_di_nascita: new FormControl('', [Validators.required]),
        telefono: new FormControl('', [Validators.required]),
        indirizzo: new FormGroup({
          via: new FormControl('', [Validators.required]),
          civico: new FormControl('', [Validators.required]),
          comune_id: new FormControl('', [Validators.required])
        }),
        comune_di_nascita_id: new FormControl('', [Validators.required])

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
