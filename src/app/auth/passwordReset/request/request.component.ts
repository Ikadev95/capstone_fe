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

  constructor(private authSvc: AuthsrvService) {
  this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  request(){
    console.log(this.form.value)
    this.authSvc.requestResetPassword(this.form.value.email).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
  })
  }

}
