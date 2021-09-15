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
export class LoggedGuard implements CanActivate {
  constructor(private authJwtService: AuthJwtService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authJwtService.logged) {
      this.router.navigate(
        ngUtilsConfig.guards?.logged?.redirectLogged as string[]
      );
      return false;
    }
    return true;
  }
}
