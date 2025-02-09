import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { DecodeTokenService } from '../services/decode-token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(    private decodeToken: DecodeTokenService,
    private router: Router) { }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
      if (!this.decodeToken.userRoles$.getValue()?.includes('ROLE_ADMIN')) {
        console.log('non sei admin');
        this.router.navigate(['/profilo']);
        return false;
      }

      return true;
    }
    canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): MaybeAsync<GuardResult> {
      return this.canActivate(childRoute, state);
    }

}
