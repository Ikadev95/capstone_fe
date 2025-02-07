import { iPoesiaRequest } from './../interfaces/i-poesia-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iFotografiaResponse } from '../interfaces/i-fotografia-response';

@Injectable({
  providedIn: 'root'
})
export class ComponimentiSvcService {

  constructor(private http:HttpClient) {
    this.getFotoByUser().subscribe();
   }

  fotoSubject$ = new BehaviorSubject<iFotografiaResponse[] | null>(null);

  getFotoByUser(){
    return this.http.get<iFotografiaResponse[]>('http://localhost:8080/api/fotografie/user').pipe
    (tap(data => this.fotoSubject$.next(data.map(foto => ({
      ...foto,
       percorsoFile: `http://localhost:8080/api/uploads/fotografie/${foto.percorsoFile.split('/').pop()}`
    })))))
  }

  uploadFoto(formData:FormData){ {
    return this.http.post('http://localhost:8080/api/fotografie/upload', formData)
    .pipe(
      tap(() => {
        this.getFotoByUser().subscribe();
      })
    );
    }
  }

  uploadPoesia( dati: iPoesiaRequest){ {
    return this.http.post('http://localhost:8080/api/poesie/create',dati)
    .pipe(
      tap(() => {
        this.getFotoByUser().subscribe();
      })
    );
    }
  }

}
