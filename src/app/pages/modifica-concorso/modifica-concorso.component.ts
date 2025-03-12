import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ValueChangeEvent } from '@angular/forms';
import { ConcorsoSvcService } from './../../services/concorso-svc.service';
import { Component } from '@angular/core';
import { iConcorsoResponse } from '../../interfaces/i-concorso-response';

@Component({
  selector: 'app-modifica-concorso',
  standalone: false,

  templateUrl: './modifica-concorso.component.html',
  styleUrl: './modifica-concorso.component.scss'
})
export class ModificaConcorsoComponent {
  form!: FormGroup;
  datiConcorso!: iConcorsoResponse;
  errore:boolean =  false;

  constructor(private ConcorsoSvcService: ConcorsoSvcService, private Router: Router) {


    this.form = new FormGroup({
      tema: new FormControl('', Validators.required),
      data_invio_opere: new FormControl('', Validators.required),
      data_premiazione: new FormControl('', Validators.required),
      anno: new FormControl('', Validators.required),
      bando: new FormControl(null),
      prezzo_singolo: new FormControl('', Validators.required),
      prezzo_tre: new FormControl('', Validators.required)
    });


    this.ConcorsoSvcService.$concorsoSubject$.subscribe(data => {
      this.datiConcorso = data;

      // Formattazione corretta per 'date' e 'datetime-local'
      const dataInvioOpere = data.data_invio_opere
        ? new Date(data.data_invio_opere).toISOString().split('T')[0]  // per input type="date"
        : '';

      const dataPremiazione = data.data_premiazione
        ? new Date(data.data_premiazione).toISOString().slice(0, 16)  // per input type="datetime-local"
        : '';


      this.form.patchValue({
        tema: data.tema || '',
        data_invio_opere: dataInvioOpere,
        data_premiazione: dataPremiazione,
        anno: data.anno || '',
        prezzo_singolo: data.prezzo_singolo || '',
        prezzo_tre: data.prezzo_tre || ''
      });
    });
  }


  onFileChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const file = element.files && element.files[0];
    if (file) {
      this.form.patchValue({ bando: file });
    }
  }


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('tema', this.form.get('tema')?.value);
    formData.append('data_invio_opere', this.form.get('data_invio_opere')?.value);
    formData.append('data_premiazione', this.form.get('data_premiazione')?.value);
    formData.append('anno', this.form.get('anno')?.value);
    formData.append('prezzo_singolo', this.form.get('prezzo_singolo')?.value);
    formData.append('prezzo_tre', this.form.get('prezzo_tre')?.value);

    const file = this.form.get('bando')?.value;
    if (file) {
      formData.append('file', file);
    }


    this.ConcorsoSvcService.updateDatiConcorso(formData).subscribe({
      next: (response) => {

        this.ConcorsoSvcService.getDatiConcorso()

        this.Router.navigate(['home']);


      },
      error: (err) => {
        console.error('Errore durante l\'aggiornamento del concorso', err);

        this.errore = true

      }
    });
  }
}
