import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { configuration } from '../configuration/public-api';
@Injectable()
export class TitleGuard implements CanActivate {
  constructor(private title: Title) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const suffix = configuration.guards.title.suffix;
    const divider = configuration.guards.title.divider;

    this.title.setTitle(
      !!next.data.title ? `${next.data.title} ${divider} ${suffix}` : suffix
    );

    return true;
  }
}
