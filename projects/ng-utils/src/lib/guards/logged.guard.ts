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
export class LoggedGuard implements CanActivate {
  constructor(
    private authJwtService: AuthJwtService,
    private router: Router,
    private configService: ConfigService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authJwtService.logged) {
      this.router.navigate(
        this.configService.config?.guards?.logged?.redirectLogged as string[]
      );
      return false;
    }
    return true;
  }
}
