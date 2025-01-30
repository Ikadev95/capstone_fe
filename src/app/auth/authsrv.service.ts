import { iAccess } from './interfaces/i-access';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment.development';
import { iUser } from './interfaces/i-user';
import { iLoginRequest } from './interfaces/i-login-request';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthsrvService {

  constructor(private http:HttpClient, private router:Router) { this.restoreUser()}

  private jwtHelper:JwtHelperService = new JwtHelperService();

  userAuthSubject$ = new BehaviorSubject<iAccess | null>(null)

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
          this.userAuthSubject$.next(dati)

          localStorage.setItem('dati',JSON.stringify(dati))

          //recupero la data di scadenza del token
          const date = this.jwtHelper.getTokenExpirationDate(dati.accessToken)
          if (date) this.autoLogout(date)

      } )
    )
  }

  logout(){
    this.userAuthSubject$.next(null)
    localStorage.removeItem('dati')
    this.router.navigate(['login'])
  }


  autoLogout(expDate: Date){
      // calcolo quanto tempo manca tra la data di exp e il momento attuale
    const expMs = expDate.getTime() - new Date().getTime()

    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, expMs)
  }

  restoreUser(){
    const userJson:string|null = localStorage.getItem('accessData')
    if(!userJson)return

    const accessdata:iAccess = JSON.parse(userJson)

    if(this.jwtHelper.isTokenExpired(accessdata.accessToken)) {
      localStorage.removeItem('accessData')
      return
    }

    this.userAuthSubject$.next(accessdata)
  }

}
