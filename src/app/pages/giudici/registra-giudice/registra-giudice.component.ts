import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiudiciSrcService } from '../../../services/giudici-src.service';

@Component({
  selector: 'app-registra-giudice',
  standalone: false,

  templateUrl: './registra-giudice.component.html',
  styleUrl: './registra-giudice.component.scss'
})
export class RegistraGiudiceComponent {

form: FormGroup

  constructor(private giudiciSvc: GiudiciSrcService) {
    this.form = new FormGroup
    ({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    })

  }

  onSubmit() {
    if (this.form.valid) {
      this.giudiciSvc.registerGiudice(this.form.value).subscribe({
        next: (data) => {
          console.log('Giudice registrato con successo');
        }
      })

    }
  }
}
