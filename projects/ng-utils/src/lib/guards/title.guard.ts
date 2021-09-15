import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ngUtilsConfig } from '../config/config.default';

@Injectable()
export class TitleGuard implements CanActivate {
  constructor(private title: Title) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const suffix = ngUtilsConfig.guards?.title?.suffix as string;
    const divider = ngUtilsConfig.guards?.title?.divider as string;

    this.title.setTitle(
      !!next.data.title ? `${next.data.title} ${divider} ${suffix}` : suffix
    );

    return true;
  }
}
