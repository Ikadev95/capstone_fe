import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-concorso-foto',
  standalone: false,
  templateUrl: './concorso-foto.component.html',
  styleUrl: './concorso-foto.component.scss'
})
export class ConcorsoFotoComponent {
form: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      file: new FormControl(null),
      titolo: new FormControl('', [Validators.required])
    });
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Anteprima immagine
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('http://localhost:8080/api/upload', formData).subscribe({
        next: () => alert('Upload riuscito!'),
        error: () => alert('Errore durante l\'upload')
      });
    }
  }
  resetFile() {
    this.selectedFile = null;
    this.previewUrl = null;

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
