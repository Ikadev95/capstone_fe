import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {
  constructor() {
    this.userRoles$.next(this.getRoles());
  }

  jwtHelper: JwtHelperService = new JwtHelperService();

  userRoles$ = new BehaviorSubject<string[]>(this.getRoles());

  getRoles(): string[] {
    const json = localStorage.getItem('dati');
    if (!json) return [];

    const { token } = JSON.parse(json);
    if (!token) return [];

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.roles ? decodedToken.roles : [];
  }
  getUsername(): string | null {
    const json = localStorage.getItem('dati');
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
