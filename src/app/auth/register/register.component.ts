import { error } from './../../../../node_modules/ajv/lib/vocabularies/applicator/dependencies';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthsrvService } from '../authsrv.service';
import { Router } from '@angular/router';
import { iComuneResponse } from '../../interfaces/i-comune-response';
import { ComuniSvcService } from '../../services/comuni-svc.service';
import { iProvinciaRequest } from '../../interfaces/i-provincia-request';

@Component({
  standalone:false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  comuni: iComuneResponse[] = [];
  province: iProvinciaRequest[] = [];

  form: FormGroup

  constructor(private authSrv: AuthsrvService, private router: Router, private comuniSvc: ComuniSvcService){
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
  ngOnInit(): void {
    this.comuniSvc.getProvince().subscribe({
      next:(data) => {
      this.province = data;},
      error:(error) => {
        console.log('Errore nel caricamento delle province', error)
      }

    })
  }

  register(){
    if(this.form.valid){
      console.log(this.form.value);
      this.authSrv.register(this.form.value).subscribe(
        {
          next: (data) => {
            console.log('registrazione effettuata con successo')
            this.router.navigate(['auth'])
          },
          error:(data) => {
            console.log('errore registrazione')
          }
        }
      )
    }
  }

}
