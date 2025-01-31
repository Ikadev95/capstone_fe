import { Component } from '@angular/core';
import { AuthsrvService } from '../../auth/authsrv.service';
import { DecodeTokenService } from '../../services/decode-token.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  avatar: string = '';
  roles: string[] = [];
  private rolesSubscription!: Subscription;
  isActive: boolean = false;

  constructor(private authSvc: AuthsrvService,
    private decodeToken: DecodeTokenService,
    private router: Router) { }

    ngOnInit(): void {
      this.rolesSubscription = this.decodeToken.userRoles$.subscribe((roles) => {
        this.roles = roles || [];
      });
    }
    logout() {
      this.authSvc.logout();
    }
    toggleActive() {
      this.isActive = !this.isActive;
    }

}
