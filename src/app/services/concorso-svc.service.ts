import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iConcorsoResponse } from '../interfaces/i-concorso-response';

@Injectable({
  providedIn: 'root'
})
export class ConcorsoSvcService {

  baseUrl:string = environment.baseUrl;
  $concorsoSubject$ = new BehaviorSubject<any | null>(null);

  constructor(private http:HttpClient) {
    this.getDatiConcorso().subscribe(
      (data) => {
        this.$concorsoSubject$.next(data);
      }
    );
   }

  getDatiConcorso() {
    return this.http.get <iConcorsoResponse>(`${this.baseUrl}concorso`).pipe(
      tap(data =>{
        data.data_premiazione = new Date(data.data_premiazione)
        data.data_invio_opere = new Date(data.data_invio_opere)
      })
    );
  }

  updateDatiConcorso(formData: FormData): Observable<any> {
    let url = `${environment.baseUrl}concorso/upload/files`
    return this.http.post(`${url}`, formData)
  }
}
