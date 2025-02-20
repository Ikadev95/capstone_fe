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
      if (!file.type.startsWith('image/')) {
        alert('Il file selezionato non è un\'immagine valida.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Il file è troppo grande! La dimensione massima consentita è di 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const width = img.width;
          const height = img.height;

          console.log(`Risoluzione immagine: ${width}x${height}`);

          // Controllo risoluzione massima
          if (width > 4000 || height > 3000) {
            alert(`La risoluzione dell'immagine è troppo alta (${width}x${height}). Il massimo consentito è 4000x3000.`);
            return;
          }

          // Se i controlli passano, aggiorna l'anteprima e il form
          this.selectedFile = file;
          this.avatarPreview = e.target.result;
          this.profileForm.patchValue({ avatar: file });
        };
      };
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
