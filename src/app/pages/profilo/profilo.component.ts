import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { iUtenteResponse } from '../../interfaces/i-utente-response';
import { ProfileSvcService } from '../../services/profile-svc.service';

@Component({
  selector: 'app-profilo',
  standalone: false,
  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  profileForm!: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null;
  modifyMode = false;
  datiUtente!: iUtenteResponse;
  selectedFile: File | null = null;

  constructor(private profileSrv: ProfileSvcService) {
    this.profileForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      cognome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern('^[\\+\\(\\)0-9\\-\\s]{10,20}$')]),
      avatar: new FormControl(null)
    });


    profileSrv.MyDatesSubject$.subscribe(data => {
      console.log(data)
      this.datiUtente = data;
      this.profileForm.patchValue({
        nome: data.nome || '',
        cognome: data.cognome || '',
        email: data.email || '',
        telefono: data.telefono || ''
      });
      if (data.avatar) {
        this.avatarPreview = `http://localhost:8080/uploads/avatar/${data.avatar.split('/').pop()}`;
      }
    });
  }

  //  Funzione per gestire il cambio di file
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => this.avatarPreview = reader.result;
      reader.readAsDataURL(file);
      this.profileForm.patchValue({ avatar: file });
    }
  }

  //  Funzione per inviare i dati al backend
  onSubmit() {
    console.log(this.profileForm)
      const formData = new FormData();
      formData.append('nome', this.profileForm.get('nome')?.value);
      formData.append('cognome', this.profileForm.get('cognome')?.value);
      formData.append('email', this.profileForm.get('email')?.value);
      formData.append('numero_telefono', this.profileForm.get('telefono')?.value);
      console.log(formData)

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      console.log(formData)

      this.profileSrv.updateUserProfile(formData).subscribe({
        next: (response) => {
          console.log('Profilo aggiornato:', response);
          alert('Profilo aggiornato con successo!');
          this.profileSrv.getMyDates()
          this.modifyMode = false;
        },
        error: (error) => {
          console.error('Errore durante l’aggiornamento:', error);
          alert('Si è verificato un errore durante l’aggiornamento del profilo.');
        }
      });

  }

  modifyModeFunction() {
    this.modifyMode = !this.modifyMode;
  }
}
