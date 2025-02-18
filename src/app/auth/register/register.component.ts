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
  alertMessage: { type: string, message: string } | null = null;
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
    if(this.form.valid){
      console.log(this.form.value);
      this.form.get('indirizzo.comune_id')?.setValue(this.form.value.indirizzo.comune_id.id);
      this.authSrv.register(this.form.value).subscribe({
        next: (data) => {
          console.log('Registrazione effettuata con successo');
          console.log('Risposta ricevuta:', data);

          // Imposta il messaggio di successo
          this.alertMessage = {
            type: 'success',
            message: 'Registrazione avvenuta con successo!'
          };

          this.router.navigate(['auth']);
        },
        error: (error) => {
          console.error('Errore nella registrazione', error);

          // Imposta il messaggio di errore
          this.alertMessage = {
            type: 'danger',
            message: 'Si è verificato un errore nella registrazione.'
          };
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
    console.log(comuneSelezionato);

    if (comuneSelezionato) {
      this.form.get('indirizzo.comune_id')?.setValue(comuneSelezionato.nome_comune);
    }
  }

  step = 1;

  nextStep() {
    if (this.form.get('nome')?.valid &&
        this.form.get('cognome')?.valid &&
        this.form.get('email')?.valid &&
        this.form.get('password')?.valid &&
        this.form.get('username')?.valid &&
        this.form.get('data_di_nascita')?.valid) {
      this.step = 2;
    } else {
      console.log(this.form)
      alert("Compila tutti i campi prima di proseguire!");
    }
  }

  prevStep() {
    this.step = 1;
  }

  showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
}
