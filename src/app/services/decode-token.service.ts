import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {
  constructor() {
    console.log('decode token service');
    this.userRoles$.next(this.getRoles());
  }

  jwtHelper: JwtHelperService = new JwtHelperService();

  userRoles$ = new BehaviorSubject<string[]>([]);

  getRoles() {
    const json = localStorage.getItem('dati');
    if (!json) return;
    const { token } = JSON.parse(json);
    if (!token) return;
    return this.jwtHelper.decodeToken(token).roles;
  }
  getUsername(): string | null {
    const json = localStorage.getItem('dati');
    console.log(json)
    if (!json) return null;
    const { token } = JSON.parse(json);
    if (!token) return null;

    try {
      return this.jwtHelper.decodeToken(token).sub || null;
    } catch (error) {
      console.error('Errore nel decodificare lo username:', error);
      return null;
    }
  }
}
