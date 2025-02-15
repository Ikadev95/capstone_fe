import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { iUtenteResponse } from '../interfaces/i-utente-response';
import { DecodeTokenService } from './decode-token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileSvcService {

  MyDatesSubject$ = new BehaviorSubject<iUtenteResponse>({
    nome: '',
    cognome: '',
    email: '',
    data_di_nascita: '',
    telefono: '',
    avatar: null,
    privacy: false,
    indirizzo: {
      via: '',
      civico: '',
      comune_id: null
    },
    comune_di_nascita: null,
    appUser: {
      username: ''
    }
  });

  constructor(private http: HttpClient, private decodeTokenService: DecodeTokenService) {
    if (this.decodeTokenService.getUsername()) {
      this.getMyDates();
    }
  }

  getMyDates(){
    let url = `http://localhost:8080/api/utenti/me`
    return this.http.get<iUtenteResponse>(url).subscribe(
      dates => {
        console.log('Dati ottenuti:', dates);
        this.MyDatesSubject$.next(dates);
      },
      error => {
        console.log('Errore nel recupero dei dati:', error);
      }
    );

  }


  updateUserProfile(formData: FormData): Observable<any> {
    let apiUrl = 'http://localhost:8080/api/utenti/upload/avatar';
    return this.http.post(`${apiUrl}`, formData);
  }


}
