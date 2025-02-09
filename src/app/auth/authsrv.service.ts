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
import { ComponimentiSvcService } from '../services/componimenti-svc.service';

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
          this.decodeToken.getRoles()

      } )
    )
  }

  logout(){
    this.userAuthSubject$.next(null)
    this.decodeToken.userRoles$.next([]);
    localStorage.removeItem('dati')
    this.router.navigate(['/auth'])
    .then(() => {
      window.location.reload();
    });
  }


  restoreUser() {
    const userJson: string | null = localStorage.getItem('dati');
    if (!userJson) {
      console.log("Non ci sono dati nel localStorage");
      this.router.navigate(['/auth']);
      return;
    }
    else{
      const accessData: any = JSON.parse(userJson);

      try {
        const decodedToken: any = jwtDecode(accessData.token); // Decodifica il token
      } catch (error) {
        console.log("Errore nel decodificare il token", error);
        return;
      }

      //aggiorna il BehaviorSubject
      this.userAuthSubject$.next(accessData);
      console.log("Utente ripristinato con successo", this.userAuthSubject$.getValue());
    }



  }

}
