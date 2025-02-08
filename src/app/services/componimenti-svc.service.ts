import { iPoesiaRequest } from './../interfaces/i-poesia-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iFotografiaResponse } from '../interfaces/i-fotografia-response';
import { iPoesiaResponse } from '../interfaces/i-poesia-response';

@Injectable({
  providedIn: 'root'
})
export class ComponimentiSvcService {

  constructor(private http:HttpClient) {
    this.getFotoByUser().subscribe();
    this.getPoesieByUser().subscribe();
   }

  fotoSubject$ = new BehaviorSubject<iFotografiaResponse[] | null>(null);
  poesiaSubject$ = new BehaviorSubject<iPoesiaResponse[] | null>(null);




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
        this.getPoesieByUser().subscribe();
      })
    );
    }
  }

  getFotoByUser(){
    return this.http.get<iFotografiaResponse[]>('http://localhost:8080/api/fotografie/user').pipe
    (tap(data => this.fotoSubject$.next(data.map(foto => ({
      ...foto,
       percorsoFile: `http://localhost:8080/api/uploads/fotografie/${foto.percorsoFile.split('/').pop()}`
    })))))
  }

  getPoesieByUser(){
    return this.http.get<iPoesiaResponse[]>('http://localhost:8080/api/poesie/user').pipe
    (tap(data => this.poesiaSubject$.next(data)))
  }

}
