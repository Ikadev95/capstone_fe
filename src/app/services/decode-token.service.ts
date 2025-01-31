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
    const json = localStorage.getItem('accessData');
    if (!json) return;
    const { token } = JSON.parse(json);
    if (!token) return;
    return this.jwtHelper.decodeToken(token).roles;
  }
}
