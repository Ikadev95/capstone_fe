import { DecodeTokenService } from './../services/decode-token.service';
import { iAccess } from './interfaces/i-access';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { iUser } from './interfaces/i-user';
import { iLoginRequest } from './interfaces/i-login-request';
import { BehaviorSubject, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthsrvService {

  private jwtHelper:JwtHelperService = new JwtHelperService();

  userAuthSubject$ = new BehaviorSubject<any | null>(null)

  constructor(private http:HttpClient, private router:Router, private decodeToken: DecodeTokenService) {
     this.restoreUser()
    }

  registerUrl:string = environment.registerUrl
  loginUrl:string = environment.loginUrl
  autoLogoutTimer:any

  register(user:Partial<iUser>){
    console.log(user)
    return this.http.post<iAccess>(this.registerUrl,user)
  }

  login(userDates: iLoginRequest){
    // qui uso una post perchè proteggere i dati sensibili e creare un token lato server
    return this.http.post<iAccess>(this.loginUrl,userDates).pipe(
      tap( dati => {
        console.log(dati)
          this.userAuthSubject$.next(dati)
          console.log(this.userAuthSubject$.getValue())
          //qui lo stampa OK

          localStorage.setItem('dati',JSON.stringify(dati))

          //recupero la data di scadenza del token
          const date = this.jwtHelper.getTokenExpirationDate(dati.accessToken)
          if (date) this.autoLogout(date)

      } )
    )
  }

  logout(){
    this.userAuthSubject$.next(null)
    this.decodeToken.userRoles$.next([]);
    localStorage.removeItem('dati')
    this.router.navigate(['/auth'])
  }


  autoLogout(expDate: Date){
      // calcolo quanto tempo manca tra la data di exp e il momento attuale
    const expMs = expDate.getTime() - new Date().getTime()

    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, expMs)
  }



  restoreUser() {
    const userJson: string | null = localStorage.getItem('dati');
    if (!userJson) return; // Se non ci sono dati, non fare nulla

    const accessData: any = JSON.parse(userJson);

    try {
      const decodedToken: any = jwtDecode(accessData.token); // Decodifica il token
      const expDate = new Date(decodedToken.exp * 1000); // Converti la data di scadenza in formato JavaScript
      const currentDate = new Date();

      if (expDate < currentDate) {
        console.log("Token scaduto");
        // Se il token è scaduto, rimuovi i dati dal localStorage
        localStorage.removeItem('dati');
        return;
      }
    } catch (error) {
      console.log("Errore nel decodificare il token", error);
      return;
    }

    // Se il token non è scaduto, aggiorna il BehaviorSubject
    this.userAuthSubject$.next(accessData);
    console.log("Utente ripristinato con successo", this.userAuthSubject$.getValue());
  }

}
