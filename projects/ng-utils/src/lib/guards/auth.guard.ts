import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ngUtilsConfig } from '../config/config.default';
import { AuthJwtService } from '../services/http/auth-jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authJwtService: AuthJwtService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authJwtService.logged) {
      return true;
    }
    this.router.navigate(
      ngUtilsConfig.guards?.auth?.redirectLoggedOut as string[]
    );

    return false;
  }
}
