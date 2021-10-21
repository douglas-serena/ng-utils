import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { configuration } from '../configuration/public-api';
import { AuthJwtService } from '../services/http/auth-jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authJwtService: AuthJwtService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authJwtService.logged) {
      return true;
    }
    this.router.navigate(configuration.guards.auth.redirectLoggedOut);

    return false;
  }
}
