import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthsrvService } from '../authsrv.service';
import { Router } from '@angular/router';
import { iComuneResponse } from '../../interfaces/i-comune-response';
import { iProvinciaRequest } from '../../interfaces/i-provincia-request';
import { ComunesvcService } from '../../services/comunesvc.service';

@Component({
  standalone:false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  comuni: iComuneResponse[] = [];
  province: iProvinciaRequest[] = [];
  selectedProvincia: boolean = false;
  comuniFiltrati: iComuneResponse[] = [];
  provinceFiltrate: iProvinciaRequest[] = [];

  form: FormGroup



  constructor(private authSrv: AuthsrvService, private router: Router, private comuneSvc: ComunesvcService){
    this.form = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        cognome: new FormControl('',[Validators.required]),
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
        })

    })
  }

  ngOnInit(): void {
    this.comuneSvc.getProvince().subscribe({
      next: (data) => {
        this.province = data;
        console.log(this.province);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  register(){
    console.log(this.form.valid);
    console.log(this.form.controls);
    if(this.form.valid){
      console.log(this.form.value);
      this.authSrv.register(this.form.value).subscribe({
        next: (data) => {
          console.log('registrazione effettuata con successo');
          console.log('Risposta ricevuta:', data);
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error('Errore nella registrazione', error);
          alert('Si è verificato un errore nella registrazione');
        }
      });
    }
 }

  onProvinciaChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const provinciaSelezionata = this.province.find(provincia => provincia.nome_provincia === value);

    if (provinciaSelezionata) {
      this.form.get('indirizzo.provincia')?.setValue(provinciaSelezionata.id);
      this.selectedProvincia = true;
      this.comuneSvc.getComuni(provinciaSelezionata.id).subscribe({
        next: (data) => {
          this.comuni = data;
          this.comuniFiltrati = [...this.comuni];
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.selectedProvincia = false;
      this.comuni = [];
      this.comuniFiltrati = [];
    }
  }
  filterComuni(event:Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.comuniFiltrati = this.comuni.filter(comune =>
      comune.nome_comune.toLowerCase().includes(value.toLowerCase())
    );
  }

  filterProvince(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    if (value) {
      this.provinceFiltrate = this.province.filter(provincia =>
        provincia.nome_provincia.toLowerCase().includes(value)
      );
    } else {
      this.provinceFiltrate = [...this.province];
    }
  }

  updateProvince(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const provinciaSelezionata = this.province.find(provincia => provincia.nome_provincia === value);
    if (provinciaSelezionata) {
      this.form.get('indirizzo.provincia')?.setValue(provinciaSelezionata.id);
    }
  }

  updateComune(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    const comuneSelezionato = this.comuni.find(c => c.nome_comune === value);

    if (comuneSelezionato) {
      this.form.get('indirizzo.comune_id')?.setValue(comuneSelezionato.id);
    }
  }

}
