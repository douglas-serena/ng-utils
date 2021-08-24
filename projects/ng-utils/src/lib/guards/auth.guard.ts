import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { AuthJwtService } from '../services/http/auth-jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authJwtService: AuthJwtService,
    private configService: ConfigService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authJwtService.logged) {
      return true;
    }
    this.router.navigate(
      this.configService.config.guards?.auth?.redirectLoggedOut as string[]
    );

    return false;
  }
}
