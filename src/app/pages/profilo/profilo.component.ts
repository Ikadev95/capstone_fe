import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profilo',
  standalone: false,

  templateUrl: './profilo.component.html',
  styleUrl: './profilo.component.scss'
})
export class ProfiloComponent {
  profileForm!: FormGroup;
  avatarPreview: string | ArrayBuffer | null = null;

  constructor() {
    this.profileForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nome: new FormControl ('', Validators.required),
      cognome: new FormControl ('', Validators.required),
      email: new FormControl ('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.pattern('^\\+?[0-9]{10,15}$')]),
      avatar: new FormControl (null)
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.avatarPreview = reader.result;
      reader.readAsDataURL(file);
      this.profileForm.patchValue({ avatar: file });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Dati inviati:', this.profileForm.value);
      alert('Profilo aggiornato con successo!');
    } else {
      alert('Compila correttamente tutti i campi!');
    }
  }



}
