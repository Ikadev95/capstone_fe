
import { iPoesiaRequest } from './../interfaces/i-poesia-request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { iFotografiaResponse } from '../interfaces/i-fotografia-response';
import { iPoesiaResponse } from '../interfaces/i-poesia-response';
import { environment } from '../../environments/environment.development';


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
  baseUrl:string = environment.baseUrl;




  uploadFoto(formData:FormData){ {
    return this.http.post(`${this.baseUrl}fotografie/upload`, formData)
    .pipe(
      tap(() => {
        this.getFotoByUser().subscribe();
      })
    );
    }
  }

  uploadPoesia( dati: iPoesiaRequest){ {
    return this.http.post(`${this.baseUrl}poesie/create`,dati)
    .pipe(
      tap(() => {
        this.getPoesieByUser().subscribe();
      })
    );
    }
  }

  getFotoByUser(){
    return this.http.get<iFotografiaResponse[]>(`${this.baseUrl}fotografie/user`).pipe
    (tap(data => this.fotoSubject$.next(data.map(foto => ({
      ...foto,
       percorsoFile: `${this.baseUrl}uploads/fotografie/${foto.percorsoFile.split('/').pop()}`
    })))))
  }

  getPoesieByUser(){
    return this.http.get<iPoesiaResponse[]>(`${this.baseUrl}poesie/user`).pipe
    (tap(data => this.poesiaSubject$.next(data)))
  }

  deleteFoto(id:number){
    return this.http.delete(`${this.baseUrl}fotografie/${id}`)
  }

  deletePoesia(id:number){
    return this.http.delete(`${this.baseUrl}poesie/${id}`)
  }



}
