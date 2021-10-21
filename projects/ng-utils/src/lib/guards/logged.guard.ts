import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { configuration } from '../configuration/public-api';
import { AuthJwtService } from '../services/http/auth-jwt.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private authJwtService: AuthJwtService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authJwtService.logged) {
      this.router.navigate(configuration.guards.logged.redirectLogged);
      return false;
    }
    return true;
  }
}
